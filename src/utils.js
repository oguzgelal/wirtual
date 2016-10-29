export default class Utils {
    
    static log(item){
        let prefixString = '--W';
        let prefixObject = '--- W ---'
        if (window.Wirtual && window.Wirtual.settings && window.Wirtual.settings.debug){
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
}