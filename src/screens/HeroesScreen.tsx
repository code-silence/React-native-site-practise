import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

interface HeroesScreenProps {
  onBackToHome?: () => void;
}

// Skill interface for dynamic skill details view
interface Skill {
  id: string;
  name: string;
  types: string[];
  description: string;
}

interface Hero {
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

// Heroes data with accurate official skills and combo data
const HEROES_DATA: Hero[] = [
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
      { id: 's1', name: 'Cloud Walker', types: ['Buff', 'Mobility'], description: 'Ling’s lightness of foot grants him extra Crit. Chance and allows him to leap onto walls.' },
      { id: 's2', name: 'Defiant Sword', types: ['Physical', 'Damage'], description: 'Ling charges in a designated direction and deals physical damage to enemies nearby.' },
      { id: 's3', name: 'Flowing Blossoms', types: ['Aoe', 'Blink'], description: 'Ling leaps into the air and becomes untargetable, raining down swords upon landing.' },
      { id: 'ultimate', name: 'Tempest of Blades', types: ['Control', 'Burst'], description: 'Ultimate ultimate sword technique to wipe out enemy backlines.' }
    ],
    skillPriority: 'Prioritize upgrading Skill 2 first, then Skill 3, and Ultimate whenever available.',
    teamfightCombo: 'Wall Leap (S1) → Tempest of Blades (Ult) → Defiant Sword (S2)',
    laningCombo: 'Wall Leap (S1) → Defiant Sword (S2) to harass enemy laners.'
  },
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
        description: 'Vexana unleashes spectral energy in a designated direction, dealing 250 (+60% Total Magic Power) Magic Damage to the first enemy hit and terrifying them for 1s.' 
      },
      { 
        id: 's2', 
        name: 'Cursed Blast', 
        types: ['Aoe', 'Burst'], 
        description: 'Vexana summons a curse power in a target area, dealing 600 (+120% Total Magic Power) Magic Damage after a short delay to enemies inside.' 
      },
      { 
        id: 's3', 
        name: 'Immolation / Extra', 
        types: ['Support', 'Magic'], 
        description: 'Passive mark application that triggers explosive chain reactions on enemy elimination.' 
      },
      { 
        id: 'ultimate', 
        name: 'Eternal Guard', 
        types: ['Summon', 'Damage'], 
        description: 'Vexana summons an Eternal Guard at the target location, dealing 480 (+60% Total Magic Power) Magic Damage to enemies hit and knocking them airborne for 0.8s.' 
      }
    ],
    skillPriority: 'Upgrade Skill 2 at Level 1 and prioritize upgrading Skill 2 with Skill 1 as backup. Upgrade the Ultimate whenever it is available.',
    teamfightCombo: 'Deathly Grasp (S1) → Cursed Blast (S2) → Eternal Guard (Ult)',
    laningCombo: 'Terrify enemy with 1st Skill and follow up with 2nd Skill for guaranteed damage.'
  },
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
      { id: 's1', name: 'Falling Star', types: ['Blink', 'Buff'], description: 'Melissa slides forward and gains increased Attack Speed for a short duration.' },
      { id: 's2', name: 'Eyes On Eygo!', types: ['Control', 'Link'], description: 'Throws a doll that links to nearby enemies, dealing damage and slowing targets.' },
      { id: 's3', name: 'Go Away!', types: ['Shield', 'Repel'], description: 'Creates a field around her that blocks enemy approaches.' },
      { id: 'ultimate', name: 'Cursed Needle Field', types: ['Buff', 'Aoe'], description: 'Advanced needle barrage maximizing multi-target markswoman DPS.' }
    ],
    skillPriority: 'Max Skill 2 first for poke linking, then Skill 1 for repositioning speed.',
    teamfightCombo: 'Eyes On Eygo! (S2) → Basic Attacks → Falling Star (S1) to chase',
    laningCombo: 'S2 linkage followed by sustained basic attacks.'
  },
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
      { id: 's1', name: 'Demonic Grip', types: ['Blink', 'Control'], description: 'Fires a demonic hand to pull himself toward targets and strike.' },
      { id: 's2', name: 'Meteoric Sword', types: ['Physical', 'Slow'], description: 'Slashes a cursed blade that leaves a trail slowing enemies down.' },
      { id: 's3', name: 'Eternal Evil', types: ['Immunity', 'Regen'], description: 'Transforms into a fallen angel, becoming immune to death and converting damage dealt into HP.' },
      { id: 'ultimate', name: 'Dark Blade Unleashed', types: ['Buff', 'Burst'], description: 'Supreme execution power scaling with missing health percentages.' }
    ],
    skillPriority: 'Max Skill 2 for burst clearing, upgrade Ultimate at every opportunity.',
    teamfightCombo: 'Demonic Grip (S1) → Meteoric Sword (S2) → Eternal Evil (Ult)',
    laningCombo: 'S1 engage into heavy basic attack trades.'
  },
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
      { id: 's1', name: 'Iron Tackle', types: ['Control', 'Aoe'], description: 'Slams his shield down to stun enemies in a designated line.' },
      { id: 's2', name: 'Electromag Rays', types: ['Magic', 'Cone'], description: 'Emits high-frequency rays in a cone area, dealing sustained damage.' },
      { id: 's3', name: 'Rapid Touchup', types: ['Shield', 'Regen'], description: 'Passively gains a sturdy shield when HP drops low.' },
      { id: 'ultimate', name: 'CEM Transform', types: ['Transform', 'Global'], description: 'Transforms into a sports car, driving fast across the map with an ally.' }
    ],
    skillPriority: 'Max Skill 2 for minion clearing and team defense, level Ultimate whenever possible.',
    teamfightCombo: 'CEM Transform (Ult Drive & Crash) → Iron Tackle (S1 Stun) → Electromag Rays (S2)',
    laningCombo: 'Park vehicle carefully and lock down targets with S1 stun.'
  },
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
      { id: 's1', name: 'Sow, Sow', types: ['Heal', 'Projectile'], description: 'Throws energy seed healing allies and damaging enemies.' },
      { id: 's2', name: 'Sprout, Sprout', types: ['Control', 'Aoe'], description: 'Sends energy ripples forward to stun enemies in range.' },
      { id: 's3', name: 'Dew, Bloom', types: ['Global Heal', 'Support'], description: 'Resonates energy globally to heal all allied heroes multiple times.' },
      { id: 'ultimate', name: 'Lantern Grace', types: ['Buff', 'Share'], description: 'Shares a special evolved equipment item with an allied teammate.' }
    ],
    skillPriority: 'Max Skill 1 first for team sustain, followed by Skill 2 crowd control.',
    teamfightCombo: 'Dew, Bloom (Global Ult Heal) → Sprout, Sprout (S2 Stun) → Sow, Sow (S1)',
    laningCombo: 'Heal teammates using S1 during laning skirmishes.'
  },
];

