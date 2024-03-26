import * as THREE from 'three';

/**
 * A simple renderer that configures a scene, camera, and renderer.
 * @module Renderer
 */
export default class Renderer {
  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer();
    this.cube = null;
  }

  init() {
    this.scene.background = new THREE.Color(0x1a1b26);

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x73daca });
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);

    this.camera.position.z = 5;

    this.render();
  }

  /**
   * Render the scene with a camera and all the boids.
   */
  render() {
    // TODO: Add each boid to the scene.

    this.renderer.render(this.scene, this.camera);
  }
}

