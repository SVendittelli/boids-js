import Flock from "./Flock.js";
import Renderer from "./Renderer.js";

class Boids {
  constructor() {
    this.flock = new Flock();
    this.renderer = new Renderer(this.flock)
  }

  init() {
    // Initialize the renderer.
    this.renderer.init();

    // Start the animation loop.
    requestAnimationFrame(this.animate.bind(this));
  }

  animate() {
    // Call the animate function recursively to keep the animation loop going.
    requestAnimationFrame(this.animate.bind(this));

    this.flock.update();

    this.renderer.render();
  }
}

// Create a new instance of the Boids class and start the animation loop.
document.addEventListener("DOMContentLoaded", () => {
  const boids = new Boids();
  boids.init();
});

