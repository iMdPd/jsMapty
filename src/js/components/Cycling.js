import { Exercise } from './Exercise.js';

export class Cycling extends Exercise {
  constructor(elevation, ...exerciseParams) {
    super(...exerciseParams);

    this.elevation = elevation;

    this.calculateSpeed();
  }
  calculateSpeed() {
    this.speed = ((this.distance / this.duration) * 60).toFixed(1);
  }
}
