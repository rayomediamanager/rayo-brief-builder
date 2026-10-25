import React, { useState } from 'react';
import {
  Sparkles,
  Wand2,
  AlertCircle,
  CheckCircle2,
  Loader2,
  ChevronDown,
  ChevronUp,
  X,
  FileText,
  ArrowRight,
} from 'lucide-react';
import { EventBriefData } from '../types';

interface BriefWizardProps {
  onPopulate: (extractedData: Partial<EventBriefData>, count: number) => void;
  goToStep: (stepNumber: number) => void;
}

const FIELD_LABELS: Record<string, string> = {
  eventName: 'Event Name',
  organisation: 'Organisation',
  eventType: 'Event Type',
  eventDate: 'Date',
  venue: 'Venue',
  approxGuests: 'Guest Count',
  guestArrivalTime: 'Guest Arrival',
  eventStartTime: 'Start Time',
  eventFinishTime: 'Finish Time',
  additionalEventInfo: 'Schedule Notes',
  coveragePriorities: 'Coverage Priorities',
  mustNotMissMoments: 'Must-Capture Moments',
  keyPeople: 'Key People / VIPs',
  speakerPriority: 'Speaker Priority',
  hasGroupPhotos: 'Group Photos',
  groupPhotoTiming: 'Group Photo Timing',
  videoStyles: 'Video Styles',
  fullSessionsRecording: 'Session Recording',
  fullSessionsDetails: 'Recording Details',
  guestInterviews: 'Guest Interviews',
  photoStyle: 'Photo Style',
  photoRequirements: 'Photo Requirements',
  additionalPhotoInfo: 'Photo Details',
  referenceUrl: 'Reference Link',
  dressCode: 'Dress Code',
  venueLogistics: 'Venue Logistics',
  additionalMediaNotes: 'Media Notes',
};

const MAX_CHARS = 4000;

