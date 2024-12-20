// export default WelcomeScreen;
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from "react-native";
import LottieView from "lottie-react-native";
import { Platform } from "react-native";

const { width, height } = Dimensions.get("window");

const WelcomeScreen = ({ navigation }) => {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <LinearGradient colors={["#3E2D8F", "#9D52AC"]} style={styles.container}>
        <SafeAreaView style={styles.safeArea} edges={["bottom"]}>
          <View style={styles.animationContainer}>
            <LottieView
              source={require("../assets/Animation-cloud.json")}
              autoPlay
              loop
              resizeMode="contain"
              style={styles.animation}
            />
          </View>
          <Text style={styles.title}>
            <Text style={styles.whiteText}>Weather </Text>
            <Text style={styles.yellowText}>ForeCasts</Text>
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Login")}
          >
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
    overflow: "hidden",
    transform: [{ scale: 1 }],
  },
  safeArea: {
    flex: 1,
    justifyContent: "space-between",
    overflow: "hidden",
  },
  animationContainer: {
    width: "100%",
    height: height * 0.4, // 40% of screen height
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    marginTop: height * 0.2, // 10% of screen height
  },

  animation: {
    width: 500, // Fixed width
    height: 450, // Fixed height
    alignSelf: "center", // Center it
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  whiteText: {
    color: "#FFFFFF",
  },
  yellowText: {
    color: "#FFD700",
  },
  button: {
    backgroundColor: "#FFD700",
    paddingVertical: height * 0.02,
    paddingHorizontal: Platform.OS === "web" ? width * 0.1 : width * 0.3,
    borderRadius: 30,
    alignSelf: "center",
    marginBottom: height * 0.1,
  },
  buttonText: {
    color: "#3E2D8F",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default WelcomeScreen;
