import Utils from './utils';

export default class Api {
    constructor(settings) {
        window.Wirtual = { settings: settings };
        window.Wirtual.dom = {};
        window.Wirtual.sayhi = this.sayhi;

        Utils.log('API initiated...');
        Utils.log(window.Wirtual);
    }

    static _addElement(id, options) { window.Wirtual.dom[id] = options; }
    static _getElement(id) { return window.Wirtual.dom[id]; }

    sayhi() { alert('Hi!'); }
}