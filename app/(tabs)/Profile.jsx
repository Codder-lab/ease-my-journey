import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useNavigation, useRouter } from "expo-router";
import { auth, db } from "../../configs/FirebaseConfig";
import { signOut, updateProfile } from "firebase/auth";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import { Colors } from "../../constants/Colors";

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
      .then(() => router.replace("auth/signin"))
      .catch((error) => Alert.alert("Logout Error", error.message));
  };

  const handleEditProfile = async () => {
    if (!editedName.trim() || !editedEmail.trim()) {
      Alert.alert("Validation Error", "Name and Email cannot be empty.");
      return;
    }

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

      <TouchableOpacity
        style={styles.editBtn}
        onPress={() => {
          setEditedName(userData.fullName);
          setEditedEmail(userData.email);
          setModalVisible(true);
        }}
      >
        <Text style={styles.btnText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

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
            >
              <Text style={styles.btnText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => setModalVisible(false)}
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
    paddingTop: 50,
    backgroundColor: Colors.WHITE,
  },
  avatar: {
    width: 200,
    height: 200,
  },
  name: {
    fontSize: 24,
    fontFamily: "outfit-bold",
    marginTop: 15,
  },
  email: {
    fontSize: 16,
    color: "#7d7d7d",
    marginTop: 5,
  },
  phone: {
    fontSize: 16,
    color: "#7d7d7d",
    marginTop: 5,
  },
  editBtn: {
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
    width: "70%",
  },
  logoutBtn: {
    backgroundColor: "#fa1232",
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    width: "70%",
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: Colors.WHITE,
    padding: 20,
    borderRadius: 15,
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: "outfit-bold",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#7d7d7d",
    marginBottom: 15,
  },
  saveButtonText: {
    textAlign: "center",
    color: Colors.WHITE,
    fontFamily: "outfit-bold",
  },
  saveBtn: {
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  cancelButtonText: {
    textAlign: "center",
    color: Colors.WHITE,
    fontFamily: "outfit-bold",
  },
  cancelBtn: {
    backgroundColor: "#fa1232",
    padding: 15,
    borderRadius: 10,
  },
  editButtonText: {
    textAlign: "center",
    color: Colors.WHITE,
    fontFamily: "outfit-bold",
  },
});
