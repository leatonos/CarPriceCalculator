import {Database} from './database.js';
import car from './img/civic-black.webp';
import './css/App.css';
import './css/checkbox.css';
import './css/select-style.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState, useEffect } from "react";
import { render } from '@testing-library/react';



//Database Firebase imports
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, query, where, getDocs, getDoc, doc } from "firebase/firestore";


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

//const db = new Database([]);



//Rendering app
class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      brands:[],
      models:[],
      colors:[],
      brand:"", 
      model:"",
      color:"",
      accessories:[],
      modelPrice:0,
      colorPrice:0,
      accessoriesPrice:0,
    };

  }

  componentDidMount() {
    this.loadAllBrands();
  }

  loadAllBrands = async () => {

    let result = []

    const querySnapshot = await getDocs(collection(db, "brand"));
    querySnapshot.forEach((doc) => {
      result.push(doc.data().name)
    })    
    this.setState({brands:result})
  }

  
  brandChange = async (a) => {

    this.setState({brand: a.target.value, model:"",color:""});


      let brand = a.target.value;
      let result = []

      const q = query(collection(db, "model"), where("brand", "==", brand));
      
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        result.push(doc.data().name)
      });

      this.setState({models:result})
  }
  
  modelChange = async (a) => {
    let model = a.target.value;
    this.setState({model: a.target.value, color:""});

    const q = query(collection(db, "model"), where("name", "==", model));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        this.setState({colors:doc.data().colors})
        this.setState({modelPrice: doc.data().price})
      });
  }
  colorChange = async (a) => {
    let colorSelected = a.target.value;
    this.setState({color: a.target.value});

    const docRef = doc(db, "colors", colorSelected);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      this.setState({colorPrice:docSnap.data().price})
    } else {
      console.log("Color not found!");
    }

  }

  getAccessories = (a) => {
    let accessories = [...document.querySelectorAll('.accessory:checked')].map(e => e.value);
    this.setState({accessories: accessories})

    const accessoriesPrices = [
      {name:"Air Conditioner",price:120},
      {name:"Electric Steering",price:250},
      {name:"Automatic Transmission",price:340},
      {name:"Reverse Sensor",price:480},
    ]

    let total = 0;

    for (let accessory of accessories){
      for( let i in accessoriesPrices){
        if(accessory == accessoriesPrices[i].name){
          total += accessoriesPrices[i].price
        }
      }
    }

    this.setState({accessoriesPrice:total})

  }

  render(){

    return (
      <div className="App">
        <div className="container">
          <h1>Car Calculator</h1>
          <div className="options">
            <div className="option">
            <label htmlFor="brand">Choose a brand:</label><br></br>
                  <div className="select" id="brand-select"> 
                      <select name="brand"  onChange={(a) => this.brandChange(a)}>
                          <option value="">Brand</option>
                          {this.state.brands.map(function(brand, i){
                           return <option key={i} value={brand}>{brand}</option>
                         })}
                      </select>
                  </div>
              </div>
            <div className="option">
            <label htmlFor="model">Choose a model:</label><br></br>
                  <div className="select" id="model-select"> 
                      <select name="model" onClick={(a) => this.forceUpdate()} onChange={(a) => this.modelChange(a)} id="model">
                          <option value="">Model</option>
                          {this.state.models.map(function(model, i){
                           return <option key={i} value={model}>{model}</option>
                         })}
                      </select>
                  </div>
            </div>      
            <div className="option">       
              <label htmlFor="color">Choose a color:</label><br></br>
                <div className="select" onClick={(a) => this.forceUpdate()} onChange={(a) => this.colorChange(a)} id="color-select"> 
                    <select name="color" id="color">
                          <option value="">Color</option>
                         {this.state.colors.map(function(color,i){
                          return <option key={i} value={color}>{color}</option>
                         })}
                    </select>
                </div>
            </div>   
          </div>

          <div className='accessories' onClick={(a) => this.getAccessories(a)}>
              <label className="check_container">Air Conditioner
                  <input type="checkbox" className="accessory" value="Air Conditioner"></input>
                  <span className="checkmark"></span>
                </label>
                <label className="check_container">Electric Steering
                  <input type="checkbox"  className="accessory" value="Electric Steering"></input>
                  <span className="checkmark"></span>
                </label>
                
                <label className="check_container">Automatic Transmission
                  <input type="checkbox" className="accessory" value="Automatic Transmission"></input>
                  <span className="checkmark"></span>
                </label>
                
                <label className="check_container">Reverse Sensor
                  <input type="checkbox" className="accessory" value="Reverse Sensor"></input>
                  <span className="checkmark"></span>
                </label>
          </div>

          <div className="car">

            <img id="carImage" src={car}></img>
          
          </div>

          <div className="chosen-options">
            <h4>Brand: {this.state.brand}</h4>
            <h4>Model: {this.state.model}</h4>
            <h4>Color: {this.state.color}</h4>
            <h4>Accessories: {this.state.accessories.map(function(accessory, i){
                                   return ' | ' + accessory + ' | '
                             })}</h4>
            <h4>Price: {(this.state.modelPrice) + (this.state.colorPrice) + (this.state.accessoriesPrice)}</h4>

          </div>
        </div>

      </div>
    );
    }
  }

/*


                          



*/


export default App;
