import React, { useRef, useState } from "react";
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
} from "react-native";
import { colors } from "../theme";
import mlbbLogo from "../assets/images/mlbb-logo.png";

const introVideo = "/src/assets/intro.mp4";

interface HomeScreenProps {
    onExplorePress?: () => void;
    onHomePress?: () => void;
    onHeroesPress?: () => void;
}

export default function HomeScreen({ onExplorePress, onHomePress, onHeroesPress }: HomeScreenProps) {
    const { width } = useWindowDimensions();
    const videoRef = useRef<HTMLVideoElement>(null);
    const [muted, setMuted] = useState(true);

    const mobile = width < 700;

    const toggleSound = () => {
        const video = videoRef.current;
        if (!video) return;

        const nextMuted = !video.muted;
        video.muted = nextMuted;
        setMuted(nextMuted);

        if (!nextMuted) {
            video.play().catch(() => { });
        }
    };

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
        >
            {/* Header Section */}
            <View style={[styles.header, mobile && styles.headerMobile]}>
                <Image
                    source={mlbbLogo}
                    style={styles.logoImage}
                    resizeMode="contain"
                />

                <View style={styles.nav}>
                    <Pressable onPress={onHomePress}>
                        <Text style={[styles.navItem, styles.activeNav]}>HOME</Text>
                    </Pressable>

                    <Pressable onPress={onHeroesPress || onExplorePress}>
                        <Text style={styles.navItem}>HEROES</Text>
                    </Pressable>
                </View>
            </View>

            {/* Hero Introduction Banner */}
            <View style={[styles.intro, mobile && styles.introMobile]}>
                <View style={styles.glow} />

                <Text style={styles.kicker}>MOBILE LEGENDS: BANG BANG</Text>

                <Text style={[styles.title, mobile && styles.titleMobile]}>
                    MASTER YOUR HERO
                </Text>

                <Text style={styles.description}>
                    Explore heroes, abilities, stories and essential information from
                    the Land of Dawn.
                </Text>

                <Pressable style={styles.exploreButton} onPress={onExplorePress || onHeroesPress}>
                    <Text style={styles.exploreText}>EXPLORE HEROES</Text>
                </Pressable>
            </View>

            {/* Cinematic Trailer Section */}
            <View style={styles.videoSection}>
                <View style={[styles.videoHeader, mobile && styles.videoHeaderMobile]}>
                    <View style={styles.videoHeading}>
                        <Text style={styles.sectionLabel}>THE BATTLE AWAITS</Text>
                        <Text style={[styles.sectionTitle, mobile && styles.mobileSectionTitle]}>
                            ENTER THE LAND OF DAWN
                        </Text>
                    </View>

                    <Pressable style={styles.soundButton} onPress={toggleSound}>
                        <Text style={styles.soundText}>
                            {muted ? "🔇 SOUND OFF" : "🔊 SOUND ON"}
                        </Text>
                    </Pressable>
                </View>

                <View style={styles.videoWrapper}>
                    <video
                        ref={videoRef}
                        src={introVideo}
                        autoPlay
                        muted
                        loop
                        playsInline
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                            display: "block",
                            backgroundColor: "#080c18",
                        }}
                    />

                    <View pointerEvents="none" style={styles.videoBorder} />
                </View>
            </View>

            {/* Information Section */}
            <View style={[styles.infoSection, mobile && styles.infoMobile]}>
                <Text style={styles.sectionLabel}>HERO KNOWLEDGE</Text>

                <Text style={[styles.sectionTitle, mobile && styles.mobileSectionTitle]}>
                    KNOW YOUR HERO. PLAY BETTER.
                </Text>

                <Text style={styles.infoText}>
                    Discover hero abilities, stories, difficulty and other important
                    information to better understand your favorite heroes.
                </Text>

                <View style={styles.featureRow}>
                    <Feature
                        title="HEROES"
                        text="Explore detailed information about every available hero."
                    />

                    <Feature
                        title="SKILLS"
                        text="Understand passive abilities, skills and ultimates."
                    />

                    <Feature
                        title="DETAILS"
                        text="Learn each hero's story, difficulty and characteristics."
                    />
                </View>
            </View>
        </ScrollView>
    );
}

