
//Constructor for the class Car
class Car {
    constructor(brand, model, color, accessories) {
      this.brand = brand;
      this.model = model;
      this.color = color;
      this.accessories = accessories;
    }
}

//Constructor for the class Price
class Price{
  constructor(modelPrice,accessoriesPrice,colorPrice){
    this.modelPrice = modelPrice;
    this.accessoriesPrice = accessoriesPrice;
    this.colorPrice = colorPrice;
  }
}

  //Define what models each brand have
  const BrandList = [
    {brand:"Honda",models:["Civic","HVR"]},
    {brand:"Ford",models:["Ecosport"]},
    {brand:"Tesla",models:["Model3"]}
 ];

  //Define the prices of the car Models
  const ModelPriceList = [
      {model:"Model3",price:60000,colors:["Blue","Gray","White"]},
      {model:"Civic",price:15000,colors:["Black","Green","White"]},
      {model:"Ecosport",price:23000,colors:["Black","Blue","Red","White"]},
      {model:"HVR",price:35000,colors:["Black","Gray","White"]}
   ];

   //Define the prices of the colors
   const ColorPriceList = [
    {color:"Black",price:0},
    {color:"White",price:0},
    {color:"Blue",price:350},
    {color:"Gray",price:120},
    {color:"Red",price:250},
    {color:"Green",price:420}
    ];

    //Define the prices of the Accessories
   const AccessoriesPriceList = [
    {accessory:"Air Conditioner",price:1000},
    {accessory:"Electric Steering",price:3000},
    {accessory:"Automatic Transmission",price:3500},
    {accessory:"Reverse Sensor",price:2320}
    ];

    //Define Color+Model image combinations
    const images = [
      {model:"Civic",color:"Black",img:"civic-black.webp"},
      {model:"Civic",color:"Green",img:"civic-green.png"},
      {model:"Civic",color:"White",img:"civic-white.webp"},
      {model:"Ecosport",color:"Black",img:"ecosport-black.webp"},
      {model:"Ecosport",color:"Blue",img:"ecosport-blue.webp"},
      {model:"Ecosport",color:"Red",img:"ecosport-red.png"},
      {model:"Ecosport",color:"White",img:"ecosport-white.webp"},
      {model:"HVR",color:"Black",img:"hrv-black.webp"},
      {model:"HVR",color:"Gray",img:"hrv-gray.webp"},
      {model:"HVR",color:"White",img:"hrv-white.webp"},
      {model:"Model3",color:"White",img:"model3-white.png"},
      {model:"Model3",color:"Blue",img:"model3-blue.png"},
      {model:"Model3",color:"Gray",img:"model3-gray.png"},
    ]



  //This Creates a new empty car
  var myCar = new Car()
  //Creates na empty price
  var carPrice = new Price(0,0,0);

  //Changes the Brand of the car when the customer selects one
  function BrandChange(){

    //Clear model and color list
    clearColor();
    clearModel();
    
    //Gets the brand you selected
    let brand = document.getElementById("brand").value;
    document.getElementById("txt-car-brand").innerText = brand;

    //Gets the models available to selected brand
    console.log("Available models for "+brand+":")
    for(i=0;i<BrandList.length;i++){
      if(brand == BrandList[i].brand){
        console.log(BrandList[i].models)
        BrandList[i].models.forEach(listModelsFromBrand);
      }  
    }

    //Sets the cars's brand to the brand you selected
    myCar.brand = brand;
    console.log(myCar)
  }

  //Changes the Model of the car when the customer selects one
  function ModelChange(){

    //Clear color list and price
    clearColor();

    //Gets and sets the car object model
    let model = document.getElementById("model").value;
    document.getElementById("txt-car-model").innerText = model;
    myCar.model = model;

    //Gets the available colors for the selected model
    console.log("Available colors for "+model+":")
    for(i=0;i<ModelPriceList.length;i++){
      if(model == ModelPriceList[i].model){
        console.log(ModelPriceList[i].colors)
        ModelPriceList[i].colors.forEach(listOfColorsFromModel);
      }  
    }

    //Gets Model Price
    console.log("Model Price:");
    getModelPrice(myCar);

  }

  //Changes the Color of the car when the customer selects one
  function ColorChange(){
    let color = document.getElementById("color").value;
    document.getElementById("txt-car-color").innerText = color;
    myCar.color = color;
    
    //Get the color price
    getColorPrice(myCar);

    //Set the image
    setImage(myCar.model,myCar.color);  

  }

  //Gets accessories you select and inputs on the car object
  function GetAccessories(){
    let accessories = [...document.querySelectorAll('.accessory:checked')].map(e => e.value);
    myCar.accessories = accessories;
    console.log(myCar);
    let accText = ""
    for(i=0;i<accessories.length;i++){
        accText += accessories[i]+", "
    }

    document.getElementById("txt-car-accessories").innerText = accText;

    //reset accessories prices and recalculates
    carPrice.accessoriesPrice = 0;
    finalPrice(carPrice);
    accessories.forEach(getAccessoryPrice);

  }

  //List the models in a brand
  function listModelsFromBrand(value, index, array){
    //Prints in the model list all the models available for the brand you selected
    document.getElementById("model").innerHTML += "<option class='model-option' value='"+value+"'>"+value+"</option>";

  }

  //List the colors available for a model that you choose
  function listOfColorsFromModel(value, index, array){

    //Prints in the colors list all the colors available for the model you selected
    document.getElementById("color").innerHTML += 
    "<option class='color-option' value='"+value+"'>"+value+"</option>";

  }

  //Clear all the information about colors in the car and price
  function clearColor(){
    myCar.color = ""
    carPrice.colorPrice = 0;
    document.getElementById("txt-car-color").innerText = "";
    document.querySelectorAll('.color-option').forEach(e => e.remove());
  }

  //Clear all the information about model in the car and price
  function clearModel(){
    myCar.model = ""
    carPrice.modelPrice = 0;
    document.getElementById("txt-car-model").innerText = "";
    document.querySelectorAll('.model-option').forEach(e => e.remove());
  }

