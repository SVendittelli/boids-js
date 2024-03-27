import * as THREE from 'three';

/**
 * The Boid class represents a single boid in the simulation. It has a position and velocity.
 */
export default class Boid {
  /**
   * Create a boid with a position and velocity.
   * @param {THREE.Vector3} position - The initial position of the boid.
   * @param {THREE.Vector3} velocity - The initial velocity of the boid.
   */
  constructor(position, velocity) {
    this.position = position;
    this.velocity = velocity;
  }

  /**
   * Update the position of the boid.
   * @param {number} maxSpeed The maximum speed the boid can move.
   * @param {THREE.Vector3} bounds The outer boundary of the simulation.
   */
  move(maxSpeed, bounds) {
    this.velocity.clampScalar(-maxSpeed, maxSpeed);

    const newPosition = this.position.add(this.velocity);
    newPosition.clamp(new THREE.Vector3(), bounds);
  }

}

