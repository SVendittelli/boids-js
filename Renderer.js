import * as THREE from 'three';
import Stats from 'three/addons/libs/stats.module.js'

/**
 * A simple renderer that configures a scene, camera, and renderer.
 * @module Renderer
 */
export default class Renderer {
  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.stats = new Stats();
  }

  init() {
    this.scene.background = new THREE.Color(0x1a1b26);

    this.camera.position.set(10, 10, 10);
    this.camera.lookAt(0, 0, 0);

    this.dummy = new THREE.Object3D();

    const geometry = new THREE.ConeGeometry(0.5, 1, 8);
    geometry.computeVertexNormals();
    geometry.scale(0.5, 0.5, 0.5);

    const material = new THREE.MeshNormalMaterial();

    this.mesh = new THREE.InstancedMesh(geometry, material, 1000);
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
      const time = Date.now() * 0.001;

      this.mesh.rotation.x = Math.sin(time / 4);
      this.mesh.rotation.y = Math.sin(time / 2);

      let i = 0;

      for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
          for (let z = 0; z < 10; z++) {
            this.dummy.position.set(4.5 - x, 4.5 - y, 4.5 - z);
            this.dummy.rotation.y = (Math.sin(x / 4 + time) + Math.sin(y / 4 + time) + Math.sin(z / 4 + time));
            this.dummy.rotation.z = this.dummy.rotation.y * 2;
            this.dummy.updateMatrix();
            this.mesh.setMatrixAt(i++, this.dummy.matrix);
          }
        }

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

