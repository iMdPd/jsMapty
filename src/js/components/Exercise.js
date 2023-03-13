export class Exercise {
  constructor(
    latitude,
    longitude,
    type,
    distance,
    duration,
    description,
    dateId,
    workoutSymbol
  ) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.type = type;
    this.distance = distance;
    this.duration = duration;
    this.description = description;
    this.dateId = dateId;
    this.workoutSymbol = workoutSymbol;
  }
}
