// export default WelcomeScreen;
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';

const WelcomeScreen = ({ navigation }) => {
  return (
    <>
   
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <LinearGradient
        colors={['#3E2D8F', '#9D52AC']}
        style={styles.container}
      >
        <SafeAreaView style={styles.safeArea} edges={['bottom']}>
          
          <View style={styles.animationContainer}>
            <LottieView
              source={require('../assets/Animation-cloud.json')} 
              autoPlay
              loop
              style={styles.animation}
            />
          </View>
          <Text style={styles.title}>
            <Text style={styles.whiteText}>Weather </Text>
            <Text style={styles.yellowText}>ForeCasts</Text>
          </Text>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttonText}>Get Start</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
   
  },
  animationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    marginTop: 70,
    width: 400,
    height: 400,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  whiteText: {
    color: '#FFFFFF',
  },
  yellowText: {
    color: '#FFD700',
  },
  button: {
    backgroundColor: '#FFD700',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    alignSelf: 'center',
    marginBottom: 150,
  },
  buttonText: {
    color: '#3E2D8F',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
