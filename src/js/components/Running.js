import { Activity } from "./Activity.js";

export class Running extends Activity {
  constructor(cadence, ...activityParams) {
    super(...activityParams);

    this.cadence = cadence;

    this.calculateSpeed();
  }

  calculateSpeed() {
    this.speed = (this.duration / this.distance).toFixed(1);
  }
}
