/**
* A container for all the boids. This class calculates the position and velocity of each boid.
* @module Flock
*/
export default class Flock {
  /**
   * Create a new flock of boids with a set of bounds.
   * @param {THREE.Vector3} bounds The outer boundary of the simulation.
   */
  constructor(bounds = new THREE.Vector3(100, 100, 100)) {
    this.boids = [];
    this.bounds = bounds;
  }

  /**
   * Update the position and velocity of each boid.
   * @param {Boid} boid The boid to add to the flock.
   */
  update() {
    this.boids.forEach(_boid => { });
  }
}

