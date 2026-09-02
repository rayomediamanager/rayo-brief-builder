import { StepMeta } from '../types';

export const STEPS: StepMeta[] = [
  { id: 1, number: 1, title: 'Tell us about your event', shortTitle: 'Event Basics', tagline: 'Schedule, venue & guest count' },
  { id: 2, number: 2, title: 'What should we make sure to capture?', shortTitle: 'Coverage Priorities', tagline: 'Key moments & must-not-miss highlights' },
  { id: 3, number: 3, title: 'Who should get extra attention?', shortTitle: 'People & VIPs', tagline: 'Speakers, leaders & group photos' },
  { id: 4, number: 4, title: 'Beyond the highlight reel', shortTitle: 'Video & Audio', tagline: 'Video style, full recordings & interviews' },
  { id: 5, number: 5, title: 'Photography preferences', shortTitle: 'Photography', tagline: 'Photo style, lighting & shots' },
  { id: 6, number: 6, title: 'Show us what you have in mind', shortTitle: 'References & Logistics', tagline: 'Visual styles, dress code & venue access' },
  { id: 7, number: 7, title: 'Your Event Media Brief', shortTitle: 'Review & Export', tagline: 'Summary, copy & download' },
];

export const EVENT_TYPES = [
  'Conference',
  'Corporate event',
  'Networking event',
  'Product / brand launch',
  'Exhibition / expo',
  'Gala / formal event',
  'Community event',
  'Other',
];

export const COVERAGE_PRIORITIES = [
  { id: 'keynote', label: 'Keynote speakers', desc: 'Main stage presentations & headline speeches' },
  { id: 'presentations', label: 'Presentations', desc: 'Deck walkthroughs & break-out room talks' },
  { id: 'panels', label: 'Panels', desc: 'Q&A, moderators & dynamic panelist banter' },
  { id: 'networking', label: 'Networking', desc: 'Conversations, drink mingling & handshakes' },
  { id: 'guest_interactions', label: 'Guest interactions', desc: 'Engaged attendees, reactions & laughter' },
  { id: 'candid', label: 'Candid moments', desc: 'Unscripted, organic expressions throughout' },
  { id: 'branding', label: 'Branding and venue details', desc: 'Signage, banners, ambient room setups & swag' },
  { id: 'sponsors', label: 'Sponsors', desc: 'Partner booths, logos & sponsored activations' },
  { id: 'catering', label: 'Catering / food', desc: 'Plated dishes, coffee carts & bar service' },
  { id: 'awards', label: 'Awards or ceremonies', desc: 'Trophy handovers, stage applause & winners' },
  { id: 'bts', label: 'Behind the scenes', desc: 'Green room, prep, crew & backstage action' },
  { id: 'team_staff', label: 'Team / staff', desc: 'Event crew in action & organising committee' },
  { id: 'social_content', label: 'Social media content', desc: 'Fast, vertical-friendly & punchy b-roll' },
  { id: 'other', label: 'Other', desc: 'Custom unique priority' },
];

export const SPEAKER_PRIORITY_OPTIONS = [
  { value: 'All speakers are equally important', label: 'All speakers are equally important', desc: 'Balanced coverage of everyone who takes the mic' },
  { value: 'Prioritise selected speakers', label: 'Prioritise selected speakers', desc: 'Focus heavier on key VIPs while getting cutaways of others' },
  { value: 'Focus mainly on keynote / main speakers', label: 'Focus mainly on keynote / main speakers', desc: 'Deep focus on headline sessions' },
  { value: 'Mostly capture the atmosphere rather than every speaker', label: 'Mostly capture atmosphere', desc: 'B-roll, room energy and listener engagement' },
  { value: 'Not sure', label: 'Not sure yet', desc: 'Let your media team guide this on the day' },
];

export const GROUP_PHOTO_OPTIONS = ['Yes', 'No', 'Not sure'];

export const GROUP_PHOTO_TIMING_OPTIONS = [
  'Before guests arrive',
  'During a break',
  'At the end of the event',
  'Other',
];

export const VIDEO_STYLE_OPTIONS = [
  { id: 'music_visuals', label: 'Music + visuals', desc: 'High energy, cinematic rhythm driven by a soundtrack' },
  { id: 'soundbites', label: 'Speaker soundbites', desc: 'Key quotes and impactful speech extracts over b-roll' },
  { id: 'interviews', label: 'Interviews', desc: 'Quick attendee reflections and vox-pop reactions' },
  { id: 'voiceover', label: 'Voice-over', desc: 'Narrated recap or structured message' },
  { id: 'text_overlay', label: 'Visuals + on-screen text', desc: 'Key stats, theme graphics & animated callouts' },
  { id: 'combination', label: 'Combination', desc: 'A rich blend of music, soundbites, and live sound' },
  { id: 'not_sure', label: 'Not sure yet', desc: 'Happy to discuss the best approach with RAYO' },
];

export const FULL_SESSION_RECORDING_OPTIONS = [
  { value: 'No, highlights only', label: 'No, highlights only', desc: 'Focus solely on creating promotional & recap videos' },
  { value: 'Yes, selected sessions', label: 'Yes, selected sessions', desc: 'Record specific keynotes or featured panels from start to finish' },
  { value: 'Yes, full-session recording', label: 'Yes, full-session recording', desc: 'Continuous archive of the entire event / stage schedule' },
  { value: 'Not sure', label: 'Not sure yet', desc: 'We can discuss requirements and AV audio lines' },
];

export const GUEST_INTERVIEW_OPTIONS = ['Yes', 'No', 'Maybe'];

export const PHOTO_STYLE_OPTIONS = [
  { value: 'Mostly candid', label: 'Mostly candid', desc: 'Natural, unobtrusive, capturing genuine moments' },
  { value: 'Mostly posed', label: 'Mostly posed', desc: 'Structured grip-and-grins, step & repeat, and smile-at-camera' },
  { value: 'A combination of candid and posed', label: 'Combination of candid and posed', desc: 'The gold standard balance for corporate & conference events' },
  { value: 'Formal / polished', label: 'Formal / polished', desc: 'Clean, poised, magazine-editorial aesthetic' },
  { value: 'Natural / documentary', label: 'Natural / documentary', desc: 'Storytelling approach with authentic atmosphere' },
  { value: 'Not sure', label: 'Not sure yet', desc: 'Let photographer adapt dynamically to the venue mood' },
];

export const PHOTO_REQUIREMENTS_OPTIONS = [
  'Flash is fine',
  'Prefer no flash',
  'Venue has lighting restrictions',
  'Important group photographs',
  'VIP / guest portraits',
  'Sponsor / branding photography',
  'Product photography',
  'Other',
];

export const DRESS_CODE_OPTIONS = [
  'Smart casual',
  'Corporate / business',
  'Formal / black tie',
  'Specific dress code',
  'No particular requirement',
  'Other',
];
