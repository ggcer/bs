//改造的alloy-crop
//alloyfinger
function getLen(v) {
    return Math.sqrt(v.x * v.x + v.y * v.y);
}

function dot(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y;
}

function getAngle(v1, v2) {
    var mr = getLen(v1) * getLen(v2);
    if (mr === 0) return 0;
    var r = dot(v1, v2) / mr;
    if (r > 1) r = 1;
    return Math.acos(r);
}

function cross(v1, v2) {
    return v1.x * v2.y - v2.x * v1.y;
}

function getRotateAngle(v1, v2) {
    var angle = getAngle(v1, v2);
    if (cross(v1, v2) > 0) {
        angle *= -1;
    }

    return angle * 180 / Math.PI;
}

var HandlerAdmin = function(el) {
    this.handlers = [];
    this.el = el;
};

HandlerAdmin.prototype.add = function(handler) {
    this.handlers.push(handler);
}

HandlerAdmin.prototype.del = function(handler) {
    if(!handler) this.handlers = [];

    for(var i=this.handlers.length; i>=0; i--) {
        if(this.handlers[i] === handler) {
            this.handlers.splice(i, 1);
        }
    }
}

HandlerAdmin.prototype.dispatch = function() {
    for(var i=0,len=this.handlers.length; i<len; i++) {
        var handler = this.handlers[i];
        if(typeof handler === 'function') handler.apply(this.el, arguments);
    }
}

function wrapFunc(el, handler) {
    var handlerAdmin = new HandlerAdmin(el);
    handlerAdmin.add(handler);

    return handlerAdmin;
}

var AlloyFinger = function (el, option) {

    this.element = typeof el == 'string' ? document.querySelector(el) : el;

    this.start = this.start.bind(this);
    this.move = this.move.bind(this);
    this.end = this.end.bind(this);
    this.cancel = this.cancel.bind(this);
    this.element.addEventListener("touchstart", this.start, false);
    this.element.addEventListener("touchmove", this.move, false);
    this.element.addEventListener("touchend", this.end, false);
    this.element.addEventListener("touchcancel", this.cancel, false);

    this.preV = { x: null, y: null };
    this.pinchStartLen = null;
    this.zoom = 1;
    this.isDoubleTap = false;

    var noop = function () { };

    this.rotate = wrapFunc(this.element, option.rotate || noop);
    this.touchStart = wrapFunc(this.element, option.touchStart || noop);
    this.multipointStart = wrapFunc(this.element, option.multipointStart || noop);
    this.multipointEnd = wrapFunc(this.element, option.multipointEnd || noop);
    this.pinch = wrapFunc(this.element, option.pinch || noop);
    this.swipe = wrapFunc(this.element, option.swipe || noop);
    this.tap = wrapFunc(this.element, option.tap || noop);
    this.doubleTap = wrapFunc(this.element, option.doubleTap || noop);
    this.longTap = wrapFunc(this.element, option.longTap || noop);
    this.singleTap = wrapFunc(this.element, option.singleTap || noop);
    this.pressMove = wrapFunc(this.element, option.pressMove || noop);
    this.twoFingerPressMove = wrapFunc(this.element, option.twoFingerPressMove || noop);
    this.touchMove = wrapFunc(this.element, option.touchMove || noop);
    this.touchEnd = wrapFunc(this.element, option.touchEnd || noop);
    this.touchCancel = wrapFunc(this.element, option.touchCancel || noop);

    this._cancelAllHandler = this.cancelAll.bind(this);
    window.removeEventListener('scroll', this._cancelAllHandler);

    window.addEventListener('scroll', this._cancelAllHandler);

    this.delta = null;
    this.last = null;
    this.now = null;
    this.tapTimeout = null;
    this.singleTapTimeout = null;
    this.longTapTimeout = null;
    this.swipeTimeout = null;
    this.x1 = this.x2 = this.y1 = this.y2 = null;
    this.preTapPosition = { x: null, y: null };
};

