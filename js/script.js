
//Constructor for the class Car
class Car {
    constructor(brand, model, color, accessories, price) {
      this.brand = brand;
      this.model = model;
      this.color = color;
      this.accessories = accessories;
      this.price = price;
    }
}

  //Define the prices of the car Models
  const ModelPriceList = [
      {model:"Model3",price:60000},
      {model:"Civic",price:20000},
      {model:"Ecosport",price:15000},
      {model:"HVR",price:35000}
   ];

   //Define the prices of the colors
   const ColorPriceList = [
    {model:"Black",price:0},
    {model:"White",price:0},
    {model:"Blue",price:350},
    {model:"Gray",price:120},
    {model:"Green",price:420}
    ];

    //Define the prices of the Accessories
   const AccessoriesPriceList = [
    {model:"Air Conditioner",price:1000},
    {model:"Electric Steering",price:3000},
    {model:"Automatic Transmission",price:3500},
    {model:"Reverse Sensor",price:2320}
    ];

  //This Creates a new empty car
  var myCar = new Car()

  //Changes the Brand of the car when the customer selects one
  function BrandChange(){
    let brand = document.getElementById("brand").value;
    document.getElementById("txt-car-brand").innerText = brand;
    myCar.brand = brand;
    console.log(myCar)
  }

  //Changes the Model of the car when the customer selects one
  function ModelChange(){
    let model = document.getElementById("model").value;
    document.getElementById("txt-car-model").innerText = model;
    myCar.model = model;
    console.log(myCar)
  }

  //Changes the Color of the car when the customer selects one
  function ColorChange(){
    let color = document.getElementById("color").value;
    document.getElementById("txt-car-color").innerText = color;
    myCar.color = color;
    console.log(myCar)
  }

  //Gets accessories

  function GetAccessories(){
    let accessories = [...document.querySelectorAll('.accessory:checked')].map(e => e.value);
    myCar.accessories = accessories;
    console.log(myCar);
    let accText = ""
    for(i=0;i<accessories.length;i++){
        accText += accessories[i]+", "
    }

    document.getElementById("txt-car-accessories").innerText = accText;

  }

  console.log("Please select the options for your car");

