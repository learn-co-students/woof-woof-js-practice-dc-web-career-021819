document.addEventListener("DOMContentLoaded", () => {
  Dog.addListeners()
  Dog.fetchDogs()
  .then(Dog.renderDogBar)
})

class Dog {
  static all = []
  static barDiv = () => document.getElementById("dog-bar")
  static infoDiv = () => document.getElementById("dog-info")


  constructor(name, isGoodDog, image, id) {
    this.name = name
    this.isGoodDog = isGoodDog
    this.image = image
    this.id = id
    Dog.all.push(this)
  }

  renderInfo() {
    Dog.infoDiv().innerHTML = `
     <img src=${this.image}>
     <h2>${this.name}</h2>
     <button class="button" id="${this.id}-button">${this.isGoodDog ? "Good Dog!" : "Bad Dog!"}</button>
    `
  }

  toggleButton(event) {
    this.isGoodDog = !this.isGoodDog
    fetch(`http://localhost:3000/pups/${this.id}`, {
      method:"PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({isGoodDog: this.isGoodDog})
    })
    .then(this.isGoodDog ? event.target.innerText = "Good Dog!" : event.target.innerText = "Bad Dog!")
  }

  static fetchDogs() {
    return fetch("http://localhost:3000/pups")
    .then(response => response.json())
    .then(response => {
      response.forEach(dog => {
        const {id, name, isGoodDog, image} = dog
        new Dog(name, isGoodDog, image, id)
      })
    })
  }

  static renderDogBar() {
    var barHTML = ""
    Dog.all.forEach(dog => {
      barHTML += `<span class="dog-name" id="${dog.id}-span">
      ${dog.name}
      </span>`
    })
    Dog.barDiv().innerHTML = barHTML
  }

  static renderGoodDogBar() {
    var barHTML = ""
    Dog.all.forEach(dog => {
      if (dog.isGoodDog === true) {
        barHTML += `<span class="dog-name" id="${dog.id}-span">
        ${dog.name}
        </span>`
      }
    })
    Dog.barDiv().innerHTML = barHTML
  }

  static filterDogs() {
    if (document.getElementById("good-dog-filter").innerText === "Filter good dogs: OFF") {
      document.getElementById("good-dog-filter").innerText = "Filter good dogs: ON"
      Dog.renderGoodDogBar()
    } else {
      document.getElementById("good-dog-filter").innerText = "Filter good dogs: OFF"
      Dog.renderDogBar()
    }
  }

  static addListeners() {
    document.addEventListener("click", event => {
      if(event.target.className === "dog-name") {
        Dog.findDog(event.target.id).renderInfo()
      }
      if(event.target.className === "button") {
        Dog.findDog(event.target.id).toggleButton(event)
        if (document.getElementById("good-dog-filter").innerText === "Filter good dogs: ON") {
          Dog.renderGoodDogBar()
        }
      }
      if(event.target.id === "good-dog-filter") {
        Dog.filterDogs()
      }
    })
  }

  static findDog(id) {
    return Dog.all.find(dog => dog.id === parseInt(id))
  }
}
