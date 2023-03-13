import { Exercise } from './Exercise.js';

export class Running extends Exercise {
  constructor(cadence, ...exerciseParams) {
    super(...exerciseParams);

    this.cadence = cadence;

    this.calculateSpeed();
  }

  calculateSpeed() {
    this.speed = (this.duration / this.distance).toFixed(1);
  }
}
