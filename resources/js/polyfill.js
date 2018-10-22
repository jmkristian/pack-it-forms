if (!Array.prototype.forEach) {
    Array.prototype.forEach = function(callback, that) {
        // as specified in ECMA-262, 5th edition
        if (!this) {
            throw new TypeError("Array.forEach this == " + this);
        }
        var obj = Object(this);
        var len = obj.length >>> 0; // toUint32
        if ((typeof callback) != "function") {
            throw new TypeError(callback + " is a " + (typeof callback));
        }
        for (var i = 0; i < len; i++) {
            if (i in obj) {
                callback.call(that, obj[i], i, obj);
            }
        }
    };
}

if (!Array.prototype.map) {
    Array.prototype.map = function(callback, that) {
        // as specified in ECMA-262, 5th edition
        if (!this) {
            throw new TypeError("Array.map this == " + this);
        }
        var obj = Object(this);
        var len = obj.length >>> 0; // toUint32
        if ((typeof callback) != "function") {
            throw new TypeError(callback + " is a " + (typeof callback));
        }
        var result = new Array(len);
        for (var i = 0; i < len; i++) {
            if (i in obj) {
                result[i] = callback.call(that, obj[i], i, obj);
            }
        }
        return result;
    };
}

if (!Array.prototype.some) {
    Array.prototype.some = function(callback, that) {
        // as specified in ECMA-262, 5th edition
        if (!this) {
            throw new TypeError("Array.some this == " + this);
        }
        if ((typeof callback) != "function") {
            throw new TypeError(callback + " is a " + (typeof callback));
        }
        var obj = Object(this);
        var len = obj.length >>> 0; // toUint32
        for (var i = 0; i < len; i++) {
            if (i in obj && callback.call(that, obj[i], i, obj)) {
                return true;
            }
        }
        return false;
    };
}

if (!String.prototype.trim) {
    String.prototype.trim = function() {
        return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
    };
}

if (Object.defineProperty
    && Object.getOwnPropertyDescriptor
    && !(Object.getOwnPropertyDescriptor(Element.prototype, "textContent")
         && Object.getOwnPropertyDescriptor(Element.prototype, "textContent").get)) {
    Object.defineProperty(Element.prototype, "textContent", {
        get: function() {
            return this.innerText;
        },
        set: function(newValue) {
            return this.innerText = newValue;
        }
    });
}
