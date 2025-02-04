import React, { useState, useEffect } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  View,
  TextInput
} from "react-native";
import firebase from "@firebase/app";
import "firebase/auth";
import { MonoText } from "../components/StyledText";
import db from "../db";
import "firebase/auth";
import "firebase/database";
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

export default ({ message, handleUpdate }) => {
  const [user, setUser] = useState(null);

  const handleUser=async() => {
   const snap = await db.collection(`users`).doc(message.from).onSnapshot(
    
      docSnapshot => {
        //console.log("user snap shot",docSnapshot)
        //console.log("user snap shot data",docSnapshot.data())
        setUser(docSnapshot.data())
      }
   )
   //console.log("massage from",snap.data())
      setUser(snap.data())  
  };

  useEffect (() => {
    handleUser()
    //console.log("photo url",user.photoURL)
  },[])

  const handleDelete = message => {
    db.collection("messages")
      .doc(message.id)
      .delete();
  };
  return (
   user && <>

<Image style={{width:50 , height:50,paddingTop:30}} source={{ uri: user.photoURL}} />
      <Text>
        From: {user.displayName} 
      </Text>
      
      <Text>
        To:{message.to}
      </Text>
      <Text>
        Message: {message.text}  {/*user.photoURL*/}
      </Text>
      <View style={{flexDirection:"row"}}>
      <Button title="X" onPress={() => handleDelete(message)}></Button>
      <Button title="Edit" onPress={() => handleUpdate(message)}></Button>
      </View>
   
    </>
    
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center"
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)"
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 24,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7"
  }
});
