import { Workout } from "./components/Workout.js";
import { templates } from "./settings.js";

class App {
  constructor() {
    this.workouts = [];

    this.getData();
    this.getLocalStorage();
    this.getLocation();
    this.switchInput();

    this.form.addEventListener("submit", this.createNewWorkout.bind(this));
    this.workoutsContainer.addEventListener(
      "click",
      this.centerWorkoutMarker.bind(this)
    );
  }

  getData() {
    this.form = document.querySelector(".form");
    this.inputType = document.querySelector(".form__input--type");
    this.inputCadence = document.querySelector(".form__input--cadence");
    this.inputElevation = document.querySelector(".form__input--elevation");
    this.workoutsContainer = document.querySelector(".workouts");
  }

  getLocalStorage() {
    const localData = JSON.parse(localStorage.getItem("workoutsData"));

    if (localData) {
      this.workouts = localData;
    }
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((locations) => {
        this.renderMap(locations.coords),
          (error) => {
            alert(error.message);
          };
      });
    }
  }

  renderMap({ latitude, longitude }) {
    this.map = L.map("map", {
      center: [latitude, longitude],
      zoom: 13,
    });

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    this.map.on("click", this.displayForm.bind(this));
    this.renderLocalStorageData();
  }

  displayForm(map) {
    this.pointerCoords = map.latlng;
    this.form.classList.remove("hidden");
  }

  switchInput() {
    const inputCadenceParent = this.inputCadence.closest(".form__row");
    const inputElevationParent = this.inputElevation.closest(".form__row");

    this.inputType.addEventListener("change", function () {
      inputCadenceParent.classList.toggle("form__row--hidden");
      inputElevationParent.classList.toggle("form__row--hidden");
    });
  }

  renderLocalStorageData() {
    this.workouts.forEach((workout) => {
      console.log(workout);
      this.renderForm(workout);
      this.renderMarker(workout);
    });
  }

  renderForm(workout) {
    const generatedHTML = templates.workout(workout);
    this.form.insertAdjacentHTML("afterend", generatedHTML);
  }

  renderMarker(workout) {
    const { latitude, longitude, type, description, workoutSymbol } = workout;
    L.marker([latitude, longitude])
      .addTo(this.map)
      .bindPopup(
        L.popup({
          className: `${type}-popup`,
          autoClose: false,
          closeOnClick: false,
        })
      )
      .setPopupContent(`${workoutSymbol} ${description}`)
      .openPopup();
  }

  createNewWorkout(e) {
    e.preventDefault();

    this.workoutInstance = new Workout(
      this.pointerCoords,
      this.workouts,
      this.map
    );
  }

  centerWorkoutMarker(e) {
    const workoutFormId = e.target.closest(".workout").dataset.id;

    const matchingWorkout = this.workouts.find(
      (workout) => workout.dateId == workoutFormId
    );

    const coords = [matchingWorkout.latitude, matchingWorkout.longitude];

    this.map.setView(coords, 13);
  }
}

const app = new App();
