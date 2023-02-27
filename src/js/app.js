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
  }

  getData() {
    this.form = document.querySelector(".form");
    this.inputType = document.querySelector(".form__input--type");
    this.inputCadence = document.querySelector(".form__input--cadence");
    this.inputElevation = document.querySelector(".form__input--elevation");
  }

  getLocalStorage() {
    const localData = JSON.parse(localStorage.getItem("workoutsData"));

    if (localData) {
      this.workouts = localData;
    }

    console.log(this.workouts);
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

  displayForm(event) {
    this.pointerCoords = event.latlng;
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
      this.renderForm(workout);
      this.renderMarker(workout);
    });
  }

  renderForm(workout) {
    const generatedHTML = templates.workout(workout);
    this.form.insertAdjacentHTML("afterend", generatedHTML);
  }

  renderMarker(workout) {
    console.log(this.map);

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
}

const app = new App();
