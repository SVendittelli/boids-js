import * as THREE from 'three';

import Boid from './Boid.js';

/**
* A container for all the boids. This class calculates the position and velocity of each boid.
* @module Flock
*/
export default class Flock {
  /**
   * Create a new flock of boids with a set of bounds.
   * @param {THREE.Vector3} bounds The outer boundary of the simulation.
   */
  constructor(bounds = new THREE.Vector3(100, 100, 100), count = 100) {
    const boids = [];
    for (let i = 0; i < count; i++) {
      const position = new THREE.Vector3(
        Math.random() * bounds.x,
        Math.random() * bounds.y,
        Math.random() * bounds.z
      );
      const velocity = new THREE.Vector3().randomDirection();

      boids.push(new Boid(position, velocity));
    }
    this.boids = boids;

    this.bounds = bounds;
  }

  /**
   * Update the position and velocity of each boid.
   * @param {Boid} boid The boid to add to the flock.
   */
  update() {
    this.boids.forEach(boid => boid.move(1, this.bounds));
  }
}

