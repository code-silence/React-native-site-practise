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

import { colors } from '../theme';
import { HEROES_DATA, ROLES, type Hero } from '../data/heroes';

interface HeroesScreenProps {
  onBackToHome?: () => void;
}



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
    backgroundColor: colors.darkBackground,
    paddingHorizontal: 16,
    paddingTop: 16,
    width: '100%',
    minHeight: '100vh',
  },

  homeBackButton: {
    alignSelf: 'flex-start',
    backgroundColor: colors.surfaceLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 8,
  },

  homeBackButtonText: {
    color: colors.blueLight,
    fontWeight: 'bold',
    fontSize: 13,
  },

  header: {
    marginBottom: 16,
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
    letterSpacing: 1,
  },

  headerSubtitle: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 4,
  },

  searchContainer: {
    marginBottom: 16,
  },

  searchInput: {
    backgroundColor: colors.surfaceLight,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: colors.white,
    fontSize: 16,
  },

  filterContainer: {
    marginBottom: 16,
    height: 40,
  },

  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.surfaceLight,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
  },

  activeFilterButton: {
    backgroundColor: colors.blue,
    borderColor: colors.blue,
  },

  filterButtonText: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '600',
  },

  activeFilterButtonText: {
    color: colors.white,
  },

  listContainer: {
    paddingBottom: 24,
    flexGrow: 1,
  },

  heroCard: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceLight,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },

  heroAvatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.blueDark,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },

  heroAvatarText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },

  heroInfo: {
    flex: 1,
  },

  heroName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
  },

  heroSpecialty: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },

  heroMeta: {
    alignItems: 'flex-end',
  },

  roleBadge: {
    fontSize: 12,
    color: colors.blueLight,
    fontWeight: '600',
    marginBottom: 4,
  },

  winRateText: {
    fontSize: 12,
    color: colors.success,
  },

  detailHeaderBar: {
    paddingVertical: 10,
  },

  backButton: {
    alignSelf: 'flex-start',
    backgroundColor: colors.surfaceLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.border,
  },

  backButtonText: {
    color: colors.blueLight,
    fontWeight: 'bold',
    fontSize: 13,
  },

  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderBlue,
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
    borderBottomColor: colors.blue,
    backgroundColor: colors.surfaceBlue,
  },

  tabText: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: 'bold',
  },

  activeTabText: {
    color: colors.white,
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
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderBlue,
    minWidth: 260,
  },

  heroAvatarBox: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.blueDark,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: colors.blue,
  },

  avatarInitial: {
    fontSize: 30,
    color: colors.white,
    fontWeight: 'bold',
  },

  heroDetailName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
  },

  heroDetailRole: {
    fontSize: 13,
    color: colors.blueLight,
    marginBottom: 12,
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.borderBlue,
    paddingVertical: 8,
  },

  statItem: {
    alignItems: 'center',
    flex: 1,
  },

  statValue: {
    fontSize: 11,
    color: colors.success,
    fontWeight: 'bold',
  },

  statLabel: {
    fontSize: 9,
    color: colors.textSecondary,
    marginTop: 2,
  },

  loreBox: {
    backgroundColor: colors.darkBackground,
    padding: 8,
    borderRadius: 6,
    width: '100%',
  },

  loreText: {
    fontSize: 10,
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
    backgroundColor: colors.surfaceBlue,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderBlue,
  },

  activeSkillIconButton: {
    borderColor: colors.blue,
    backgroundColor: colors.blueDark,
  },

  skillIconText: {
    color: colors.white,
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
    color: colors.white,
  },

  badgeRow: {
    flexDirection: 'row',
    gap: 6,
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
    fontWeight: '600',
  },

  skillDescriptionText: {
    fontSize: 13,
    color: colors.textBody,
    lineHeight: 20,
    marginBottom: 16,
  },

  sectionContainer: {
    backgroundColor: colors.darkBackground,
    padding: 14,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.surfaceLight,
  },

  comboCardContainer: {
    backgroundColor: colors.darkBackground,
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.surfaceLight,
  },

  sectionHeaderTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 4,
  },

  dividerLine: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 8,
  },

  sectionContentText: {
    fontSize: 12,
    color: colors.textBody,
    lineHeight: 18,
  },

  comboSubHeader: {
    fontSize: 10,
    fontWeight: '900',
    color: colors.blueLight,
    letterSpacing: 1,
  },

  placeholderTabContent: {
    padding: 40,
    alignItems: 'center',
  },

  placeholderText: {
    color: colors.textSecondary,
    fontSize: 13,
  },
});