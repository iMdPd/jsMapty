import { Running } from "./Running.js";
import { Cycling } from "./Cycling.js";

export class Workout {
  constructor(coords, workouts) {
    const { lat, lng } = coords;

    this.workouts = workouts;

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

    thisWorkout.workouts.push(workout);

    this.setInputsToDefault();
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
}
