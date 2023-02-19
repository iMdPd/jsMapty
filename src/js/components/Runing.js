import { Workout } from "./Workout.js";

export class Running extends Workout {
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
