import React, { useState } from "react";
import HomeScreen from "./src/screens/HomeScreen";
import HeroesScreen from "./src/screens/HeroesScreen";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'HOME' | 'HEROES'>('HOME');
  const handleExplorePress = () => setCurrentScreen('HEROES');

  if (currentScreen === 'HEROES') {
    return <HeroesScreen onBackToHome={() => setCurrentScreen('HOME')} />;
  }

  return (
    <HomeScreen
      {...({ onExplorePress: handleExplorePress } as any)}
    />
  );
}