import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, View } from 'react-native';
import Calculator from './src/Calculator';

export default function App() {
  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/unibra-white.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Calculator />
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    gap: 20,
  },
  logo: {
    width: 220,
    height: 60,
  },
});
