export interface Skill {
  id: string;
  name: string;
  type: string;
  description: string;
}

export const MOCK_SKILLS: Skill[] = [
  {
    id: '1',
    name: 'Nether Touch',
    type: 'Damage / Passive',
    description:
      'Vexana and her Eternal Guard inflict Nether Touch on enemies hit. The mark lasts 5s and causes the affected enemy to explode upon death.',
  },
  {
    id: '2',
    name: 'Deathly Grasp',
    type: 'Crowd Control',
    description:
      'Vexana unleashes spectral energy in a designated direction, dealing Magic Damage and pulling enemies to the center.',
  },
  {
    id: '3',
    name: 'Cursed Blast',
    type: 'Area Damage',
    description:
      'Summons a curse power in a target area, dealing massive burst Magic Damage after a short delay.',
  },
  {
    id: '4',
    name: 'Eternal Guard',
    type: 'Ultimate / Summon',
    description:
      'Summons the Eternal Guard at a target location to strike down enemies and knock them airborne.',
  },
];