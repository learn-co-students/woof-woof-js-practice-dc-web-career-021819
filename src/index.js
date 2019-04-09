

document.addEventListener("DOMContentLoaded", runner);

function runner(e){
  let dogBar = document.getElementById("dog-bar");
  fetch("http://localhost:3000/pups")
  .then(res => res.json())
  .then(data => {
    data.forEach(item => {
      let dog = new Dog(item.id, item.name, item.isGoodDog, item.image);
      dogBar.appendChild(dog.dogBarSpan);
    })
  })
}

class Dog{
  static all = [];
  constructor(id, name, isGoodDog, image){
    this.id = id;
    this.name = name;
    this.isGoodDog = isGoodDog;
    this.image = image;

    this.dogBarSpan = this.createDogBarSpan()

    Dog.all.push(this)
  }

  createDogBarSpan(){
    let dogSpan = document.createElement("span");
    dogSpan.innerText = this.name;
    dogSpan.addEventListener("click", dogSpanEventHandler)
    return dogSpan;
  }

  createImageTag(){
    let img = document.createElement("img");
    img.src = this.image;
    return img;
  }

  createNameH2Tag(){
    let nameHeader = document.createElement("h2");
    nameHeader.innerText = this.name;
    return nameHeader;
  }

  createGoodDogButton(){
    this.goodDogButton = document.createElement("button");
    this.isGoodDog ? this.goodDogButton.innerText = "Good Dog!" : this.goodDogButton.innerText = "Bad Dog!";
    this.goodDogButton.addEventListener("click", goodDogButtonEventHandler)
    return this.goodDogButton;
  }

  getDoggoObj(){
    return {
      "id": this.id,
      "name": this.name,
      "isGoodDog": this.isGoodDog,
      "image": this.image
    };
  }
}

function dogSpanEventHandler(event){
  let doggo = Dog.all.find(dog => dog.dogBarSpan === event.target);
  let dogInfo = document.getElementById("dog-info");
  dogInfo.innerHTML = ""

  dogInfo.appendChild(doggo.createImageTag());
  dogInfo.appendChild(doggo.createNameH2Tag());
  dogInfo.appendChild(doggo.createGoodDogButton());
}

function goodDogButtonEventHandler(event){
  let doggo = Dog.all.find(dog => dog.goodDogButton === event.target);
  doggo.isGoodDog = !doggo.isGoodDog;
  doggo.isGoodDog ? event.target.innerText = "Good Dog!" : event.target.innerText = "Bad Dog!";
  let doggoObj = doggo.getDoggoObj();
  fetch(`http://localhost:3000/pups/${doggo.id}`, {
    method: "PATCH",
    headers:{
      "Content-Type": "application/JSON",
      accepts: "json"
    },
    body: JSON.stringify(doggoObj)
  })
  .then(res => res.json)
}
