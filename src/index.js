import Compiler from './compiler';
import Api from './api';
import Utils from './utils';

export default class Wirtual {

    constructor(settings) {
        // ----- Initiate the api -----
        // This instantiates the Api class and exposes it to the 'window' variable.  
        window.Wirtual = new Api(settings);
        // ----- Initiate the compiler -----
        // This will start the compilation of the page 
        new Compiler();
    }
}

document.addEventListener("DOMContentLoaded", function(event) {
    // Initiate the library (on page load)
    new Wirtual({ debug: true });
});