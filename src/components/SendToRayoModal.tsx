import React, { useState } from 'react';
import { Mail, Copy, Check, X, ExternalLink, Sparkles, Building } from 'lucide-react';
import { EventBriefData } from '../types';

interface SendToRayoModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: EventBriefData;
}

export const SendToRayoModal: React.FC<SendToRayoModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const eventTitle = data.eventName || 'Upcoming Event';
  const orgTitle = data.organisation ? ` (${data.organisation})` : '';
  const emailSubject = encodeURIComponent(`Event Media Brief: ${eventTitle}${orgTitle}`);
  
  const emailBody = encodeURIComponent(`Hi RAYO Media Team,

Here is our completed Event Media Brief for ${eventTitle}:

1. EVENT BASICS
• Event: ${data.eventName || 'TBD'}
• Organisation: ${data.organisation || 'TBD'}
• Type: ${data.eventType || 'TBD'}
• Date: ${data.eventDate || 'TBD'}
• Venue: ${data.venue || 'TBD'}
• Approx Guests: ${data.approxGuests || 'TBD'}
• Schedule: Arrival ${data.guestArrivalTime || 'TBD'} | Start ${data.eventStartTime || 'TBD'} | Finish ${data.eventFinishTime || 'TBD'}

2. WHAT MATTERS MOST
• Coverage Priorities: ${data.coveragePriorities.join(', ') || 'Standard coverage'}
• Must-Not-Miss: ${data.mustNotMissMoments || 'None'}

3. PEOPLE & KEY MOMENTS
• Key People: ${data.keyPeople || 'General guest coverage'}
• Speaker Priority: ${data.speakerPriority || 'Equally important'}
• Group Photos: ${data.hasGroupPhotos || 'None'} ${data.groupPhotoTiming ? `(${data.groupPhotoTiming})` : ''}

4. VIDEO & AUDIO
• Video Style: ${data.videoStyles.join(', ') || 'Highlights'}
• Full Recordings: ${data.fullSessionsRecording || 'Highlights only'}
• Guest Interviews: ${data.guestInterviews || 'TBD'}

5. PHOTOGRAPHY
• Style: ${data.photoStyle || 'Candid & Posed'}
• Requirements: ${data.photoRequirements.join(', ') || 'Standard'}

6. LOGISTICS
• Reference: ${data.referenceUrl || 'None'}
• Dress Code: ${data.dressCode || 'Standard'}
• Venue Logistics: ${data.venueLogistics || 'None'}
• Notes: ${data.additionalMediaNotes || 'None'}

Looking forward to discussing our coverage!
Best regards,
`);

  const mailtoLink = `mailto:hello@rayomedia.com.au?subject=${emailSubject}&body=${emailBody}`;

  const copyForEnquiry = async () => {
    try {
      const decodedBody = decodeURIComponent(emailBody);
      await navigator.clipboard.writeText(decodedBody);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 dark:bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="rayo-card max-w-lg w-full p-6 sm:p-7 bg-white dark:bg-[#1b1b1f] border border-zinc-200 dark:border-white/10 relative shadow-2xl space-y-6">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#f2c300]/15 dark:bg-[#f2c300]/10 border border-[#f2c300]/30 dark:border-[#f2c300]/20 flex items-center justify-center text-[#926004] dark:text-[#f2c300] shrink-0">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-montserrat font-bold text-zinc-900 dark:text-white text-lg">
              Send Brief to RAYO Media
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Submit your planning brief to the Melbourne event team
            </p>
          </div>
        </div>

        <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed bg-zinc-50 dark:bg-[#151518] p-3.5 rounded-xl border border-zinc-200/80 dark:border-white/5">
          Choose your preferred method to deliver this brief directly to our production team:
        </p>

        {/* Action Options */}
        <div className="space-y-3">
          {/* Direct Email Link */}
          <a
            href={mailtoLink}
            className="flex items-center justify-between p-4 rounded-xl bg-[#f2c300] hover:bg-[#dcb000] text-[#18181b] font-bold text-xs transition-all duration-200 shadow-md group"
          >
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 shrink-0" />
              <div className="text-left">
                <p className="font-bold text-sm">Open in Email Client</p>
                <p className="text-[11px] text-[#18181b]/80 font-normal">
                  Pre-fills to hello@rayomedia.com.au with your brief
                </p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>

          {/* Copy Brief for Web Form / Custom Email */}
          <button
            type="button"
            onClick={copyForEnquiry}
            className="w-full flex items-center justify-between p-4 rounded-xl bg-zinc-50 hover:bg-zinc-100 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] text-zinc-800 dark:text-white border border-zinc-200 dark:border-white/10 text-xs transition-all duration-200 group"
          >
            <div className="flex items-center gap-3">
              {copied ? (
                <Check className="w-4 h-4 text-emerald-600 dark:text-green-400 shrink-0" />
              ) : (
                <Copy className="w-4 h-4 text-[#926004] dark:text-[#f2c300] shrink-0" />
              )}
              <div className="text-left">
                <p className="font-semibold text-sm">
                  {copied ? 'Copied to Clipboard!' : 'Copy Formatted Text'}
                </p>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  Ready to paste into your enquiry message or email
                </p>
              </div>
            </div>
            {copied && <span className="text-[10px] text-emerald-600 dark:text-green-400 font-semibold uppercase tracking-wider">Copied</span>}
          </button>
        </div>

        {/* Contact Info Footer */}
        <div className="pt-3 border-t border-zinc-200 dark:border-white/5 flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400">
          <span>RAYO Media · Melbourne</span>
          <a
            href="mailto:hello@rayomedia.com.au"
            className="text-[#926004] dark:text-[#f2c300] hover:underline font-medium"
          >
            hello@rayomedia.com.au
          </a>
        </div>
      </div>
    </div>
  );
};

