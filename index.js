import Renderer from "./Renderer.js";

class Boids {
  constructor() {
    this.renderer = new Renderer();
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

    this.renderer.cube.rotation.x += 0.01;
    this.renderer.cube.rotation.y += 0.01;

    this.renderer.render();
  }
}

// Create a new instance of the Boids class and start the animation loop.
document.addEventListener("DOMContentLoaded", () => {
  const boids = new Boids();
  boids.init();
});

