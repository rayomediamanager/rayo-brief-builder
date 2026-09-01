import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  RotateCcw,
  Send,
  Eye,
  CheckCircle2,
} from 'lucide-react';
import { EventBriefData, INITIAL_BRIEF, SAMPLE_DEMO_BRIEF } from './types';
import { STEPS } from './constants/briefOptions';
import { Header } from './components/Header';
import { ProgressNav } from './components/ProgressNav';
import { Step1Basics } from './components/Step1Basics';
import { Step2Priorities } from './components/Step2Priorities';
import { Step3People } from './components/Step3People';
import { Step4VideoAudio } from './components/Step4VideoAudio';
import { Step5Photography } from './components/Step5Photography';
import { Step6Logistics } from './components/Step6Logistics';
import { Step7Review } from './components/Step7Review';
import { ResetModal } from './components/ResetModal';
import { SendToRayoModal } from './components/SendToRayoModal';

const LOCAL_STORAGE_KEY = 'rayo_event_brief_builder_data_v1';

export function App() {
  // Load saved state or default
  const [briefData, setBriefData] = useState<EventBriefData>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        return { ...INITIAL_BRIEF, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('Failed to load brief from local storage', e);
    }
    return INITIAL_BRIEF;
  });

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([1]);
  const [isResetModalOpen, setIsResetModalOpen] = useState<boolean>(false);
  const [isSendModalOpen, setIsSendModalOpen] = useState<boolean>(false);
  const [isSampleLoaded, setIsSampleLoaded] = useState<boolean>(false);

  // Auto-save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(briefData));
    } catch (e) {
      console.warn('Failed to save to localStorage', e);
    }
  }, [briefData]);

  // Update brief data helper
  const handleUpdate = (updates: Partial<EventBriefData>) => {
    setBriefData((prev) => ({ ...prev, ...updates }));
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps((prev) => [...prev, currentStep]);
    }
  };

  // Step navigation
  const goToStep = (stepNumber: number) => {
    if (stepNumber >= 1 && stepNumber <= STEPS.length) {
      setCurrentStep(stepNumber);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps((prev) => [...prev, currentStep]);
      }
      goToStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      goToStep(currentStep - 1);
    }
  };

  // Reset brief handler
  const handleResetConfirm = () => {
    setBriefData(INITIAL_BRIEF);
    setCompletedSteps([1]);
    setCurrentStep(1);
    setIsSampleLoaded(false);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (e) {
      // ignore
    }
  };

  // Load sample brief handler
  const handleLoadSample = () => {
    setBriefData(SAMPLE_DEMO_BRIEF);
    setCompletedSteps([1, 2, 3, 4, 5, 6, 7]);
    setIsSampleLoaded(true);
  };

  const currentStepMeta = STEPS[currentStep - 1];

  return (
    <div className="min-h-screen flex flex-col bg-[#fbfbfa] dark:bg-[#141416] text-zinc-900 dark:text-[#f4f4f5] font-sans selection:bg-[#f2c300]/25 selection:text-[#926004] dark:selection:text-[#f2c300] transition-colors duration-200">
      {/* Background Ambient Glow */}
      <div className="ambient-glow" />

      {/* Header */}
      <Header
        onResetClick={() => setIsResetModalOpen(true)}
        onLoadSample={handleLoadSample}
        isSampleLoaded={isSampleLoaded}
        currentStep={currentStep}
      />

      {/* Progress & Stepper Bar */}
      <ProgressNav
        currentStep={currentStep}
        onStepSelect={goToStep}
        completedSteps={completedSteps}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="rayo-card p-6 sm:p-10 border border-zinc-200/90 dark:border-white/[0.08] bg-white dark:bg-[#18181c]/95 shadow-xl dark:shadow-2xl relative transition-colors duration-200">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              {currentStep === 1 && (
                <Step1Basics data={briefData} onChange={handleUpdate} />
              )}
              {currentStep === 2 && (
                <Step2Priorities data={briefData} onChange={handleUpdate} />
              )}
              {currentStep === 3 && (
                <Step3People data={briefData} onChange={handleUpdate} />
              )}
              {currentStep === 4 && (
                <Step4VideoAudio data={briefData} onChange={handleUpdate} />
              )}
              {currentStep === 5 && (
                <Step5Photography data={briefData} onChange={handleUpdate} />
              )}
              {currentStep === 6 && (
                <Step6Logistics data={briefData} onChange={handleUpdate} />
              )}
              {currentStep === 7 && (
                <Step7Review
                  data={briefData}
                  onEditStep={goToStep}
                  onSendToRayo={() => setIsSendModalOpen(true)}
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls Bar */}
          <div className="mt-10 pt-6 border-t border-zinc-200 dark:border-white/[0.08] flex items-center justify-between flex-wrap gap-4">
            {/* Back Button */}
            <div>
              {currentStep > 1 ? (
                <button
                  type="button"
                  id="nav-back-button"
                  onClick={handlePrev}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-white/[0.04] hover:bg-zinc-200 dark:hover:bg-white/[0.08] border border-zinc-200 dark:border-white/10 transition-all duration-200"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
              ) : (
                <div className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
                  Step 1 of 7 · Event Basics
                </div>
              )}
            </div>

            {/* Next / Finish Button */}
            <div className="flex items-center gap-3">
              {currentStep < STEPS.length ? (
                <button
                  type="button"
                  id="nav-next-button"
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-[#18181b] bg-[#f2c300] hover:bg-[#dcb000] transition-all duration-200 shadow-md shadow-[#f2c300]/20 group"
                >
                  <span>Continue to {STEPS[currentStep].shortTitle}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              ) : (
                <button
                  type="button"
                  id="nav-send-button"
                  onClick={() => setIsSendModalOpen(true)}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-[#18181b] bg-[#f2c300] hover:bg-[#dcb000] transition-all duration-200 shadow-lg shadow-[#f2c300]/25"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Brief to RAYO</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* App Footer */}
      <footer className="mt-auto border-t border-zinc-200 dark:border-white/[0.06] bg-zinc-100/80 dark:bg-[#121214] py-8 text-xs text-zinc-500 dark:text-zinc-400 transition-colors duration-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <p className="font-montserrat font-bold text-zinc-800 dark:text-zinc-300">
              RAYO Media · Event Brief Builder
            </p>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
              Melbourne Event Videography, Photography & Hybrid Coverage
            </p>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <a
              href="mailto:hello@rayomedia.com.au"
              className="text-[#926004] dark:text-[#f2c300] font-medium hover:underline"
            >
              hello@rayomedia.com.au
            </a>
            <span>·</span>
            <span>Melbourne, Victoria</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ResetModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleResetConfirm}
      />

      <SendToRayoModal
        isOpen={isSendModalOpen}
        onClose={() => setIsSendModalOpen(false)}
        data={briefData}
      />
    </div>
  );
}

export default App;
