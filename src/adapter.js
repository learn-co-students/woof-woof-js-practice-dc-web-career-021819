class Adapter {
  static getPups(){
    const url = `http://localhost:3000/pups`
    return fetch(url).then(r => r.json());
  }

  static getPup(id){
    const url = `http://localhost:3000/pups/${id}`;
    return fetch(url).then(r => r.json());
  }

  static editPup(data){
    const url = `http://localhost:3000/pups/${data.id}`;
    // delete data.id;
    const option = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(data)
    }
    return fetch(url, option).then(res => res.json());
  }
}
