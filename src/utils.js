import Api from './api';

export default class Utils {
    
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
}