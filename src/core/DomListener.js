import {capitalize} from '@core/utils';

export default class DomListener {
    constructor($root, listeners = []) {
        console.log('root', $root)
        if (!$root) {
            throw new Error('DomListener: $root is required');
        }
        this.$root = $root;
        this.listeners = listeners;
    }

    addDomListener() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener);
            const name = this.name || this.constructor.name;
            if (!this[method]) {
                throw new Error(`DomListener: method ${method} is not defined in class ${name}`);
            }
            this[method] = this[method].bind(this);
            this.$root.on(listener, this[method])
        })
    }

    removeDomListener() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener);
            this.$root.off(listener, this[method])
        })
    }
}

function getMethodName(eventName) {
    return 'on' + capitalize(eventName);
}
