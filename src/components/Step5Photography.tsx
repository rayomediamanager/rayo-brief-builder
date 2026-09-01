import React from 'react';
import { Camera, SunMedium, Check, Info, Sparkles } from 'lucide-react';
import { EventBriefData } from '../types';
import { PHOTO_STYLE_OPTIONS, PHOTO_REQUIREMENTS_OPTIONS } from '../constants/briefOptions';

interface Step5PhotographyProps {
  data: EventBriefData;
  onChange: (updates: Partial<EventBriefData>) => void;
}

export const Step5Photography: React.FC<Step5PhotographyProps> = ({ data, onChange }) => {
  const toggleRequirement = (label: string) => {
    const current = data.photoRequirements || [];
    if (current.includes(label)) {
      onChange({ photoRequirements: current.filter((item) => item !== label) });
    } else {
      onChange({ photoRequirements: [...current, label] });
    }
  };

  return (
    <div className="space-y-8">
      {/* Step Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-[#926004] dark:text-[#f2c300] uppercase tracking-wider mb-2 font-sans">
          <span>Step 05</span>
          <span>·</span>
          <span>Photography</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-montserrat font-bold text-zinc-900 dark:text-white tracking-tight">
          Photography preferences
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-1.5">
          Define the photographic aesthetic, lighting flexibility, and essential shot requirements.
        </p>
      </div>

      {/* Helper Box */}
      <div className="p-4 rounded-xl bg-[#f2c300]/10 dark:bg-[#f2c300]/[0.06] border border-[#f2c300]/30 dark:border-[#f2c300]/20 flex items-start gap-3">
        <Info className="w-4 h-4 text-[#926004] dark:text-[#f2c300] shrink-0 mt-0.5" />
        <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
          <strong className="text-[#926004] dark:text-[#f2c300] font-semibold">Why this matters:</strong> Some venues and events have particular lighting or presentation requirements. A little information beforehand helps the photographer arrive prepared with suitable flash diffusers, fast prime lenses and low-light sensors.
        </p>
      </div>

      {/* Question 1: Photography Style */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Camera className="w-4 h-4 text-[#926004] dark:text-[#f2c300]" />
          <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
            What photography style best suits your event?
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {PHOTO_STYLE_OPTIONS.map((style) => {
            const isSelected = data.photoStyle === style.value;
            return (
              <button
                key={style.value}
                type="button"
                id={`photo-style-${style.value.toLowerCase().replace(/[\s/]+/g, '-')}`}
                onClick={() => onChange({ photoStyle: style.value })}
                className={`p-3.5 rounded-xl text-left transition-all duration-200 border flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#f2c300]/20 dark:bg-[#f2c300]/15 border-[#f2c300] text-zinc-900 dark:text-white ring-1 ring-[#f2c300]/40'
                    : 'bg-white dark:bg-[#1f1f23] border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-white/20 hover:bg-zinc-50 dark:hover:bg-[#25252a]'
                }`}
              >
                <div>
                  <p className={`text-sm font-semibold ${isSelected ? 'text-[#926004] dark:text-[#f2c300]' : 'text-zinc-800 dark:text-zinc-200'}`}>
                    {style.label}
                  </p>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2">{style.desc}</p>
                </div>
                <div className="mt-3 flex justify-end">
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                      isSelected ? 'border-[#f2c300] bg-[#f2c300]' : 'border-zinc-300 dark:border-white/30'
                    }`}
                  >
                    {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-[#18181b]" />}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Question 2: Photography Requirements */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <SunMedium className="w-4 h-4 text-[#926004] dark:text-[#f2c300]" />
          <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
            Are there any photography requirements we should know about? <span className="text-zinc-500 dark:text-zinc-400 font-normal normal-case">(Select multiple)</span>
          </label>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {PHOTO_REQUIREMENTS_OPTIONS.map((req) => {
            const isSelected = data.photoRequirements.includes(req);
            return (
              <button
                key={req}
                type="button"
                id={`photo-req-${req.toLowerCase().replace(/[\s/]+/g, '-')}`}
                onClick={() => toggleRequirement(req)}
                className={`p-3 rounded-xl text-left transition-all duration-200 border flex items-center justify-between text-xs font-medium ${
                  isSelected
                    ? 'bg-[#f2c300]/20 dark:bg-[#f2c300]/15 border-[#f2c300] text-[#926004] dark:text-[#f2c300] font-semibold ring-1 ring-[#f2c300]/30'
                    : 'bg-white dark:bg-[#1f1f23] border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-white/20 hover:bg-zinc-50 dark:hover:bg-[#25252a]'
                }`}
              >
                <span>{req}</span>
                <div
                  className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border ${
                    isSelected ? 'bg-[#f2c300] border-[#f2c300] text-[#18181b]' : 'border-zinc-300 dark:border-white/20 text-transparent'
                  }`}
                >
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
              </button>
            );
          })}
        </div>

        {data.photoRequirements.includes('Other') && (
          <div className="mt-3">
            <input
              type="text"
              id="customPhotoRequirement"
              value={data.customPhotoRequirement || ''}
              onChange={(e) => onChange({ customPhotoRequirement: e.target.value })}
              placeholder="Specify other photography requirement (e.g. Media wall step-and-repeat backdrop, low-light moody dinner)..."
              className="w-full"
            />
          </div>
        )}
      </div>

      {/* Question 3: Anything else for photographer */}
      <div>
        <label htmlFor="additionalPhotoInfo" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-2">
          Anything else your photographer should know?
        </label>
        <textarea
          id="additionalPhotoInfo"
          rows={3}
          value={data.additionalPhotoInfo}
          onChange={(e) => onChange({ additionalPhotoInfo: e.target.value })}
          placeholder="e.g. We have sponsor media banners at registration that need clean straight-on hero photos. Also, please avoid taking photos of guests during the seated dinner main course."
          className="w-full text-sm"
        />
      </div>
    </div>
  );
};

