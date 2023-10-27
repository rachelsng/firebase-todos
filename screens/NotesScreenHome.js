import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, Pressable, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import {
  collection,
  onSnapshot,
  query,
  deleteDoc,
  doc,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase";

export default function NotesScreenHome() {
  const navigation = useNavigation();
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "notes"), orderBy("title"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const posts = querySnapshot.docs.map((doc, index) => {
        return { ...doc.data(), id: index, docId: doc.id };
      });

      setNotes(posts);
    }); //on changes in the notes collection ...

    return () => {
      unsubscribe();
    };
  }, []); // runs everytime the page first loads

  function renderItem({ item }) {
    return (
      <View style={styles.noteCard}>
        <Pressable onPress={() => navigation.navigate("Edit", { title: item.title, docId: item.docId })}>
          <Text style={styles.noteCardTitle}>{item.title}</Text>
        </Pressable>
        <Pressable onPress={() => deleteDoc(doc(db, "notes", item.docId))}>
          <FontAwesome name={"remove"} size={24} color={"black"} />
        </Pressable>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>notes</Text>

      <FlatList
        data={notes}
        renderItem={renderItem}
        keyExtractor={(post) => post.id.toString()}
      />

      <View style={{ flex: 1 }} />
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Add")}
      >
        <Text style={styles.buttonText}>Add</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  noteCard: {
    borderColor: "gray",
    borderWidth: 1,
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  noteCardTitle: {
    fontSize: 13,
    fontWeight: "500",
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 100,
    padding: 25,
  },
  title: {
    fontWeight: "bold",
    fontSize: 40,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "black",
    borderRadius: 15,
    width: "100%",
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "400",
    fontSize: 17,
    padding: 20,
    color: "white",
  },
});
