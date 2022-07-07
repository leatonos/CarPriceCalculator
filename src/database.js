import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState } from "react";
import App from './App';


//Database Firebase imports
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDtxJnuvz51FvawLo4l0p3X8peb1HHv-08",
  authDomain: "carcalculator-94ada.firebaseapp.com",
  projectId: "carcalculator-94ada",
  storageBucket: "carcalculator-94ada.appspot.com",
  messagingSenderId: "1028860607706",
  appId: "1:1028860607706:web:1cbe08294c7f687bf239e3",
  measurementId: "G-N9YYZQ3Y8H"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

//Get all brands

class Database {

    loadAllBrands = async () => {

      let result = []

      const querySnapshot = await getDocs(collection(db, "brand"));
      querySnapshot.forEach((doc) => {
        result.push(doc.data().name)
      })

      return result;

    }

    //Returns all the models from a brand
    modelsFromBrand = async (brand) =>{
      const q = query(collection(db, "brand"), where("name", "==", brand));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });

    }

    //Returns all colors available and the price for the chosen model
    infoFromModel = (model) =>{
      const q = query(collection(db, "model"), where("name", "==", model));

      const querySnapshot = getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
      });

    }
   

    //Returns the price of a color
    getColorPrice = (color) =>{
      let colorPrice = 0;
      db.collection("colors").where("name", "==", color)
      .get()
      .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            colorPrice = doc.data().price;
            
          });
      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });
      
    }
    

}

export {Database};
