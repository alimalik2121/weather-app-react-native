import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./src/components/Tabs";
import { useGetWeather } from "./src/hooks/useGetWeather";

const App = () => {
  const [ loading, error, weather] = useGetWeather()
  console.log(loading, error, weather)

  if ( weather && weather.list) {
    return (
      <NavigationContainer>
        <Tabs weather={weather}/>
      </NavigationContainer>
    )
  }

    return (
      <View style={styles.container}>
        <ActivityIndicator size={'large'} color={'blue'} />
      </View>
    )
  }

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1
  }
})

export default App;