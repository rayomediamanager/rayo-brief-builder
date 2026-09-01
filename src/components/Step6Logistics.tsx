import React from 'react';
import { Link2, Shirt, Building, Info, MessageSquarePlus, Sparkles, Plus } from 'lucide-react';
import { EventBriefData } from '../types';
import { DRESS_CODE_OPTIONS } from '../constants/briefOptions';

interface Step6LogisticsProps {
  data: EventBriefData;
  onChange: (updates: Partial<EventBriefData>) => void;
}

const VENUE_HELPERS = [
  'Access restrictions',
  'Parking / loading dock',
  'Security & passes',
  'Restricted areas',
  'Registration requirements',
  'Special venue rules',
];

export const Step6Logistics: React.FC<Step6LogisticsProps> = ({ data, onChange }) => {
  const appendVenueHelper = (tag: string) => {
    const current = data.venueLogistics.trim();
    if (!current) {
      onChange({ venueLogistics: `${tag}: ` });
    } else if (!current.includes(tag)) {
      onChange({ venueLogistics: `${current}\n• ${tag}: ` });
    }
  };

  return (
    <div className="space-y-8">
      {/* Step Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-[#926004] dark:text-[#f2c300] uppercase tracking-wider mb-2 font-sans">
          <span>Step 06</span>
          <span>·</span>
          <span>References & Logistics</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-montserrat font-bold text-zinc-900 dark:text-white tracking-tight">
          Show us what you have in mind
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-1.5">
          Share visual inspirations, crew dress code, and essential venue logistics.
        </p>
      </div>

      {/* Helper Box */}
      <div className="p-4 rounded-xl bg-[#f2c300]/10 dark:bg-[#f2c300]/[0.06] border border-[#f2c300]/30 dark:border-[#f2c300]/20 flex items-start gap-3">
        <Info className="w-4 h-4 text-[#926004] dark:text-[#f2c300] shrink-0 mt-0.5" />
        <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
          <strong className="text-[#926004] dark:text-[#f2c300] font-semibold">References & Pacing:</strong> References don't need to be copied. They can simply show the mood, pacing, framing, lighting or type of content that caught your attention.
        </p>
      </div>

      {/* Question 1: Reference URL */}
      <div className="space-y-2">
        <label htmlFor="referenceUrl" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
          Have you seen an event video, photograph or visual style you like?
        </label>
        <div className="relative flex items-center">
          <div className="absolute left-3.5 text-zinc-400 dark:text-zinc-500 pointer-events-none">
            <Link2 className="w-4 h-4" />
          </div>
          <input
            type="url"
            id="referenceUrl"
            value={data.referenceUrl}
            onChange={(e) => onChange({ referenceUrl: e.target.value })}
            placeholder="https://vimeo.com/... or https://instagram.com/... or Google Drive link"
            className="w-full pl-10 text-sm"
          />
        </div>
      </div>

      {/* Question 2: Dress Code */}
      <div className="space-y-3 pt-1">
        <div className="flex items-center gap-2">
          <Shirt className="w-4 h-4 text-[#926004] dark:text-[#f2c300]" />
          <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
            Does your event have any dress code or presentation requirements for the media team?
          </label>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {DRESS_CODE_OPTIONS.map((code) => {
            const isSelected = data.dressCode === code;
            return (
              <button
                key={code}
                type="button"
                id={`dress-code-${code.toLowerCase().replace(/[\s/]+/g, '-')}`}
                onClick={() => onChange({ dressCode: code })}
                className={`p-3 rounded-xl text-left text-xs font-medium transition-all duration-200 border flex items-center justify-between ${
                  isSelected
                    ? 'bg-[#f2c300]/20 dark:bg-[#f2c300]/15 border-[#f2c300] text-[#926004] dark:text-[#f2c300] font-semibold ring-1 ring-[#f2c300]/40'
                    : 'bg-white dark:bg-[#1f1f23] border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-white/20 hover:bg-zinc-50 dark:hover:bg-[#25252a]'
                }`}
              >
                <span>{code}</span>
                {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-[#926004] dark:bg-[#f2c300]" />}
              </button>
            );
          })}
        </div>

        {data.dressCode === 'Specific dress code' || data.dressCode === 'Other' ? (
          <div className="mt-2">
            <input
              type="text"
              id="customDressCode"
              value={data.customDressCode || ''}
              onChange={(e) => onChange({ customDressCode: e.target.value })}
              placeholder="Specify required attire (e.g. All black crew attire, branded event t-shirt provided on arrival)..."
              className="w-full"
            />
          </div>
        ) : null}
      </div>

      {/* Question 3: Venue Logistics */}
      <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-[#1a1a1e] border border-zinc-200/80 dark:border-white/[0.08] space-y-3">
        <div className="flex items-center gap-2">
          <Building className="w-4 h-4 text-[#926004] dark:text-[#f2c300]" />
          <label htmlFor="venueLogistics" className="block text-xs font-semibold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">
            Anything the media team should know about the venue?
          </label>
        </div>

        {/* Quick Helper Badges */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-zinc-500 dark:text-zinc-400 text-[11px]">Click to insert topic:</span>
          {VENUE_HELPERS.map((helper) => (
            <button
              key={helper}
              type="button"
              onClick={() => appendVenueHelper(helper)}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-white/[0.04] hover:bg-[#f2c300]/20 hover:text-[#926004] dark:hover:bg-[#f2c300]/15 dark:hover:text-[#f2c300] text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-white/5 transition-colors text-[11px]"
            >
              <Plus className="w-2.5 h-2.5" />
              {helper}
            </button>
          ))}
        </div>

        <textarea
          id="venueLogistics"
          rows={3}
          value={data.venueLogistics}
          onChange={(e) => onChange({ venueLogistics: e.target.value })}
          placeholder="e.g. Loading dock entry is via the rear laneway. High-vis vest required during bump-in. Crew must sign in at the concierge desk on Level 1 for security lanyards."
          className="w-full text-sm"
        />
      </div>

      {/* Question 4: Additional Media Notes */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <MessageSquarePlus className="w-4 h-4 text-[#926004] dark:text-[#f2c300]" />
          <label htmlFor="additionalMediaNotes" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
            Anything else you would like your media team to know?
          </label>
        </div>
        <textarea
          id="additionalMediaNotes"
          rows={4}
          value={data.additionalMediaNotes}
          onChange={(e) => onChange({ additionalMediaNotes: e.target.value })}
          placeholder="Any extra expectations, specific brand guidelines, turnaround urgency (e.g. need 3 hero photos on the night for immediate media release), or special remarks..."
          className="w-full text-sm leading-relaxed"
        />
      </div>
    </div>
  );
};

