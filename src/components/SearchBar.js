import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

const SearchBar = ({ searchQuery, setSearchQuery, onSearch }) => {
  return (
    <View style={styles.searchContainer}>
      <TextInput 
        style={styles.input}
        placeholder="Enter city name"
        placeholderTextColor="#888"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <TouchableOpacity style={styles.searchButton} onPress={() => onSearch(searchQuery)}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    backgroundColor: 'white',
  },
  searchButton: {
    backgroundColor: 'tomato',
    paddingVertical: 10,
    paddingHorizontal: 16,
    justifyContent: 'center',
    marginLeft: 8,
    borderRadius: 4,
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default SearchBar;
