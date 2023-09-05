const ui = new UI();
const storage = new Storage();
//get the stored Location
const weatherlocation = storage.getLocationData();

//init the weather object
const weather = new Weather(weatherlocation.city, weatherlocation.country);

//get the weather info when we load the dom
document.addEventListener("DOMContentLoaded", loadDom);

//change the location and close the modal after
document.getElementById("w-change-btn").addEventListener("click", function (e) {
  const city = document.getElementById("city").value;
  const country = document.getElementById("country").value;

  weather.changeLocation(city, country);
  //on changing the city and country we need to get the weather again

  //setlocation to localstorage
  storage.setLocationData(city, country);
  loadDom();
  //close the modal=>using jquery(bootstrap uses jquery)
  $("#locModal").modal("hide");
});

// i want this function to be called when we load the DOM
function loadDom() {
  weather
    .getWeather()
    .then((responseData) => ui.paint(responseData))
    .catch((err) => console.log(err));
}
