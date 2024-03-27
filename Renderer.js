import * as THREE from 'three';
import Stats from 'three/addons/libs/stats.module.js'

import Flock from './Flock.js';

/**
 * A simple renderer that configures a scene, camera, and renderer.
 * @module Renderer
 */
export default class Renderer {
  /**
   * @constructor
   * @param {Flock} flock The flock of boids to render
   */
  constructor(flock) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.stats = new Stats();

    this.flock = flock;
  }

  init() {
    this.scene.background = new THREE.Color(0x1a1b26);

    this.camera.position.set(110, 110, 110);
    this.camera.lookAt(0, 0, 0);

    this.dummy = new THREE.Object3D();

    const geometry = new THREE.ConeGeometry(0.5, 1, 8);
    geometry.computeVertexNormals();
    geometry.scale(0.5, 0.5, 0.5);
    geometry.rotateX(Math.PI / 2);

    const material = new THREE.MeshNormalMaterial();

    this.mesh = new THREE.InstancedMesh(geometry, material, this.flock.boids.length);
    this.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.scene.add(this.mesh);

    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    document.body.appendChild(this.stats.dom);

    window.addEventListener('resize', () => this.onWindowResize());

    this.render();
  }

  /**
   * Render the scene with a camera and all the boids.
   */
  render() {
    if (this.mesh) {

      for (let i = 0; i < this.flock.boids.length; i++) {
        this.dummy.position.set(this.flock.boids[i].position.x, this.flock.boids[i].position.y, this.flock.boids[i].position.z);
        this.dummy.lookAt(this.flock.boids[i].position.clone().add(this.flock.boids[i].velocity));
        this.dummy.updateMatrix();
        this.mesh.setMatrixAt(i, this.dummy.matrix);

        this.mesh.instanceMatrix.needsUpdate = true;
        this.mesh.computeBoundingSphere();
      }

      this.renderer.render(this.scene, this.camera);
      this.stats.update();
    }
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}

