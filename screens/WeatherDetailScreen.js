import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import { Ionicons } from "@expo/vector-icons"; // For the arrow icon

const API_KEY = "9790c16fcb392f0d10a5c44b44f40fbd";

export default function WeatherDetails() {
  const route = useRoute();
  const navigation = useNavigation(); // For navigating back
  const { weatherData } = route.params;

  const [forecastData, setForecastData] = useState([]);
  const [backgroundColor, setBackgroundColor] = useState("#D3D3D3");

  const fetchForecast = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${weatherData.name}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      const dailyData = data.list.filter((entry) =>
        entry.dt_txt.includes("12:00:00")
      );
      setForecastData(dailyData);
    } catch (error) {
      console.error("Error fetching forecast data:", error);
    }
  };

  const setDynamicBackground = () => {
    const weather = weatherData.weather[0]?.main?.toLowerCase();
    switch (weather) {
      case "clear":
        setBackgroundColor("#FFD700");
        break;
      case "clouds":
        setBackgroundColor("#A0C4FF");
        break;
      case "rain":
        setBackgroundColor("#80B3FF");
        break;
      case "snow":
        setBackgroundColor("#B3DDF2");
        break;
      case "storm":
        setBackgroundColor("#1a237e");
        break;
      case "dust":
        setBackgroundColor("#4e342e");
        break;
      default:
        setBackgroundColor("#D3D3D3");
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

  useEffect(() => {
    fetchForecast();
    setDynamicBackground();
  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />

      {/* Back Arrow */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={30} color="#333" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* City Name and Temperature */}
        <Text style={styles.cityName}>{weatherData.name}</Text>
        <Text style={styles.temperature}>
          {Math.round(weatherData.main.temp)}°C
        </Text>
        <Text style={styles.description}>{weatherData.weather[0].main}</Text>

        {/* Weather Animation */}
        <LottieView
          source={getWeatherAnimation(weatherData.weather[0].main)}
          autoPlay
          loop
          style={styles.animation}
        />

        {/* Weekly Forecast */}
        <View style={styles.weeklyContainer}>
          <Text style={styles.sectionTitle}>Weekly Forecast</Text>
          {forecastData.map((day, index) => (
            <View key={index} style={styles.dayBox}>
              <Text style={styles.dayText}>
                {new Date(day.dt_txt).toLocaleDateString("en-US", {
                  weekday: "short",
                })}
              </Text>
              <Text style={styles.tempText}>{Math.round(day.main.temp)}°C</Text>
              <Text style={styles.weatherText}>{day.weather[0].main}</Text>
            </View>
          ))}
        </View>

        {/* Extra Weather Details */}
        <View style={styles.extraDetailsContainer}>
          <View style={styles.detailBox}>
            <Text style={styles.detailTitle}>Humidity</Text>
            <Text style={styles.detailValue}>{weatherData.main.humidity}%</Text>
          </View>
          <View style={styles.detailBox}>
            <Text style={styles.detailTitle}>Pressure</Text>
            <Text style={styles.detailValue}>
              {weatherData.main.pressure} hPa
            </Text>
          </View>
          <View style={styles.detailBox}>
            <Text style={styles.detailTitle}>Wind</Text>
            <Text style={styles.detailValue}>{weatherData.wind.speed} m/s</Text>
          </View>
          <View style={styles.detailBox}>
            <Text style={styles.detailTitle}>Feels Like</Text>
            <Text style={styles.detailValue}>
              {Math.round(weatherData.main.feels_like)}°C
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight, // This adds padding for the status bar height
  },
  backButton: {
    position: "absolute",
    top: 40, // Adjust top position
    left: 20, // Adjust left position
    zIndex: 10,
    backgroundColor: "#ffffff",
    borderRadius: 50,
    padding: 5,
    elevation: 5,
  },
  scrollView: {
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 30,
  },
  cityName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  temperature: {
    fontSize: 64,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  description: {
    fontSize: 24,
    color: "#555",
    marginBottom: 5,
  },
  animation: {
    width: 350,
    height: 350,
  },
  weeklyContainer: {
    width: "90%",
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  dayBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#DDD",
  },
  dayText: {
    fontSize: 18,
    color: "#333",
  },
  tempText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#555",
  },
  weatherText: {
    fontSize: 18,
    color: "#666",
  },
  extraDetailsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "90%",
    marginTop: 10,
  },
  detailBox: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
  },
  detailTitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  detailValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
});
