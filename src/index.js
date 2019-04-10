document.addEventListener("DOMContentLoaded", () => {
  getAllDogs();
});

function getAllDogs() {
  fetch("http://localhost:3000/pups")
    .then(resp => resp.json())
    .then(dogArray => {
      dogArray.forEach(renderDogToBar);
    });
}

function renderDogToBar(dog) {
  let dogBar = document.getElementById("dog-bar");
  let dogSpan = document.createElement("span");
  dogSpan.id = dog.id;
  dogSpan.innerText = dog.name;
  dogSpan.addEventListener("click", spanClickHandler);
  dogBar.appendChild(dogSpan);
}

function spanClickHandler() {
  event.preventDefault();
  let dogId = event.target.id;

  document.getElementById("dog-info").innerHTML = "";

  renderDogToPage(dogId);
}

function renderDogToPage(id) {
  fetch(`http://localhost:3000/pups/${id}`)
    .then(resp => resp.json())
    .then(dog => {
      let dogImage = document.createElement("img");
      let dogName = document.createElement("h2");
      let goodButton = document.createElement("button");

      goodButton.id = `good-${dog.id}`;
      dogImage.src = dog.image;
      dogName.innerText = dog.name;
      dog.isGoodDog
        ? (goodButton.innerText = "Good Dog!")
        : (goodButton.innerText = "Bad Dog!");
      goodButton.addEventListener("click", goodButtonHandler);
      document.getElementById("dog-info").append(dogImage, dogName, goodButton);
    });
}

function goodButtonHandler() {
  event.preventDefault();
  let goodBtn = event.target;

  document.getElementById("dog-info").innerHTML = "";
  patchDogBehavior(goodBtn);
}

function patchDogBehavior(btn) {
  let dogId = btn.id.split("-")[1];
  let dog = {};
  btn.innerText === "Good Dog!"
    ? (dog["isGoodDog"] = false)
    : (dog["isGoodDog"] = true);
  // debugger;
  fetch(`http://localhost:3000/pups/${dogId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dog)
  })
    .then(resp => resp.json())
    .then(data => {
      renderDogToPage(data.id);
    });
}

// function filterClickHandler() {
//
// }

// fetch("http://localhost:3000/pups")
//   .then(resp => resp.json())
//   .then(dogArray =>
//     dogArray.filter(dog => {
//       return dog.isGoodDog;
//     })
//   );
