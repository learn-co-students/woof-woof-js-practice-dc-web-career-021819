document.addEventListener("DOMContentLoaded", init)

function init(e) {

  getDogs().then(addAllDogsToDogBar)
}

function getDogs() {
  return fetch(baseURL)
  .then(r => r.json())
}

function addAllDogsToDogBar(dogArray) {
  const dogBar = document.querySelector("#dog-bar")
  dogBar.innerHTML = ""
  // debugger
  dogArray.forEach(addDogSpanToDogBar)
}

function addDogSpanToDogBar(dog) {
  const dogBar = document.querySelector("#dog-bar")
  const dogSpan = document.createElement("span")
  // debugger
  dogSpan.innerText = dog.name
  dogSpan.dataset.id = dog.id

  dogSpan.addEventListener('click', onDogSpanClick)
  dogBar.append(dogSpan)

}

const baseURL = 'http://localhost:3000/pups'

function onDogSpanClick(e) {
  getSingleDog(e.target.dataset.id)
  .then(addDogInfoToPage)
}

function addDogInfoToPage(dog) {
  const dogInfo = document.querySelector("#dog-info")
  dogInfo.innerHTML = ""
  const dogImg = document.createElement("img")
  dogImg.src = dog.image

  const dogTitle = document.createElement("h2")
  dogTitle.innerText = dog.name

  const dogButton = document.createElement("button")
  dogButton.innerText = dog.isGoodDog ? "Good Dog!" : "Bad Dog!"
  dogButton.dataset.id = dog.id

  dogButton.addEventListener('click', switchDogStatus)

  dogInfo.append(dogImg, dogTitle, dogButton)
}

function switchDogStatus(e) {
  let newValue;

  if (e.target.innerText.includes("Good")) {
    e.target.innerText = "Bad Dog!"
    newValue = false
  } else {
    e.target.innerText = "Good Dog!"
    newValue = true
  }

  updateServerDogStatus(e.target.dataset.id, newValue)
    .then(updateDogBar)
}

function updateDogBar() {
  getDogs().then(dogArray => addAllDogsToDogBar(dogArray))
}

function updateServerDogStatus(id, newValue) {
  const options = {
    method: "PATCH",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      isGoodDog: newValue
    })
    }

  return fetch(baseURL + `/${id}`, options)
    .then(r => r.json())
}

function getSingleDog(id) {
  return fetch(baseURL + `/${id}`)
  .then(r => r.json())
}





// dogGetter
// fetch localhost:3000
// .then(dogs => dogs.json())
// .then(dogs => {
// dogs.forEach(iterate through all dog, add span to dog bar ex. `<span>${dog.name}</span>`)

//  Make this a helper method?
// })

// dogFetcher()
// dogBoxRender()
// dogDetailRender()

// STEP THREE

// Show more info (image, name, isGoodDog) in dog-info on span-click

// STEP FOUR

// toggle bad/good, update corresponding status in json











// Lecture Notes / Code-along
