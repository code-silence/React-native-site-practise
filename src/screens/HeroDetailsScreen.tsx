import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

interface Skill {
  id: string;
  name: string;
  type: string;
  description: string;
}

interface HeroDetailProps {
  heroName?: string;
  role?: string;
  winRate?: string;
  pickRate?: string;
  banRate?: string;
  description?: string;
}

const MOCK_SKILLS: Skill[] = [
  {
    id: '1',
    name: 'Nether Touch',
    type: 'Damage / Passive',
    description: 'Vexana and her Eternal Guard inflict Nether Touch on enemies hit. The mark lasts 5s and causes the affected enemy to explode upon death.',
  },
  {
    id: '2',
    name: 'Deathly Grasp',
    type: 'Crowd Control',
    description: 'Vexana unleashes spectral energy in a designated direction, dealing Magic Damage and pulling enemies to the center.',
  },
  {
    id: '3',
    name: 'Cursed Blast',
    type: 'Area Damage',
    description: 'Summons a curse power in a target area, dealing massive burst Magic Damage after a short delay.',
  },
  {
    id: '4',
    name: 'Eternal Guard',
    type: 'Ultimate / Summon',
    description: 'Summons the Eternal Guard at a target location to strike down enemies and knock them airborne.',
  },
];

export default function HeroDetailScreen(props: HeroDetailProps) {
  const [activeTab, setActiveTab] = useState<'SKILLS' | 'COUNTERS' | 'GUIDES' | 'WALLPAPER'>('SKILLS');
  const [selectedSkill, setSelectedSkill] = useState<Skill>(MOCK_SKILLS[0]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Navigation Tabs matching MLBB Style */}
      <View style={styles.tabBar}>
        {['SKILLS', 'COUNTERS', 'GUIDES', 'WALLPAPER'].map((tab) => (
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

      <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {/* Left-Right split container for Hero Profile & Details */}
        <View style={styles.mainLayout}>
          
          {/* Left Column: Hero Card & Stats */}
          <View style={styles.heroProfileSection}>
            <View style={styles.heroAvatarBox}>
              <Text style={styles.avatarInitial}>V</Text>
            </View>
            <Text style={styles.heroName}>{props.heroName || 'Vexana'}</Text>
            <Text style={styles.heroRole}>{props.role || 'Mage'}</Text>

            {/* Stats Row */}
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>49.63%</Text>
                <Text style={styles.statLabel}>Win Rate</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>1.54%</Text>
                <Text style={styles.statLabel}>Pick Rate</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>1.13%</Text>
                <Text style={styles.statLabel}>Ban Rate</Text>
              </View>
            </View>

            <View style={styles.loreBox}>
              <Text style={styles.loreText}>
                {props.description || 'The young duchess guarding Necrokeep.'}
              </Text>
            </View>
          </View>

          {/* Right Column: Skills Interactive Content */}
          <View style={styles.detailsSection}>
            {activeTab === 'SKILLS' ? (
              <View>
                {/* Skills Icon Selector Row */}
                <View style={styles.skillIconsRow}>
                  {MOCK_SKILLS.map((skill, index) => (
                    <TouchableOpacity
                      key={skill.id}
                      style={[
                        styles.skillIconButton,
                        selectedSkill.id === skill.id && styles.activeSkillIcon,
                      ]}
                      onPress={() => setSelectedSkill(skill)}
                    >
                      <Text style={styles.skillIconText}>S{index + 1}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Selected Skill Description Box */}
                <View style={styles.skillInfoCard}>
                  <View style={styles.skillTitleRow}>
                    <Text style={styles.skillName}>{selectedSkill.name}</Text>
                    <View style={styles.skillTypeBadge}>
                      <Text style={styles.skillTypeText}>{selectedSkill.type}</Text>
                    </View>
                  </View>
                  <Text style={styles.skillDescription}>{selectedSkill.description}</Text>
                </View>

                {/* Skill Priority Section */}
                <View style={styles.priorityBox}>
                  <Text style={styles.sectionHeaderTitle}>Skill Priority</Text>
                  <Text style={styles.priorityText}>
                    Upgrade Skill 2 at Level 1 and prioritize upgrading Skill 2 with Skill 1 as backup. Upgrade the Ultimate whenever it is available.
                  </Text>
                </View>
              </View>
            ) : (
              <View style={styles.placeholderTabContent}>
                <Text style={styles.placeholderText}>Content for {activeTab} coming soon...</Text>
              </View>
            )}
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070b19',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#0d1428',
    borderBottomWidth: 1,
    borderBottomColor: '#1b264a',
  },
  tabItem: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
  },
  activeTabItem: {
    borderBottomWidth: 3,
    borderBottomColor: '#3b82f6',
    backgroundColor: '#111c38',
  },
  tabText: {
    color: '#8b9bb4',
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  activeTabText: {
    color: '#ffffff',
  },
  contentContainer: {
    padding: 16,
  },
  mainLayout: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  heroProfileSection: {
    width: '30%',
    backgroundColor: '#0d1428',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1b264a',
  },
  heroAvatarBox: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#1e3a8a',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#3b82f6',
  },
  avatarInitial: {
    fontSize: 36,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  heroName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  heroRole: {
    fontSize: 14,
    color: '#60a5fa',
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#1b264a',
    paddingVertical: 10,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 12,
    color: '#34d399',
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 10,
    color: '#8b9bb4',
    marginTop: 2,
  },
  loreBox: {
    backgroundColor: '#070b19',
    padding: 10,
    borderRadius: 6,
    width: '100%',
  },
  loreText: {
    fontSize: 11,
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
    minWidth: 300,
  },
  skillIconsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  skillIconButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#111c38',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1b264a',
  },
  activeSkillIcon: {
    borderColor: '#3b82f6',
    backgroundColor: '#1e3a8a',
  },
  skillIconText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  skillInfoCard: {
    backgroundColor: '#070b19',
    padding: 14,
    borderRadius: 8,
    marginBottom: 16,
  },
  skillTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 10,
  },
  skillName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
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
  },
  skillDescription: {
    fontSize: 13,
    color: '#94a3b8',
    lineHeight: 20,
  },
  priorityBox: {
    backgroundColor: '#070b19',
    padding: 14,
    borderRadius: 8,
  },
  sectionHeaderTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 6,
  },
  priorityText: {
    fontSize: 12,
    color: '#94a3b8',
    lineHeight: 18,
  },
  placeholderTabContent: {
    padding: 40,
    alignItems: 'center',
  },
  placeholderText: {
    color: '#8b9bb4',
    fontSize: 14,
  },
});