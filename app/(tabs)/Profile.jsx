import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  TextInput,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useNavigation, useRouter } from "expo-router";
import { auth, db } from "../../configs/FirebaseConfig";
import { signOut, updateProfile } from "firebase/auth";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import { Colors } from "../../constants/Colors";
import Constants from "expo-constants";
import { width, height } from "../../constants/Dimensions";

export default function Profile() {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({
    fullName: "John Doe",
    email: "johndoe@example.com",
    phone: "+1234567890",
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Profile",
      headerStyle: { backgroundColor: Colors.PRIMARY },
      headerTintColor: Colors.WHITE,
    });

    const fetchUserData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserData({
            fullName: userData.fullName || "John Doe",
            email: userData.email,
            phone: userData.phone || "+1234567890",
          });
        }
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out successfully");
        ToastAndroid.show("User signed out successfully", ToastAndroid.TOP);
        router.replace("auth/signin");
      })
      .catch((error) => Alert.alert("Logout Error", error.message));
  };

  const handleEditProfile = async () => {
    if (!editedName.trim() || !editedEmail.trim()) {
      Alert.alert("Validation Error", "Name and Email cannot be empty.");
      return;
    }

    setLoading(true);

    try {
      const currentUser = auth.currentUser;

      if (currentUser) {
        // Update Firebase Auth
        await updateProfile(currentUser, {
          displayName: editedName,
        });

        // Update Firestore
        const userRef = doc(db, "users", currentUser.uid);
        await updateDoc(userRef, {
          fullName: editedName,
          email: editedEmail,
        });

        // Update local state
        setUserData((prev) => ({
          ...prev,
          fullName: editedName,
          email: editedEmail,
        }));

        setModalVisible(false);
        Alert.alert("Success", "Profile updated successfully");
      } else {
        Alert.alert("Error", "No user is currently logged in.");
      }
    } catch (error) {
      Alert.alert("Update Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = () => {
    setEditedName(userData.fullName);
    setEditedEmail(userData.email);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-male-user-profile-vector-illustration-isolated-background-man-profile-sign-business-concept_157943-38764.jpg",
        }}
        style={styles.avatar}
      />

      <Text style={styles.name}>{userData.fullName}</Text>
      <Text style={styles.email}>{userData.email}</Text>

      <TouchableOpacity style={styles.editBtn} onPress={openEditModal}>
        <Text style={styles.btnText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>
          App Version: {Constants.expoConfig.version}
        </Text>
      </View>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Profile</Text>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={editedName}
              onChangeText={setEditedName}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={editedEmail}
              onChangeText={setEditedEmail}
            />
            <TouchableOpacity
              style={styles.saveBtn}
              onPress={handleEditProfile}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={Colors.WHITE} />
              ) : (
                <Text style={styles.btnText}>Save</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => setModalVisible(false)}
              disabled={loading}
            >
              <Text style={styles.logoutText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: width * 0.14,
    backgroundColor: Colors.WHITE,
  },
  avatar: {
    width: width * 0.4,
    height: height * 0.22,
  },
  name: {
    fontSize: width * 0.06,
    fontFamily: "outfit-bold",
    marginTop: width * 0.04,
  },
  email: {
    fontSize: width * 0.035,
    color: "#7d7d7d",
    marginTop: width * 0.02,
  },
  editBtn: {
    backgroundColor: Colors.PRIMARY,
    padding: width * 0.04,
    borderRadius: width * 0.03,
    marginTop: width * 0.07,
    width: width * 0.7,
  },
  logoutBtn: {
    backgroundColor: "#fa1232",
    padding: width * 0.04,
    borderRadius: width * 0.03,
    marginTop: width * 0.04,
    width: width * 0.7,
  },
  btnText: {
    textAlign: "center",
    color: Colors.WHITE,
    fontFamily: "outfit-bold",
  },
  logoutText: {
    textAlign: "center",
    color: Colors.WHITE,
    fontFamily: "outfit-bold",
  },
  versionContainer: {
    marginTop: width * 0.68,
  },
  versionText: {
    fontSize: width * 0.035,
    color: "#7d7d7d",
    marginTop: width * 0.01,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: Colors.WHITE,
    padding: width * 0.05,
    borderRadius: width * 0.03,
    width: width * 0.8,
  },
  modalTitle: {
    fontSize: width * 0.05,
    fontFamily: "outfit-bold",
    marginBottom: width * 0.04,
    textAlign: "center",
  },
  input: {
    padding: width * 0.04,
    borderWidth: 1,
    borderRadius: width * 0.03,
    borderColor: "#7d7d7d",
    marginBottom: width * 0.04,
  },
  saveBtn: {
    backgroundColor: Colors.PRIMARY,
    padding: width * 0.04,
    borderRadius: width * 0.03,
    marginBottom: width * 0.04,
    alignItems: "center",
  },
  cancelBtn: {
    backgroundColor: "#fa1232",
    padding: width * 0.04,
    borderRadius: width * 0.03,
    alignItems: "center",
  },
});
