import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const app = express();

app.use(express.json({ limit: '500kb' }));

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'rayo-brief-builder' });
});

// Brief Wizard AI extraction endpoint
// Uses lowest-cost, free-tier suitable model 'gemini-3.1-flash-lite'
// Makes exactly one API call per user-initiated request
app.post('/api/generate-brief', async (req: Request, res: Response) => {
  try {
    const rawText = req.body?.rawText;

    if (!rawText || typeof rawText !== 'string' || !rawText.trim()) {
      return res.status(400).json({
        error: 'Please paste your event information or rough notes first.',
      });
    }

    // Limit input text to 4,000 characters to keep token usage and latency low
    const sanitizedText = rawText.trim().slice(0, 4000);

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error:
          'Gemini API key is not configured on the server. Please check your project settings.',
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    // Request structured extraction matching RAYO form options
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `You are an event media brief extraction specialist for RAYO Media, Melbourne.
Analyze the following raw event text (which may be an email, run sheet, event description, or rough notes) and extract only the relevant, factual information to populate the brief.

STRICT ACCURACY RULES:
1. ONLY populate fields that are explicitly supported by the supplied text.
2. DO NOT invent, hallucinate, or assume details (e.g. do not guess a venue, date, guest count, or dress code if not mentioned).
3. If a field is not mentioned or unknown, return an empty string "" or an empty array [].
4. For selectable choices, match to the closest standard option if clearly stated:
   - eventType: "Conference" | "Corporate event" | "Networking event" | "Product / brand launch" | "Exhibition / expo" | "Gala / formal event" | "Community event" | "Other" | ""
   - coveragePriorities: array from ["Keynote speakers", "Presentations", "Panels", "Networking", "Guest interactions", "Candid moments", "Branding and venue details", "Sponsors", "Catering / food", "Awards or ceremonies", "Behind the scenes", "Team / staff", "Social media content"]
   - speakerPriority: "All speakers are equally important" | "Prioritise selected speakers" | "Focus mainly on keynote / main speakers" | "Mostly capture the atmosphere rather than every speaker" | "Not sure" | ""
   - hasGroupPhotos: "Yes" | "No" | "Not sure" | ""
   - groupPhotoTiming: "Before guests arrive" | "During a break" | "At the end of the event" | "Other" | ""
   - videoStyles: array from ["Music + visuals", "Speaker soundbites", "Interviews", "Voice-over", "Visuals + on-screen text", "Combination", "Not sure yet"]
   - fullSessionsRecording: "No, highlights only" | "Yes, selected sessions" | "Yes, full-session recording" | "Not sure" | ""
   - guestInterviews: "Yes" | "No" | "Maybe" | ""
   - photoStyle: "Mostly candid" | "Mostly posed" | "A combination of candid and posed" | "Formal / polished" | "Natural / documentary" | "Not sure" | ""
   - photoRequirements: array from ["Flash is fine", "Prefer no flash", "Venue has lighting restrictions", "Important group photographs", "VIP / guest portraits", "Sponsor / branding photography", "Product photography"]
   - dressCode: "Smart casual" | "Corporate / business" | "Formal / black tie" | "Specific dress code" | "No particular requirement" | "Other" | ""
5. If the text does not contain any relevant event information, set hasRelevantEventInfo to false and provide a helpful explanation in message.

INPUT TEXT:
"""
${sanitizedText}
"""`,
            },
          ],
        },
      ],
      config: {
        systemInstruction:
          'Extract factual event brief details into structured JSON without inventing any facts.',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            hasRelevantEventInfo: { type: Type.BOOLEAN },
            message: { type: Type.STRING },
            eventName: { type: Type.STRING },
            organisation: { type: Type.STRING },
            eventType: { type: Type.STRING },
            eventDate: { type: Type.STRING },
            venue: { type: Type.STRING },
            approxGuests: { type: Type.STRING },
            guestArrivalTime: { type: Type.STRING },
            eventStartTime: { type: Type.STRING },
            eventFinishTime: { type: Type.STRING },
            additionalEventInfo: { type: Type.STRING },
            coveragePriorities: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            mustNotMissMoments: { type: Type.STRING },
            keyPeople: { type: Type.STRING },
            speakerPriority: { type: Type.STRING },
            hasGroupPhotos: { type: Type.STRING },
            groupPhotoTiming: { type: Type.STRING },
            videoStyles: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            fullSessionsRecording: { type: Type.STRING },
            fullSessionsDetails: { type: Type.STRING },
            guestInterviews: { type: Type.STRING },
            photoStyle: { type: Type.STRING },
            photoRequirements: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            additionalPhotoInfo: { type: Type.STRING },
            referenceUrl: { type: Type.STRING },
            dressCode: { type: Type.STRING },
            venueLogistics: { type: Type.STRING },
            additionalMediaNotes: { type: Type.STRING },
          },
          required: ['hasRelevantEventInfo', 'message'],
        },
      },
    });

    const outputText = response.text;
    if (!outputText) {
      return res.status(500).json({
        error:
          'The AI model did not return any extracted content. Please try again.',
      });
    }

    const parsed = JSON.parse(outputText);
    return res.json(parsed);
  } catch (error: any) {
    console.error('Error generating brief via Gemini:', error);
    return res.status(500).json({
      error:
        error?.message ||
        'Unable to process event notes with AI. Please fill in the brief manually or try again.',
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true, host: '0.0.0.0', port: PORT },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
