import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import LottieView from "lottie-react-native";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function ProfileScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileData, setProfileData] = useState({});
  const auth = getAuth();
  const firestore = getFirestore();
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch User Data
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          setEmail(user.email);
          const docRef = doc(firestore, "users", user.uid);
          const userSnap = await getDoc(docRef);

          if (userSnap.exists()) {
            const data = userSnap.data();
            setName(data.name || "No Name");
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={30} color="#333" />
      </TouchableOpacity>

      <View style={styles.animationContainer}>
        <LottieView
          source={require("../assets/Animation-profile.json")}
          autoPlay
          loop
          resizeMode="contain"
          style={styles.animation}
        />
      </View>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.subtitle}>{email}</Text>
    </View>
  );
}

const GoalBox = ({ title, value, color }) => (
  <View style={[styles.goalBox, { backgroundColor: color }]}>
    <Text style={styles.goalTitle}>{title}</Text>
    <Text style={styles.goalValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8FA",
    alignItems: "center",
    paddingTop: 60,
  },
  animationContainer: {
    width: "100%",
    height: height * 0.3,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  animation: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#777",
    marginBottom: 30,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
  },
});