function Feature({
    title,
    text,
}: {
    title: string;
    text: string;
}) {
    return (
        <View style={styles.feature}>
            <View style={styles.featureAccent} />

            <Text style={styles.featureTitle}>{title}</Text>

            <Text style={styles.featureText}>{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    content: {
        paddingBottom: 80,
    },
    header: {
        height: 76,
        paddingHorizontal: 48,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: colors.background,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(142,162,203,0.15)",
    },
    headerMobile: {
        height: 64,
        paddingHorizontal: 18,
    },
    logoImage: {
        width: 140,
        height: 44,
    },
    nav: {
        flexDirection: "row",
        gap: 28,
    },
    navItem: {
        color: colors.muted,
        fontSize: 11,
        fontWeight: "900",
        letterSpacing: 1.4,
    },
    activeNav: {
        color: colors.gold,
    },
    intro: {
        minHeight: 430,
        paddingHorizontal: 48,
        paddingVertical: 80,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
    },
    introMobile: {
        minHeight: 400,
        paddingHorizontal: 24,
        paddingVertical: 65,
    },
    glow: {
        position: "absolute",
        width: 420,
        height: 420,
        borderRadius: 210,
        backgroundColor: colors.blue,
        opacity: 0.1,
        top: -180,
        right: -100,
    },
    kicker: {
        color: colors.orange,
        fontSize: 11,
        fontWeight: "900",
        letterSpacing: 2,
        textAlign: "center",
        marginBottom: 16,
    },
    title: {
        color: colors.white,
        fontSize: 58,
        lineHeight: 64,
        fontWeight: "900",
        letterSpacing: 2,
        textAlign: "center",
    },
    titleMobile: {
        fontSize: 36,
        lineHeight: 42,
    },
    description: {
        maxWidth: 650,
        marginTop: 18,
        color: colors.muted,
        fontSize: 15,
        lineHeight: 24,
        textAlign: "center",
    },
    exploreButton: {
        marginTop: 30,
        paddingHorizontal: 28,
        paddingVertical: 14,
        borderRadius: 5,
        backgroundColor: colors.blue,
    },
    exploreText: {
        color: colors.white,
        fontSize: 11,
        fontWeight: "900",
        letterSpacing: 1.2,
    },
    videoSection: {
        width: "100%",
        maxWidth: 1200,
        alignSelf: "center",
        paddingHorizontal: 24,
        paddingVertical: 30,
    },
    videoHeader: {
        marginBottom: 18,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        gap: 20,
    },
    videoHeaderMobile: {
        alignItems: "flex-start",
        flexDirection: "column",
    },
    videoHeading: {
        flex: 1,
    },
    sectionLabel: {
        color: colors.orange,
        fontSize: 10,
        fontWeight: "900",
        letterSpacing: 1.8,
    },
    sectionTitle: {
        marginTop: 6,
        color: colors.white,
        fontSize: 25,
        fontWeight: "900",
        letterSpacing: 1,
    },
    mobileSectionTitle: {
        fontSize: 20,
    },
    soundButton: {
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 5,
        backgroundColor: colors.card,
        borderWidth: 1,
        borderColor: colors.accent,
    },
    soundText: {
        color: colors.white,
        fontSize: 10,
        fontWeight: "900",
        letterSpacing: 0.7,
    },
    videoWrapper: {
        width: "100%",
        aspectRatio: 16 / 9,
        overflow: "hidden",
        borderRadius: 8,
        backgroundColor: "#080c18",
        borderWidth: 1,
        borderColor: colors.accent,
        position: "relative",
    },
    videoBorder: {
        position: "absolute",
        inset: 0,
        borderWidth: 1,
        borderColor: "rgba(251,194,51,0.2)",
    },
    infoSection: {
        width: "100%",
        maxWidth: 1200,
        alignSelf: "center",
        paddingHorizontal: 24,
        paddingTop: 70,
    },
    infoMobile: {
        paddingTop: 45,
    },
    infoText: {
        maxWidth: 720,
        marginTop: 15,
        color: colors.muted,
        fontSize: 14,
        lineHeight: 23,
    },
    featureRow: {
        marginTop: 38,
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 16,
    },
    feature: {
        flex: 1,
        minWidth: 190,
        padding: 22,
        backgroundColor: colors.card,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "rgba(61,94,157,0.45)",
    },
    featureAccent: {
        width: 32,
        height: 3,
        marginBottom: 17,
        backgroundColor: colors.gold,
    },
    featureTitle: {
        color: colors.white,
        fontSize: 13,
        fontWeight: "900",
        letterSpacing: 1,
    },
    featureText: {
        marginTop: 8,
        color: colors.muted,
        fontSize: 12,
        lineHeight: 19,
    },
});