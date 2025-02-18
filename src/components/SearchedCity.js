import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SearchedCity = ({ city, convertTemp, toggleFavorite, isFavorite }) => {
  return (
    <View style={styles.cityContainer}>
      <Text style={styles.cityName}>
        {city.name}, {city.country}
      </Text>
      <Text style={styles.tempText}>
        Temperature: {convertTemp(city.temp)}
      </Text>
      <TouchableOpacity onPress={() => toggleFavorite(city)}>
        <Text style={styles.favoriteText}>
          {isFavorite ? '★ Favorited' : '☆ Mark as Favorite'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cityContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  cityName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'tomato',
  },
  tempText: {
    fontSize: 16,
    marginVertical: 4,
    color: 'black',
  },
  favoriteText: {
    fontSize: 18,
    marginTop: 8,
    color: '#ffcc00',
  },
});

export default SearchedCity;
