import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, Button, View } from "react-native";
import db from "../db";
import firebase from "@firebase/app";
import "firebase/auth";

export default function LinksScreen() {
  const [allUsers, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState("");


  const handleSet = async () => {
    // const snap = await db
    //   .collection("users")
    //   .doc(firebase.auth().currentUser.uid)
    //   .get();
    //   console.log("snap", snap)
  };

  const handleUsers = async () => {
    await db.collection("users").onSnapshot(querySnapshot => {
      const users = [];
      querySnapshot.forEach(doc => {
        users.push({ id: doc.id, ...doc.data() });
      });
      setUsers([...users]);
    });

    //console.log(" here ", Allusers);
    friendsDB();
  };

  

  const checkFriend = async (user) => {
    //loop through the logged in user friends
    //if found ? return true
    //else return false
    let result = false
    for( let i=0 ; i < loggedInUser[0].friends.length ; i++){
      if( user.id == loggedInUser[0].friends[i] ){
          result = true
      }
    }
    return result
  };

  const addFriend = async( userid) => {
    // let temp = loggedInUser[0].friends
    // temp.push(userid)
    // db.collection("users").doc(loggedInUser[0].id).update({
    //    displayName: loggedInUser[0].displayName, 
    //    friends : temp,
    //    latitude : loggedInUser[0].latitude,
    //    photoURL: loggedInUser[0].photoURL
    //  });
  };

  const removeFriend = ( userid) => {
    // let temp = loggedInUser[0].friends
    // temp = temp.filter( t => t != userid)
    // db.collection("users").doc(loggedInUser[0].id).update({
    //    displayName: loggedInUser[0].displayName, 
    //    friends : temp,
    //    latitude : loggedInUser[0].latitude,
    //    photoURL: loggedInUser[0].photoURL
    //  });
  };

  

  useEffect(() => {
    console.log("start---------------------------");
    handleUsers();
    setLoggedInUser(allUsers.filter( u => u.id == firebase.auth().currentUser.uid));
    //console.log("attempt", allUsers.filter( u => u.id == firebase.auth().currentUser.uid))
    console.log("logged in user:", loggedInUser)
  }, []);

  return (
    <ScrollView style={styles.container}>
    <Text>My Friends</Text>
      {/* {
        loggedInUser[0].friends ? 

        loggedInUser[0].friends.map((u, index) => (
        <View>
          <Text key={index}>{u}</Text>
          <Button title="Remove friend" onPress={() => removeFriend(u.id)} />
        </View>
      ))
      :
      <Text>No Friends !!</Text>} */}
      <Text> Others: </Text>
      {
        allUsers.map( a =>

        checkFriend(a) ?
         null
         :
          <View>
          <Text>{a.id} || {a.displayName}</Text>
          <Button title="Add Friend"  onPress={() => addFriend(a.id)} /> 
          </View>
          )
      }
      <Text>Logged in user id ::: {loggedInUser.id}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  }
});