AlloyFinger.prototype = {
    start: function (evt) {
        if (!evt.touches) return;
        this.now = Date.now();
        this.x1 = evt.touches[0].pageX;
        this.y1 = evt.touches[0].pageY;
        this.delta = this.now - (this.last || this.now);
        this.touchStart.dispatch(evt, this.element);
        if (this.preTapPosition.x !== null) {
            this.isDoubleTap = (this.delta > 0 && this.delta <= 250 && Math.abs(this.preTapPosition.x - this.x1) < 30 && Math.abs(this.preTapPosition.y - this.y1) < 30);
        }
        this.preTapPosition.x = this.x1;
        this.preTapPosition.y = this.y1;
        this.last = this.now;
        var preV = this.preV,
            len = evt.touches.length;
        if (len > 1) {
            this._cancelLongTap();
            this._cancelSingleTap();
            var v = { x: evt.touches[1].pageX - this.x1, y: evt.touches[1].pageY - this.y1 };
            preV.x = v.x;
            preV.y = v.y;
            this.pinchStartLen = getLen(preV);
            this.multipointStart.dispatch(evt, this.element);
        }
        this._preventTap = false;
        this.longTapTimeout = setTimeout(function () {
            this.longTap.dispatch(evt, this.element);
            this._preventTap = true;
        }.bind(this), 750);
    },
    move: function (evt) {
        if (!evt.touches) return;
        var preV = this.preV,
            len = evt.touches.length,
            currentX = evt.touches[0].pageX,
            currentY = evt.touches[0].pageY;
        this.isDoubleTap = false;
        if (len > 1) {
            var sCurrentX = evt.touches[1].pageX,
                sCurrentY = evt.touches[1].pageY
            var v = { x: evt.touches[1].pageX - currentX, y: evt.touches[1].pageY - currentY };

            if (preV.x !== null) {
                if (this.pinchStartLen > 0) {
                    evt.zoom = getLen(v) / this.pinchStartLen;
                    this.pinch.dispatch(evt, this.element);
                }

                evt.angle = getRotateAngle(v, preV);
                this.rotate.dispatch(evt, this.element);
            }
            preV.x = v.x;
            preV.y = v.y;

            if (this.x2 !== null && this.sx2 !== null) {
                evt.deltaX = (currentX - this.x2 + sCurrentX - this.sx2) / 2;
                evt.deltaY = (currentY - this.y2 + sCurrentY - this.sy2) / 2;
            } else {
                evt.deltaX = 0;
                evt.deltaY = 0;
            }
            this.twoFingerPressMove.dispatch(evt, this.element);

            this.sx2 = sCurrentX;
            this.sy2 = sCurrentY;
        } else {
            if (this.x2 !== null) {
                evt.deltaX = currentX - this.x2;
                evt.deltaY = currentY - this.y2;

            } else {
                evt.deltaX = 0;
                evt.deltaY = 0;
            }
            
            
            this.pressMove.dispatch(evt, this.element);
        }

        this.touchMove.dispatch(evt, this.element);

        this._cancelLongTap();
        this.x2 = currentX;
        this.y2 = currentY;
        
        if (len > 1) {
            evt.preventDefault();
        }
    },
    end: function (evt) {
        if (!evt.changedTouches) return;
        this._cancelLongTap();
        var self = this;
        if (evt.touches.length < 2) {
            this.multipointEnd.dispatch(evt, this.element);
            this.sx2 = this.sy2 = null;
        }

        //swipe
        if ((this.x2 && Math.abs(this.x1 - this.x2) > 30) ||
            (this.y2 && Math.abs(this.y1 - this.y2) > 30)) {
            evt.direction = this._swipeDirection(this.x1, this.x2, this.y1, this.y2);
            this.swipeTimeout = setTimeout(function () {
                self.swipe.dispatch(evt, self.element);

            }, 0)
        } else {
            this.tapTimeout = setTimeout(function () {
                if(!self._preventTap){
                    self.tap.dispatch(evt, self.element);
                }
                // trigger double tap immediately
                if (self.isDoubleTap) {
                    self.doubleTap.dispatch(evt, self.element);
                    clearTimeout(self.singleTapTimeout);
                    self.isDoubleTap = false;
                }
            }, 0)

            if (!self.isDoubleTap) {
                self.singleTapTimeout = setTimeout(function () {
                    self.singleTap.dispatch(evt, self.element);
                }, 250);
            }
        }

        this.touchEnd.dispatch(evt, this.element);

        this.preV.x = 0;
        this.preV.y = 0;
        this.zoom = 1;
        this.pinchStartLen = null;
        this.x1 = this.x2 = this.y1 = this.y2 = null;
    },
    cancelAll: function () {
        this._preventTap = true
        clearTimeout(this.singleTapTimeout);
        clearTimeout(this.tapTimeout);
        clearTimeout(this.longTapTimeout);
        clearTimeout(this.swipeTimeout);
    },
    cancel: function (evt) {
        this.cancelAll()
        this.touchCancel.dispatch(evt, this.element);
    },
    _cancelLongTap: function () {
        clearTimeout(this.longTapTimeout);
    },
    _cancelSingleTap: function () {
        clearTimeout(this.singleTapTimeout);
    },
    _swipeDirection: function (x1, x2, y1, y2) {
        return Math.abs(x1 - x2) >= Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down')
    },

    on: function(evt, handler) {
        if(this[evt]) {
            this[evt].add(handler);
        }
    },

    off: function(evt, handler) {
        if(this[evt]) {
            this[evt].del(handler);
        }
    },

    destroy: function() {
        if(this.singleTapTimeout) clearTimeout(this.singleTapTimeout);
        if(this.tapTimeout) clearTimeout(this.tapTimeout);
        if(this.longTapTimeout) clearTimeout(this.longTapTimeout);
        if(this.swipeTimeout) clearTimeout(this.swipeTimeout);

        this.element.removeEventListener("touchstart", this.start);
        this.element.removeEventListener("touchmove", this.move);
        this.element.removeEventListener("touchend", this.end);
        this.element.removeEventListener("touchcancel", this.cancel);

        this.rotate.del();
        this.touchStart.del();
        this.multipointStart.del();
        this.multipointEnd.del();
        this.pinch.del();
        this.swipe.del();
        this.tap.del();
        this.doubleTap.del();
        this.longTap.del();
        this.singleTap.del();
        this.pressMove.del();
        this.twoFingerPressMove.del()
        this.touchMove.del();
        this.touchEnd.del();
        this.touchCancel.del();

        this.preV = this.pinchStartLen = this.zoom = this.isDoubleTap = this.delta = this.last = this.now = this.tapTimeout = this.singleTapTimeout = this.longTapTimeout = this.swipeTimeout = this.x1 = this.x2 = this.y1 = this.y2 = this.preTapPosition = this.rotate = this.touchStart = this.multipointStart = this.multipointEnd = this.pinch = this.swipe = this.tap = this.doubleTap = this.longTap = this.singleTap = this.pressMove = this.touchMove = this.touchEnd = this.touchCancel = this.twoFingerPressMove = null;

        return null;
    }
};
window.AlloyFinger = AlloyFinger;

