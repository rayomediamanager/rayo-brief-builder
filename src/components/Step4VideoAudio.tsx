import React from 'react';
import { Video, Mic, Volume2, Info, Check, Sparkles } from 'lucide-react';
import { EventBriefData } from '../types';
import {
  VIDEO_STYLE_OPTIONS,
  FULL_SESSION_RECORDING_OPTIONS,
  GUEST_INTERVIEW_OPTIONS,
} from '../constants/briefOptions';

interface Step4VideoAudioProps {
  data: EventBriefData;
  onChange: (updates: Partial<EventBriefData>) => void;
}

export const Step4VideoAudio: React.FC<Step4VideoAudioProps> = ({ data, onChange }) => {
  const toggleVideoStyle = (label: string) => {
    const current = data.videoStyles || [];
    if (label === 'Not sure yet') {
      if (current.includes('Not sure yet')) {
        onChange({ videoStyles: [] });
      } else {
        onChange({ videoStyles: ['Not sure yet'] });
      }
      return;
    }

    const filtered = current.filter((item) => item !== 'Not sure yet');
    if (filtered.includes(label)) {
      onChange({ videoStyles: filtered.filter((item) => item !== label) });
    } else {
      onChange({ videoStyles: [...filtered, label] });
    }
  };

  const isFullRecordingRequired =
    data.fullSessionsRecording === 'Yes, selected sessions' ||
    data.fullSessionsRecording === 'Yes, full-session recording';

  return (
    <div className="space-y-8">
      {/* Step Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-[#926004] dark:text-[#f2c300] uppercase tracking-wider mb-2 font-sans">
          <span>Step 04</span>
          <span>·</span>
          <span>Video & Audio</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-montserrat font-bold text-zinc-900 dark:text-white tracking-tight">
          Beyond the highlight reel
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300 text-sm mt-2 leading-relaxed bg-zinc-100/80 dark:bg-[#1b1b1f] p-4 rounded-xl border border-zinc-200/80 dark:border-white/[0.06]">
          “Think about how you would like your event story to be told. You don't need to know the technical details. Just tell us what you want the final content to achieve.”
        </p>
      </div>

      {/* Helper Box */}
      <div className="p-4 rounded-xl bg-[#f2c300]/10 dark:bg-[#f2c300]/[0.06] border border-[#f2c300]/30 dark:border-[#f2c300]/20 flex items-start gap-3">
        <Info className="w-4 h-4 text-[#926004] dark:text-[#f2c300] shrink-0 mt-0.5" />
        <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
          <strong className="text-[#926004] dark:text-[#f2c300] font-semibold">Why this matters:</strong> If recorded speeches, interviews or important audio are required, letting the videographer know in advance gives them time to prepare the appropriate audio wireless transmitters, microphones and camera rigs.
        </p>
      </div>

      {/* Question 1: Video Styles */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Video className="w-4 h-4 text-[#926004] dark:text-[#f2c300]" />
          <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
            What style of event video are you considering? <span className="text-zinc-500 dark:text-zinc-400 font-normal normal-case">(Select multiple)</span>
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {VIDEO_STYLE_OPTIONS.map((style) => {
            const isSelected = data.videoStyles.includes(style.label);
            return (
              <button
                key={style.id}
                type="button"
                id={`video-style-${style.id}`}
                onClick={() => toggleVideoStyle(style.label)}
                className={`p-3.5 rounded-xl text-left transition-all duration-200 border flex flex-col justify-between group ${
                  isSelected
                    ? 'bg-[#f2c300]/20 dark:bg-[#f2c300]/15 border-[#f2c300] text-zinc-900 dark:text-white ring-1 ring-[#f2c300]/40'
                    : 'bg-white dark:bg-[#1f1f23] border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-white/20 hover:bg-zinc-50 dark:hover:bg-[#25252a]'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className={`text-sm font-semibold ${isSelected ? 'text-[#926004] dark:text-[#f2c300]' : 'text-zinc-800 dark:text-zinc-200'}`}>
                    {style.label}
                  </span>
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-colors border ${
                      isSelected
                        ? 'bg-[#f2c300] border-[#f2c300] text-[#18181b]'
                        : 'border-zinc-300 dark:border-white/20 bg-zinc-100 dark:bg-black/20 text-transparent group-hover:border-zinc-400 dark:group-hover:border-white/40'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                </div>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2">
                  {style.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Question 2: Full Sessions Recording */}
      <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-[#1a1a1e] border border-zinc-200/80 dark:border-white/[0.08] space-y-4">
        <div className="flex items-center gap-2">
          <Mic className="w-4 h-4 text-[#926004] dark:text-[#f2c300]" />
          <label className="block text-xs font-semibold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">
            Do you need any speeches, presentations or panels recorded in full?
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {FULL_SESSION_RECORDING_OPTIONS.map((opt) => {
            const isSelected = data.fullSessionsRecording === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                id={`session-rec-${opt.value.toLowerCase().replace(/[\s,]+/g, '-')}`}
                onClick={() => onChange({ fullSessionsRecording: opt.value })}
                className={`p-3 rounded-xl text-left transition-all duration-200 border flex items-start justify-between gap-2 ${
                  isSelected
                    ? 'bg-[#f2c300]/20 dark:bg-[#f2c300]/15 border-[#f2c300] text-zinc-900 dark:text-white ring-1 ring-[#f2c300]/40'
                    : 'bg-white dark:bg-[#1f1f23] border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-white/20 hover:bg-zinc-50 dark:hover:bg-[#25252a]'
                }`}
              >
                <div>
                  <p className={`text-xs font-semibold ${isSelected ? 'text-[#926004] dark:text-[#f2c300]' : 'text-zinc-800 dark:text-zinc-200'}`}>
                    {opt.label}
                  </p>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">{opt.desc}</p>
                </div>
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                    isSelected ? 'border-[#f2c300] bg-[#f2c300]' : 'border-zinc-300 dark:border-white/30'
                  }`}
                >
                  {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-[#18181b]" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Conditional text area if sessions are required */}
        {isFullRecordingRequired && (
          <div className="pt-3 border-t border-zinc-200 dark:border-white/[0.06] animate-in fade-in slide-in-from-top-2 duration-300 space-y-2">
            <label htmlFor="fullSessionsDetails" className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">
              Which sessions or speakers should be recorded in full?
            </label>
            <textarea
              id="fullSessionsDetails"
              rows={2}
              value={data.fullSessionsDetails}
              onChange={(e) => onChange({ fullSessionsDetails: e.target.value })}
              placeholder="e.g. The 09:30 keynote by Marcus Vance and the 14:00 Women in Tech panel discussion in Room 2."
              className="w-full text-sm"
            />
          </div>
        )}
      </div>

      {/* Question 3: Guest Interviews / Vox Pops */}
      <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-[#1a1a1e] border border-zinc-200/80 dark:border-white/[0.08] flex items-center justify-between flex-wrap gap-4">
        <div>
          <span className="block text-xs font-semibold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">
            Would you like quick guest reactions or short interviews?
          </span>
          <span className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 block">
            Casual vox pops or quick testimonials from attendees and VIPs during mingling
          </span>
        </div>

        <div className="flex items-center gap-2">
          {GUEST_INTERVIEW_OPTIONS.map((opt) => {
            const isSelected = data.guestInterviews === opt;
            return (
              <button
                key={opt}
                type="button"
                id={`interview-opt-${opt.toLowerCase()}`}
                onClick={() => onChange({ guestInterviews: opt })}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
                  isSelected
                    ? 'bg-[#f2c300] border-[#f2c300] text-[#18181b] shadow-sm'
                    : 'bg-white dark:bg-[#1f1f23] border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-[#25252a]'
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

