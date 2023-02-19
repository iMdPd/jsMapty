import { Workout } from "./Workout.js";

export class Cycling extends Workout {
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
