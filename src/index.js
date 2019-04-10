document.addEventListener("DOMContentLoaded", () => {
  console.log("Hello");
  Adapter.getPups().then(getPupsName)
  let showGood = false;
  let filterDogBtn = document.getElementById('good-dog-filter')
  filterDogBtn.addEventListener('click', () => {
    showGood = !showGood;
    switchShowPups(showGood)
  })
})

function getPupsName(pups){
  let bar = document.getElementById('dog-bar');
  bar.innerHTML = '';
  pups.forEach(renderPupName);
}

function renderPupName(pup){
  let bar = document.getElementById('dog-bar');
  let span = document.createElement('span');
  span.innerText = pup.name;
  bar.appendChild(span);
  span.addEventListener('click', () => {showPupDetail(pup)})
}

function showPupDetail(pup){
  let filterDogBtn = document.getElementById('good-dog-filter')
  let info = document.getElementById('dog-info');
  info.innerHTML = '';
  let div = document.createElement('div');
  let img = document.createElement('img');
  img.src = pup.image;
  let h2 = document.createElement('h2');
  h2.innerText = pup.name;
  let btn = document.createElement('button');
  btn.innerText = pup.isGoodDog ? "Good Dog" : "Bad Dog";
  btn.addEventListener('click', () => {
    switchGoodBad(pup).then(() => {
      if (filterDogBtn.innerText.includes("ON")){
        console.log('time to refilter pups')
        Adapter.getPups().then((res) => { //debugger
        getPupsName(getGoodPups(res))}) //.then((pups) => {getPupsName(pups)});
        }
        btn.innerText = pup.isGoodDog ? "Good Dog" : "Bad Dog";
    });
    // console.log("Switch")
    // switchShowPups()
  })
  div.appendChild(img);
  div.appendChild(h2);
  div.appendChild(btn);
  info.appendChild(div);
}

function switchGoodBad(pup){
  pup.isGoodDog = !pup.isGoodDog
  // debugger
  return Adapter.editPup(pup);
  // let filterDogBtn = document.getElementById('good-dog-filter')
  // let btn = document.createElement('button');
  // btn.innerText = pup.isGoodDog ? "Bad Dog" : "Good Dog";
  // if (filterDogBtn.innerText.includes("ON")){
  //   Adapter.getPups().then(getGoodPups).then(getPupsName);
  // }
  // console.log(pup.isGoodDog);
}

function getGoodPups(pups){
  let goodPups = []
  pups.forEach((pup) => {
    if (pup.isGoodDog) {
      goodPups.push(pup)
    }
  })
  return goodPups
}

function switchShowPups(showGood){
  // debugger
  // showGood = !showGood;
  // debugger
  let filterDogBtn = document.getElementById('good-dog-filter')
  if (showGood) {
    Adapter.getPups().then(getGoodPups).then(getPupsName);
    filterDogBtn.innerText = "Filter good dogs: ON"
  }else{
    Adapter.getPups().then(getPupsName);
    filterDogBtn.innerText = "Filter good dogs: OFF"
  }

}
