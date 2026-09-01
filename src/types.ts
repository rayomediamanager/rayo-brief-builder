export interface EventBriefData {
  // Step 1: Event Basics
  eventName: string;
  organisation: string;
  eventType: string;
  customEventType?: string;
  eventDate: string;
  venue: string;
  approxGuests: string;
  guestArrivalTime: string;
  eventStartTime: string;
  eventFinishTime: string;
  additionalEventInfo: string;

  // Step 2: What Matters Most
  coveragePriorities: string[];
  customPriority?: string;
  mustNotMissMoments: string;

  // Step 3: People & Key Moments
  keyPeople: string;
  speakerPriority: string;
  hasGroupPhotos: string; // 'Yes' | 'No' | 'Not sure'
  groupPhotoTiming: string; // 'Before guests arrive' | 'During a break' | 'At the end of the event' | 'Other'
  customGroupPhotoTiming?: string;

  // Step 4: Video & Audio
  videoStyles: string[];
  customVideoStyle?: string;
  fullSessionsRecording: string; // 'No, highlights only' | 'Yes, selected sessions' | 'Yes, full-session recording' | 'Not sure'
  fullSessionsDetails: string;
  guestInterviews: string; // 'Yes' | 'No' | 'Maybe'

  // Step 5: Photography
  photoStyle: string;
  photoRequirements: string[];
  customPhotoRequirement?: string;
  additionalPhotoInfo: string;

  // Step 6: References & Logistics
  referenceUrl: string;
  dressCode: string;
  customDressCode?: string;
  venueLogistics: string;
  additionalMediaNotes: string;
}

export const INITIAL_BRIEF: EventBriefData = {
  eventName: '',
  organisation: '',
  eventType: '',
  customEventType: '',
  eventDate: '',
  venue: '',
  approxGuests: '',
  guestArrivalTime: '',
  eventStartTime: '',
  eventFinishTime: '',
  additionalEventInfo: '',

  coveragePriorities: [],
  customPriority: '',
  mustNotMissMoments: '',

  keyPeople: '',
  speakerPriority: '',
  hasGroupPhotos: '',
  groupPhotoTiming: '',
  customGroupPhotoTiming: '',

  videoStyles: [],
  customVideoStyle: '',
  fullSessionsRecording: '',
  fullSessionsDetails: '',
  guestInterviews: '',

  photoStyle: '',
  photoRequirements: [],
  customPhotoRequirement: '',
  additionalPhotoInfo: '',

  referenceUrl: '',
  dressCode: '',
  customDressCode: '',
  venueLogistics: '',
  additionalMediaNotes: '',
};

export const SAMPLE_DEMO_BRIEF: EventBriefData = {
  eventName: 'Melbourne Tech & Innovation Summit 2026',
  organisation: 'Apex Global & TechVic',
  eventType: 'Conference',
  customEventType: '',
  eventDate: '2026-10-15',
  venue: 'Melbourne Convention and Exhibition Centre (MCEC), Sovereign Room',
  approxGuests: '350',
  guestArrivalTime: '08:30',
  eventStartTime: '09:00',
  eventFinishTime: '17:30',
  additionalEventInfo: 'After 17:30 there is a 90-minute networking drinks session in the foyer area with canapés and an acoustic performer.',

  coveragePriorities: [
    'Keynote speakers',
    'Presentations',
    'Panels',
    'Networking',
    'Guest interactions',
    'Branding and venue details',
    'Sponsors',
    'Awards or ceremonies'
  ],
  customPriority: '',
  mustNotMissMoments: 'Opening keynote by CEO at 09:15, Industry Leadership Award presentation at 15:45, and the crowd cheering during the product reveal at 11:30.',

  keyPeople: 'Dr. Evelyn Reed (Keynote), Marcus Vance (CEO), Board members, Major sponsors (AWS & Telstra reps).',
  speakerPriority: 'Prioritise selected speakers',
  hasGroupPhotos: 'Yes',
  groupPhotoTiming: 'During a break',
  customGroupPhotoTiming: '',

  videoStyles: [
    'Speaker soundbites',
    'Music + visuals',
    'Visuals + on-screen text'
  ],
  customVideoStyle: '',
  fullSessionsRecording: 'Yes, selected sessions',
  fullSessionsDetails: 'Opening keynote (45 min) and the afternoon AI Panel discussion (60 min).',
  guestInterviews: 'Yes',

  photoStyle: 'A combination of candid and posed',
  photoRequirements: [
    'Flash is fine',
    'Important group photographs',
    'VIP / guest portraits',
    'Sponsor / branding photography'
  ],
  customPhotoRequirement: '',
  additionalPhotoInfo: 'Stage lighting will feature warm amber and RAYO gold washes with back screen LED projection.',

  referenceUrl: 'https://vimeo.com/example-cinematic-event',
  dressCode: 'Corporate / business',
  customDressCode: '',
  venueLogistics: 'Loading dock access via Normanby Rd. Security passes required at Stage Door entry by 07:30.',
  additionalMediaNotes: 'We have reserved a designated media table in the center aisle with power boards and audio feed line from the AV desk.',
};

export interface StepMeta {
  id: number;
  number: number;
  title: string;
  shortTitle: string;
  tagline: string;
}
