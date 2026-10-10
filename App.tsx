import React, { useState } from "react";
import HomeScreen from "./src/screens/HomeScreen";
import HeroesScreen from "./src/screens/HeroesScreen";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'HOME' | 'HEROES'>('HOME');

  return (
    <>
      {currentScreen === 'HEROES' ? (
        <HeroesScreen 
          onHomePress={() => setCurrentScreen('HOME')}
          onHeroesPress={() => setCurrentScreen('HEROES')}
        />
      ) : (
        <HomeScreen 
          onExplorePress={() => setCurrentScreen('HEROES')}
          onHomePress={() => setCurrentScreen('HOME')}
          onHeroesPress={() => setCurrentScreen('HEROES')}
        />
      )}
    </>
  );
}