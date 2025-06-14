// @ts-ignore
import * as THREE from 'three';

// @ts-check
export class CanvasRenderer {
    public canvas: HTMLCanvasElement;
    public width: number;
    public height: number;
    public renderer: THREE.WebGLRenderer;
    public scene: THREE.Scene;
    public camera: THREE.PerspectiveCamera;

    constructor(id: string) {
        this.canvas = document.getElementById(id) as HTMLCanvasElement;

        this.width = this.canvas.width;
        this.height = this.canvas.height;
        
        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: false });
        this.renderer.setSize(this.width, this.height, false);
        this.renderer.setAnimationLoop(() => this.render());

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75,
            this.canvas.width / this.canvas.height,
            0.1,
            1000
        );

        this.camera.position.z = 5;
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }

    add(object) {
        this.scene.add(object);
    }
}
