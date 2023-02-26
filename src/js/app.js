import { Workout } from "./components/Workout.js";

class App {
  constructor() {
    this.workouts = [];

    this.getData();
    this.getLocation();

    this.switchInput();
    this.form.addEventListener("submit", this.createNewWorkout.bind(this));
    this.getLocalStorage();
  }

  getLocalStorage() {
    const localData = JSON.parse(localStorage.getItem("workoutsData"));

    if (localData) {
      this.workouts = localData;
    }

    console.log(this.workouts);
  }

  getData() {
    this.form = document.querySelector(".form");
    this.inputType = document.querySelector(".form__input--type");
    this.inputCadence = document.querySelector(".form__input--cadence");
    this.inputElevation = document.querySelector(".form__input--elevation");
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((locations) => {
        this.renderMap(locations),
          (error) => {
            alert(error.message);
          };
      });
    }
  }

  renderMap(position) {
    const { latitude, longitude } = position.coords;

    this.map = L.map("map", {
      center: [latitude, longitude],
      zoom: 13,
    });

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    this.workouts.forEach(({ latitude, longitude, type, description }) => {
      L.marker([latitude, longitude])
        .addTo(this.map)
        .bindPopup(
          L.popup({
            className: `${type}-popup`,
            autoClose: false,
            closeOnClick: false,
          })
        )
        .setPopupContent(`${description}`)
        .openPopup();
    });
    this.renderWorkoutForm();
    this.map.on("click", this.displayForm.bind(this));
  }

  renderWorkoutForm() {
    const form = document.querySelector(".form");
    const templates = {
      workout: Handlebars.compile(
        document.querySelector("#workout-template").innerHTML
      ),
    };
    this.workouts.forEach((workout) => {
      const generatedHTML = templates.workout(workout);

      form.insertAdjacentHTML("afterend", generatedHTML);
    });
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
