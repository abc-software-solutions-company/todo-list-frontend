export const Visibilities = {
  PUBLIC: 'Public (Write)',
  READ_ONLY: 'Public (Readonly)',
  PRIVATE: 'Private'
};

export const JoinerBgColos = [
  'bg-red-500',
  'bg-orange-500',
  'bg-amber-500',
  'bg-lime-500',
  'bg-green-500',
  'bg-emerald-500',
  'bg-teal-500',
  'bg-cyan-500',
  'bg-sky-500',
  'bg-blue-500'
];

export const IndexStep: number = Math.pow(2, 30);
export const limitDifferenceIndex = 32;

export const Priorities = {lowest: 'Lowest', low: 'Low', medium: 'Medium', high: 'High', highest: 'Highest'};
export const PriorityColors = {
  lowest: '#78716C',
  low: '#8B5CF6',
  medium: '#22C55E',
  high: '#F97316',
  highest: '#EF4444'
};
export const PriorityIcons = {
  lowest: 'ico-chevrons-down',
  low: 'ico-chevron-down',
  medium: 'ico-equal',
  high: 'ico-chevron-up',
  highest: 'ico-chevrons-up'
};

export const LobbyTexts = {
  TITLE: 'TO-DO LIST',
  HEADLINE: 'Make Estimating Agile Projects Accurate & Fun',
  QUOTE:
    "Organize your life and complete tasks more reliably by using the right to-do app. These are the top performers we've tested.",
  CREATE: ' Create New List ',
  MY_LISTS: 'My Lists'
};

export const TaskTypeData = [
  {text: 'Task', icon: 'ico-check-2', bgColor: 'bg-[#4DA8E5]'},
  {text: 'Story', icon: 'ico-bookmark-2', bgColor: 'bg-[#5ABE47]'},
  {text: 'Bug', icon: 'ico-circle-2', bgColor: 'bg-[#E74E40]'}
];
