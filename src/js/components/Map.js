export class Map {
  constructor(latitude, longitude) {
    this.map;
    this.latitude = latitude;
    this.longitude = longitude;

    this.getData();
    this.renderMap();
  }

  getData() {
    const thisMap = this;

    thisMap.form = document.querySelector(".form");
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
      // this.addMarker(lat, lng, "I`m here");

      this.displayWorkoutForm();
    });
  }

  displayWorkoutForm() {
    const thisMap = this;

    thisMap.form.classList.remove("hidden");
    thisMap.form.addEventListener("submit", thisMap.createWorkout);
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
        this.latitude,
        this.longitude,
        inputType.value,
        inputDistance.value,
        inputDuration.value
      );
      html + console.log(cycling);
    } else {
      const running = new Running(
        inputCadence.value,
        this.latitude,
        this.longitude,
        inputType.value,
        inputDistance.value,
        inputDuration.value
      );
      console.log(running);
    }
  };
}
