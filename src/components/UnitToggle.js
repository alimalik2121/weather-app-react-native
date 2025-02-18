import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

const UnitToggle = ({ isCelsius, setIsCelsius }) => {
  return (
    <View style={styles.unitToggle}>
      <Text style={styles.unitText}>{isCelsius ? 'Celsius' : 'Fahrenheit'}</Text>
      <Switch
        value={isCelsius}
        onValueChange={() => setIsCelsius((prev) => !prev)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  unitToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
  },
  unitText: {
    marginRight: 8,
    fontSize: 16,
    color: 'black',
  },
});

export default UnitToggle;
