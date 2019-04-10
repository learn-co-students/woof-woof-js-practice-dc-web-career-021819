document.addEventListener('DOMContentLoaded', init)

function init() {
  const filterDogButton = document.querySelector('#filter-div')
  filterDogButton.addEventListener('click', toggleFilterDogs)
  getDogs().then(addDogsToBar)
}

function toggleFilterDogs(e){
  const filterDogsButton = document.querySelector('#good-dog-filter')

  if (filterDogsButton.innerText.includes("OFF")) {
    filterDogsButton.innerText = "Filter good dogs: ON"
    check()
  } else {
    filterDogsButton.innerText = "Filter good dogs: OFF"
    check()
  }
}

function check(e){
  const filterDogsButton = document.querySelector('#good-dog-filter')

  if (filterDogsButton.innerText.includes("OFF")) {
    getDogs().then(dogsArray => addDogsToBar(dogsArray))
  } else {
    getDogs().then(dogsArray => addDogsToBar(dogsArray, true))
  }
}


function addDogsToBar(dogsArray, filter = false){
  const dogBar = document.querySelector('#dog-bar')
  dogBar.innerHTML = ''
  if (filter){
    dogsArray.filter(dog => dog.isGoodDog).forEach(renderDogSpanToDogBar)
  } else {
    dogsArray.forEach(renderDogSpanToDogBar)
  }
}


function renderDogSpanToDogBar(dog) {
  const dogBar = document.querySelector('#dog-bar')
  const dogSpan = document.createElement('span')
  dogSpan.innerText = dog.name
  dogSpan.dataset.id = dog.id
  dogSpan.addEventListener('click', onDogSpanClick)
  dogBar.append(dogSpan)
}

function onDogSpanClick(e) {
  let dogId = e.target.dataset.id
  getSingleDog(dogId).then(createDogCard)
}

function createDogCard(dog) {
  const dogInfo = document.querySelector('#dog-info')
  dogInfo.innerHTML = ''

  const dogImg = document.createElement('img')
  dogImg.src = dog.image

  const dogName = document.createElement('h2')
  dogName.innerText = dog.name

  const dogButton = document.createElement('button')
  dogButton.innerText = dog.isGoodDog ? "Good Boy" : "Bad Boy"
  dogButton.dataset.id = dog.id
  dogButton.addEventListener('click', clickHandler)

  dogInfo.append(dogImg,dogName,dogButton)
}

function clickHandler(e) {
  let newValue;
  if (e.target.innerText.includes("Good")){
    e.target.innerText = "Bad Dog"
    newValue = false
  } else {
    e.target.innerText = "Good Dog"
    newValue = true
  }
  toggleGoodDog(parseInt(e.target.dataset.id), newValue).then(check)
}


// fetch calls
const URL = 'http://localhost:3000/pups/'

function getDogs() {
  return fetch(URL)
  .then(r=>r.json())
}

function getSingleDog(dogID) {
  return fetch(URL+dogID)
  .then(r=>r.json())
}

function toggleGoodDog(id, newValue){
  const options = {
    method: 'PATCH',
    headers:{'content-type':'application/json'} ,
    body: JSON.stringify({
      isGoodDog: newValue
    })
  }
  return fetch(URL+id, options)
  .then(r=>r.json())
}
