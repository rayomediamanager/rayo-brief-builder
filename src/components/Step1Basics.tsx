import React from 'react';
import { Calendar, MapPin, Users, Clock, Building2, Tag, Info, FileText } from 'lucide-react';
import { EventBriefData } from '../types';
import { EVENT_TYPES } from '../constants/briefOptions';

interface Step1BasicsProps {
  data: EventBriefData;
  onChange: (updates: Partial<EventBriefData>) => void;
}

export const Step1Basics: React.FC<Step1BasicsProps> = ({ data, onChange }) => {
  return (
    <div className="space-y-8">
      {/* Step Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-[#926004] dark:text-[#f2c300] uppercase tracking-wider mb-2 font-sans">
          <span>Step 01</span>
          <span>·</span>
          <span>Event Basics</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-montserrat font-bold text-zinc-900 dark:text-white tracking-tight">
          Tell us about your event
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-1.5">
          Basic details to help your media team understand the scale, location and schedule.
        </p>
      </div>

      {/* Helper Box */}
      <div className="p-4 rounded-xl bg-[#f2c300]/10 dark:bg-[#f2c300]/[0.06] border border-[#f2c300]/30 dark:border-[#f2c300]/20 flex items-start gap-3">
        <Info className="w-4 h-4 text-[#926004] dark:text-[#f2c300] shrink-0 mt-0.5" />
        <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
          <strong className="text-[#926004] dark:text-[#f2c300] font-semibold">Why this matters:</strong> Knowing the schedule and venue helps your media team understand the pace of the event and plan coverage around the moments that matter.
        </p>
      </div>

      {/* Form Fields Container */}
      <div className="space-y-6">
        {/* Event Name & Organisation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="eventName" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-2">
              Event Name <span className="text-[#926004] dark:text-[#f2c300]">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                id="eventName"
                value={data.eventName}
                onChange={(e) => onChange({ eventName: e.target.value })}
                placeholder="e.g. Melbourne Future Tech Forum 2026"
                className="w-full"
              />
            </div>
          </div>

          <div>
            <label htmlFor="organisation" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-2">
              Organisation / Host
            </label>
            <div className="relative">
              <input
                type="text"
                id="organisation"
                value={data.organisation}
                onChange={(e) => onChange({ organisation: e.target.value })}
                placeholder="e.g. Acme Corporation / Victorian Business Chamber"
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Event Type - Chips */}
        <div>
          <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-2.5">
            Event Type <span className="text-[#926004] dark:text-[#f2c300]">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {EVENT_TYPES.map((type) => {
              const isSelected = data.eventType === type;
              return (
                <button
                  key={type}
                  type="button"
                  id={`event-type-${type.toLowerCase().replace(/[\s/]+/g, '-')}`}
                  onClick={() => onChange({ eventType: type })}
                  className={`px-3.5 py-2.5 rounded-xl text-xs font-medium text-left transition-all duration-200 border flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#f2c300]/20 dark:bg-[#f2c300]/15 border-[#f2c300] text-[#926004] dark:text-[#f2c300] font-semibold ring-1 ring-[#f2c300]/40'
                      : 'bg-white dark:bg-[#1f1f23] border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-white/20 hover:bg-zinc-50 dark:hover:bg-[#25252a]'
                  }`}
                >
                  <span className="truncate">{type}</span>
                  {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-[#926004] dark:bg-[#f2c300] shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Conditional custom event type if 'Other' */}
          {data.eventType === 'Other' && (
            <div className="mt-3">
              <input
                type="text"
                id="customEventType"
                value={data.customEventType || ''}
                onChange={(e) => onChange({ customEventType: e.target.value })}
                placeholder="Please specify your event type (e.g. Masterclass, Awards Night, Festival)..."
                className="w-full"
              />
            </div>
          )}
        </div>

        {/* Date, Venue & Guest Count */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label htmlFor="eventDate" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-2">
              Event Date
            </label>
            <div className="relative">
              <input
                type="date"
                id="eventDate"
                value={data.eventDate}
                onChange={(e) => onChange({ eventDate: e.target.value })}
                className="w-full"
              />
            </div>
          </div>

          <div>
            <label htmlFor="venue" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-2">
              Venue / Location
            </label>
            <div className="relative">
              <input
                type="text"
                id="venue"
                value={data.venue}
                onChange={(e) => onChange({ venue: e.target.value })}
                placeholder="e.g. Crown Towers / MCEC / Timber Yard"
                className="w-full"
              />
            </div>
          </div>

          <div>
            <label htmlFor="approxGuests" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-2">
              Approx. Guests
            </label>
            <div className="relative">
              <input
                type="text"
                id="approxGuests"
                value={data.approxGuests}
                onChange={(e) => onChange({ approxGuests: e.target.value })}
                placeholder="e.g. 150 guests"
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Schedule Times */}
        <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-[#1a1a1e] border border-zinc-200/80 dark:border-white/[0.08]">
          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-800 dark:text-zinc-300 uppercase tracking-wider mb-4">
            <Clock className="w-4 h-4 text-[#926004] dark:text-[#f2c300]" />
            <span>Event Schedule</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="guestArrivalTime" className="block text-xs text-zinc-600 dark:text-zinc-400 mb-1.5">
                Guest Arrival Time
              </label>
              <input
                type="time"
                id="guestArrivalTime"
                value={data.guestArrivalTime}
                onChange={(e) => onChange({ guestArrivalTime: e.target.value })}
                className="w-full font-sans text-sm font-medium"
              />
            </div>

            <div>
              <label htmlFor="eventStartTime" className="block text-xs text-zinc-600 dark:text-zinc-400 mb-1.5">
                Event / Stage Start Time
              </label>
              <input
                type="time"
                id="eventStartTime"
                value={data.eventStartTime}
                onChange={(e) => onChange({ eventStartTime: e.target.value })}
                className="w-full font-sans text-sm font-medium"
              />
            </div>

            <div>
              <label htmlFor="eventFinishTime" className="block text-xs text-zinc-600 dark:text-zinc-400 mb-1.5">
                Event Finish Time
              </label>
              <input
                type="time"
                id="eventFinishTime"
                value={data.eventFinishTime}
                onChange={(e) => onChange({ eventFinishTime: e.target.value })}
                className="w-full font-sans text-sm font-medium"
              />
            </div>
          </div>
        </div>

        {/* Additional Event Information */}
        <div>
          <label htmlFor="additionalEventInfo" className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-2">
            Additional Event Information (Optional)
          </label>
          <textarea
            id="additionalEventInfo"
            rows={3}
            value={data.additionalEventInfo}
            onChange={(e) => onChange({ additionalEventInfo: e.target.value })}
            placeholder="Any other schedule nuances, multi-room setups, breakout spaces, or run sheet details..."
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

