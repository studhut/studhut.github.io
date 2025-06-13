import * as THREE from "three";

export class CanvasRenderer {
    constructor(id) {
        this.canvas = document.getElementById(id);

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

export class Box {
    constructor(w, h, l, col) {
        this.width = w;
        this.height = h;
        this.length = l;
        this.color = col;

        this.geometry = new THREE.BoxGeometry(w, h, l);
        this.material = new THREE.MeshLambertMaterial({color: this.color});

        this.mesh = new THREE.Mesh(this.geometry, this.material);
    }
}

export class HemisphereLight {
    constructor(top_col, bottom_col, intensity) {
        this.top_col = top_col;
        this.bottom_col = bottom_col;
        this.intensity = intensity;
        
        this.light = new THREE.HemisphereLight(this.top_col, this.bottom_col, this.intensity);
    }
}
