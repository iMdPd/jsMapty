import { Activity } from './Activity.js';

export class Cycling extends Activity {
  constructor(elevation, ...activityParams) {
    super(...activityParams);

    this.elevation = elevation;

    this.calculateSpeed();
  }
  calculateSpeed() {
    this.speed = ((this.distance / this.duration) * 60).toFixed(1);
  }
}
