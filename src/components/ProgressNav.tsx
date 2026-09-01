import React from 'react';
import { Check } from 'lucide-react';
import { STEPS } from '../constants/briefOptions';

interface ProgressNavProps {
  currentStep: number;
  onStepSelect: (stepNumber: number) => void;
  completedSteps: number[];
}

export const ProgressNav: React.FC<ProgressNavProps> = ({
  currentStep,
  onStepSelect,
  completedSteps,
}) => {
  const currentStepData = STEPS[currentStep - 1] || STEPS[0];
  const progressPercent = Math.round((currentStep / STEPS.length) * 100);

  return (
    <div className="w-full bg-zinc-50 dark:bg-[#18181c] border-b border-zinc-200/80 dark:border-white/[0.06] py-4 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-4xl mx-auto">
        {/* Top summary row: Step counter & estimated time */}
        <div className="flex items-center justify-between mb-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#926004] dark:text-[#f2c300] bg-[#f2c300]/20 dark:bg-[#f2c300]/10 px-2.5 py-0.5 rounded-lg border border-[#f2c300]/30 dark:border-[#f2c300]/20 tracking-wide text-xs">
              Step {currentStep} of {STEPS.length}
            </span>
            <span className="text-zinc-600 dark:text-zinc-400 font-medium hidden sm:inline">
              — {currentStepData.shortTitle}
            </span>
          </div>
          <span className="text-zinc-500 dark:text-zinc-400 text-[11px] font-medium tracking-wide">
            {progressPercent}% Complete · 3–5 min brief
          </span>
        </div>

        {/* Progress Bar Line */}
        <div className="w-full h-1.5 bg-zinc-200 dark:bg-white/[0.06] rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-[#f2c300] transition-all duration-300 ease-out rounded-full shadow-[0_0_12px_rgba(242,195,0,0.5)]"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Stepper Navigation Pills */}
        <nav aria-label="Brief steps" className="flex items-center justify-between gap-1 sm:gap-2 overflow-x-auto pb-1 custom-scrollbar">
          {STEPS.map((step) => {
            const isActive = step.number === currentStep;
            const isCompleted = completedSteps.includes(step.number) && step.number < currentStep;
            const isSelectable = true; // User is free to navigate backwards and forwards without losing info

            return (
              <button
                key={step.id}
                type="button"
                id={`step-nav-button-${step.number}`}
                onClick={() => isSelectable && onStepSelect(step.number)}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 shrink-0 select-none ${
                  isActive
                    ? 'bg-[#f2c300] text-[#18181b] font-bold shadow-md shadow-[#f2c300]/20'
                    : isCompleted
                    ? 'bg-zinc-100 dark:bg-white/[0.04] text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200/70 dark:hover:bg-white/[0.08] hover:text-zinc-900 dark:hover:text-white border border-zinc-200 dark:border-white/5'
                    : 'bg-transparent text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-100/50 dark:hover:bg-white/[0.02]'
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-sans font-bold ${
                    isActive
                      ? 'bg-[#18181b] text-[#f2c300]'
                      : isCompleted
                      ? 'bg-[#f2c300]/30 text-[#926004] dark:text-[#f2c300]'
                      : 'bg-zinc-200 dark:bg-white/10 text-zinc-500 dark:text-zinc-400'
                  }`}
                >
                  {isCompleted ? <Check className="w-2.5 h-2.5 stroke-[3]" /> : step.number}
                </span>
                <span className="hidden md:inline whitespace-nowrap">
                  {step.shortTitle}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

