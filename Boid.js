import * as THREE from 'three';

const ORIGIN = new THREE.Vector3();
const MARGIN = 10;

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
    this.acceleration = new THREE.Vector3();

    this.minSpeed = 0.1;
    this.maxSpeed = 1;

    this.alignmentForce = 0.05;
    this.cohesionForce = 0.0005;
    this.separationForce = 0.05;
    this.avoidenceForce = 0.2;

    this.visualRange = 20 ** 2;
    this.protectedRange = 2 ** 2;
  }

  /**
   * Update the position, velocity, and acceleration of the boid.
   * @param {number} maxSpeed The maximum speed the boid can move.
   * @param {THREE.Vector3} bounds The outer boundary of the simulation.
   */
  move(bounds) {
    this.position.add(this.velocity);
    this.position.clamp(ORIGIN, bounds);

    this.velocity.add(this.acceleration);
    this.velocity.clampLength(this.minSpeed, this.maxSpeed);

    this.acceleration.set(0, 0, 0);
  }

  flock(boids, bounds) {
    // Create accumulators for alignment, cohesion, and separation.
    let alignment = new THREE.Vector3();
    let cohesion = new THREE.Vector3();
    let separation = new THREE.Vector3();
    let neighborCount = 0;

    for (let boid of boids) {
      if (boid === this) {
        continue;
      }

      const distance = this.position.distanceToSquared(boid.position);

      if (distance < this.protectedRange) {
        this.separate(boid, separation);
      } else if (distance < this.visualRange) {
        this.align(boid, alignment);
        this.cohere(boid, cohesion);
        neighborCount++;
      }
    }

    if (neighborCount > 0) {
      // Divide the accumulated vectors by the number of neighbors to get the average.
      alignment.divideScalar(neighborCount);
      cohesion.divideScalar(neighborCount);

      // Subtract the cirrent velocity from the average alignment to get the steering force.
      alignment.sub(this.velocity);
      // Subtract the current position from the average cohesion to get the steering force.
      cohesion.sub(this.position);

      this.acceleration.add(alignment.multiplyScalar(this.alignmentForce));
      this.acceleration.add(cohesion.multiplyScalar(this.cohesionForce));
      this.acceleration.add(separation.multiplyScalar(this.separationForce));
    }

    this.edgeAvoidance(bounds);
  }

  align(boid, steering) {
    steering.add(boid.velocity);
  }

  cohere(boid, steering) {
    steering.add(boid.position);
  }

  separate(boid, steering) {
    steering.add(this.position.clone().sub(boid.position));
  }

  /**
   * Avoid the edges of the simulation.
   * @param {THREE.Vector3} bounds The outer boundary of the simulation.
   */
  edgeAvoidance(bounds) {
    if (this.position.x <= MARGIN) {
      this.acceleration.x += this.avoidenceForce;
    }
    if (this.position.x >= bounds.x - MARGIN) {
      this.acceleration.x -= this.avoidenceForce;
    }
    if (this.position.y <= MARGIN) {
      this.acceleration.y += this.avoidenceForce;
    }
    if (this.position.y >= bounds.y - MARGIN) {
      this.acceleration.y -= this.avoidenceForce;
    }
    if (this.position.z <= MARGIN) {
      this.acceleration.z += this.avoidenceForce;
    }
    if (this.position.z >= bounds.z - MARGIN) {
      this.acceleration.z -= this.avoidenceForce;
    }
  }
}

