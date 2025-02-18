import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import SearchBar from '../components/SearchBar';
import SearchedCity from '../components/SearchedCity';
import UnitToggle from '../components/UnitToggle';
import RecentSearches from '../components/RecentSearch';
import cities from '../../assets/cities.json';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isCelsius, setIsCelsius] = useState(true);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const hour = moment().hour();
    if (hour >= 7 && hour < 19) {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    const loadCachedCity = async () => {
      try {
        const cachedCity = await AsyncStorage.getItem('lastSearchedCity');
        if (cachedCity) {
          setSelectedCity(JSON.parse(cachedCity));
        }
      } catch (e) {
        console.error('Error loading cached city:', e);
      }
    };
    loadCachedCity();
  }, []);

  useEffect(() => {
    const cacheCity = async () => {
      if (selectedCity) {
        try {
          await AsyncStorage.setItem('lastSearchedCity', JSON.stringify(selectedCity));
          setRecentSearches((prev) => {
            const updated = [selectedCity, ...prev.filter(city => city.id !== selectedCity.id)];
            return updated.slice(0, 10);
          });
        } catch (e) {
          console.error('Error caching city:', e);
        }
      }
    };
    cacheCity();
  }, [selectedCity]);

  const handleSearch = (query) => {
    const foundCity = cities.find(
      (city) =>
        city.name.toLowerCase() === query.trim().toLowerCase()
    );
    if (foundCity) {
      setSelectedCity(foundCity);
      setSearchQuery('');
    } else {
      Alert.alert('City not found', 'Please try another city.');
    }
  };

  const toggleFavorite = (city) => {
    setFavorites((prev) => {
      if (prev.some((fav) => fav.id === city.id)) {
        return prev.filter((fav) => fav.id !== city.id);
      } else {
        return [...prev, city];
      }
    });
  };

  const convertTemp = (temp) => {
    if (isCelsius) {
      return `${temp.toFixed(1)}° C`;
    } else {
      return `${((temp * 9) / 5 + 32).toFixed(1)}° F`;
    }
  };

  const themeStyles = theme === 'dark' ? styles.dark : styles.light;

  return (
    <View style={[styles.container, themeStyles]}>
      <Text style={styles.title}>Search City Weather</Text>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={handleSearch}
      />
      {selectedCity && (
        <SearchedCity
          city={selectedCity}
          convertTemp={convertTemp}
          toggleFavorite={toggleFavorite}
          isFavorite={favorites.some((city) => city.id === selectedCity.id)}
        />
      )}
      <UnitToggle isCelsius={isCelsius} setIsCelsius={setIsCelsius} />
      <RecentSearches recentSearches={recentSearches} onSelectCity={(city) => setSelectedCity(city)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  light: {
    backgroundColor: '#f8f8f8',
  },
  dark: {
    backgroundColor: '#222',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: 'tomato',
  },
});

export default Search;