export const BriefWizard: React.FC<BriefWizardProps> = ({
  onPopulate,
  goToStep,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [rawText, setRawText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successInfo, setSuccessInfo] = useState<{
    count: number;
    fields: string[];
    message?: string;
  } | null>(null);

  const handleGenerate = async () => {
    const textToProcess = rawText.trim();
    if (!textToProcess) {
      setErrorMessage(
        'Please paste your event description, run sheet, or notes before generating.',
      );
      setSuccessInfo(null);
      return;
    }

    if (textToProcess.length < 10) {
      setErrorMessage(
        'Please provide a bit more detail (e.g. event name, date, venue, or timing) so the AI can extract your brief.',
      );
      setSuccessInfo(null);
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    setSuccessInfo(null);

    try {
      const response = await fetch('/api/generate-brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rawText: textToProcess.slice(0, MAX_CHARS) }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || 'Unable to generate brief with AI at this time.',
        );
      }

      if (!data.hasRelevantEventInfo) {
        setErrorMessage(
          data.message ||
            'We could not find identifiable event details in the text. Please ensure your notes include details like the event name, date, location, or schedule.',
        );
        return;
      }

      // Collect only supported, non-empty fields
      const updates: Partial<EventBriefData> = {};
      const populatedFieldKeys: string[] = [];

      Object.entries(FIELD_LABELS).forEach(([key, _label]) => {
        const val = data[key];
        if (Array.isArray(val) && val.length > 0) {
          (updates as any)[key] = val;
          populatedFieldKeys.push(key);
        } else if (typeof val === 'string' && val.trim() !== '') {
          (updates as any)[key] = val.trim();
          populatedFieldKeys.push(key);
        }
      });

      if (populatedFieldKeys.length === 0) {
        setErrorMessage(
          'No matching event fields could be identified from the supplied text. Please try pasting more specific event notes or fill the form manually.',
        );
        return;
      }

      // Populate only supported fields into existing form
      onPopulate(updates, populatedFieldKeys.length);

      setSuccessInfo({
        count: populatedFieldKeys.length,
        fields: populatedFieldKeys.map((k) => FIELD_LABELS[k] || k),
        message: data.message,
      });
    } catch (err: any) {
      console.error('Brief Wizard Generation Error:', err);
      setErrorMessage(
        err.message ||
          'Failed to connect to the Brief Wizard. Please try again or complete your brief manually.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setRawText('');
    setErrorMessage(null);
    setSuccessInfo(null);
  };

  return (
    <div className="mb-8 rounded-2xl border border-amber-300/40 dark:border-[#f2c300]/25 bg-gradient-to-br from-amber-50/70 via-white to-amber-50/40 dark:from-[#1d1d22] dark:via-[#18181c] dark:to-[#151518] p-5 sm:p-6 shadow-lg shadow-amber-500/5 transition-all">
      {/* Header bar of the wizard */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#f2c300]/20 dark:bg-[#f2c300]/15 border border-[#f2c300]/30 flex items-center justify-center text-[#926004] dark:text-[#f2c300] shrink-0">
            <Wand2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-montserrat font-bold text-zinc-900 dark:text-white text-base sm:text-lg">
                Brief Wizard
              </h2>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#f2c300]/20 text-[#926004] dark:text-[#f2c300] border border-[#f2c300]/30 uppercase tracking-wider">
                <Sparkles className="w-3 h-3" />
                AI Assist
              </span>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">
              Paste raw event notes, an email, or a run sheet to automatically populate the brief fields.
            </p>
          </div>
        </div>

        {/* Collapse / Expand Toggle */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors"
          title={isOpen ? 'Collapse Brief Wizard' : 'Expand Brief Wizard'}
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Expandable Content Area */}
      {isOpen && (
        <div className="mt-4 pt-4 border-t border-amber-200/50 dark:border-white/[0.06] space-y-4">
          <div>
            <label
              htmlFor="raw-event-input"
              className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5"
            >
              Paste Your Event Notes or Overview
            </label>
            <div className="relative">
              <textarea
                id="raw-event-input"
                rows={4}
                value={rawText}
                onChange={(e) => {
                  setRawText(e.target.value);
                  if (errorMessage) setErrorMessage(null);
                }}
                disabled={isLoading}
                maxLength={MAX_CHARS}
                placeholder="Example: Melbourne Tech & Innovation Summit 2026 by Apex Global on 15 Oct at MCEC Sovereign Room. 350 guests from 8:30am arrival, starts at 9am, finishes at 5:30pm with networking drinks afterwards. We need keynote speeches, panels, and guest candid interactions covered. Prefer 1 videographer for a cinematic recap with soundbites, and 1 photographer for candid shots plus VIP group photos..."
                className="w-full rounded-xl bg-white dark:bg-[#121214] border border-zinc-200 dark:border-white/10 p-3.5 text-xs text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#f2c300]/50 transition-all resize-y disabled:opacity-50"
              />
              <div className="absolute bottom-2.5 right-3 text-[10px] text-zinc-400 select-none">
                {rawText.length}/{MAX_CHARS}
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="text-[11px] text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-zinc-400" />
              <span>
                Leaves unknown fields empty so you can fill or edit them manually.
              </span>
            </div>

            <div className="flex items-center gap-2.5 ml-auto">
              {rawText && !isLoading && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="px-3 py-2 text-xs font-medium text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
                >
                  Clear
                </button>
              )}

              <button
                type="button"
                id="generate-brief-button"
                onClick={handleGenerate}
                disabled={isLoading || !rawText.trim()}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-[#18181b] bg-[#f2c300] hover:bg-[#dcb000] transition-all duration-200 shadow-md shadow-[#f2c300]/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Extracting Brief Details...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Brief</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Error Message Display */}
          {errorMessage && (
            <div
              role="alert"
              className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-700 dark:text-red-400 flex items-start gap-2.5 animate-in fade-in duration-200"
            >
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold">Unable to Populate Brief</p>
                <p className="mt-0.5 leading-relaxed">{errorMessage}</p>
              </div>
              <button
                type="button"
                onClick={() => setErrorMessage(null)}
                className="text-red-400 hover:text-red-600 dark:hover:text-red-200 p-0.5"
                title="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Success Summary Display */}
          {successInfo && (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-800 dark:text-emerald-300 space-y-2.5 animate-in fade-in duration-200">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <p className="font-bold text-sm">
                    Brief Populated! ({successInfo.count} fields extracted)
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => goToStep(1)}
                  className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 hover:underline"
                >
                  <span>Review Step 1</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {successInfo.message && (
                <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
                  {successInfo.message}
                </p>
              )}

              <div>
                <p className="text-[10px] uppercase tracking-wider font-semibold text-zinc-500 dark:text-zinc-400 mb-1.5">
                  Extracted into your brief:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {successInfo.fields.map((field, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-white/70 dark:bg-white/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-200 text-[11px] font-medium"
                    >
                      {field}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 pt-1">
                You can now freely review, fine-tune, or add missing details across any of the 7 steps below.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
