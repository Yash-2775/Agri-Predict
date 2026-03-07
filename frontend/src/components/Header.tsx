import React from 'react';
import { StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { TEXTS } from '../constants';
import { globalStyles } from '../styles';
import { Language, User } from '../types';

interface HeaderProps {
  user: User;
  onLogout: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout, language, setLanguage }) => {
  const T = TEXTS[language];

  const cycleLanguage = () => {
    const languages = [Language.EN, Language.HI, Language.MR];
    const currentIndex = languages.indexOf(language);
    const nextIndex = (currentIndex + 1) % languages.length;
    setLanguage(languages[nextIndex]);
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#16a34a" />
      <View style={globalStyles.header}>
        <Text style={globalStyles.headerTitle}>{T.appName}</Text>
        <View style={globalStyles.headerRight}>
          <TouchableOpacity style={globalStyles.langButton} onPress={cycleLanguage}>
            <Text style={globalStyles.langButtonText}>{language.toUpperCase()}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={globalStyles.logoutButton} onPress={onLogout}>
            <Text style={globalStyles.logoutButtonText}>{T.logout}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Header;