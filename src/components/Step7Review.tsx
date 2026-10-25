import React, { useRef, useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  Copy,
  Download,
  Send,
  Edit3,
  Video,
  Camera,
  Mic,
  FileText,
  Building,
  Shirt,
  Link2,
  AlertCircle,
  Sparkles,
  Check,
  ChevronLeft,
} from 'lucide-react';
import { EventBriefData } from '../types';
import { toPng } from 'html-to-image';
import { LOGO_BASE64 } from '../constants/logo';

interface Step7ReviewProps {
  data: EventBriefData;
  onEditStep: (stepNumber: number) => void;
  onSendToRayo: () => void;
  onPrev?: () => void;
}

export const Step7Review: React.FC<Step7ReviewProps> = ({
  data,
  onEditStep,
  onSendToRayo,
  onPrev,
}) => {
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  // Generate plain text formatted brief
  const generatePlainTextBrief = () => {
    return `========================================
RAYO MEDIA - EVENT MEDIA BRIEF
========================================

1. EVENT BASICS
----------------------------------------
Event Name: ${data.eventName || 'Not specified'}
Organisation: ${data.organisation || 'Not specified'}
Event Type: ${data.eventType === 'Other' ? data.customEventType || 'Other' : data.eventType || 'Not specified'}
Date: ${data.eventDate || 'Not specified'}
Venue: ${data.venue || 'Not specified'}
Approx. Guests: ${data.approxGuests || 'Not specified'}
Schedule:
  • Guest Arrival: ${data.guestArrivalTime || 'TBD'}
  • Event Start: ${data.eventStartTime || 'TBD'}
  • Event Finish: ${data.eventFinishTime || 'TBD'}
Additional Info: ${data.additionalEventInfo || 'None'}

2. COVERAGE PRIORITIES
----------------------------------------
Priorities: ${data.coveragePriorities.length > 0 ? data.coveragePriorities.join(', ') : 'Not specified'}
${data.customPriority ? `Custom Priority: ${data.customPriority}\n` : ''}
MUST NOT MISS Moments:
${data.mustNotMissMoments || 'None specified'}

3. PEOPLE & KEY MOMENTS
----------------------------------------
Key People to Capture:
${data.keyPeople || 'General guest and speaker coverage'}
Speaker Coverage Priority: ${data.speakerPriority || 'Not specified'}
Group/Team Photos: ${data.hasGroupPhotos || 'Not specified'}
${data.hasGroupPhotos === 'Yes' ? `Group Photo Timing: ${data.groupPhotoTiming === 'Other' ? data.customGroupPhotoTiming || 'Other' : data.groupPhotoTiming || 'TBD'}\n` : ''}
4. VIDEO & AUDIO
----------------------------------------
Video Style: ${data.videoStyles.length > 0 ? data.videoStyles.join(', ') : 'Not specified'}
Speeches/Sessions in Full: ${data.fullSessionsRecording || 'Highlights only'}
${data.fullSessionsDetails ? `Full Recording Details: ${data.fullSessionsDetails}\n` : ''}Quick Guest Interviews / Vox Pops: ${data.guestInterviews || 'Not specified'}

5. PHOTOGRAPHY
----------------------------------------
Photography Style: ${data.photoStyle || 'Not specified'}
Requirements: ${data.photoRequirements.length > 0 ? data.photoRequirements.join(', ') : 'Standard event coverage'}
${data.customPhotoRequirement ? `Custom Requirement: ${data.customPhotoRequirement}\n` : ''}Additional Photo Notes: ${data.additionalPhotoInfo || 'None'}

6. REFERENCES & LOGISTICS
----------------------------------------
Visual Reference URL: ${data.referenceUrl || 'None provided'}
Media Crew Dress Code: ${data.dressCode === 'Other' || data.dressCode === 'Specific dress code' ? data.customDressCode || data.dressCode : data.dressCode || 'Standard smart/corporate'}
Venue Logistics & Access:
${data.venueLogistics || 'None noted'}
Additional Notes:
${data.additionalMediaNotes || 'None'}

========================================
Generated via RAYO Event Media Brief Builder
Contact: hello@rayomedia.com.au | Melbourne, VIC
========================================`;
  };

  const handleCopy = async () => {
    try {
      const text = generatePlainTextBrief();
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy to clipboard', err);
    }
  };

  const handleDownload = async () => {
    if (!printRef.current) return;
    setIsDownloading(true);
    try {
      // Small timeout to ensure fonts/DOM rendering
      await new Promise((resolve) => setTimeout(resolve, 150));
      const isDark = document.documentElement.classList.contains('dark');
      const dataUrl = await toPng(printRef.current, {
        cacheBust: true,
        backgroundColor: isDark ? '#161619' : '#ffffff',
        quality: 0.95,
        pixelRatio: 2,
        skipFonts: true,
        fontEmbedCSS: '',
      });

      const link = document.createElement('a');
      const filename = data.eventName
        ? `RAYO-Brief-${data.eventName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.png`
        : 'RAYO-Event-Media-Brief.png';
      link.download = filename;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Error generating image download', err);
      // Fallback to window print
      window.print();
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner & Primary Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-200 dark:border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#926004] dark:text-[#f2c300] uppercase tracking-wider mb-1.5 font-sans">
            <span>Step 07</span>
            <span>·</span>
            <span>Review & Export</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-montserrat font-bold text-zinc-900 dark:text-white tracking-tight">
            Your Event Media Brief
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm mt-1">
            Review your brief below. You can copy it, download a high-res visual copy, or send it to RAYO.
          </p>
        </div>

        {/* Action Buttons Bar */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            id="copy-brief-button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-300 dark:bg-white/[0.06] dark:hover:bg-white/[0.12] dark:text-white dark:border-white/10 transition-all duration-200 shadow-sm"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600 dark:text-green-400" />
                <span className="text-emerald-700 dark:text-green-400 font-bold">Brief Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#926004] dark:text-[#f2c300]" />
                <span>Copy Brief</span>
              </>
            )}
          </button>

          <button
            type="button"
            id="download-brief-button"
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-300 dark:bg-white/[0.06] dark:hover:bg-white/[0.12] dark:text-white dark:border-white/10 transition-all duration-200 shadow-sm disabled:opacity-50"
          >
            <Download className="w-4 h-4 text-[#926004] dark:text-[#f2c300]" />
            <span>{isDownloading ? 'Generating...' : 'Download Brief'}</span>
          </button>

          <button
            type="button"
            id="send-to-rayo-button"
            onClick={onSendToRayo}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#f2c300] hover:bg-[#dcb000] text-[#18181b] transition-all duration-200 shadow-lg shadow-[#f2c300]/20"
          >
            <Send className="w-4 h-4" />
            <span>Send to RAYO</span>
          </button>
        </div>
      </div>

      {/* Visual Brief Printable/Downloadable Container */}
      <div
        ref={printRef}
        id="printable-brief-card"
        className="rayo-card p-6 sm:p-8 bg-white dark:bg-[#18181c] border border-zinc-200 dark:border-white/[0.09] shadow-sm space-y-6 text-zinc-800 dark:text-zinc-200"
      >
        {/* Card Top Brand Header */}
        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-white/[0.08] pb-5 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            {LOGO_BASE64 ? (
              <img
                src={LOGO_BASE64}
                alt="RAYO Media"
                className="h-8 w-auto object-contain dark:brightness-110"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="h-8 px-2.5 bg-[#f2c300] text-[#18181b] font-black tracking-wider text-xs flex items-center justify-center rounded-lg font-montserrat">
                RAYO
              </div>
            )}
            <div>
              <h3 className="font-montserrat font-bold text-zinc-900 dark:text-white text-base">
                Event Media Brief
              </h3>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                Melbourne Event Videography, Photography & Hybrid Coverage
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="inline-block px-2.5 py-1 rounded-lg bg-[#f2c300]/15 dark:bg-[#f2c300]/10 border border-[#f2c300]/30 text-[#926004] dark:text-[#f2c300] text-[11px] font-semibold tracking-wide">
              {data.eventType || 'Event Brief'}
            </span>
          </div>
        </div>

        {/* SECTION 1: EVENT */}
        <div className="space-y-3 pb-5 border-b border-zinc-200 dark:border-white/[0.06]">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-[#926004] dark:text-[#f2c300] uppercase tracking-wider flex items-center gap-1.5 font-sans">
              <span>01.</span>
              <span>Event Details</span>
            </h4>
            <button
              type="button"
              onClick={() => onEditStep(1)}
              className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-[#926004] dark:hover:text-[#f2c300] flex items-center gap-1 transition-colors print:hidden"
            >
              <Edit3 className="w-3 h-3" />
              <span>Edit</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-zinc-50 dark:bg-[#141416] p-4 rounded-xl border border-zinc-200/80 dark:border-white/[0.04]">
            <div>
              <p className="text-[11px] uppercase text-zinc-500 dark:text-zinc-400 font-semibold tracking-wider">Event Name</p>
              <p className="text-base font-bold text-zinc-900 dark:text-white mt-0.5">{data.eventName || 'Untitled Event'}</p>
              {data.organisation && (
                <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-0.5">{data.organisation}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">Date</p>
                <p className="text-zinc-900 dark:text-white font-semibold mt-0.5">{data.eventDate || 'Date TBD'}</p>
              </div>
              <div>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">Guests</p>
                <p className="text-zinc-900 dark:text-white font-semibold mt-0.5">{data.approxGuests ? `${data.approxGuests} attendees` : 'Not specified'}</p>
              </div>
            </div>

            <div className="md:col-span-2 pt-2 border-t border-zinc-200/80 dark:border-white/[0.04] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">Venue / Location</p>
                <p className="text-zinc-800 dark:text-white font-medium mt-0.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#926004] dark:text-[#f2c300] shrink-0" />
                  <span>{data.venue || 'Venue TBD'}</span>
                </p>
              </div>

              <div>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">Key Schedule</p>
                <p className="text-zinc-800 dark:text-white font-medium mt-0.5">
                  {data.guestArrivalTime && `Arrival: ${data.guestArrivalTime} · `}
                  {data.eventStartTime && `Start: ${data.eventStartTime} · `}
                  {data.eventFinishTime && `Finish: ${data.eventFinishTime}`}
                  {!data.guestArrivalTime && !data.eventStartTime && !data.eventFinishTime && 'Schedule TBD'}
                </p>
              </div>
            </div>

            {data.additionalEventInfo && (
              <div className="md:col-span-2 pt-2 border-t border-zinc-200/80 dark:border-white/[0.04] text-xs">
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">Additional Event Notes</p>
                <p className="text-zinc-700 dark:text-zinc-300 mt-0.5">{data.additionalEventInfo}</p>
              </div>
            )}
          </div>
        </div>

        {/* SECTION 2: COVERAGE PRIORITIES & MUST NOT MISS */}
        <div className="space-y-3 pb-5 border-b border-zinc-200 dark:border-white/[0.06]">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-[#926004] dark:text-[#f2c300] uppercase tracking-wider flex items-center gap-1.5 font-sans">
              <span>02.</span>
              <span>Coverage Priorities & Key Moments</span>
            </h4>
            <button
              type="button"
              onClick={() => onEditStep(2)}
              className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-[#926004] dark:hover:text-[#f2c300] flex items-center gap-1 transition-colors print:hidden"
            >
              <Edit3 className="w-3 h-3" />
              <span>Edit</span>
            </button>
          </div>

          <div className="space-y-3 bg-zinc-50 dark:bg-[#141416] p-4 rounded-xl border border-zinc-200/80 dark:border-white/[0.04]">
            <div>
              <p className="text-[11px] uppercase text-zinc-500 dark:text-zinc-400 font-semibold tracking-wider mb-2">
                What to Capture
              </p>
              {data.coveragePriorities && data.coveragePriorities.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {data.coveragePriorities.map((item) => (
                    <span
                      key={item}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[#f2c300]/15 dark:bg-[#f2c300]/10 text-[#926004] dark:text-[#f2c300] border border-[#f2c300]/30 dark:border-[#f2c300]/25"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-zinc-500 dark:text-zinc-400 italic">General comprehensive coverage</p>
              )}
            </div>

            {data.mustNotMissMoments && (
              <div className="pt-2 border-t border-zinc-200/80 dark:border-white/[0.04]">
                <p className="text-[11px] uppercase text-[#926004] dark:text-[#f2c300] font-semibold tracking-wider mb-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 text-[#926004] dark:text-[#f2c300]" />
                  <span>Must-Not-Miss Moments</span>
                </p>
                <div className="text-xs text-zinc-800 dark:text-zinc-200 whitespace-pre-line bg-amber-500/[0.08] dark:bg-[#1c1c20] p-3 rounded-lg border border-amber-500/20 dark:border-white/5">
                  {data.mustNotMissMoments}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* SECTION 3: PEOPLE & SPEAKERS */}
        <div className="space-y-3 pb-5 border-b border-zinc-200 dark:border-white/[0.06]">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-[#926004] dark:text-[#f2c300] uppercase tracking-wider flex items-center gap-1.5 font-sans">
              <span>03.</span>
              <span>People & Speakers</span>
            </h4>
            <button
              type="button"
              onClick={() => onEditStep(3)}
              className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-[#926004] dark:hover:text-[#f2c300] flex items-center gap-1 transition-colors print:hidden"
            >
              <Edit3 className="w-3 h-3" />
              <span>Edit</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-zinc-50 dark:bg-[#141416] p-4 rounded-xl border border-zinc-200/80 dark:border-white/[0.04] text-xs">
            <div>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-semibold uppercase tracking-wider">Key People to Capture</p>
              <p className="text-zinc-700 dark:text-zinc-200 mt-1 whitespace-pre-line">
                {data.keyPeople || 'Standard attendees and speakers'}
              </p>
            </div>

            <div>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-semibold uppercase tracking-wider">Speaker Priority</p>
              <p className="text-zinc-900 dark:text-white font-medium mt-1">
                {data.speakerPriority || 'All speakers are equally important'}
              </p>

              <div className="mt-3 pt-2 border-t border-zinc-200/80 dark:border-white/[0.04]">
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-semibold uppercase tracking-wider">Group Photographs</p>
                <p className="text-zinc-700 dark:text-zinc-200 mt-0.5">
                  {data.hasGroupPhotos || 'Not specified'}
                  {data.hasGroupPhotos === 'Yes' && data.groupPhotoTiming && (
                    <span className="text-[#926004] dark:text-[#f2c300] ml-1">
                      (Timing: {data.groupPhotoTiming === 'Other' ? data.customGroupPhotoTiming : data.groupPhotoTiming})
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 4: VIDEO & AUDIO */}
        <div className="space-y-3 pb-5 border-b border-zinc-200 dark:border-white/[0.06]">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-[#926004] dark:text-[#f2c300] uppercase tracking-wider flex items-center gap-1.5 font-sans">
              <span>04.</span>
              <span>Video & Audio Storytelling</span>
            </h4>
            <button
              type="button"
              onClick={() => onEditStep(4)}
              className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-[#926004] dark:hover:text-[#f2c300] flex items-center gap-1 transition-colors print:hidden"
            >
              <Edit3 className="w-3 h-3" />
              <span>Edit</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-zinc-50 dark:bg-[#141416] p-4 rounded-xl border border-zinc-200/80 dark:border-white/[0.04] text-xs">
            <div>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-semibold uppercase tracking-wider mb-1.5">Video Style</p>
              {data.videoStyles && data.videoStyles.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {data.videoStyles.map((style) => (
                    <span key={style} className="px-2 py-0.5 rounded bg-zinc-200/80 dark:bg-white/5 border border-zinc-300/80 dark:border-white/10 text-zinc-800 dark:text-zinc-200">
                      {style}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-zinc-500 dark:text-zinc-400 italic">Cinematic highlights</p>
              )}
            </div>

            <div>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-semibold uppercase tracking-wider">Full Session Recording</p>
              <p className="text-zinc-900 dark:text-white font-medium mt-0.5">
                {data.fullSessionsRecording || 'Highlights only'}
              </p>
              {data.fullSessionsDetails && (
                <p className="text-zinc-600 dark:text-zinc-400 mt-1 text-[11px]">
                  Specific sessions: {data.fullSessionsDetails}
                </p>
              )}

              <div className="mt-2.5 pt-2 border-t border-zinc-200/80 dark:border-white/[0.04]">
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-semibold uppercase tracking-wider">Guest Interviews / Vox Pops</p>
                <p className="text-zinc-700 dark:text-zinc-200 mt-0.5">{data.guestInterviews || 'Not specified'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 5: PHOTOGRAPHY */}
        <div className="space-y-3 pb-5 border-b border-zinc-200 dark:border-white/[0.06]">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-[#926004] dark:text-[#f2c300] uppercase tracking-wider flex items-center gap-1.5 font-sans">
              <span>05.</span>
              <span>Photography Preferences</span>
            </h4>
            <button
              type="button"
              onClick={() => onEditStep(5)}
              className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-[#926004] dark:hover:text-[#f2c300] flex items-center gap-1 transition-colors print:hidden"
            >
              <Edit3 className="w-3 h-3" />
              <span>Edit</span>
            </button>
          </div>

          <div className="bg-zinc-50 dark:bg-[#141416] p-4 rounded-xl border border-zinc-200/80 dark:border-white/[0.04] text-xs space-y-2.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-semibold uppercase tracking-wider">Style</p>
                <p className="text-zinc-900 dark:text-white font-medium mt-0.5">{data.photoStyle || 'Combination of candid & posed'}</p>
              </div>
              <div>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-semibold uppercase tracking-wider">Requirements</p>
                <p className="text-zinc-700 dark:text-zinc-200 mt-0.5">
                  {data.photoRequirements && data.photoRequirements.length > 0
                    ? data.photoRequirements.join(', ')
                    : 'Standard requirements'}
                  {data.customPhotoRequirement && ` (${data.customPhotoRequirement})`}
                </p>
              </div>
            </div>

            {data.additionalPhotoInfo && (
              <div className="pt-2 border-t border-zinc-200/80 dark:border-white/[0.04]">
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-semibold uppercase tracking-wider">Photo Notes</p>
                <p className="text-zinc-700 dark:text-zinc-300 mt-0.5">{data.additionalPhotoInfo}</p>
              </div>
            )}
          </div>
        </div>

        {/* SECTION 6: REFERENCES & LOGISTICS */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-[#926004] dark:text-[#f2c300] uppercase tracking-wider flex items-center gap-1.5 font-sans">
              <span>06.</span>
              <span>References & Logistics</span>
            </h4>
            <button
              type="button"
              onClick={() => onEditStep(6)}
              className="text-[11px] text-zinc-500 dark:text-zinc-400 hover:text-[#926004] dark:hover:text-[#f2c300] flex items-center gap-1 transition-colors print:hidden"
            >
              <Edit3 className="w-3 h-3" />
              <span>Edit</span>
            </button>
          </div>

          <div className="bg-zinc-50 dark:bg-[#141416] p-4 rounded-xl border border-zinc-200/80 dark:border-white/[0.04] text-xs space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-semibold uppercase tracking-wider">Crew Dress Code</p>
                <p className="text-zinc-900 dark:text-white font-medium mt-0.5">
                  {data.dressCode === 'Specific dress code' || data.dressCode === 'Other'
                    ? data.customDressCode || data.dressCode
                    : data.dressCode || 'Smart / Corporate'}
                </p>
              </div>
              <div>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-semibold uppercase tracking-wider">Reference Style URL</p>
                {data.referenceUrl ? (
                  <a
                    href={data.referenceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#926004] dark:text-[#f2c300] hover:underline truncate block mt-0.5"
                  >
                    {data.referenceUrl}
                  </a>
                ) : (
                  <p className="text-zinc-500 dark:text-zinc-400 italic mt-0.5">None provided</p>
                )}
              </div>
            </div>

            {data.venueLogistics && (
              <div className="pt-2 border-t border-zinc-200/80 dark:border-white/[0.04]">
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-semibold uppercase tracking-wider">Venue Logistics & Access</p>
                <p className="text-zinc-700 dark:text-zinc-300 mt-0.5 whitespace-pre-line">{data.venueLogistics}</p>
              </div>
            )}

            {data.additionalMediaNotes && (
              <div className="pt-2 border-t border-zinc-200/80 dark:border-white/[0.04]">
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-semibold uppercase tracking-wider">Additional Media Notes</p>
                <p className="text-zinc-700 dark:text-zinc-300 mt-0.5 whitespace-pre-line">{data.additionalMediaNotes}</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer info inside brief card */}
        <div className="pt-4 border-t border-zinc-200 dark:border-white/[0.08] flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400">
          <span>RAYO Media · Melbourne, Victoria</span>
          <span>hello@rayomedia.com.au</span>
        </div>
      </div>

      {/* RAYO Philosophy Key Message Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-[#f2c300]/15 dark:from-[#f2c300]/10 via-[#f2c300]/10 dark:via-[#f2c300]/5 to-transparent border border-[#f2c300]/30 dark:border-[#f2c300]/20 flex items-start gap-3.5">
        <Sparkles className="w-5 h-5 text-[#926004] dark:text-[#f2c300] shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-semibold text-[#926004] dark:text-[#f2c300] uppercase tracking-wider mb-1 font-sans">
            The RAYO Production Principle
          </p>
          <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed italic">
            “A good brief gives your media team the information they need to prepare, while leaving them room to use their experience and creativity on the day.”
          </p>
        </div>
      </div>

      {/* Review & Export Footer Controls Bar */}
      <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-white/[0.08] flex items-center justify-between flex-wrap gap-4 print:hidden">
        {onPrev ? (
          <button
            type="button"
            id="nav-back-button"
            onClick={onPrev}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-white/[0.04] hover:bg-zinc-200 dark:hover:bg-white/[0.08] border border-zinc-200 dark:border-white/10 transition-all duration-200"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
        ) : (
          <div className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
            Step 7 of 7 · Review & Export
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2.5 ml-auto">
          <button
            type="button"
            id="copy-brief-button-footer"
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-300 dark:bg-white/[0.06] dark:hover:bg-white/[0.12] dark:text-white dark:border-white/10 transition-all duration-200 shadow-sm"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600 dark:text-green-400" />
                <span className="text-emerald-700 dark:text-green-400 font-bold">Brief Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#926004] dark:text-[#f2c300]" />
                <span>Copy Brief</span>
              </>
            )}
          </button>

          <button
            type="button"
            id="download-brief-button-footer"
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-300 dark:bg-white/[0.06] dark:hover:bg-white/[0.12] dark:text-white dark:border-white/10 transition-all duration-200 shadow-sm disabled:opacity-50"
          >
            <Download className="w-4 h-4 text-[#926004] dark:text-[#f2c300]" />
            <span>{isDownloading ? 'Generating...' : 'Download Brief'}</span>
          </button>

          <button
            type="button"
            id="send-to-rayo-button-footer"
            onClick={onSendToRayo}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-[#18181b] bg-[#f2c300] hover:bg-[#dcb000] transition-all duration-200 shadow-lg shadow-[#f2c300]/25"
          >
            <Send className="w-4 h-4" />
            <span>Send Brief to RAYO</span>
          </button>
        </div>
      </div>
    </div>
  );
};

