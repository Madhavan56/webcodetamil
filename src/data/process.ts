export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: string;
}

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Discover',
    description: 'Understand the business and requirements.',
    icon: 'search',
  },
  {
    number: '02',
    title: 'Design',
    description: 'Create the visual direction and user experience.',
    icon: 'palette',
  },
  {
    number: '03',
    title: 'Develop',
    description: 'Build the website using modern technologies.',
    icon: 'code',
  },
  {
    number: '04',
    title: 'Launch',
    description: 'Test, deploy and help the client go live.',
    icon: 'rocket',
  },
] as const;