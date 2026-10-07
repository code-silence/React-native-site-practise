export interface Skill {
    id: string;
    name: string;
    types: string[];
    description: string;
}

export interface Hero {
    id: string;
    name: string;
    role: 'Assassin' | 'Mage' | 'Marksman' | 'Tank' | 'Fighter' | 'Support';
    specialty: string;
    winRate: string;
    pickRate: string;
    banRate: string;
    lore: string;
    skills: Skill[];
    skillPriority: string;
    teamfightCombo: string;
    laningCombo: string;
}

export const HEROES_DATA: Hero[] = [
    // Paste your existing hero objects here
    // Ling
    {
        id: '1',
        name: 'Ling',
        role: 'Assassin',
        specialty: 'Mobility / Burst',
        winRate: '51.2%',
        pickRate: '3.4%',
        banRate: '25.1%',
        lore: 'The Cyan Finch who traverses walls with ultimate agility.',
        skills: [
            {
                id: 's1',
                name: 'Cloud Walker',
                types: ['Buff', 'Mobility'],
                description:
                    'Ling’s lightness of foot grants him extra Crit. Chance and allows him to leap onto walls.',
            },
            {
                id: 's2',
                name: 'Defiant Sword',
                types: ['Physical', 'Damage'],
                description:
                    'Ling charges in a designated direction and deals physical damage to enemies nearby.',
            },
            {
                id: 's3',
                name: 'Flowing Blossoms',
                types: ['Aoe', 'Blink'],
                description:
                    'Ling leaps into the air and becomes untargetable, raining down swords upon landing.',
            },
            {
                id: 'ultimate',
                name: 'Tempest of Blades',
                types: ['Control', 'Burst'],
                description:
                    'Ultimate ultimate sword technique to wipe out enemy backlines.',
            },
        ],
        skillPriority:
            'Prioritize upgrading Skill 2 first, then Skill 3, and Ultimate whenever available.',
        teamfightCombo:
            'Wall Leap (S1) → Tempest of Blades (Ult) → Defiant Sword (S2)',
        laningCombo:
            'Wall Leap (S1) → Defiant Sword (S2) to harass enemy laners.',
    },

    // Vexana
    {
        id: '2',
        name: 'Vexana',
        role: 'Mage',
        specialty: 'Poke / Burst',
        winRate: '52.1%',
        pickRate: '2.1%',
        banRate: '8.3%',
        lore: 'The young duchess guarding Necrokeep with undead powers.',
        skills: [
            {
                id: 's1',
                name: 'Deathly Grasp',
                types: ['Crowd Control', 'Magic'],
                description:
                    'Vexana unleashes spectral energy in a designated direction, dealing 250 (+60% Total Magic Power) Magic Damage to the first enemy hit and terrifying them for 1s.',
            },
            {
                id: 's2',
                name: 'Cursed Blast',
                types: ['Aoe', 'Burst'],
                description:
                    'Vexana summons a curse power in a target area, dealing 600 (+120% Total Magic Power) Magic Damage after a short delay to enemies inside.',
            },
            {
                id: 's3',
                name: 'Immolation / Extra',
                types: ['Support', 'Magic'],
                description:
                    'Passive mark application that triggers explosive chain reactions on enemy elimination.',
            },
            {
                id: 'ultimate',
                name: 'Eternal Guard',
                types: ['Summon', 'Damage'],
                description:
                    'Vexana summons an Eternal Guard at the target location, dealing 480 (+60% Total Magic Power) Magic Damage to enemies hit and knocking them airborne for 0.8s.',
            },
        ],
        skillPriority:
            'Upgrade Skill 2 at Level 1 and prioritize upgrading Skill 2 with Skill 1 as backup. Upgrade the Ultimate whenever it is available.',
        teamfightCombo:
            'Deathly Grasp (S1) → Cursed Blast (S2) → Eternal Guard (Ult)',
        laningCombo:
            'Terrify enemy with 1st Skill and follow up with 2nd Skill for guaranteed damage.',
    },

    // Melissa
    {
        id: '3',
        name: 'Melissa',
        role: 'Marksman',
        specialty: 'Chase / Damage',
        winRate: '50.5%',
        pickRate: '4.8%',
        banRate: '15.2%',
        lore: 'A rebellious girl who uses needles and cursed dolls in battle.',
        skills: [
            {
                id: 's1',
                name: 'Falling!',
                types: ['Blink', 'Buff'],
                description:
                    'Melissa slides forward and gains increased Attack Speed for a short duration.',
            },
            {
                id: 's2',
                name: 'Eyes On Eygo!',
                types: ['Control', 'Link'],
                description:
                    'Throws a doll that links to nearby enemies, dealing damage and slowing targets.',
            },
            {
                id: 's3',
                name: 'Go Away!',
                types: ['Shield', 'Repel'],
                description:
                    'Creates a field around her that blocks enemy approaches.',
            },
            {
                id: 'ultimate',
                name: 'Cursed Needle Field',
                types: ['Buff', 'Aoe'],
                description:
                    'Advanced needle barrage maximizing multi-target markswoman DPS.',
            },
        ],
        skillPriority:
            'Max Skill 2 first for poke linking, then Skill 1 for repositioning speed.',
        teamfightCombo:
            'Eyes On Eygo! (S2) → Basic Attacks → Falling! (S1) to chase',
        laningCombo: 'S2 linkage followed by sustained basic attacks.',
    },

    // Argus
    {
        id: '4',
        name: 'Argus',
        role: 'Fighter',
        specialty: 'Charge / Regen',
        winRate: '49.8%',
        pickRate: '5.2%',
        banRate: '12.4%',
        lore: 'The fallen angel who chose darkness and eternal wrath.',
        skills: [
            {
                id: 's1',
                name: 'Demonic Grip',
                types: ['Blink', 'Control'],
                description:
                    'Fires a demonic hand to pull himself toward targets and strike.',
            },
            {
                id: 's2',
                name: 'Meteoric Sword',
                types: ['Physical', 'Slow'],
                description:
                    'Slashes a cursed blade that leaves a trail slowing enemies down.',
            },
            {
                id: 's3',
                name: 'Eternal Evil',
                types: ['Immunity', 'Regen'],
                description:
                    'Transforms into a fallen angel, becoming immune to death and converting damage dealt into HP.',
            },
            {
                id: 'ultimate',
                name: 'Dark Blade Unleashed',
                types: ['Buff', 'Burst'],
                description:
                    'Supreme execution power scaling with missing health percentages.',
            },
        ],
        skillPriority:
            'Max Skill 2 for burst clearing, upgrade Ultimate at every opportunity.',
        teamfightCombo:
            'Demonic Grip (S1) → Meteoric Sword (S2) → Eternal Evil (Ult)',
        laningCombo: 'S1 engage into heavy basic attack trades.',
    },

    // Johnson
    {
        id: '5',
        name: 'Johnson',
        role: 'Tank',
        specialty: 'Initiator / Support',
        winRate: '53.4%',
        pickRate: '3.0%',
        banRate: '4.1%',
        lore: 'A former street racer who transforms into a speeding vehicle.',
        skills: [
            {
                id: 's1',
                name: 'Iron Tackle',
                types: ['Control', 'Aoe'],
                description:
                    'Slams his shield down to stun enemies in a designated line.',
            },
            {
                id: 's2',
                name: 'Electromag Rays',
                types: ['Magic', 'Cone'],
                description:
                    'Emits high-frequency rays in a cone area, dealing sustained damage.',
            },
            {
                id: 's3',
                name: 'Rapid Touchup',
                types: ['Shield', 'Regen'],
                description:
                    'Passively gains a sturdy shield when HP drops low.',
            },
            {
                id: 'ultimate',
                name: 'CEM Transform',
                types: ['Transform', 'Global'],
                description:
                    'Transforms into a sports car, driving fast across the map with an ally.',
            },
        ],
        skillPriority:
            'Max Skill 2 for minion clearing and team defense, level Ultimate whenever possible.',
        teamfightCombo:
            'CEM Transform (Ult Drive & Crash) → Iron Tackle (S1 Stun) → Electromag Rays (S2)',
        laningCombo:
            'Park vehicle carefully and lock down targets with S1 stun.',
    },

    // Floryn
    {
        id: '6',
        name: 'Floryn',
        role: 'Support',
        specialty: 'Regen / Guard',
        winRate: '54.0%',
        pickRate: '1.8%',
        banRate: '18.9%',
        lore: 'A tender-hearted fairy sharing vitality with her companion.',
        skills: [
            {
                id: 's1',
                name: 'Sow, Sow',
                types: ['Heal', 'Projectile'],
                description:
                    'Throws energy seed healing allies and damaging enemies.',
            },
            {
                id: 's2',
                name: 'Sprout, Sprout',
                types: ['Control', 'Aoe'],
                description:
                    'Sends energy ripples forward to stun enemies in range.',
            },
            {
                id: 's3',
                name: 'Dew, Bloom',
                types: ['Global Heal', 'Support'],
                description:
                    'Resonates energy globally to heal all allied heroes multiple times.',
            },
            {
                id: 'ultimate',
                name: 'Lantern Grace',
                types: ['Buff', 'Share'],
                description:
                    'Shares a special evolved equipment item with an allied teammate.',
            },
        ],
        skillPriority:
            'Max Skill 1 first for team sustain, followed by Skill 2 crowd control.',
        teamfightCombo:
            'Dew, Bloom (Global Ult Heal) → Sprout, Sprout (S2 Stun) → Sow, Sow (S1)',
        laningCombo: 'Heal teammates using S1 during laning skirmishes.',
    },
];

export const ROLES = [
    'All',
    'Assassin',
    'Mage',
    'Marksman',
    'Tank',
    'Fighter',
    'Support',
];