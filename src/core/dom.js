class Dom {
    constructor(selector) {
        this.$el = typeof selector === 'string'
            ? document.querySelector(selector)
            : selector;
    }

    html(html) {
        if (typeof html === 'string') {
            this.$el.innerHTML = html;
            return this;
        }
        return this.$el.outerHTML.trim();
    }

    on(event, callback) {
        this.$el.addEventListener(event, callback);
        return this;
    }

    off(event, callback) {
        this.$el.removeEventListener(event, callback);
        return this;
    }

    append(node) {
        if (node instanceof Dom)
            node = node.$el;
        if (
            typeof node === 'string' ||
            node instanceof HTMLElement ||
            node instanceof Text
        )
            if (Element.prototype.append) {
                this.$el.append(node);
            } else {
                this.$el.appendChild(node);
            }
        return this;
    }

    clear() {
        this.html('')
        return this;
    }
}

export function $(selector) {
    return new Dom(selector);
}

$.create = (tagName, classes = '') => {
    const el = document.createElement(tagName);
    if (classes) {
        el.classList.add(classes)
    }
    return $(el);
}
