import { Running } from "./Running.js";
import { Cycling } from "./Cycling.js";

export class Workout {
  constructor(coords, workouts, map) {
    const { lat, lng } = coords;

    this.workouts = workouts;
    this.map = map;
    this.getData();
    this.newWorkout(lat, lng);
  }

  getData() {
    this.form = document.querySelector(".form");
    this.inputDistance = document.querySelector(".form__input--distance");
    this.inputDuration = document.querySelector(".form__input--duration");
    this.inputType = document.querySelector(".form__input--type");
    this.inputCadence = document.querySelector(".form__input--cadence");
    this.inputElevation = document.querySelector(".form__input--elevation");

    const date = new Date();
    const months = [
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

    let WorkoutSymbol;

    this.inputType.value === "running"
      ? (WorkoutSymbol = "🏃‍♂️")
      : (WorkoutSymbol = "🚴‍♀️");

    this.description = `${WorkoutSymbol} ${
      this.inputType.value.toUpperCase().slice(0, 1) +
      this.inputType.value.substring(1)
    } on ${date.getDate()} ${months[date.getMonth()]} `;
  }

  newWorkout(lat, lng) {
    const inputValues = [this.inputDistance.value, this.inputDuration.value];
    let workout;

    this.inputType.value === "running"
      ? inputValues.push(this.inputCadence.value)
      : inputValues.push(this.inputElevation.value);

    if (!this.hasOnlyNumbers(inputValues)) {
      alert("Please type numbers!");
      return;
    }

    if (!this.hasOnlyPositiveNumbers(inputValues)) {
      alert("Please type positive numbers!");
      return;
    }

    if (this.inputType.value === "cycling") {
      workout = new Cycling(
        this.inputElevation.value,
        lat,
        lng,
        this.inputType.value,
        this.inputDistance.value,
        this.inputDuration.value
      );
    } else {
      workout = new Running(
        this.inputCadence.value,
        lat,
        lng,
        this.inputType.value,
        this.inputDistance.value,
        this.inputDuration.value
      );
    }

    this.workouts.push(workout);
    this.setInputsToDefault();
    this.addWorkoutMarker(workout);
  }

  hasOnlyPositiveNumbers(params) {
    return params.every((inputValue) => inputValue > 0);
  }

  hasOnlyNumbers(params) {
    return params.every((inputValue) => parseFloat(inputValue));
  }

  setInputsToDefault() {
    this.inputElevation.value =
      this.inputCadence.value =
      this.inputDistance.value =
      this.inputDuration.value =
        "";
    this.form.classList.add("hidden");
  }

  addWorkoutMarker({ latitude, longitude, type }) {
    L.marker([latitude, longitude])
      .addTo(this.map)
      .bindPopup(`${this.description}`)
      .openPopup();
  }
}
