import { Map } from "./components/Map.js";

const app = {
  getData: function () {
    const thisApp = this;
    thisApp.months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    thisApp.containerWorkouts = document.querySelector(".workouts");
    thisApp.inputType = document.querySelector(".form__input--type");
    thisApp.inputDistance = document.querySelector(".form__input--distance");
    thisApp.inputDuration = document.querySelector(".form__input--duration");
    thisApp.inputCadence = document.querySelector(".form__input--cadence");
    thisApp.inputElevation = document.querySelector(".form__input--elevation");
  },

  getLocation: function () {
    if (navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition((locations) => {
        const { latitude, longitude } = locations.coords;

        new Map(latitude, longitude);

        (error) => {
          alert(error.message);
        };
      });
    }
  },

  switchInput: function () {
    const thisApp = this;
    const inputCadenceParent = thisApp.inputCadence.closest(".form__row");
    const inputElevationParent = thisApp.inputElevation.closest(".form__row");

    thisApp.inputType.addEventListener("change", function () {
      inputCadenceParent.classList.toggle("form__row--hidden");
      inputElevationParent.classList.toggle("form__row--hidden");
    });
  },

  init: function () {
    const thisApp = this;
    console.log("*** App starting ***");

    thisApp.getData();
    thisApp.getLocation();
    thisApp.switchInput();
  },
};

app.init();
