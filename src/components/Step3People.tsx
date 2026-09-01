import React from 'react';
import { UserCheck, Users, Mic, HelpCircle, Check, Camera } from 'lucide-react';
import { EventBriefData } from '../types';
import {
  SPEAKER_PRIORITY_OPTIONS,
  GROUP_PHOTO_OPTIONS,
  GROUP_PHOTO_TIMING_OPTIONS,
} from '../constants/briefOptions';

interface Step3PeopleProps {
  data: EventBriefData;
  onChange: (updates: Partial<EventBriefData>) => void;
}

export const Step3People: React.FC<Step3PeopleProps> = ({ data, onChange }) => {
  return (
    <div className="space-y-8">
      {/* Step Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-[#926004] dark:text-[#f2c300] uppercase tracking-wider mb-2 font-sans">
          <span>Step 03</span>
          <span>·</span>
          <span>People & Key Moments</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-montserrat font-bold text-zinc-900 dark:text-white tracking-tight">
          Who should get extra attention?
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-1.5">
          Highlight key stakeholders, speaker importance, and scheduled group photos.
        </p>
      </div>

      {/* Question 1: Key People */}
      <div className="space-y-2.5">
        <label htmlFor="keyPeople" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
          Are there particular people we should make sure to capture?
        </label>
        <div className="flex flex-wrap gap-1.5 mb-2 text-[11px] text-zinc-500 dark:text-zinc-400">
          <span className="text-zinc-500 dark:text-zinc-400">Common examples:</span>
          {['CEO / Founder', 'Keynote Speakers', 'Guest of Honour', 'Major Sponsors', 'Award Recipients', 'Performers'].map((ex) => (
            <span key={ex} className="bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 px-2 py-0.5 rounded text-zinc-700 dark:text-zinc-300 font-medium">
              {ex}
            </span>
          ))}
        </div>
        <textarea
          id="keyPeople"
          rows={3}
          value={data.keyPeople}
          onChange={(e) => onChange({ keyPeople: e.target.value })}
          placeholder="e.g. Jane Doe (Keynote Speaker), John Smith (Managing Director), Founding Board Members, and our Lead Sponsor team from NAB."
          className="w-full text-sm"
        />
      </div>

      {/* Question 2: Speaker Prioritisation */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center gap-2">
          <Mic className="w-4 h-4 text-[#926004] dark:text-[#f2c300]" />
          <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
            How should speaker coverage be prioritised?
          </label>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SPEAKER_PRIORITY_OPTIONS.map((opt) => {
            const isSelected = data.speakerPriority === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                id={`speaker-priority-${opt.value.toLowerCase().replace(/[\s/]+/g, '-')}`}
                onClick={() => onChange({ speakerPriority: opt.value })}
                className={`p-3.5 rounded-xl text-left transition-all duration-200 border flex items-start justify-between gap-3 ${
                  isSelected
                    ? 'bg-[#f2c300]/20 dark:bg-[#f2c300]/15 border-[#f2c300] text-zinc-900 dark:text-white ring-1 ring-[#f2c300]/40'
                    : 'bg-white dark:bg-[#1f1f23] border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-white/20 hover:bg-zinc-50 dark:hover:bg-[#25252a]'
                }`}
              >
                <div>
                  <p className={`text-sm font-semibold ${isSelected ? 'text-[#926004] dark:text-[#f2c300]' : 'text-zinc-800 dark:text-zinc-200'}`}>
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
      </div>

      {/* Question 3: Group Photographs */}
      <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-[#1a1a1e] border border-zinc-200/80 dark:border-white/[0.08] space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Camera className="w-4 h-4 text-[#926004] dark:text-[#f2c300]" />
            <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">
              Are there any planned group or team photographs?
            </span>
          </div>

          <div className="flex items-center gap-2">
            {GROUP_PHOTO_OPTIONS.map((opt) => {
              const isSelected = data.hasGroupPhotos === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  id={`group-photo-${opt.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => onChange({ hasGroupPhotos: opt })}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
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

        {/* Conditional: Best Opportunity if Yes */}
        {data.hasGroupPhotos === 'Yes' && (
          <div className="pt-3 border-t border-zinc-200 dark:border-white/[0.06] animate-in fade-in slide-in-from-top-2 duration-300 space-y-3">
            <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">
              When would be the best opportunity for group photos?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {GROUP_PHOTO_TIMING_OPTIONS.map((timing) => {
                const isSelected = data.groupPhotoTiming === timing;
                return (
                  <button
                    key={timing}
                    type="button"
                    id={`photo-timing-${timing.toLowerCase().replace(/[\s/]+/g, '-')}`}
                    onClick={() => onChange({ groupPhotoTiming: timing })}
                    className={`px-3 py-2 rounded-xl text-xs font-medium text-center transition-all border ${
                      isSelected
                        ? 'bg-[#f2c300]/20 dark:bg-[#f2c300]/15 border-[#f2c300] text-[#926004] dark:text-[#f2c300] font-semibold'
                        : 'bg-white dark:bg-[#1f1f23] border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-[#25252a]'
                    }`}
                  >
                    {timing}
                  </button>
                );
              })}
            </div>

            {data.groupPhotoTiming === 'Other' && (
              <div className="mt-2">
                <input
                  type="text"
                  id="customGroupPhotoTiming"
                  value={data.customGroupPhotoTiming || ''}
                  onChange={(e) => onChange({ customGroupPhotoTiming: e.target.value })}
                  placeholder="e.g. Immediately following the afternoon tea break outside on the grand staircase..."
                  className="w-full"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

