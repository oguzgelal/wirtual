import Api from './api';

export default class Scene {
    
    constructor(settings) {
        this.initScreen();
    }

    initScreen(){
        window.scene = new THREE.Scene();
    }


}