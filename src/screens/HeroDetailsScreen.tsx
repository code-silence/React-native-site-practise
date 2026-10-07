import React, { useState } from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import { colors } from '../theme';
import { HERO_ASSETS } from '../data/heroAssets';

//covers 
import melissaCover from '../assets/skills/melissa/melissa_cover.jpg';

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

export default function HeroDetailScreen(props: HeroDetailProps) {
  const [activeTab, setActiveTab] = useState<
    'SKILLS' | 'COUNTERS' | 'GUIDES' | 'WALLPAPER'
  >('SKILLS');

  const [selectedSkill, setSelectedSkill] = useState<Skill>(MOCK_SKILLS[0]);

  // Get assets for the currently selected hero.
  const heroAssets =
    HERO_ASSETS[props.heroName as keyof typeof HERO_ASSETS];

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Navigation Tabs */}
      <View style={styles.tabBar}>
        {['SKILLS', 'COUNTERS', 'GUIDES', 'WALLPAPER'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabItem,
              activeTab === tab && styles.activeTabItem,
            ]}
            onPress={() =>
              setActiveTab(
                tab as 'SKILLS' | 'COUNTERS' | 'GUIDES' | 'WALLPAPER',
              )
            }
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Main Layout */}
        <View style={styles.mainLayout}>
          {/* Left Column: Hero Profile */}
          <View style={styles.heroProfileSection}>
            <View style={styles.heroAvatarBox}>
              {heroAssets?.icon ? (
                <Image
                  source={heroAssets.icon}
                  style={styles.heroDetailAvatarImage}
                  resizeMode="cover"
                />
              ) : (
                <Text style={styles.avatarInitial}>
                  {props.heroName?.charAt(0) || 'V'}
                </Text>
              )}
            </View>
            <Text style={styles.heroName}>
              {props.heroName || 'Vexana'}
            </Text>

            <Text style={styles.heroRole}>
              {props.role || 'Mage'}
            </Text>

            {/* Stats Row */}
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>
                  {props.winRate || '49.63%'}
                </Text>
                <Text style={styles.statLabel}>Win Rate</Text>
              </View>

              <View style={styles.statItem}>
                <Text style={styles.statValue}>
                  {props.pickRate || '1.54%'}
                </Text>
                <Text style={styles.statLabel}>Pick Rate</Text>
              </View>

              <View style={styles.statItem}>
                <Text style={styles.statValue}>
                  {props.banRate || '1.13%'}
                </Text>
                <Text style={styles.statLabel}>Ban Rate</Text>
              </View>
            </View>

            {/* Lore */}
            <View style={styles.loreBox}>
              <Text style={styles.loreText}>
                {props.description ||
                  'The young duchess guarding Necrokeep.'}
              </Text>
            </View>
          </View>

          {/* Right Column: Skills */}
          <View style={styles.detailsSection}>
            {activeTab === 'SKILLS' ? (
              <View>
                {/* Skill Icon Selector */}
                <View style={styles.skillIconsRow}>
                  {MOCK_SKILLS.map((skill, index) => (
                    <TouchableOpacity
                      key={skill.id}
                      style={[
                        styles.skillIconButton,
                        selectedSkill.id === skill.id &&
                        styles.activeSkillIcon,
                      ]}
                      onPress={() => setSelectedSkill(skill)}
                    >
                      {heroAssets?.skills[index] ? (
                        <Image
                          source={heroAssets.skills[index]}
                          style={styles.skillIconImage}
                          resizeMode="cover"
                        />
                      ) : (
                        <Text style={styles.skillIconText}>
                          {index === 0
                            ? 'P'
                            : index === 3
                              ? 'ULT'
                              : `S${index}`}
                        </Text>
                      )}
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Selected Skill Description */}
                <View style={styles.skillInfoCard}>
                  <View style={styles.skillTitleRow}>
                    <Text style={styles.skillName}>
                      {selectedSkill.name}
                    </Text>

                    <View style={styles.skillTypeBadge}>
                      <Text style={styles.skillTypeText}>
                        {selectedSkill.type}
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.skillDescription}>
                    {selectedSkill.description}
                  </Text>
                </View>

                {/* Skill Priority */}
                <View style={styles.priorityBox}>
                  <Text style={styles.sectionHeaderTitle}>
                    Skill Priority
                  </Text>

                  <Text style={styles.priorityText}>
                    Upgrade Skill 2 at Level 1 and prioritize upgrading
                    Skill 2 with Skill 1 as backup. Upgrade the Ultimate
                    whenever it is available.
                  </Text>
                </View>
              </View>
            ) : (
              <View style={styles.placeholderTabContent}>
                <Text style={styles.placeholderText}>
                  Content for {activeTab} coming soon...
                </Text>
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
    backgroundColor: colors.background,
  },

  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderBlue,
  },

  tabItem: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
  },

  activeTabItem: {
    borderBottomWidth: 3,
    borderBottomColor: colors.blue,
    backgroundColor: colors.surfaceBlue,
  },

  tabText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 1,
  },

  activeTabText: {
    color: colors.white,
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
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderBlue,
  },

  heroAvatarBox: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.blueDark,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: colors.blue,
    overflow: 'hidden',
  },

  heroAvatarImage: {
    width: '100%',
    height: '100%',
  },

  avatarInitial: {
    fontSize: 36,
    color: colors.white,
    fontWeight: 'bold',
  },

  heroName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
  },

  heroRole: {
    fontSize: 14,
    color: colors.blueLight,
    marginBottom: 16,
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.borderBlue,
    paddingVertical: 10,
  },

  statItem: {
    alignItems: 'center',
    flex: 1,
  },

  statValue: {
    fontSize: 12,
    color: colors.success,
    fontWeight: 'bold',
  },

  statLabel: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: 2,
  },

  loreBox: {
    backgroundColor: colors.darkBackground,
    padding: 10,
    borderRadius: 6,
    width: '100%',
  },

  loreText: {
    fontSize: 11,
    color: colors.textSecondary,
    fontStyle: 'italic',
    textAlign: 'center',
  },

  detailsSection: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.borderBlue,
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
    backgroundColor: colors.surfaceBlue,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.borderBlue,
    overflow: 'hidden',
  },

  activeSkillIcon: {
    borderColor: colors.blue,
    backgroundColor: colors.blueDark,
  },

  skillIconImage: {
    width: '100%',
    height: '100%',
  },

  skillIconText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 12,
  },

  skillInfoCard: {
    backgroundColor: colors.darkBackground,
    padding: 14,
    borderRadius: 8,
    marginBottom: 16,
  },

  skillTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 10,
    flexWrap: 'wrap',
  },

  skillName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
  },

  skillTypeBadge: {
    backgroundColor: colors.badge,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },

  skillTypeText: {
    fontSize: 10,
    color: colors.skyBlue,
  },

  skillDescription: {
    fontSize: 13,
    color: colors.textBody,
    lineHeight: 20,
  },

  priorityBox: {
    backgroundColor: colors.darkBackground,
    padding: 14,
    borderRadius: 8,
  },

  sectionHeaderTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 6,
  },

  priorityText: {
    fontSize: 12,
    color: colors.textBody,
    lineHeight: 18,
  },

  placeholderTabContent: {
    padding: 40,
    alignItems: 'center',
  },

  placeholderText: {
    color: colors.textSecondary,
    fontSize: 14,
  },

  heroDetailAvatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 35,
  },
});