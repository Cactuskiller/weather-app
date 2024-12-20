import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAuth, signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import { MaterialIcons } from "@expo/vector-icons";

const API_KEY = "9790c16fcb392f0d10a5c44b44f40fbd";

export default function WeatherScreen() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();
  const auth = getAuth();

  const fetchWeather = async () => {
    if (!city.trim()) {
      alert("Please enter a city name.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error("City not found. Please try again.");
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace("Login");
    } catch (error) {
      alert("Error logging out: " + error.message);
    }
  };

  const getWeatherAnimation = (weather) => {
    switch (weather?.toLowerCase()) {
      case "clear":
        return require("../assets/Animation-sunny.json");
      case "clouds":
        return require("../assets/Animation-cloud.json");
      case "rain":
        return require("../assets/Animation-rain.json");
      case "snow":
        return require("../assets/Animation-snow.json");
      case "storm":
        return require("../assets/Animation-storm.json");
      case "dust":
        return require("../assets/Animation-dust.json");
      default:
        return require("../assets/Animation-default.json");
    }
  };

  const WeatherInfo = () => (
    <TouchableOpacity
      style={[
        styles.weatherBox,
        { backgroundColor: getBackgroundColor(weatherData?.weather[0]?.main) },
      ]}
      onPress={() => navigation.navigate("WeatherDetail", { weatherData })}
    >
      <Text style={styles.cityName}>{weatherData?.name}</Text>
      <Text style={styles.temperature}>
        {Math.round(weatherData?.main?.temp)}°C
      </Text>
      <Text style={styles.description}>{weatherData?.weather[0]?.main}</Text>
      <LottieView
        source={getWeatherAnimation(weatherData?.weather[0]?.main)}
        autoPlay
        loop
        style={styles.animation}
      />
    </TouchableOpacity>
  );

  const getBackgroundColor = (weather) => {
    switch (weather?.toLowerCase()) {
      case "clear":
        return "#FFD700";
      case "clouds":
        return "#A0C4FF";
      case "rain":
        return "#80B3FF";
      case "snow":
        return "#B3DDF2";
      case "storm":
        return "#1a237e";
      case "dust":
        return "#4e342e";
      default:
        return "#D3D3D3";
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <SafeAreaView style={styles.safeArea}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setMenuVisible(true)}
        >
          <MaterialIcons name="more-horiz" size={40} color="#000" />
        </TouchableOpacity>

        <Text style={styles.title}>Weather App</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter city name"
          placeholderTextColor="#999"
          value={city}
          onChangeText={setCity}
        />

        <TouchableOpacity style={styles.button} onPress={fetchWeather}>
          <Text style={styles.buttonText}>Get Weather</Text>
        </TouchableOpacity>

        {loading && <ActivityIndicator size="large" color="#000" />}
        {error && <Text style={styles.error}>{error}</Text>}
        {weatherData && <WeatherInfo />}
      </SafeAreaView>

      <Modal transparent visible={menuVisible} animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setMenuVisible(false)}
        >
          <View style={styles.menuDropdown}>
            <TouchableOpacity
              onPress={() => {
                setMenuVisible(false);
                navigation.navigate("Profile");
              }}
            >
              <Text style={styles.menuItem}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout}>
              <Text style={styles.menuItem}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  safeArea: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    justifyContent: "center",
  },
  menuButton: {
    position: "absolute",
    top: 20,
    right: 20,
    padding: 8,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: "100%",
    backgroundColor: "#F0F0F0",
    borderRadius: 25,
    paddingHorizontal: 20,
    color: "#333",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#DDD",
  },
  button: {
    backgroundColor: "#FFD700",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 25,
    elevation: 3,
  },
  buttonText: {
    color: "#333",
    fontSize: 18,
    fontWeight: "bold",
  },
  weatherBox: {
    width: "100%",
    padding: 10,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 20,
    elevation: 3,
  },
  cityName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  temperature: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#333",
  },
  description: {
    fontSize: 18,
    color: "#333",
  },
  animation: {
    width: 150,
    height: 150,
    marginTop: 10,
  },
  error: {
    color: "red",
    fontSize: 14,
    textAlign: "center",
    marginTop: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  menuDropdown: {
    backgroundColor: "#FFF",
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 15,
  },
  menuItem: {
    fontSize: 18,
    color: "#333",
    marginBottom: 10,
  },
});
