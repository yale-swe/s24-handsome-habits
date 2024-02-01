import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'react-native'


export default function App() {
  return (
    <View style={styles.container}>
      <Text>This is yims. Welcome. Beware.</Text>
      <Text>Yims is a dangerous place.</Text>
      <Image source={require('./src/images/aminata.png')}
      style = {{ width: 300, height: 400}} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
