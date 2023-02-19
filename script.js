"use strict";

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");

inputType.addEventListener("change", switchInput);

function switchInput() {
  const inputCadenceParent = inputCadence.closest(".form__row");
  const inputElevationParent = inputElevation.closest(".form__row");

  inputCadenceParent.classList.toggle("form__row--hidden");
  inputElevationParent.classList.toggle("form__row--hidden");
}

class Map {
  constructor(latitude, longitude) {
    this.map;
    this.latitude = latitude;
    this.longitude = longitude;

    this.renderMap();
  }

  renderMap() {
    this.map = L.map("map", {
      center: [this.latitude, this.longitude],
      zoom: 13,
    });
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
    this.map.on("click", (e) => {
      const { lat, lng } = e.latlng;
      //   this.addMarker(lat, lng, "I`m here");
      this.displayWorkoutForm();
    });
  }

  addMarker(latitude, longitude, content) {
    L.marker([latitude, longitude])
      .addTo(this.map)
      .bindPopup(
        L.popup({ autoClose: false, closeOnClick: false }).setContent(
          `<p> ${content} </p>`
        )
      )
      .openPopup();
  }

  hasOnlyPositiveNumbers(params) {
    return params.every((inputValue) => inputValue > 0);
  }

  hasOnlyNumbers(params) {
    return params.every((inputValue) => parseFloat(inputValue));
  }

  createWorkout = (e) => {
    e.preventDefault();

    const inputValues = [inputDistance.value, inputDuration.value];

    if (inputType.value === "running") {
      inputValues.push(inputCadence.value);
    } else {
      inputValues.push(inputElevation.value);
    }

    if (!this.hasOnlyNumbers(inputValues)) {
      alert("Please type numbers!");
      return;
    }

    if (!this.hasOnlyPositiveNumbers(inputValues)) {
      alert("Please type positive numbers!");
      return;
    }

    // console.log(this.hasOnlyPositiveNumbers(inputValues));

    if (inputType.value === "cycling") {
      const cycling = new Cycling(
        inputElevation.value,
        54,
        34,
        inputType.value,
        inputDistance.value,
        inputDuration.value
      );
      console.log(cycling);
    } else {
      const running = new Running(
        inputCadence.value,
        43,
        23,
        inputType.value,
        inputDistance.value,
        inputDuration.value
      );
      console.log(running);
    }
  };

  displayWorkoutForm() {
    form.classList.remove("hidden");
    form.addEventListener("submit", this.createWorkout);
  }
}

class Workout {
  constructor(latitude, longitude, type, distance, duration) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.type = type;
    this.distance = distance;
    this.duration = duration;
  }
}

class Cycling extends Workout {
  constructor(elevation, ...workoutParams) {
    super(...workoutParams);

    this.elevation = elevation;

    this.calculateSpeed();
  }
  calculateSpeed() {
    this.speed = ((this.distance / this.duration) * 60).toFixed(1);
    console.log(this.speed);
  }
}

class Running extends Workout {
  constructor(cadence, ...workoutParams) {
    super(...workoutParams);

    this.cadence = cadence;

    this.calculateSpeed();
  }

  calculateSpeed() {
    this.speed = (this.duration / this.distance).toFixed(1);
    console.log(this.speed);
  }
}

if (navigator.geolocation) {
  window.navigator.geolocation.getCurrentPosition((locations) => {
    const { latitude, longitude } = locations.coords;

    new Map(latitude, longitude);

    (error) => {
      alert(error.message);
    };
  });
}
