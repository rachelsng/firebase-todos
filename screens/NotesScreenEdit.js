import React, { useState } from "react";
import { db } from "../firebase";
import { doc, updateDoc, collection } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  Pressable
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function NotesScreenEdit({ route }) {
  const navigation = useNavigation();
  const [editedNote, setEditedNote] = useState("");
  const { title, docId } = route.params;

  async function editNote(doc_id, new_text) {
    console.log(doc_id)
    console.log(new_text)
    const recordToUpdate = doc(db, "notes", doc_id);
    console.log(recordToUpdate)
    await updateDoc(recordToUpdate, { "title": new_text });
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Pressable onPress={() => navigation.goBack()}>
        <FontAwesome name={"arrow-left"} size={24} color={"black"} />
      </Pressable>
      <Text style={styles.title}>edit note</Text>
      <TextInput
        style={styles.noteTitle}
        placeholder={title}
        value={editedNote}
        onChangeText={(text) => setEditedNote(text)}
        selectionColor={"gray"}
      />
      <Pressable style={styles.button} onPress={async () => await editNote(docId,editedNote)}>
        <Text style={styles.buttonText}>Save Updates</Text>
      </Pressable>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 60,
    padding: 25,
  },
  title: {
    fontWeight: "bold",
    marginTop: 30,
    fontSize: 40,
  },
  noteTitle: {
    fontSize: 24,
    fontWeight: "600",
    marginTop: 30,
    marginBottom: 25,
    color: "gray",
  },
  noteBody: {
    fontSize: 15,
    fontWeight: "400",
  },
  button: {
    backgroundColor: "black",
    borderRadius: 15,
    width: "100%",
    marginBottom: 20,
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "400",
    fontSize: 17,
    padding: 20,
    color: "white",
  },
});
