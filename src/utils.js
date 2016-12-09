import Api from './api';

export default class Utils {

    static hasClass(el, className) {
        if (el.classList){ return el.classList.contains(className); }
        else{ return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)')); }    
    }

    static addClass(el, className) {
        if (el.classList){ el.classList.add(className); }
        else if (!this.hasClass(el, className)) el.className += " " + className;
    }

    static removeClass(el, className) {
        if (el.classList){ el.classList.remove(className); }
        else if (this.hasClass(el, className)) {
            var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
            el.className=el.className.replace(reg, ' ');
        }
    }
    
    static log(item){
        let prefixString = '--W';
        let prefixObject = '--- W ---'
        if (Api.get().isDebug()){
            let colorful = 'background: #222; color: #bada55';
            let colorless = 'background: transparent; color: rgb(1,16,31)';
            if (typeof item === 'string'){
                console.log('%c' + prefixString + '%c' + ' ' + item, colorful, colorless);
            }
            else {
                console.log('%c' + prefixObject, colorful);
                console.log(item);
            }
        }
    }

    static random(length){
        return Math.random().toString(36).substr(2, length);
    }

    static toDegrees(radians) {
        const pi = 3.1415;
        return radians * (180 / pi);
    }

    static toRadians(degrees) {
        const pi = 3.1415;
        return degrees * (pi / 180);
    }

    // Calculate x y z coordinates and rotation given grid system variables
    static calculatePosition(depth, axis, level){
        depth = parseInt(depth);
        axis = parseInt(axis);
        level = parseInt(level);
        let self = this;
        return {
            x: depth * Math.sin(self.toRadians(axis)),
            y: level,
            z: depth * Math.cos(self.toRadians(axis)) * -1,
            rotation: self.toRadians(axis)
        }
    }
    
    // TODO
    // Calculate rotation given x y z coordinates (for 'position absolute' cases)
    static calculateRotation(x, y, z){
        return null;
    }
}