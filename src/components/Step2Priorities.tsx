import React from 'react';
import { Check, Info, AlertCircle, Sparkles } from 'lucide-react';
import { EventBriefData } from '../types';
import { COVERAGE_PRIORITIES } from '../constants/briefOptions';

interface Step2PrioritiesProps {
  data: EventBriefData;
  onChange: (updates: Partial<EventBriefData>) => void;
}

export const Step2Priorities: React.FC<Step2PrioritiesProps> = ({ data, onChange }) => {
  const togglePriority = (label: string) => {
    const current = data.coveragePriorities || [];
    if (current.includes(label)) {
      onChange({ coveragePriorities: current.filter((item) => item !== label) });
    } else {
      onChange({ coveragePriorities: [...current, label] });
    }
  };

  const selectAllCommon = () => {
    const common = [
      'Keynote speakers',
      'Presentations',
      'Panels',
      'Networking',
      'Guest interactions',
      'Candid moments',
      'Branding and venue details',
      'Sponsors',
    ];
    onChange({ coveragePriorities: Array.from(new Set([...(data.coveragePriorities || []), ...common])) });
  };

  return (
    <div className="space-y-8">
      {/* Step Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-[#926004] dark:text-[#f2c300] uppercase tracking-wider mb-2 font-sans">
          <span>Step 02</span>
          <span>·</span>
          <span>Coverage Priorities</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-montserrat font-bold text-zinc-900 dark:text-white tracking-tight">
          What should we make sure to capture?
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-1.5">
          Select the focal areas that align with your event goals and final content use.
        </p>
      </div>

      {/* Helper Box */}
      <div className="p-4 rounded-xl bg-[#f2c300]/10 dark:bg-[#f2c300]/[0.06] border border-[#f2c300]/30 dark:border-[#f2c300]/20 flex items-start gap-3">
        <Info className="w-4 h-4 text-[#926004] dark:text-[#f2c300] shrink-0 mt-0.5" />
        <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
          <strong className="text-[#926004] dark:text-[#f2c300] font-semibold">Why this matters:</strong> Your photographer and videographer will work intuitively throughout the event, but knowing your priorities helps them make sure the important moments receive the attention they deserve.
        </p>
      </div>

      {/* Multi-Select Priorities Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
            Coverage Priorities <span className="text-zinc-500 dark:text-zinc-400 font-normal normal-case">(Select multiple)</span>
          </label>
          <button
            type="button"
            onClick={selectAllCommon}
            className="text-[11px] text-[#926004] dark:text-[#f2c300] hover:underline font-semibold"
          >
            Select standard conference mix
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {COVERAGE_PRIORITIES.map((priority) => {
            const isSelected = data.coveragePriorities.includes(priority.label);
            return (
              <button
                key={priority.id}
                type="button"
                id={`priority-${priority.id}`}
                onClick={() => togglePriority(priority.label)}
                className={`p-3.5 rounded-xl text-left transition-all duration-200 border flex flex-col justify-between group relative ${
                  isSelected
                    ? 'bg-[#f2c300]/20 dark:bg-[#f2c300]/10 border-[#f2c300] text-zinc-900 dark:text-white ring-1 ring-[#f2c300]/40'
                    : 'bg-white dark:bg-[#1f1f23] border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-white/20 hover:bg-zinc-50 dark:hover:bg-[#25252a]'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className={`text-sm font-semibold tracking-tight ${isSelected ? 'text-[#926004] dark:text-[#f2c300]' : 'text-zinc-800 dark:text-zinc-200'}`}>
                    {priority.label}
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
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-1">
                  {priority.desc}
                </p>
              </button>
            );
          })}
        </div>

        {/* Conditional custom priority if 'Other' selected */}
        {data.coveragePriorities.includes('Other') && (
          <div className="mt-4">
            <label htmlFor="customPriority" className="block text-xs text-zinc-700 dark:text-zinc-300 mb-1.5 font-medium">
              Specify other coverage priority:
            </label>
            <input
              type="text"
              id="customPriority"
              value={data.customPriority || ''}
              onChange={(e) => onChange({ customPriority: e.target.value })}
              placeholder="e.g. VIP sponsor dinner, live art activation, fireworks finale..."
              className="w-full"
            />
          </div>
        )}
      </div>

      {/* Must Not Miss Moments - Large Text Area */}
      <div className="pt-2">
        <div className="flex items-center gap-2 mb-2">
          <AlertCircle className="w-4 h-4 text-[#926004] dark:text-[#f2c300]" />
          <label htmlFor="mustNotMissMoments" className="block text-xs font-semibold text-zinc-800 dark:text-zinc-200 uppercase tracking-wider">
            What moments are a MUST NOT MISS?
          </label>
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2.5">
          Tell us about timed climaxes, stage actions, or spontaneous moments you strictly need documented.
        </p>
        <textarea
          id="mustNotMissMoments"
          rows={5}
          value={data.mustNotMissMoments}
          onChange={(e) => onChange({ mustNotMissMoments: e.target.value })}
          placeholder="e.g. 
• 09:30 AM: CEO entrance & surprise product unveiling
• 01:15 PM: Award presentation to founding members
• 04:00 PM: Large group toast & stage balloon drop"
          className="w-full font-sans text-sm leading-relaxed"
        />
      </div>
    </div>
  );
};