//transform
var DEG_TO_RAD =  0.017453292519943295;
var Matrix3D = function (n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {
    this.elements = window.Float32Array ? new Float32Array(16) : [];
    var te = this.elements;
    te[0] = (n11 !== undefined) ? n11 : 1; te[4] = n12 || 0; te[8] = n13 || 0; te[12] = n14 || 0;
    te[1] = n21 || 0; te[5] = (n22 !== undefined) ? n22 : 1; te[9] = n23 || 0; te[13] = n24 || 0;
    te[2] = n31 || 0; te[6] = n32 || 0; te[10] = (n33 !== undefined) ? n33 : 1; te[14] = n34 || 0;
    te[3] = n41 || 0; te[7] = n42 || 0; te[11] = n43 || 0; te[15] = (n44 !== undefined) ? n44 : 1;
};


Matrix3D.prototype = {
    set: function (n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {
        var te = this.elements;
        te[0] = n11; te[4] = n12; te[8] = n13; te[12] = n14;
        te[1] = n21; te[5] = n22; te[9] = n23; te[13] = n24;
        te[2] = n31; te[6] = n32; te[10] = n33; te[14] = n34;
        te[3] = n41; te[7] = n42; te[11] = n43; te[15] = n44;
        return this;
    },
    identity: function () {
        this.set(
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        );
        return this;
    },
    multiplyMatrices: function (a, be) {

        var ae = a.elements;
        var te = this.elements;
        var a11 = ae[0], a12 = ae[4], a13 = ae[8], a14 = ae[12];
        var a21 = ae[1], a22 = ae[5], a23 = ae[9], a24 = ae[13];
        var a31 = ae[2], a32 = ae[6], a33 = ae[10], a34 = ae[14];
        var a41 = ae[3], a42 = ae[7], a43 = ae[11], a44 = ae[15];

        var b11 = be[0], b12 = be[1], b13 = be[2], b14 = be[3];
        var b21 = be[4], b22 = be[5], b23 = be[6], b24 = be[7];
        var b31 = be[8], b32 = be[9], b33 = be[10], b34 = be[11];
        var b41 = be[12], b42 = be[13], b43 = be[14], b44 = be[15];

        te[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
        te[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
        te[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
        te[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;

        te[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
        te[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
        te[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
        te[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;

        te[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
        te[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
        te[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
        te[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;

        te[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
        te[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
        te[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
        te[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;

        return this;

    },
    // 解决角度为90的整数倍导致Math.cos得到极小的数，其实是0。导致不渲染
    _rounded: function (value, i) {
        i = Math.pow(10, i || 15);
        // default
        return Math.round(value * i) / i;
    },
    _arrayWrap: function (arr) {
        return window.Float32Array ? new Float32Array(arr) : arr;
    },
    appendTransform: function (x, y, z, scaleX, scaleY, scaleZ, rotateX, rotateY, rotateZ, skewX, skewY, originX, originY, originZ) {

        var rx = rotateX * DEG_TO_RAD;
        var cosx = this._rounded(Math.cos(rx));
        var sinx = this._rounded(Math.sin(rx));
        var ry = rotateY * DEG_TO_RAD;
        var cosy = this._rounded(Math.cos(ry));
        var siny = this._rounded(Math.sin(ry));
        var rz = rotateZ * DEG_TO_RAD;
        var cosz = this._rounded(Math.cos(rz * -1));
        var sinz = this._rounded(Math.sin(rz * -1));

        this.multiplyMatrices(this, this._arrayWrap([
            1, 0, 0, x,
            0, cosx, sinx, y,
            0, -sinx, cosx, z,
            0, 0, 0, 1
        ]));

        this.multiplyMatrices(this, this._arrayWrap([
            cosy, 0, siny, 0,
            0, 1, 0, 0,
            -siny, 0, cosy, 0,
            0, 0, 0, 1
        ]));

        this.multiplyMatrices(this, this._arrayWrap([
            cosz * scaleX, sinz * scaleY, 0, 0,
            -sinz * scaleX, cosz * scaleY, 0, 0,
            0, 0, 1 * scaleZ, 0,
            0, 0, 0, 1
        ]));

        if (skewX || skewY) {
            this.multiplyMatrices(this, this._arrayWrap([
                this._rounded(Math.cos(skewX * DEG_TO_RAD)), this._rounded(Math.sin(skewX * DEG_TO_RAD)), 0, 0,
                -1 * this._rounded(Math.sin(skewY * DEG_TO_RAD)), this._rounded(Math.cos(skewY * DEG_TO_RAD)), 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            ]));
        }


        if (originX || originY || originZ) {
            this.elements[12] -= originX * this.elements[0] + originY * this.elements[4] + originZ * this.elements[8];
            this.elements[13] -= originX * this.elements[1] + originY * this.elements[5] + originZ * this.elements[9];
            this.elements[14] -= originX * this.elements[2] + originY * this.elements[6] + originZ * this.elements[10];
        }
        return this;
    }
};

var Matrix2D = function(a, b, c, d, tx, ty) {
    this.a = a == null ? 1 : a;
    this.b = b || 0;
    this.c = c || 0;
    this.d = d == null ? 1 : d;
    this.tx = tx || 0;
    this.ty = ty || 0;
    return this;
};

Matrix2D.prototype = {
    identity : function() {
        this.a = this.d = 1;
        this.b = this.c = this.tx = this.ty = 0;
        return this;
    },
    appendTransform : function(x, y, scaleX, scaleY, rotation, skewX, skewY, originX, originY) {
        if (rotation % 360) {
            var r = rotation * DEG_TO_RAD;
            var cos = Math.cos(r);
            var sin = Math.sin(r);
        } else {
            cos = 1;
            sin = 0;
        }
        if (skewX || skewY) {
            skewX *= DEG_TO_RAD;
            skewY *= DEG_TO_RAD;
            this.append(Math.cos(skewY), Math.sin(skewY), -Math.sin(skewX), Math.cos(skewX), x, y);
            this.append(cos * scaleX, sin * scaleX, -sin * scaleY, cos * scaleY, 0, 0);
        } else {
            this.append(cos * scaleX, sin * scaleX, -sin * scaleY, cos * scaleY, x, y);
        }
        if (originX || originY) {
            this.tx -= originX * this.a + originY * this.c;
            this.ty -= originX * this.b + originY * this.d;
        }
        return this;
    },
    append : function(a, b, c, d, tx, ty) {
        var a1 = this.a;
        var b1 = this.b;
        var c1 = this.c;
        var d1 = this.d;
        this.a = a * a1 + b * c1;
        this.b = a * b1 + b * d1;
        this.c = c * a1 + d * c1;
        this.d = c * b1 + d * d1;
        this.tx = tx * a1 + ty * c1 + this.tx;
        this.ty = tx * b1 + ty * d1 + this.ty;
        return this;
    },
    initialize : function(a, b, c, d, tx, ty) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.tx = tx;
        this.ty = ty;
        return this;
    },
    setValues : function(a, b, c, d, tx, ty) {
        this.a = a == null ? 1 : a;
        this.b = b || 0;
        this.c = c || 0;
        this.d = d == null ? 1 : d;
        this.tx = tx || 0;
        this.ty = ty || 0;
        return this;
    },
    copy : function(matrix) {
        return this.setValues(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
    }
};

function observe(target, props, callback) {
    for (var i = 0, len = props.length; i < len; i++) {
        var prop = props[i];
        watch(target, prop, callback);
    }
}

function watch(target, prop, callback) {
    Object.defineProperty(target, prop, {
        get: function () {
            return this["_" + prop];
        },
        set: function (value) {
            this["_" + prop] = value;
            callback();
        }
    });
}

function isElement(o) {
    return (
        typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
        o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string"
    );
}

function Transform(obj, notPerspective) {
    if(obj.___mixCSS3Transform) return;
    var observeProps = ["translateX", "translateY", "translateZ", "scaleX", "scaleY", "scaleZ", "rotateX", "rotateY", "rotateZ", "skewX", "skewY", "originX", "originY", "originZ"],
        objIsElement = isElement(obj);
    if (!notPerspective) {
        observeProps.push("perspective");
    }
    obj.___mixCSS3Transform = true
    observe(
        obj,
        observeProps,
        function () {
            var mtx = obj.matrix3d.identity().appendTransform(obj.translateX, obj.translateY, obj.translateZ, obj.scaleX, obj.scaleY, obj.scaleZ, obj.rotateX, obj.rotateY, obj.rotateZ, obj.skewX, obj.skewY, obj.originX, obj.originY, obj.originZ);
            var transform = (notPerspective ? "" : "perspective(" + obj.perspective + "px) ") + "matrix3d(" + Array.prototype.slice.call(mtx.elements).join(",") + ")";
            if (objIsElement) {
                obj.style.transform = obj.style.msTransform = obj.style.OTransform = obj.style.MozTransform = obj.style.webkitTransform = transform;
            } else {
                obj.transform = transform;
            }
        });

    obj.matrix3d = new Matrix3D();
    if (!notPerspective) {
        obj.perspective = 500;
    }
    obj.scaleX = obj.scaleY = obj.scaleZ = 1;
    //由于image自带了x\y\z，所有加上translate前缀
    obj.translateX = obj.translateY = obj.translateZ = obj.rotateX = obj.rotateY = obj.rotateZ = obj.skewX = obj.skewY = obj.originX = obj.originY = obj.originZ = 0;
}

Transform.getMatrix3D = function (option) {
    var defaultOption = {
        translateX: 0,
        translateY: 0,
        translateZ: 0,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        skewX: 0,
        skewY: 0,
        originX: 0,
        originY: 0,
        originZ: 0,
        scaleX: 1,
        scaleY: 1,
        scaleZ: 1
    };
    for (var key in option) {
        if (option.hasOwnProperty(key)) {
            defaultOption[key] = option[key];
        }
    }
    return new Matrix3D().identity().appendTransform(defaultOption.translateX, defaultOption.translateY, defaultOption.translateZ, defaultOption.scaleX, defaultOption.scaleY, defaultOption.scaleZ, defaultOption.rotateX, defaultOption.rotateY, defaultOption.rotateZ, defaultOption.skewX, defaultOption.skewY, defaultOption.originX, defaultOption.originY, defaultOption.originZ).elements;

}

Transform.getMatrix2D = function(option){
    var defaultOption = {
        translateX: 0,
        translateY: 0,
        rotation: 0,
        skewX: 0,
        skewY: 0,
        originX: 0,
        originY: 0,
        scaleX: 1,
        scaleY: 1
    };
    for (var key in option) {
        if (option.hasOwnProperty(key)) {
            defaultOption[key] = option[key];
        }
    }
    return new Matrix2D().identity().appendTransform(defaultOption.translateX, defaultOption.translateY, defaultOption.scaleX, defaultOption.scaleY, defaultOption.rotation, defaultOption.skewX, defaultOption.skewY, defaultOption.originX, defaultOption.originY);
}
window.Transform = Transform;

//AlloyCrop
var AlloyFinger = window.AlloyFinger;
var Transform = window.Transform;

var AlloyCrop = function (option) {
    this.renderTo = document.getElementById('edit-img-wrap');
    this.canvas = document.createElement("canvas");
    this.output = option.output;
    this.width = option.width;
    this.height = option.height;
    this.canvas.width = option.width * this.output;
    this.canvas.height = option.height * this.output;
    this.circle = option.circle;
    if (option.width !== option.height && option.circle) {
        throw "can't set circle to true when width is not equal to height"
    }
    this.ctx = this.canvas.getContext("2d");
    this.croppingBox = document.createElement("div");
    this.croppingBox.style.visibility = "hidden";
    this.cover = document.createElement("canvas");
    this.type = option.type || "png";
    this.cover.width = document.documentElement.clientWidth;
    this.cover.height = document.documentElement.clientHeight - 70;
    this.cover_ctx = this.cover.getContext("2d");
    this.img = document.createElement("img");

    if(option.image_src.substring(0,4).toLowerCase()==='http') {
        this.img.crossOrigin = 'anonymous';//resolve base64 uri bug in safari:"cross-origin image load denied by cross-origin resource sharing policy."
    }
    this.cancel = option.cancel;
    this.ok = option.ok;

    this.croppingBox.appendChild(this.img);
    this.croppingBox.appendChild(this.cover);
    this.renderTo.appendChild(this.croppingBox);
    this.img.onload = this.init.bind(this);
    this.img.src = option.image_src;

};

AlloyCrop.prototype = {
    init: function () {

        this.img_width = this.img.width;
        this.img_height = this.img.height;
        Transform(this.img,true);
        var scaling_x = window.innerWidth / this.img_width,
            scaling_y = window.innerHeight / this.img_height;
        var scaling = scaling_x > scaling_y ? scaling_y : scaling_x;
        this.initScale = scaling;
        this.img.scaleX = this.img.scaleY = scaling;
        var self = this;
        new AlloyFinger(this.croppingBox, {
            multipointStart: function (evt) {
                //reset origin x and y
                var centerX = (evt.touches[0].clientX + evt.touches[1].clientX) / 2;
                var centerY = (evt.touches[0].clientY + evt.touches[1].clientY) / 2;
                var cr = self.img.getBoundingClientRect();
                var img_centerX = cr.left + cr.width / 2;
                var img_centerY = cr.top + cr.height / 2;
                var offX = centerX - img_centerX;
                var offY = centerY - img_centerY;
                var preOriginX = self.img.originX
                var preOriginY = self.img.originY
                self.img.originX = offX / self.img.scaleX;
                self.img.originY = offY / self.img.scaleY;
                //reset translateX and translateY
                self.img.translateX += offX - preOriginX * self.img.scaleX;
                self.img.translateY += offY - preOriginY * self.img.scaleX;

                self.initScale = self.img.scaleX;
            },
            pinch: function (evt) {
                self.img.scaleX = self.img.scaleY = self.initScale * evt.zoom;
            },
            pressMove: function (evt) {
                self.img.translateX += evt.deltaX;
                self.img.translateY += evt.deltaY;
                evt.preventDefault();
            }
        });

        this.renderCover();
        this.setStyle();

    },
    renderCover: function () {
        var ctx = this.cover_ctx,
            w = this.cover.width,
            h = this.cover.height,
            cw = this.width,
            ch = this.height;
        ctx.save();
        ctx.fillStyle = "black";
        ctx.globalAlpha = 0.7;
        ctx.fillRect(0, 0, this.cover.width, this.cover.height);
        ctx.restore();
        ctx.save();
        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        if (this.circle) {
            ctx.arc(w / 2, h / 2, cw / 2 - 4, 0, Math.PI * 2, false);
        } else {
            ctx.rect(w / 2 - cw / 2, h / 2 - ch / 2, cw, ch)
        }
        ctx.fill();
        ctx.restore();
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = "white";
        if (this.circle) {
            ctx.arc(w / 2, h / 2, cw / 2 - 4, 0, Math.PI * 2, false);
        } else {
            ctx.rect(w / 2 - cw / 2, h / 2 - ch / 2, cw, ch)
        }
        ctx.stroke();
    },
    setStyle: function () {
        this._css(this.cover, {
            position: "absolute",
            zIndex: "100",
            left: "0px",
            top: "0px"
        });

        this._css(this.croppingBox, {
            color: "white",
            textAlign: "center",
            fontSize: "18px",
            textDecoration: "none",
            visibility: "visible"
        });
        this._css(this.img, {
            position: "fixed",
            zIndex: "1",
            top: window.innerHeight / 2 + "px",
            marginLeft: this.img_width / -2 + "px",
            marginTop: this.img_height / -2 + "px"
        });
    },
    crop: function () {
        this.calculateRect();
        this.ctx.drawImage(this.img, this.crop_rect[0], this.crop_rect[1], this.crop_rect[2], this.crop_rect[3], 0, 0, this.canvas.width, this.canvas.height);

    },
    calculateRect: function () {
        var cr = this.img.getBoundingClientRect();
        var c_left = window.innerWidth / 2 - this.width / 2;
        var c_top = window.innerHeight / 2 - this.height / 2 + 35;
        var cover_rect = [c_left, c_top, this.width + c_left, this.height + c_top];
        var img_rect = [cr.left, cr.top, cr.width + cr.left, cr.height + cr.top];
        var intersect_rect = this.getOverlap.apply(this, cover_rect.concat(img_rect));
        var left = (intersect_rect[0] - img_rect[0]) / this.img.scaleX;
        var top = (intersect_rect[1] - img_rect[1]) / this.img.scaleY;
        var width = intersect_rect[2] / this.img.scaleX;
        var height = intersect_rect[3] / this.img.scaleY;

        if (left < 0) left = 0;
        if (top < 0) top = 0;
        if (left + width > this.img_width) width = this.img_width - left;
        if (top + height > this.img_height) height = this.img_height - top;

        this.crop_rect = [left, top, width, height];
    },
    // top left (x1,y1) and bottom right (x2,y2) coordination
    getOverlap: function (ax1, ay1, ax2, ay2, bx1, by1, bx2, by2) {
        if (ax2 < bx1 || ay2 < by1 || ax1 > bx2 || ay1 > by2) return [0, 0, 0, 0];

        var left = Math.max(ax1, bx1);
        var top = Math.max(ay1, by1);
        var right = Math.min(ax2, bx2);
        var bottom = Math.min(ay2, by2);
        return [left, top, right - left, bottom - top]
    },
    _css: function (el, obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                el.style[key] = obj[key];
            }
        }
    }
};

export default AlloyCrop;
