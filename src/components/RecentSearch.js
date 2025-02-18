import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const RecentSearches = ({ recentSearches, onSelectCity }) => {
  return (
    <View style={styles.recentContainer}>
      <Text style={styles.recentTitle}>Recent Searches</Text>
      <FlatList
        data={recentSearches}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onSelectCity(item)}>
            <Text style={styles.recentItem}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  recentContainer: {
    flex: 1,
    marginTop: 16,
  },
  recentTitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 8,
    color: 'tomato',
  },
  recentItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    textAlign: 'center',
    fontSize: 16,
    color: 'black',
  },
});

export default RecentSearches;
