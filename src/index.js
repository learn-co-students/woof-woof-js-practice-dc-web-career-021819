class Pup {
  constructor(id, name, isGoodDog, image) {
    this.id = id;
    this.name = name;
    this.isGoodDog = isGoodDog;
    this.image = image;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  displayDogs(false);
  const filter = document.getElementById("good-dog-filter");
  filter.addEventListener("click", filterDogs);
});

function displayDogs(onlyGood) {
  const dogMenu = document.getElementById("dog-bar");
  dogMenu.innerHTML = "";
  fetch("http://localhost:3000/pups")
    .then(resp => resp.json())
    .then(dogs => {
      dogs.forEach(dog => {
        if (dog.isGoodDog || !onlyGood) {
          const sp = document.createElement("span");
          sp.innerHTML = dog.name;
          sp.dataset.id = dog.id;
          dogMenu.appendChild(sp);
          sp.addEventListener("click", e => {
            e.stopPropagation();
            const dogInfo = document.getElementById("dog-info");
            console.log(dogInfo);

            show(dog);
          });
        }
      });
    });
}

function filterDogs(e) {
  let status = e.target.querySelector("span");
  if (status.innerHTML === "ON") {
    status.innerHTML = "OFF";
    displayDogs(false);
  } else {
    status.innerHTML = "ON";
    displayDogs(true);
  }
}

function getFilter() {
  let status = document.querySelector("#good-dog-filter span");
  console.log("THis worked", status);
  return status.innerHTML === "ON";
}

function show(dog) {
  const dogInfo = document.getElementById("dog-info");
  dogInfo.innerHTML = `<img src= ${dog.image}></img> <h2>${dog.name}</h2>`;
  const update = document.createElement("button");
  update.innerHTML = dog.isGoodDog ? "Bad Dog!" : "Good Dog!";
  update.addEventListener("click", () => {
    updateDog(dog);
  });
  dogInfo.appendChild(update);
}
function updateDog(dog) {
  console.log("made it");
  dog.isGoodDog = !dog.isGoodDog;
  fetch(`http://localhost:3000/pups/${dog.id}`, {
    method: "PATCH",
    headers: { "Content-type": "Application/json" },
    body: JSON.stringify({ isGoodDog: dog.isGoodDog })
  })
    .then(e => console.log(e.json()))
    .then(() => {
      displayDogs(getFilter());
      show(dog);
    });
}