//Get the price of the selected Model
function getModelPrice(car){
  for(i=0;i<ModelPriceList.length;i++){
    if(car.model == ModelPriceList[i].model){
      carPrice.modelPrice = ModelPriceList[i].price;
      console.log(carPrice.modelPrice);
      finalPrice(carPrice);
      return
    }else if(car.model == ""){
      console.log("No Model Selected");
      carPrice.modelPrice = 0;
      finalPrice(carPrice);
    }
  }
}

//Get the price of the selected Color
function getColorPrice(car){
  for(i=0;i<ColorPriceList.length;i++){
    if(car.color == ""){
      carPrice.colorPrice = 0;
      finalPrice(carPrice);
    }
    else if(car.color == ColorPriceList[i].color){
      carPrice.colorPrice = ColorPriceList[i].price;
      console.log("Price of "+car.color+" color: "+carPrice.colorPrice)
      finalPrice(carPrice);
    }
  }
}

//Get the price of the selected Accessories
function getAccessoryPrice(value,index,array){
  for(i=0;i<AccessoriesPriceList.length;i++){
    if(value == AccessoriesPriceList[i].accessory){
      carPrice.accessoriesPrice += AccessoriesPriceList[i].price;
      finalPrice(carPrice);
    }
  }
  if(array.length == 0){
    carPrice.accessoriesPrice = 0;
    finalPrice(carPrice);
  }
}


  //Calculate the final Price
  
  function finalPrice(price){
    let thePrice = price.modelPrice + price.accessoriesPrice + price.colorPrice;
    console.log("\n Final price is: ")
    console.log(thePrice);
    document.getElementById("txt-car-price").innerText = thePrice;
  }


  //setImage("Model3","Blue");

  //Set Image
  function setImage(model,color){
    for(i=0;i<images.length;i++){
      if(model == images[i].model && color == images[i].color){
        document.getElementById("carImage").setAttribute("src","img/"+images[i].img);
        return;
      }
    }
  }