const ROLES = ['All', 'Assassin', 'Mage', 'Marksman', 'Tank', 'Fighter', 'Support'];

export default function HeroesScreen({ onBackToHome }: HeroesScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedHero, setSelectedHero] = useState<Hero | null>(null);
  const [activeTab, setActiveTab] = useState<'SKILLS' | 'COUNTERS' | 'GUIDES'>('SKILLS');
  const [selectedSkillIndex, setSelectedSkillIndex] = useState(3); // Default to Ultimate or S4 as seen in image

  const filteredHeroes = HEROES_DATA.filter(hero => {
    const matchesSearch = hero.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === 'All' || hero.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  // Render Hero Detail View styled exactly like official MLBB UI
  if (selectedHero) {
    const activeSkill = selectedHero.skills[selectedSkillIndex] || selectedHero.skills[0];

    return (
      <View style={styles.fullScreenContainer}>
        {/* Top header navigation back bar */}
        <View style={styles.detailHeaderBar}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => setSelectedHero(null)}
          >
            <Text style={styles.backButtonText}>← Back to Heroes</Text>
          </TouchableOpacity>
        </View>

        {/* Top Category Tabs matching MLBB client */}
        <View style={styles.tabBar}>
          {['SKILLS', 'COUNTERS', 'GUIDES'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabItem, activeTab === tab && styles.activeTabItem]}
              onPress={() => setActiveTab(tab as any)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.mainLayout}>
            
            {/* Left Column: Hero Portrait Avatar & Analytics Info */}
            <View style={styles.heroProfileSection}>
              <View style={styles.heroAvatarBox}>
                <Text style={styles.avatarInitial}>{selectedHero.name[0]}</Text>
              </View>
              <Text style={styles.heroDetailName}>{selectedHero.name}</Text>
              <Text style={styles.heroDetailRole}>{selectedHero.role}</Text>

              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{selectedHero.winRate}</Text>
                  <Text style={styles.statLabel}>Win Rate</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{selectedHero.pickRate}</Text>
                  <Text style={styles.statLabel}>Pick Rate</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{selectedHero.banRate}</Text>
                  <Text style={styles.statLabel}>Ban Rate</Text>
                </View>
              </View>

              <View style={styles.loreBox}>
                <Text style={styles.loreText}>{selectedHero.lore}</Text>
              </View>
            </View>

            {/* Right Column: Skills, Priority, and Combo details view */}
            <View style={styles.detailsSection}>
              {activeTab === 'SKILLS' ? (
                <View>
                  {/* Skill selector circular icons row (S1, S2, S3, Ultimate) */}
                  <View style={styles.skillIconsRow}>
                    {selectedHero.skills.map((skill, index) => (
                      <TouchableOpacity
                        key={skill.id}
                        style={[
                          styles.skillIconButton,
                          selectedSkillIndex === index && styles.activeSkillIconButton,
                        ]}
                        onPress={() => setSelectedSkillIndex(index)}
                      >
                        <Text style={styles.skillIconText}>
                          {index === 3 ? 'Ultimate' : `S${index + 1}`}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  {/* Selected Skill Title & Badges */}
                  <View style={styles.skillHeaderRow}>
                    <Text style={styles.activeSkillName}>{activeSkill.name}</Text>
                    <View style={styles.badgeRow}>
                      {activeSkill.types.map((t, i) => (
                        <View key={i} style={styles.skillTypeBadge}>
                          <Text style={styles.skillTypeText}>{t}</Text>
                        </View>
                      ))}
                    </View>
                  </View>

                  {/* Detailed Description */}
                  <Text style={styles.skillDescriptionText}>
                    {activeSkill.description}
                  </Text>

                  {/* Skill Priority Section */}
                  <View style={styles.sectionContainer}>
                    <Text style={styles.sectionHeaderTitle}>Skill Priority</Text>
                    <View style={styles.dividerLine} />
                    <Text style={styles.sectionContentText}>
                      {selectedHero.skillPriority}
                    </Text>
                  </View>

                  {/* Skill Combo Section */}
                  <View style={styles.comboCardContainer}>
                    <Text style={styles.sectionHeaderTitle}>Skill Combo</Text>
                    <View style={styles.dividerLine} />
                    
                    <Text style={styles.comboSubHeader}>TEAMFIGHT COMBOS</Text>
                    <Text style={styles.sectionContentText}>
                      {selectedHero.teamfightCombo}
                    </Text>

                    <Text style={[styles.comboSubHeader, { marginTop: 12 }]}>LANING COMBOS</Text>
                    <Text style={styles.sectionContentText}>
                      {selectedHero.laningCombo}
                    </Text>
                  </View>
                </View>
              ) : (
                <View style={styles.placeholderTabContent}>
                  <Text style={styles.placeholderText}>Detailed {activeTab} information for {selectedHero.name} is coming soon.</Text>
                </View>
              )}
            </View>

          </View>
        </ScrollView>
      </View>
    );
  }

  // Render main Hero List View with search filters and categories
  return (
    <View style={styles.fullScreenContainer}>
      {onBackToHome && (
        <TouchableOpacity style={styles.homeBackButton} onPress={onBackToHome}>
          <Text style={styles.homeBackButtonText}>← Back to Home</Text>
        </TouchableOpacity>
      )}

      <View style={styles.header}>
        <Text style={styles.headerTitle}>HERO LIBRARY</Text>
        <Text style={styles.headerSubtitle}>Choose your fighter for the Land of Dawn</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search hero name..."
          placeholderTextColor="#8892b0"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.filterContainer}>
        <FlatList
          horizontal
          data={ROLES}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.filterButton,
                selectedRole === item && styles.activeFilterButton,
              ]}
              onPress={() => setSelectedRole(item)}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  selectedRole === item && styles.activeFilterButtonText,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <FlatList
        data={filteredHeroes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.heroCard} 
            activeOpacity={0.8}
            onPress={() => {
              setSelectedHero(item);
              setSelectedSkillIndex(3); // Default select ultimate/last skill like Vexana screenshot
            }}
          >
            <View style={styles.heroAvatarPlaceholder}>
              <Text style={styles.heroAvatarText}>{item.name[0]}</Text>
            </View>
            <View style={styles.heroInfo}>
              <Text style={styles.heroName}>{item.name}</Text>
              <Text style={styles.heroSpecialty}>{item.specialty}</Text>
            </View>
            <View style={styles.heroMeta}>
              <Text style={styles.roleBadge}>{item.role}</Text>
              <Text style={styles.winRateText}>WR: {item.winRate}</Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#070b19',
    paddingHorizontal: 16,
    paddingTop: 16,
    width: '100%',
    minHeight: '100vh',
  },
  homeBackButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#11192d',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#1f293d',
    marginBottom: 8,
  },
  homeBackButtonText: {
    color: '#60a5fa',
    fontWeight: 'bold',
    fontSize: 13,
  },
  header: {
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 1,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#8892b0',
    marginTop: 4,
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: '#11192d',
    borderWidth: 1,
    borderColor: '#1f293d',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#ffffff',
    fontSize: 16,
  },
  filterContainer: {
    marginBottom: 16,
    height: 40,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#11192d',
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#1f293d',
    justifyContent: 'center',
  },
  activeFilterButton: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  filterButtonText: {
    color: '#8892b0',
    fontSize: 14,
    fontWeight: '600',
  },
  activeFilterButtonText: {
    color: '#ffffff',
  },
  listContainer: {
    paddingBottom: 24,
    flexGrow: 1,
  },
  heroCard: {
    flexDirection: 'row',
    backgroundColor: '#11192d',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1f293d',
  },
  heroAvatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#1e3a8a',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  heroAvatarText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  heroInfo: {
    flex: 1,
  },
  heroName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  heroSpecialty: {
    fontSize: 12,
    color: '#8892b0',
    marginTop: 2,
  },
  heroMeta: {
    alignItems: 'flex-end',
  },
  roleBadge: {
    fontSize: 12,
    color: '#60a5fa',
    fontWeight: '600',
    marginBottom: 4,
  },
  winRateText: {
    fontSize: 12,
    color: '#34d399',
  },
  detailHeaderBar: {
    paddingVertical: 10,
  },
  backButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#11192d',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#1f293d',
  },
  backButtonText: {
    color: '#60a5fa',
    fontWeight: 'bold',
    fontSize: 13,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#0d1428',
    borderBottomWidth: 1,
    borderBottomColor: '#1b264a',
    marginTop: 8,
    borderRadius: 8,
  },
  tabItem: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTabItem: {
    borderBottomWidth: 3,
    borderBottomColor: '#3b82f6',
    backgroundColor: '#111c38',
  },
  tabText: {
    color: '#8b9bb4',
    fontSize: 12,
    fontWeight: 'bold',
  },
  activeTabText: {
    color: '#ffffff',
  },
  scrollContent: {
    paddingVertical: 16,
    flexGrow: 1,
  },
  mainLayout: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  heroProfileSection: {
    width: '32%',
    backgroundColor: '#0d1428',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1b264a',
    minWidth: 260,
  },
  heroAvatarBox: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#1e3a8a',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#3b82f6',
  },
  avatarInitial: {
    fontSize: 30,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  heroDetailName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  heroDetailRole: {
    fontSize: 13,
    color: '#60a5fa',
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#1b264a',
    paddingVertical: 8,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 11,
    color: '#34d399',
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 9,
    color: '#8b9bb4',
    marginTop: 2,
  },
  loreBox: {
    backgroundColor: '#070b19',
    padding: 8,
    borderRadius: 6,
    width: '100%',
  },
  loreText: {
    fontSize: 10,
    color: '#8b9bb4',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  detailsSection: {
    flex: 1,
    backgroundColor: '#0d1428',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1b264a',
    minWidth: 280,
  },
  skillIconsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  skillIconButton: {
    paddingHorizontal: 16,
    height: 45,
    borderRadius: 22,
    backgroundColor: '#111c38',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1b264a',
  },
  activeSkillIconButton: {
    borderColor: '#3b82f6',
    backgroundColor: '#1e3a8a',
  },
  skillIconText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  skillHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    flexWrap: 'wrap',
    gap: 10,
  },
  activeSkillName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 6,
  },
  skillTypeBadge: {
    backgroundColor: '#1e293b',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  skillTypeText: {
    fontSize: 10,
    color: '#38bdf8',
    fontWeight: '600',
  },
  skillDescriptionText: {
    fontSize: 13,
    color: '#94a3b8',
    lineHeight: 20,
    marginBottom: 16,
  },
  sectionContainer: {
    backgroundColor: '#070b19',
    padding: 14,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#11192d',
  },
  comboCardContainer: {
    backgroundColor: '#070b19',
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#11192d',
  },
  sectionHeaderTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  dividerLine: {
    height: 1,
    backgroundColor: '#1f293d',
    marginVertical: 8,
  },
  sectionContentText: {
    fontSize: 12,
    color: '#94a3b8',
    lineHeight: 18,
  },
  comboSubHeader: {
    fontSize: 10,
    fontWeight: '900',
    color: '#60a5fa',
    letterSpacing: 1,
  },
  placeholderTabContent: {
    padding: 40,
    alignItems: 'center',
  },
  placeholderText: {
    color: '#8b9bb4',
    fontSize: 13,
  },
});