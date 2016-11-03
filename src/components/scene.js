import Api from '../api';

export default class Scene {

    constructor(settings) {
        this.initScene();
    }

    static compile(wid) {

    }

    initScene() {
        window.scene = new THREE.Scene();
    }


}