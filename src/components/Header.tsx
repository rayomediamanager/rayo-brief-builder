import React from 'react';
import { RotateCcw, Sparkles, Sun, Moon } from 'lucide-react';
import { LOGO_BASE64 } from '../constants/logo';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  onResetClick: () => void;
  onLoadSample: () => void;
  isSampleLoaded: boolean;
  currentStep: number;
}

export const Header: React.FC<HeaderProps> = ({
  onResetClick,
  onLoadSample,
  isSampleLoaded,
}) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="border-b border-zinc-200/80 dark:border-white/[0.08] bg-white/95 dark:bg-[#161619]/90 backdrop-blur-md sticky top-0 z-40 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo & App Name */}
        <div className="flex items-center gap-3.5">
          <div className="flex items-center gap-3">
            {LOGO_BASE64 ? (
              <div className="p-1 rounded-lg bg-[#141416] dark:bg-transparent">
                <img
                  src={LOGO_BASE64}
                  alt="RAYO Media"
                  className="h-8 w-auto object-contain brightness-105"
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : (
              <div className="h-9 px-2.5 bg-[#f2c300] text-[#18181b] font-black tracking-wider text-sm flex items-center justify-center rounded-lg font-montserrat">
                RAYO
              </div>
            )}
            <div className="hidden sm:block h-6 w-px bg-zinc-200 dark:bg-white/10" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-montserrat font-bold text-zinc-900 dark:text-white text-base tracking-tight">
                  Event Media Brief Builder
                </span>
                <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#f2c300]/20 text-[#926004] dark:text-[#f2c300] border border-[#f2c300]/30">
                  Planning Tool
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-normal hidden sm:block">
                Prepare a clear, practical brief for your photographer & videographer
              </p>
            </div>
          </div>
        </div>

        {/* Top Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Light / Dark Mode Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            id="theme-toggle-button"
            aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 hover:bg-zinc-200/80 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] border border-zinc-200 dark:border-white/10 transition-all duration-200"
            title={theme === 'dark' ? 'Switch to Light mode (printable style)' : 'Switch to Dark mode'}
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-3.5 h-3.5 text-[#f2c300]" />
                <span className="hidden sm:inline">Light</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-zinc-700" />
                <span className="hidden sm:inline">Dark</span>
              </>
            )}
          </button>

          {/* Demo Data Button */}
          <button
            type="button"
            onClick={onLoadSample}
            id="sample-brief-button"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 hover:bg-zinc-200/80 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] border border-zinc-200 dark:border-white/10 transition-all duration-200"
            title="Load a realistic Melbourne conference example"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#f2c300]" />
            <span className="hidden sm:inline">
              {isSampleLoaded ? 'Sample Loaded' : 'Load Example'}
            </span>
            <span className="sm:hidden">Example</span>
          </button>

          {/* Reset Brief Button */}
          <button
            type="button"
            onClick={onResetClick}
            id="reset-brief-button"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-zinc-500 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-500/10 border border-zinc-200 dark:border-white/5 hover:border-red-500/20 transition-all duration-200"
            title="Clear all answers and reset brief"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>
    </header>
  );
};

