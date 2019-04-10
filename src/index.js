document.addEventListener("DOMContentLoaded", function(){
  let filterGoodDogs = false
  const filterBtn = document.querySelector('#good-dog-filter')
  filterBtn.addEventListener('click', filterDogs)

  function init(){
    // fetch dogs from database and add to dog-bar
    getDogs().then(renderDogs)
  }

  function filterDogs() {
    // update variable and button text
    filterGoodDogs = !filterGoodDogs
    filterBtn.innerText = "Filter good dogs:"
    filterBtn.innerText += filterGoodDogs ? " ON" : " OFF"
    init()
  }

  function getDogs(){
    // return multiple dogs from database
    return fetch('http://localhost:3000/pups')
    .then(resp => resp.json())
  }

  function getDog(id){
    // return dog from databse
    const url = `http://localhost:3000/pups/${id}`
    return fetch(url)
    .then(resp => resp.json())
  }

  function renderDogs(dogs){
    // reset dog-bar
    const container = document.querySelector('#dog-bar')
    container.innerHTML = ""

    // iterate and add dog spans
    dogs.forEach(addToDogBar)
  }

  function addToDogBar(dog){
    if (dog.isGoodDog || !filterGoodDogs) {
      // dog-bar is main container
      const container = document.querySelector('#dog-bar')

      // dog <span>
      const dogSpan = document.createElement('span')
      dogSpan.innerText = dog.name
      dogSpan.dataset.id = dog.id
      dogSpan.addEventListener('click', renderDogInfo)

      // add to dog-bar
      container.appendChild(dogSpan)
    }
  }

  function renderDogInfo(event){
    const container = document.querySelector('#dog-info')
    container.innerHTML = ""
    // ask about this
    // how can you get this to be referenced in the
    // asynchronous function
    const id = event.target.dataset.id
    getDog(id)
    .then(makeDogElement)
  }

  function makeDogElement(dog){

    const container = document.querySelector('#dog-info')
    const image = document.createElement('img')
    image.src = dog.image
    container.appendChild(image)

    const name = document.createElement('h2')
    name.innerText = dog.name
    container.appendChild(name)

    const button = document.createElement('button')
    button.innerText = goodnessString(dog.isGoodDog)
    button.addEventListener('click', updateDogGoodness)
    button.dataset.id = dog.id
    button.dataset.isGood = dog.isGoodDog
    container.appendChild(button)
  }

  function goodnessString(goodDog){
    return goodDog? "Good Dog" : "Bad Dog"
  }

  function updateDogGoodness(event){
    const id = event.target.dataset.id
    const newGoodValue = !(event.target.dataset.isGood == 'true')

    // define request
    const url = `http://localhost:3000/pups/${id}`
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({isGoodDog: newGoodValue})
    }

    // update database
    fetch(url, options)
    .then(resp => resp.json())
    event.target.innerText = goodnessString(newGoodValue)
    event.target.dataset.isGood = newGoodValue
  }

  // start the show
  init()

}
)
