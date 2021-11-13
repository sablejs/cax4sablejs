var $81XA9$process = require("process");

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
var $parcel$global =
typeof globalThis !== 'undefined'
  ? globalThis
  : typeof self !== 'undefined'
  ? self
  : typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
  ? global
  : {};
var $b3be0e9a34bf22d9$exports = {};

/**
 * Tween.js - Licensed under the MIT license
 * https://github.com/tweenjs/tween.js
 * ----------------------------------------------
 *
 * See https://github.com/tweenjs/tween.js/graphs/contributors for the full list of contributors.
 * Thank you all, you're awesome!
 */ var $b3be0e9a34bf22d9$var$_Group = function() {
    this._tweens = {
    };
    this._tweensAddedDuringUpdate = {
    };
};
$b3be0e9a34bf22d9$var$_Group.prototype = {
    getAll: function() {
        return Object.keys(this._tweens).map((function(tweenId) {
            return this._tweens[tweenId];
        }).bind(this));
    },
    removeAll: function() {
        this._tweens = {
        };
    },
    add: function(tween) {
        this._tweens[tween.getId()] = tween;
        this._tweensAddedDuringUpdate[tween.getId()] = tween;
    },
    remove: function(tween) {
        delete this._tweens[tween.getId()];
        delete this._tweensAddedDuringUpdate[tween.getId()];
    },
    update: function(time, preserve) {
        var tweenIds = Object.keys(this._tweens);
        if (tweenIds.length === 0) return false;
        time = time !== undefined ? time : $b3be0e9a34bf22d9$var$TWEEN.now(); // Tweens are updated in "batches". If you add a new tween during an update, then the
        // new tween will be updated in the next batch.
        // If you remove a tween during an update, it may or may not be updated. However,
        // if the removed tween was added during the current batch, then it will not be updated.
        while(tweenIds.length > 0){
            this._tweensAddedDuringUpdate = {
            };
            for(var i = 0; i < tweenIds.length; i++){
                var tween = this._tweens[tweenIds[i]];
                if (tween && tween.update(time) === false) {
                    tween._isPlaying = false;
                    if (!preserve) delete this._tweens[tweenIds[i]];
                }
            }
            tweenIds = Object.keys(this._tweensAddedDuringUpdate);
        }
        return true;
    }
};
var $b3be0e9a34bf22d9$var$TWEEN = new $b3be0e9a34bf22d9$var$_Group();
$b3be0e9a34bf22d9$var$TWEEN.Group = $b3be0e9a34bf22d9$var$_Group;
$b3be0e9a34bf22d9$var$TWEEN._nextId = 0;
$b3be0e9a34bf22d9$var$TWEEN.nextId = function() {
    return $b3be0e9a34bf22d9$var$TWEEN._nextId++;
}; // Include a performance.now polyfill.
// In node.js, use process.hrtime.
if (typeof window === 'undefined' && typeof $81XA9$process !== 'undefined') {
    if (typeof wx !== 'undefined') $b3be0e9a34bf22d9$var$TWEEN.now = Date.now;
    else $b3be0e9a34bf22d9$var$TWEEN.now = function() {
        var time = $81XA9$process.hrtime(); // Convert [seconds, nanoseconds] to milliseconds.
        return time[0] * 1000 + time[1] / 1000000;
    };
} else if (typeof window !== 'undefined' && window.performance !== undefined && window.performance.now !== undefined) // This must be bound, because directly assigning this function
// leads to an invocation exception in Chrome.
$b3be0e9a34bf22d9$var$TWEEN.now = window.performance.now.bind(window.performance);
else if (Date.now !== undefined) // Use Date.now if it is available.
$b3be0e9a34bf22d9$var$TWEEN.now = Date.now;
else // Otherwise, use 'new Date().getTime()'.
$b3be0e9a34bf22d9$var$TWEEN.now = function() {
    return new Date().getTime();
};
$b3be0e9a34bf22d9$var$TWEEN.Tween = function(object, group) {
    this._object = object;
    this._valuesStart = {
    };
    this._valuesEnd = {
    };
    this._valuesStartRepeat = {
    };
    this._duration = 1000;
    this._repeat = 0;
    this._repeatDelayTime = undefined;
    this._yoyo = false;
    this._isPlaying = false;
    this._reversed = false;
    this._delayTime = 0;
    this._startTime = null;
    this._easingFunction = $b3be0e9a34bf22d9$var$TWEEN.Easing.Linear.None;
    this._interpolationFunction = $b3be0e9a34bf22d9$var$TWEEN.Interpolation.Linear;
    this._chainedTweens = [];
    this._onStartCallback = null;
    this._onStartCallbackFired = false;
    this._onUpdateCallback = null;
    this._onCompleteCallback = null;
    this._onStopCallback = null;
    this._group = group || $b3be0e9a34bf22d9$var$TWEEN;
    this._id = $b3be0e9a34bf22d9$var$TWEEN.nextId();
    this._paused = false;
    this._passTime = null;
};
$b3be0e9a34bf22d9$var$TWEEN.Tween.prototype = {
    getId: function getId() {
        return this._id;
    },
    toggle () {
        if (this._paused) this.play();
        else this.pause();
    },
    pause: function() {
        this._paused = true;
        var pauseTime = $b3be0e9a34bf22d9$var$TWEEN.now();
        this._passTime = pauseTime - this._startTime;
    },
    play: function() {
        this._paused = false;
        var nowTime = $b3be0e9a34bf22d9$var$TWEEN.now();
        this._startTime = nowTime - this._passTime;
    },
    isPlaying: function isPlaying() {
        return this._isPlaying;
    },
    to: function to(properties, duration) {
        this._valuesEnd = properties;
        if (duration !== undefined) this._duration = duration;
        return this;
    },
    start: function start(time) {
        this._group.add(this);
        this._isPlaying = true;
        this._onStartCallbackFired = false;
        this._startTime = time !== undefined ? typeof time === 'string' ? $b3be0e9a34bf22d9$var$TWEEN.now() + parseFloat(time) : time : $b3be0e9a34bf22d9$var$TWEEN.now();
        this._startTime += this._delayTime;
        for(var property in this._valuesEnd){
            // Check if an Array was provided as property value
            if (this._valuesEnd[property] instanceof Array) {
                if (this._valuesEnd[property].length === 0) continue;
                 // Create a local copy of the Array with the start value at the front
                this._valuesEnd[property] = [
                    this._object[property]
                ].concat(this._valuesEnd[property]);
            } // If `to()` specifies a property that doesn't exist in the source object,
            // we should not set that property in the object
            if (this._object[property] === undefined) continue;
             // Save the starting value.
            this._valuesStart[property] = this._object[property];
            if (this._valuesStart[property] instanceof Array === false) this._valuesStart[property] *= 1; // Ensures we're using numbers, not strings
            this._valuesStartRepeat[property] = this._valuesStart[property] || 0;
        }
        return this;
    },
    stop: function stop() {
        if (!this._isPlaying) return this;
        this._group.remove(this);
        this._isPlaying = false;
        if (this._onStopCallback !== null) this._onStopCallback(this._object);
        this.stopChainedTweens();
        return this;
    },
    end: function end() {
        this.update(this._startTime + this._duration);
        return this;
    },
    stopChainedTweens: function stopChainedTweens() {
        for(var i = 0, numChainedTweens = this._chainedTweens.length; i < numChainedTweens; i++)this._chainedTweens[i].stop();
    },
    group: function group(group) {
        this._group = group;
        return this;
    },
    delay: function delay(amount) {
        this._delayTime = amount;
        return this;
    },
    repeat: function repeat(times) {
        this._repeat = times;
        return this;
    },
    repeatDelay: function repeatDelay(amount) {
        this._repeatDelayTime = amount;
        return this;
    },
    yoyo: function yoyo(yy) {
        this._yoyo = yy;
        return this;
    },
    easing: function easing(eas) {
        this._easingFunction = eas;
        return this;
    },
    interpolation: function interpolation(inter) {
        this._interpolationFunction = inter;
        return this;
    },
    chain: function chain() {
        this._chainedTweens = arguments;
        return this;
    },
    onStart: function onStart(callback) {
        this._onStartCallback = callback;
        return this;
    },
    onUpdate: function onUpdate(callback) {
        this._onUpdateCallback = callback;
        return this;
    },
    onComplete: function onComplete(callback) {
        this._onCompleteCallback = callback;
        return this;
    },
    onStop: function onStop(callback) {
        this._onStopCallback = callback;
        return this;
    },
    update: function update(time) {
        if (this._paused) return true;
        var property;
        var elapsed;
        var value;
        if (time < this._startTime) return true;
        if (this._onStartCallbackFired === false) {
            if (this._onStartCallback !== null) this._onStartCallback(this._object);
            this._onStartCallbackFired = true;
        }
        elapsed = (time - this._startTime) / this._duration;
        elapsed = this._duration === 0 || elapsed > 1 ? 1 : elapsed;
        value = this._easingFunction(elapsed);
        for(property in this._valuesEnd){
            // Don't update properties that do not exist in the source object
            if (this._valuesStart[property] === undefined) continue;
            var start = this._valuesStart[property] || 0;
            var end = this._valuesEnd[property];
            if (end instanceof Array) this._object[property] = this._interpolationFunction(end, value);
            else {
                // Parses relative end values with start as base (e.g.: +10, -3)
                if (typeof end === 'string') {
                    if (end.charAt(0) === '+' || end.charAt(0) === '-') end = start + parseFloat(end);
                    else end = parseFloat(end);
                } // Protect against non numeric properties.
                if (typeof end === 'number') this._object[property] = start + (end - start) * value;
            }
        }
        if (this._onUpdateCallback !== null) this._onUpdateCallback(this._object);
        if (elapsed === 1) {
            if (this._repeat > 0) {
                if (isFinite(this._repeat)) this._repeat--;
                 // Reassign starting values, restart by making startTime = now
                for(property in this._valuesStartRepeat){
                    if (typeof this._valuesEnd[property] === 'string') this._valuesStartRepeat[property] = this._valuesStartRepeat[property] + parseFloat(this._valuesEnd[property]);
                    if (this._yoyo) {
                        var tmp = this._valuesStartRepeat[property];
                        this._valuesStartRepeat[property] = this._valuesEnd[property];
                        this._valuesEnd[property] = tmp;
                    }
                    this._valuesStart[property] = this._valuesStartRepeat[property];
                }
                if (this._yoyo) this._reversed = !this._reversed;
                if (this._repeatDelayTime !== undefined) this._startTime = time + this._repeatDelayTime;
                else this._startTime = time + this._delayTime;
                return true;
            } else {
                if (this._onCompleteCallback !== null) this._onCompleteCallback(this._object);
                for(var i = 0, numChainedTweens = this._chainedTweens.length; i < numChainedTweens; i++)// Make the chained tweens start exactly at the time they should,
                // even if the `update()` method was called way past the duration of the tween
                this._chainedTweens[i].start(this._startTime + this._duration);
                return false;
            }
        }
        return true;
    }
};
$b3be0e9a34bf22d9$var$TWEEN.Easing = {
    Linear: {
        None: function(k) {
            return k;
        }
    },
    Quadratic: {
        In: function(k) {
            return k * k;
        },
        Out: function(k) {
            return k * (2 - k);
        },
        InOut: function(k) {
            if ((k *= 2) < 1) return 0.5 * k * k;
            return -0.5 * (--k * (k - 2) - 1);
        }
    },
    Cubic: {
        In: function(k) {
            return k * k * k;
        },
        Out: function(k) {
            return --k * k * k + 1;
        },
        InOut: function(k) {
            if ((k *= 2) < 1) return 0.5 * k * k * k;
            return 0.5 * ((k -= 2) * k * k + 2);
        }
    },
    Quartic: {
        In: function(k) {
            return k * k * k * k;
        },
        Out: function(k) {
            return 1 - --k * k * k * k;
        },
        InOut: function(k) {
            if ((k *= 2) < 1) return 0.5 * k * k * k * k;
            return -0.5 * ((k -= 2) * k * k * k - 2);
        }
    },
    Quintic: {
        In: function(k) {
            return k * k * k * k * k;
        },
        Out: function(k) {
            return --k * k * k * k * k + 1;
        },
        InOut: function(k) {
            if ((k *= 2) < 1) return 0.5 * k * k * k * k * k;
            return 0.5 * ((k -= 2) * k * k * k * k + 2);
        }
    },
    Sinusoidal: {
        In: function(k) {
            return 1 - Math.cos(k * Math.PI / 2);
        },
        Out: function(k) {
            return Math.sin(k * Math.PI / 2);
        },
        InOut: function(k) {
            return 0.5 * (1 - Math.cos(Math.PI * k));
        }
    },
    Exponential: {
        In: function(k) {
            return k === 0 ? 0 : Math.pow(1024, k - 1);
        },
        Out: function(k) {
            return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
        },
        InOut: function(k) {
            if (k === 0) return 0;
            if (k === 1) return 1;
            if ((k *= 2) < 1) return 0.5 * Math.pow(1024, k - 1);
            return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);
        }
    },
    Circular: {
        In: function(k) {
            return 1 - Math.sqrt(1 - k * k);
        },
        Out: function(k) {
            return Math.sqrt(1 - --k * k);
        },
        InOut: function(k) {
            if ((k *= 2) < 1) return -0.5 * (Math.sqrt(1 - k * k) - 1);
            return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
        }
    },
    Elastic: {
        In: function(k) {
            if (k === 0) return 0;
            if (k === 1) return 1;
            return -Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);
        },
        Out: function(k) {
            if (k === 0) return 0;
            if (k === 1) return 1;
            return Math.pow(2, -10 * k) * Math.sin((k - 0.1) * 5 * Math.PI) + 1;
        },
        InOut: function(k) {
            if (k === 0) return 0;
            if (k === 1) return 1;
            k *= 2;
            if (k < 1) return -0.5 * Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);
            return 0.5 * Math.pow(2, -10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI) + 1;
        }
    },
    Back: {
        In: function(k) {
            var s = 1.70158;
            return k * k * ((s + 1) * k - s);
        },
        Out: function(k) {
            var s = 1.70158;
            return --k * k * ((s + 1) * k + s) + 1;
        },
        InOut: function(k) {
            var s = 2.5949095;
            if ((k *= 2) < 1) return 0.5 * (k * k * ((s + 1) * k - s));
            return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
        }
    },
    Bounce: {
        In: function(k) {
            return 1 - $b3be0e9a34bf22d9$var$TWEEN.Easing.Bounce.Out(1 - k);
        },
        Out: function(k) {
            if (k < 1 / 2.75) return 7.5625 * k * k;
            else if (k < 2 / 2.75) return 7.5625 * (k -= 1.5 / 2.75) * k + 0.75;
            else if (k < 2.5 / 2.75) return 7.5625 * (k -= 2.25 / 2.75) * k + 0.9375;
            else return 7.5625 * (k -= 2.625 / 2.75) * k + 0.984375;
        },
        InOut: function(k) {
            if (k < 0.5) return $b3be0e9a34bf22d9$var$TWEEN.Easing.Bounce.In(k * 2) * 0.5;
            return $b3be0e9a34bf22d9$var$TWEEN.Easing.Bounce.Out(k * 2 - 1) * 0.5 + 0.5;
        }
    }
};
$b3be0e9a34bf22d9$var$TWEEN.Interpolation = {
    Linear: function(v, k) {
        var m = v.length - 1;
        var f = m * k;
        var i = Math.floor(f);
        var fn = $b3be0e9a34bf22d9$var$TWEEN.Interpolation.Utils.Linear;
        if (k < 0) return fn(v[0], v[1], f);
        if (k > 1) return fn(v[m], v[m - 1], m - f);
        return fn(v[i], v[i + 1 > m ? m : i + 1], f - i);
    },
    Bezier: function(v, k) {
        var b = 0;
        var n = v.length - 1;
        var pw = Math.pow;
        var bn = $b3be0e9a34bf22d9$var$TWEEN.Interpolation.Utils.Bernstein;
        for(var i = 0; i <= n; i++)b += pw(1 - k, n - i) * pw(k, i) * v[i] * bn(n, i);
        return b;
    },
    CatmullRom: function(v, k) {
        var m = v.length - 1;
        var f = m * k;
        var i = Math.floor(f);
        var fn = $b3be0e9a34bf22d9$var$TWEEN.Interpolation.Utils.CatmullRom;
        if (v[0] === v[m]) {
            if (k < 0) i = Math.floor(f = m * (1 + k));
            return fn(v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m], f - i);
        } else {
            if (k < 0) return v[0] - (fn(v[0], v[0], v[1], v[1], -f) - v[0]);
            if (k > 1) return v[m] - (fn(v[m], v[m], v[m - 1], v[m - 1], f - m) - v[m]);
            return fn(v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2], f - i);
        }
    },
    Utils: {
        Linear: function(p0, p1, t) {
            return (p1 - p0) * t + p0;
        },
        Bernstein: function(n, i) {
            var fc = $b3be0e9a34bf22d9$var$TWEEN.Interpolation.Utils.Factorial;
            return fc(n) / fc(i) / fc(n - i);
        },
        Factorial: (function() {
            var a = [
                1
            ];
            return function(n) {
                var s = 1;
                if (a[n]) return a[n];
                for(var i = n; i > 1; i--)s *= i;
                a[n] = s;
                return s;
            };
        })(),
        CatmullRom: function(p0, p1, p2, p3, t) {
            var v0 = (p2 - p0) * 0.5;
            var v1 = (p3 - p1) * 0.5;
            var t2 = t * t;
            var t3 = t * t2;
            return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;
        }
    }
}; // UMD (Universal Module Definition)
(function(root) {
    if ("object" !== 'undefined' && typeof $b3be0e9a34bf22d9$exports === 'object') // Node.js
    $b3be0e9a34bf22d9$exports = $b3be0e9a34bf22d9$var$TWEEN;
    else if (root !== undefined) // Global variable
    root.TWEEN = $b3be0e9a34bf22d9$var$TWEEN;
})($b3be0e9a34bf22d9$exports);



/*!
 *  raf-interval v0.3.0 By dntzhang
 *  Github: https://github.com/dntzhang/raf-interval
 *  MIT Licensed.
 */ if (!Date.now) Date.now = function now() {
    return new Date().getTime();
};
let $b3d8b592aa6dd52e$var$queue = [], $b3d8b592aa6dd52e$var$id = -1, $b3d8b592aa6dd52e$var$ticking = false, $b3d8b592aa6dd52e$var$tickId = null, $b3d8b592aa6dd52e$var$now = Date.now, $b3d8b592aa6dd52e$var$lastTime = 0, $b3d8b592aa6dd52e$var$vendors = [
    'ms',
    'moz',
    'webkit',
    'o'
], $b3d8b592aa6dd52e$var$x = 0, $b3d8b592aa6dd52e$var$isWeapp = typeof wx !== 'undefined' && typeof Page !== 'undefined', $b3d8b592aa6dd52e$var$isWegame = typeof wx !== 'undefined' && typeof Page === 'undefined', $b3d8b592aa6dd52e$var$isBrowser = typeof window !== 'undefined';
let $b3d8b592aa6dd52e$var$raf = $b3d8b592aa6dd52e$var$isBrowser ? window.requestAnimationFrame : null;
let $b3d8b592aa6dd52e$var$caf = $b3d8b592aa6dd52e$var$isBrowser ? window.cancelAnimationFrame : null;
function $b3d8b592aa6dd52e$var$mockRaf(callback, element) {
    let currTime = $b3d8b592aa6dd52e$var$now();
    let timeToCall = Math.max(0, 16 - (currTime - $b3d8b592aa6dd52e$var$lastTime));
    let id = setTimeout(function() {
        callback(currTime + timeToCall);
    }, timeToCall);
    $b3d8b592aa6dd52e$var$lastTime = currTime + timeToCall;
    return id;
}
function $b3d8b592aa6dd52e$var$mockCaf(id) {
    clearTimeout(id);
}
if ($b3d8b592aa6dd52e$var$isBrowser) {
    window.setRafInterval = $b3d8b592aa6dd52e$export$f34283cc2c2ba8c8;
    window.clearRafInterval = $b3d8b592aa6dd52e$export$3ef6dffe869813b5;
    for(; $b3d8b592aa6dd52e$var$x < $b3d8b592aa6dd52e$var$vendors.length && !window.requestAnimationFrame; ++$b3d8b592aa6dd52e$var$x){
        window.requestAnimationFrame = window[$b3d8b592aa6dd52e$var$vendors[$b3d8b592aa6dd52e$var$x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[$b3d8b592aa6dd52e$var$vendors[$b3d8b592aa6dd52e$var$x] + 'CancelAnimationFrame'] || window[$b3d8b592aa6dd52e$var$vendors[$b3d8b592aa6dd52e$var$x] + 'CancelRequestAnimationFrame'];
    }
    if (!$b3d8b592aa6dd52e$var$raf) {
        $b3d8b592aa6dd52e$var$raf = $b3d8b592aa6dd52e$var$mockRaf;
        $b3d8b592aa6dd52e$var$caf = $b3d8b592aa6dd52e$var$mockCaf;
        window.requestAnimationFrame = $b3d8b592aa6dd52e$var$raf;
        window.cancelAnimationFrame = $b3d8b592aa6dd52e$var$caf;
    }
} else if ($b3d8b592aa6dd52e$var$isWeapp) {
    $b3d8b592aa6dd52e$var$raf = $b3d8b592aa6dd52e$var$mockRaf;
    $b3d8b592aa6dd52e$var$caf = $b3d8b592aa6dd52e$var$mockCaf;
} else if ($b3d8b592aa6dd52e$var$isWegame) {
    $b3d8b592aa6dd52e$var$raf = requestAnimationFrame;
    $b3d8b592aa6dd52e$var$caf = cancelAnimationFrame;
}
function $b3d8b592aa6dd52e$export$f34283cc2c2ba8c8(fn, interval) {
    $b3d8b592aa6dd52e$var$id++;
    $b3d8b592aa6dd52e$var$queue.push({
        id: $b3d8b592aa6dd52e$var$id,
        fn: fn,
        interval: interval,
        lastTime: $b3d8b592aa6dd52e$var$now()
    });
    if (!$b3d8b592aa6dd52e$var$ticking) {
        let tick = function() {
            $b3d8b592aa6dd52e$var$tickId = $b3d8b592aa6dd52e$var$raf(tick);
            $b3d8b592aa6dd52e$var$each($b3d8b592aa6dd52e$var$queue, function(item) {
                if (item.interval < 17 || $b3d8b592aa6dd52e$var$now() - item.lastTime >= item.interval) {
                    item.fn();
                    item.lastTime = $b3d8b592aa6dd52e$var$now();
                }
            });
        };
        $b3d8b592aa6dd52e$var$ticking = true;
        tick();
    }
    return $b3d8b592aa6dd52e$var$id;
}
function $b3d8b592aa6dd52e$export$3ef6dffe869813b5(id) {
    let i = 0, len = $b3d8b592aa6dd52e$var$queue.length;
    for(; i < len; i++)if (id === $b3d8b592aa6dd52e$var$queue[i].id) {
        $b3d8b592aa6dd52e$var$queue.splice(i, 1);
        break;
    }
    if ($b3d8b592aa6dd52e$var$queue.length === 0) {
        $b3d8b592aa6dd52e$var$caf($b3d8b592aa6dd52e$var$tickId);
        $b3d8b592aa6dd52e$var$ticking = false;
    }
}
function $b3d8b592aa6dd52e$var$each(arr, fn) {
    if (Array.prototype.forEach) arr.forEach(fn);
    else {
        let i = 0, len = arr.length;
        for(; i < len; i++)fn(arr[i], i);
    }
}


class $f6c01cc9a280eff9$var$To {
    constructor(element1){
        this.element = element1;
        this.cmds = [];
        this.index = 0;
        this.tweens = [];
        this._pause = false;
        this.loop = $b3d8b592aa6dd52e$export$f34283cc2c2ba8c8(function() {
            (/*@__PURE__*/$parcel$interopDefault($b3be0e9a34bf22d9$exports)).update();
        }, 15);
        this.cycleCount = 0;
    }
    to(target, duration, easing) {
        this.cmds.push([
            'to'
        ]);
        if (arguments.length !== 0) for(let key in target)this.set(key, target[key], duration || 0, easing);
        return this;
    }
    set(prop, value, duration1, easing1) {
        this.cmds[this.cmds.length - 1].push([
            prop,
            [
                value,
                duration1,
                easing1
            ]
        ]);
        return this;
    }
    x() {
        this.cmds[this.cmds.length - 1].push([
            'x',
            arguments
        ]);
        return this;
    }
    y() {
        this.cmds[this.cmds.length - 1].push([
            'y',
            arguments
        ]);
        return this;
    }
    z() {
        this.cmds[this.cmds.length - 1].push([
            'z',
            arguments
        ]);
        return this;
    }
    rotation() {
        this.cmds[this.cmds.length - 1].push([
            'rotation',
            arguments
        ]);
        return this;
    }
    scaleX() {
        this.cmds[this.cmds.length - 1].push([
            'scaleX',
            arguments
        ]);
        return this;
    }
    scaleY() {
        this.cmds[this.cmds.length - 1].push([
            'scaleY',
            arguments
        ]);
        return this;
    }
    skewX() {
        this.cmds[this.cmds.length - 1].push([
            'skewX',
            arguments
        ]);
        return this;
    }
    skewY() {
        this.cmds[this.cmds.length - 1].push([
            'skewY',
            arguments
        ]);
        return this;
    }
    originX() {
        this.cmds[this.cmds.length - 1].push([
            'originX',
            arguments
        ]);
        return this;
    }
    originY() {
        this.cmds[this.cmds.length - 1].push([
            'originY',
            arguments
        ]);
        return this;
    }
    alpha() {
        this.cmds[this.cmds.length - 1].push([
            'alpha',
            arguments
        ]);
        return this;
    }
    begin(fn) {
        this.cmds[this.cmds.length - 1].begin = fn;
        return this;
    }
    progress(fn1) {
        this.cmds[this.cmds.length - 1].progress = fn1;
        return this;
    }
    end(fn2) {
        this.cmds[this.cmds.length - 1].end = fn2;
        return this;
    }
    wait() {
        this.cmds.push([
            'wait',
            arguments
        ]);
        return this;
    }
    then() {
        this.cmds.push([
            'then',
            arguments
        ]);
        return this;
    }
    cycle() {
        this.cmds.push([
            'cycle',
            arguments
        ]);
        return this;
    }
    start() {
        if (this._pause) return;
        var len = this.cmds.length;
        if (this.index < len) this.exec(this.cmds[this.index], this.index === len - 1);
        else $b3d8b592aa6dd52e$export$3ef6dffe869813b5(this.loop);
        return this;
    }
    pause() {
        this._pause = true;
        for(var i = 0, len = this.tweens.length; i < len; i++)this.tweens[i].pause();
        if (this.currentTask === 'wait') {
            this.timeout -= new Date() - this.currentTaskBegin;
            this.currentTaskBegin = new Date();
        }
    }
    toggle() {
        if (this._pause) this.play();
        else this.pause();
    }
    play() {
        this._pause = false;
        for(var i = 0, len = this.tweens.length; i < len; i++)this.tweens[i].play();
        var self = this;
        if (this.currentTask === 'wait') setTimeout(function() {
            if (self._pause) return;
            self.index++;
            self.start();
            if (self.index === self.cmds.length && self.complete) self.complete();
        }, this.timeout);
    }
    stop() {
        for(var i = 0, len = this.tweens.length; i < len; i++)this.tweens[i].stop();
        this.cmds.length = 0;
    }
    animate(name) {
        this.cmds = this.cmds.concat($f6c01cc9a280eff9$var$To.animationMap[name] || []);
        return this;
    }
    exec(cmd, last) {
        var len = cmd.length, self = this;
        this.currentTask = cmd[0];
        switch(this.currentTask){
            case 'to':
                self.stepCompleteCount = 0;
                for(var i = 1; i < len; i++){
                    var task = cmd[i];
                    var ease = task[1][2];
                    var target = {
                    };
                    var prop = task[0];
                    target[prop] = task[1][0];
                    var t = new (/*@__PURE__*/$parcel$interopDefault($b3be0e9a34bf22d9$exports)).Tween(this.element).to(target, task[1][1]).onStart(function() {
                        if (cmd.begin) cmd.begin.call(self.element, self.element);
                    }).onUpdate(function() {
                        if (cmd.progress) cmd.progress.call(self.element, self.element); // self.element[prop] = this[prop];
                    }).easing(ease || (/*@__PURE__*/$parcel$interopDefault($b3be0e9a34bf22d9$exports)).Easing.Linear.None).onComplete(function() {
                        self.stepCompleteCount++;
                        if (self.stepCompleteCount === len - 1) {
                            if (cmd.end) cmd.end.call(self.element, self.element);
                            if (last && self.complete) self.complete();
                            self.index++;
                            self.start();
                        }
                    }).start();
                    this.tweens.push(t);
                }
                break;
            case 'wait':
                this.currentTaskBegin = new Date();
                this.timeout = cmd[1][0];
                setTimeout(function() {
                    if (self._pause) return;
                    self.index++;
                    self.start();
                    if (cmd.end) cmd.end.call(self.element, self.element);
                    if (last && self.complete) self.complete();
                }, cmd[1][0]);
                break;
            case 'then':
                var arg = cmd[1][0];
                arg.index = 0;
                arg.complete = function() {
                    self.index++;
                    self.start();
                    if (last && self.complete) self.complete();
                };
                arg.start();
                break;
            case 'cycle':
                var count = cmd[1][1];
                if (count === undefined) {
                    self.index = cmd[1][0] || 0;
                    self.start();
                } else if (count && self.cycleCount === count) {
                    self.index++;
                    self.start();
                    if (last && self.complete) self.complete();
                } else {
                    self.cycleCount++;
                    self.index = cmd[1][0];
                    self.start();
                }
                break;
        }
    }
}
$f6c01cc9a280eff9$var$To.get = function(element) {
    var to = new $f6c01cc9a280eff9$var$To(element);
    return to;
};
$f6c01cc9a280eff9$var$To.animationMap = {
};
$f6c01cc9a280eff9$var$To.extend = function(animationName, cmds) {
    $f6c01cc9a280eff9$var$To.animationMap[animationName] = cmds;
};
var $f6c01cc9a280eff9$export$2e2bcd8739ae039 = $f6c01cc9a280eff9$var$To;



$f6c01cc9a280eff9$export$2e2bcd8739ae039.extend('rubber', [
    [
        'to',
        [
            'scaleX',
            {
                '0': 1.25,
                '1': 300
            }
        ],
        [
            'scaleY',
            {
                '0': 0.75,
                '1': 300
            }
        ]
    ],
    [
        'to',
        [
            'scaleX',
            {
                '0': 0.75,
                '1': 100
            }
        ],
        [
            'scaleY',
            {
                '0': 1.25,
                '1': 100
            }
        ]
    ],
    [
        'to',
        [
            'scaleX',
            {
                '0': 1.15,
                '1': 100
            }
        ],
        [
            'scaleY',
            {
                '0': 0.85,
                '1': 100
            }
        ]
    ],
    [
        'to',
        [
            'scaleX',
            {
                '0': 0.95,
                '1': 150
            }
        ],
        [
            'scaleY',
            {
                '0': 1.05,
                '1': 150
            }
        ]
    ],
    [
        'to',
        [
            'scaleX',
            {
                '0': 1.05,
                '1': 100
            }
        ],
        [
            'scaleY',
            {
                '0': 0.95,
                '1': 100
            }
        ]
    ],
    [
        'to',
        [
            'scaleX',
            {
                '0': 1,
                '1': 250
            }
        ],
        [
            'scaleY',
            {
                '0': 1,
                '1': 250
            }
        ]
    ]
]);
$f6c01cc9a280eff9$export$2e2bcd8739ae039.extend('bounceIn', [
    [
        'to',
        [
            'scaleX',
            {
                '0': 0,
                '1': 0
            }
        ],
        [
            'scaleY',
            {
                '0': 0,
                '1': 0
            }
        ]
    ],
    [
        'to',
        [
            'scaleX',
            {
                '0': 1.35,
                '1': 200
            }
        ],
        [
            'scaleY',
            {
                '0': 1.35,
                '1': 200
            }
        ]
    ],
    [
        'to',
        [
            'scaleX',
            {
                '0': 0.9,
                '1': 100
            }
        ],
        [
            'scaleY',
            {
                '0': 0.9,
                '1': 100
            }
        ]
    ],
    [
        'to',
        [
            'scaleX',
            {
                '0': 1.1,
                '1': 100
            }
        ],
        [
            'scaleY',
            {
                '0': 1.1,
                '1': 100
            }
        ]
    ],
    [
        'to',
        [
            'scaleX',
            {
                '0': 0.95,
                '1': 100
            }
        ],
        [
            'scaleY',
            {
                '0': 0.95,
                '1': 100
            }
        ]
    ],
    [
        'to',
        [
            'scaleX',
            {
                '0': 1,
                '1': 100
            }
        ],
        [
            'scaleY',
            {
                '0': 1,
                '1': 100
            }
        ]
    ]
]);
$f6c01cc9a280eff9$export$2e2bcd8739ae039.extend('flipInX', [
    [
        'to',
        [
            'rotateX',
            {
                '0': -90,
                '1': 0
            }
        ]
    ],
    [
        'to',
        [
            'rotateX',
            {
                '0': 20,
                '1': 300
            }
        ]
    ],
    [
        'to',
        [
            'rotateX',
            {
                '0': -20,
                '1': 300
            }
        ]
    ],
    [
        'to',
        [
            'rotateX',
            {
                '0': 10,
                '1': 300
            }
        ]
    ],
    [
        'to',
        [
            'rotateX',
            {
                '0': -5,
                '1': 300
            }
        ]
    ],
    [
        'to',
        [
            'rotateX',
            {
                '0': 0,
                '1': 300
            }
        ]
    ]
]);
$f6c01cc9a280eff9$export$2e2bcd8739ae039.extend('zoomOut', [
    [
        'to',
        [
            'scaleX',
            {
                '0': 0,
                '1': 400
            }
        ],
        [
            'scaleY',
            {
                '0': 0,
                '1': 400
            }
        ]
    ]
]);


let $463719c37c18c090$var$wegameCanvas = null;
if (typeof wx !== 'undefined') {
    // 在开放数据域的环境下，用`wx.getSharedCanvas`创建canvas
    if (wx.getSharedCanvas) $463719c37c18c090$var$wegameCanvas = wx.getSharedCanvas();
    else if (wx.createCanvas) $463719c37c18c090$var$wegameCanvas = wx.createCanvas();
}
var $463719c37c18c090$export$2e2bcd8739ae039 = $463719c37c18c090$var$wegameCanvas;


const $31bedce70ad6a922$var$DEG_TO_RAD = 0.017453292519943295;
const $31bedce70ad6a922$var$PI_2 = Math.PI * 2;
class $31bedce70ad6a922$var$Matrix2D {
    constructor(a4, b4, c4, d4, tx4, ty4){
        this.a = a4 == null ? 1 : a4;
        this.b = b4 || 0;
        this.c = c4 || 0;
        this.d = d4 == null ? 1 : d4;
        this.tx = tx4 || 0;
        this.ty = ty4 || 0;
        return this;
    }
    identity() {
        this.a = this.d = 1;
        this.b = this.c = this.tx = this.ty = 0;
        return this;
    }
    appendTransform(x, y, scaleX, scaleY, rotation, skewX1, skewY1, originX, originY) {
        if (rotation % 360) {
            var r = rotation * $31bedce70ad6a922$var$DEG_TO_RAD;
            var cos = Math.cos(r);
            var sin = Math.sin(r);
        } else {
            cos = 1;
            sin = 0;
        }
        if (skewX1 || skewY1) {
            skewX1 *= $31bedce70ad6a922$var$DEG_TO_RAD;
            skewY1 *= $31bedce70ad6a922$var$DEG_TO_RAD;
            this.append(Math.cos(skewY1), Math.sin(skewY1), -Math.sin(skewX1), Math.cos(skewX1), x, y);
            this.append(cos * scaleX, sin * scaleX, -sin * scaleY, cos * scaleY, 0, 0);
        } else this.append(cos * scaleX, sin * scaleX, -sin * scaleY, cos * scaleY, x, y);
        if (originX || originY) {
            this.tx -= originX * this.a + originY * this.c;
            this.ty -= originX * this.b + originY * this.d;
        }
        return this;
    }
    append(a1, b1, c1, d1, tx1, ty1) {
        var a11 = this.a;
        var b11 = this.b;
        var c11 = this.c;
        var d11 = this.d;
        this.a = a1 * a11 + b1 * c11;
        this.b = a1 * b11 + b1 * d11;
        this.c = c1 * a11 + d1 * c11;
        this.d = c1 * b11 + d1 * d11;
        this.tx = tx1 * a11 + ty1 * c11 + this.tx;
        this.ty = tx1 * b11 + ty1 * d11 + this.ty;
        return this;
    }
    initialize(a2, b2, c2, d2, tx2, ty2) {
        this.a = a2;
        this.b = b2;
        this.c = c2;
        this.d = d2;
        this.tx = tx2;
        this.ty = ty2;
        return this;
    }
    setValues(a3, b3, c3, d3, tx3, ty3) {
        this.a = a3 == null ? 1 : a3;
        this.b = b3 || 0;
        this.c = c3 || 0;
        this.d = d3 == null ? 1 : d3;
        this.tx = tx3 || 0;
        this.ty = ty3 || 0;
        return this;
    }
    invert() {
        let a1 = this.a;
        let b1 = this.b;
        let c1 = this.c;
        let d1 = this.d;
        let tx1 = this.tx;
        let n = a1 * d1 - b1 * c1;
        this.a = d1 / n;
        this.b = -b1 / n;
        this.c = -c1 / n;
        this.d = a1 / n;
        this.tx = (c1 * this.ty - d1 * tx1) / n;
        this.ty = -(a1 * this.ty - b1 * tx1) / n;
        return this;
    }
    copy(matrix) {
        return this.setValues(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
    }
}
$31bedce70ad6a922$var$Matrix2D.decompose = function(a, b, c, d, tx, ty, transform) {
    const skewX = -Math.atan2(-c, d);
    const skewY = Math.atan2(b, a);
    const delta = Math.abs(skewX + skewY);
    if (delta < 0.00001 || Math.abs($31bedce70ad6a922$var$PI_2 - delta) < 0.00001) {
        transform.rotation = skewY;
        if (a < 0 && d >= 0) transform.rotation += transform.rotation <= 0 ? Math.PI : -Math.PI;
        transform.skewX = transform.skewY = 0;
    } else {
        transform.rotation = 0;
        transform.skewX = skewX;
        transform.skewY = skewY;
    } // next set scale
    transform.scaleX = Math.sqrt(a * a + b * b);
    transform.scaleY = Math.sqrt(c * c + d * d); // next set position
    transform.x = tx;
    transform.y = ty;
};
var $31bedce70ad6a922$export$2e2bcd8739ae039 = $31bedce70ad6a922$var$Matrix2D;


var $4ca6ae723696d7dd$export$2e2bcd8739ae039 = {
    stagePropagationStopped: {
    }
};


class $28a4d199fa5cc88d$var$EventDispatcher {
    constructor(){
        this._listeners = null;
        this._captureListeners = null;
    }
    addEventListener(type, listener, useCapture) {
        var listeners;
        if (useCapture) listeners = this._captureListeners = this._captureListeners || {
        };
        else listeners = this._listeners = this._listeners || {
        };
        var arr = listeners[type];
        if (arr) this.removeEventListener(type, listener, useCapture);
        arr = listeners[type]; // remove may have deleted the array
        if (!arr) listeners[type] = [
            listener
        ];
        else arr.push(listener);
        return listener;
    }
    removeEventListener(type1, listener1, useCapture1) {
        var listeners = useCapture1 ? this._captureListeners : this._listeners;
        if (!listeners) return;
        var arr = listeners[type1];
        if (!arr) return;
        arr.every((item, index)=>{
            if (item === listener1) {
                arr.splice(index, 1);
                return false;
            }
            return true;
        });
    }
    on(type2, listener2, useCapture2) {
        this.addEventListener(type2, listener2, useCapture2);
    }
    off(type3, listener3, useCapture3) {
        this.removeEventListener(type3, listener3, useCapture3);
    }
    dispatchEvent(evt) {
        $4ca6ae723696d7dd$export$2e2bcd8739ae039.stagePropagationStopped[evt.type] = false;
        var top = this, list = [
            top
        ];
        while(top.parent)list.push(top = top.parent);
        var i, l = list.length; // capture & atTarget
        for(i = l - 1; i >= 0 && !evt.propagationStopped; i--)list[i]._dispatchEvent(evt, 0);
         // bubbling
        for(i = 0; i < l && !evt.propagationStopped; i++)list[i]._dispatchEvent(evt, 1);
    }
    _dispatchEvent(evt1, type4) {
        evt1.target = this;
        if (this._captureListeners && type4 === 0) {
            let cls = this._captureListeners[evt1.type];
            cls && cls.forEach((fn)=>{
                fn.call(this, evt1);
            });
        }
        if (this._listeners && type4 === 1) {
            let ls = this._listeners[evt1.type];
            ls && ls.forEach((fn)=>{
                fn.call(this, evt1);
            });
        }
    }
}
var $28a4d199fa5cc88d$export$2e2bcd8739ae039 = $28a4d199fa5cc88d$var$EventDispatcher;


var $d6d493701ed603e9$var$UID = {
};
$d6d493701ed603e9$var$UID._nextID = 0;
$d6d493701ed603e9$var$UID.get = function() {
    return $d6d493701ed603e9$var$UID._nextID++;
};
var $d6d493701ed603e9$export$2e2bcd8739ae039 = $d6d493701ed603e9$var$UID;


class $6e6aa34d401012e1$var$DisplayObject extends $28a4d199fa5cc88d$export$2e2bcd8739ae039 {
    constructor(){
        super();
        this.alpha = this.complexAlpha = this.scaleX = this.scaleY = 1;
        this.x = this.y = this.rotation = this.skewX = this.skewY = this.originX = this.originY = 0;
        this.cursor = null;
        this.visible = true;
        this._matrix = new $31bedce70ad6a922$export$2e2bcd8739ae039();
        this._hitMatrix = new $31bedce70ad6a922$export$2e2bcd8739ae039();
        this.id = $d6d493701ed603e9$export$2e2bcd8739ae039.get();
        this.clipGraphics = null;
        this.clipRuleNonzero = true;
        this.fixed = false;
        this.shadow = null;
        this.compositeOperation = null;
        this.absClipGraphics = null;
        this.absClipRuleNonzero = true;
        this.cacheUpdating = false;
        try {
            Object.defineProperties(this, {
                stage: {
                    get: this._getStage
                },
                scale: {
                    get: function() {
                        return this.scaleX;
                    },
                    set: function(scale) {
                        this.scaleX = this.scaleY = scale;
                    }
                }
            });
        } catch (e) {
        }
        this.hitBox = null;
    }
    isVisible() {
        return this.visible && this.alpha > 0 && this.scaleX !== 0 && this.scaleY !== 0;
    }
    initAABB() {
        if ((this.width === undefined || this.height === undefined) && !this.hitBox) return;
        let x, y, width = this.width, height = this.height, mtx = this._matrix, tx = mtx.tx, ty = mtx.ty;
        if (this.hitBox) {
            width = this.hitBox[2];
            height = this.hitBox[3];
            tx = this.hitBox[0] * mtx.a + this.hitBox[1] * mtx.c + tx;
            ty = this.hitBox[0] * mtx.b + this.hitBox[1] * mtx.d + ty;
        }
        let xA = width * mtx.a, xB = width * mtx.b, yC = height * mtx.c, yD = height * mtx.d, minX = tx, maxX = tx, minY = ty, maxY = ty;
        if ((x = xA + tx) < minX) minX = x;
        else if (x > maxX) maxX = x;
        if ((x = xA + yC + tx) < minX) minX = x;
        else if (x > maxX) maxX = x;
        if ((x = yC + tx) < minX) minX = x;
        else if (x > maxX) maxX = x;
        if ((y = xB + ty) < minY) minY = y;
        else if (y > maxY) maxY = y;
        if ((y = xB + yD + ty) < minY) minY = y;
        else if (y > maxY) maxY = y;
        if ((y = yD + ty) < minY) minY = y;
        else if (y > maxY) maxY = y;
        this.AABB = [
            minX,
            minY,
            maxX - minX,
            maxY - minY
        ];
        this.rectPoints = [
            {
                x: tx,
                y: ty
            },
            {
                x: xA + tx,
                y: xB + ty
            },
            {
                x: xA + yC + tx,
                y: xB + yD + ty
            },
            {
                x: yC + tx,
                y: yD + ty
            }
        ];
    }
    destroy() {
        this.parent.remove(this);
    }
    hover(over, out, move) {
        this.on('mouseover', over);
        this.on('mouseout', out);
        move && this.on('mousemove', move);
    }
    clip(graphics, notClipRuleNonzero) {
        this.clipGraphics = graphics;
        this.clipRuleNonzero = !notClipRuleNonzero;
    }
    unclip() {
        this.clipGraphics = null;
    }
    absClip(graphics1, notClipRuleNonzero1) {
        this.absClipGraphics = graphics1;
        this.absClipRuleNonzero = !notClipRuleNonzero1;
    }
    unAbsClip() {
        this.absClipGraphics = null;
    }
    cache(x, y, width, height, scale, cacheUpdating) {
        this._cacheData = {
            x: x || 0,
            y: y || 0,
            width: width || this.width,
            height: height || this.height,
            scale: scale || 1
        };
        this.cacheUpdating = cacheUpdating;
        if (!this.cacheCanvas) {
            if (typeof wx !== 'undefined' && wx.createCanvas) this.cacheCanvas = wx.createCanvas();
            else this.cacheCanvas = document.createElement('canvas');
            this.cacheCtx = this.cacheCanvas.getContext('2d');
        }
        this.cacheCanvas.width = this._cacheData.width * this._cacheData.scale;
        this.cacheCanvas.height = this._cacheData.height * this._cacheData.scale; // debug cache canvas
        // this.cacheCtx.fillRect(0,0,1000,1000)
        this._readyToCache = true;
    }
    uncache() {
        this.cacheCanvas = null;
    }
    filter(filterName, filterBox) {
        filterBox = Object.assign({
        }, {
            x: 0,
            y: 0,
            width: this.width,
            height: this.height
        }, filterBox);
        this.cache(filterBox.x, filterBox.y, filterBox.width, filterBox.height);
        this._readyToFilter = true;
        this._filterName = filterName;
    }
    setTransform(x1, y1, scaleX, scaleY, rotation, skewX, skewY, originX, originY) {
        this.x = x1 || 0;
        this.y = y1 || 0;
        this.scaleX = scaleX == null ? 1 : scaleX;
        this.scaleY = scaleY == null ? 1 : scaleY;
        this.rotation = rotation || 0;
        this.skewX = skewX || 0;
        this.skewY = skewY || 0;
        this.originX = originX || 0;
        this.originY = originY || 0;
    }
    setMatrix(a, b, c, d, tx, ty) {
        $31bedce70ad6a922$export$2e2bcd8739ae039.decompose(a, b, c, d, tx, ty, this);
    }
    unfilter() {
        this.uncache();
    }
    _getStage() {
        var o = this;
        while(o.parent)o = o.parent;
        if (o.___instanceof === 'Stage') return o;
        return null;
    }
}
var $6e6aa34d401012e1$export$2e2bcd8739ae039 = $6e6aa34d401012e1$var$DisplayObject;


class $e47fc926a6af8e36$var$Group extends $6e6aa34d401012e1$export$2e2bcd8739ae039 {
    constructor(data){
        super(data);
        this.children = [];
    }
    add(child3) {
        const len = arguments.length;
        for(let i = 0; i < len; i++){
            const c = arguments[i];
            const parent = c.parent;
            if (parent) parent.removeChildAt(parent.children.indexOf(c));
            this.children.push(c);
            c.parent = this;
        }
    }
    addChildAt(child1, index) {
        var par = child1.parent;
        par && par.removeChildAt(par.children.indexOf(child1));
        child1.parent = this;
        this.children.splice(index, 0, child1);
    }
    removeChildAt(index1) {
        var child = this.children[index1];
        if (child) child.parent = null;
        this.children.splice(index1, 1);
    }
    replace(current, pre) {
        const index = pre.parent.children.indexOf(pre);
        this.removeChildAt(index);
        this.addChildAt(current, index);
    }
    remove(child2) {
        const len = arguments.length;
        let cLen = this.children.length;
        for(let i = 0; i < len; i++){
            for(let j = 0; j < cLen; j++)if (child2.id === this.children[j].id) {
                child2.parent = null;
                this.children.splice(j, 1);
                j--;
                cLen--;
            }
        }
    }
    empty() {
        this.children.forEach((child)=>{
            child.parent = null;
        });
        this.children.length = 0;
    }
    destroy() {
        this.empty(); // Stage does not have a parent
        this.parent && super.destroy();
    }
}
var $e47fc926a6af8e36$export$2e2bcd8739ae039 = $e47fc926a6af8e36$var$Group;




const $2d7fd1ae3cf06035$var$assMap = {
    fillStyle: true,
    strokeStyle: true,
    lineWidth: true,
    lineCap: true,
    lineDashOffset: true,
    lineJoin: true,
    miterLimit: true
};
class $2d7fd1ae3cf06035$var$Graphics extends $6e6aa34d401012e1$export$2e2bcd8739ae039 {
    constructor(){
        super();
        this.cmds = [];
        this.currentGradient = null;
    }
    clearRect() {
        this.cmds.push([
            'clearRect',
            arguments
        ]);
        return this;
    }
    rect() {
        this.cmds.push([
            'rect',
            arguments
        ]);
        return this;
    }
    clear() {
        this.cmds.length = 0;
        return this;
    }
    setLineDash() {
        this.cmds.push([
            'setLineDash',
            arguments
        ]);
        return this;
    }
    strokeRect() {
        this.cmds.push([
            'strokeRect',
            arguments
        ]);
        return this;
    }
    fillRect() {
        this.cmds.push([
            'fillRect',
            arguments
        ]);
        return this;
    }
    beginPath() {
        this.cmds.push([
            'beginPath',
            arguments
        ]);
        return this;
    }
    arc() {
        this.cmds.push([
            'arc',
            arguments
        ]);
        return this;
    }
    closePath() {
        this.cmds.push([
            'closePath',
            arguments
        ]);
        return this;
    }
    fillStyle() {
        this.cmds.push([
            'fillStyle',
            arguments
        ]);
        return this;
    }
    fill() {
        this.cmds.push([
            'fill',
            arguments
        ]);
        return this;
    }
    strokeStyle() {
        this.cmds.push([
            'strokeStyle',
            arguments
        ]);
        return this;
    }
    lineWidth() {
        this.cmds.push([
            'lineWidth',
            arguments
        ]);
        return this;
    }
    lineCap() {
        this.cmds.push([
            'lineCap',
            arguments
        ]);
        return this;
    }
    lineDashOffset() {
        this.cmds.push([
            'lineDashOffset',
            arguments
        ]);
        return this;
    }
    lineJoin() {
        this.cmds.push([
            'lineJoin',
            arguments
        ]);
        return this;
    }
    miterLimit() {
        this.cmds.push([
            'miterLimit',
            arguments
        ]);
        return this;
    }
    stroke() {
        this.cmds.push([
            'stroke',
            arguments
        ]);
        return this;
    }
    moveTo() {
        this.cmds.push([
            'moveTo',
            arguments
        ]);
        return this;
    }
    lineTo() {
        this.cmds.push([
            'lineTo',
            arguments
        ]);
        return this;
    }
    bezierCurveTo() {
        this.cmds.push([
            'bezierCurveTo',
            arguments
        ]);
        return this;
    }
    quadraticCurveTo() {
        this.cmds.push([
            'quadraticCurveTo',
            arguments
        ]);
        return this;
    }
    createRadialGradient() {
        this.cmds.push([
            'createRadialGradient',
            arguments
        ]);
        return this;
    }
    createLinearGradient() {
        this.cmds.push([
            'createLinearGradient',
            arguments
        ]);
        return this;
    }
    addColorStop() {
        this.cmds.push([
            'addColorStop',
            arguments
        ]);
        return this;
    }
    fillGradient() {
        this.cmds.push([
            'fillGradient'
        ]);
        return this;
    }
    arcTo() {
        this.cmds.push([
            'arcTo',
            arguments
        ]);
        return this;
    }
    render(ctx) {
        this.cmds.forEach((cmd)=>{
            const methodName = cmd[0];
            if ($2d7fd1ae3cf06035$var$assMap[methodName]) ctx[methodName] = cmd[1][0];
            else if (methodName === 'addColorStop') this.currentGradient && this.currentGradient.addColorStop(cmd[1][0], cmd[1][1]);
            else if (methodName === 'fillGradient') ctx.fillStyle = this.currentGradient;
            else {
                let result = ctx[methodName].apply(ctx, Array.prototype.slice.call(cmd[1]));
                if (methodName === 'createRadialGradient' || methodName === 'createLinearGradient') this.currentGradient = result;
            }
        });
    }
}
var $2d7fd1ae3cf06035$export$2e2bcd8739ae039 = $2d7fd1ae3cf06035$var$Graphics;


class $8c28d3fc5f8c0c3e$var$Render {
    render() {
    }
    renderGraphics() {
    }
    clear() {
    }
}
var $8c28d3fc5f8c0c3e$export$2e2bcd8739ae039 = $8c28d3fc5f8c0c3e$var$Render;



function $4b9d8754c86fa455$export$77bc3d6de6658040(img, callback) {
    if (img.indexOf('https://') === -1 && img.indexOf('http://') === -1 || img.indexOf('http://tmp/') === 0) wx.getImageInfo({
        src: img,
        success: (info)=>{
            callback({
                img: img,
                width: info.width,
                height: info.height
            });
        }
    });
    else wx.downloadFile({
        url: img,
        success: (res)=>{
            if (res.statusCode === 200) wx.getImageInfo({
                src: res.tempFilePath,
                success: (info)=>{
                    callback({
                        img: res.tempFilePath,
                        width: info.width,
                        height: info.height
                    });
                }
            });
        }
    });
}
function $4b9d8754c86fa455$var$getGlobal() {
    if (typeof $parcel$global !== 'object' || !$parcel$global || $parcel$global.Math !== Math || $parcel$global.Array !== Array) {
        if (typeof self !== 'undefined') return self;
        else if (typeof window !== 'undefined') return window;
        else if (typeof $parcel$global !== 'undefined') return $parcel$global;
        return (function() {
            return this;
        })();
    }
    return $parcel$global;
}
const $4b9d8754c86fa455$var$root = $4b9d8754c86fa455$var$getGlobal();
var $4b9d8754c86fa455$export$2e2bcd8739ae039 = {
    getImageInWx: $4b9d8754c86fa455$export$77bc3d6de6658040,
    root: $4b9d8754c86fa455$var$root,
    isWeapp: typeof wx !== 'undefined' && typeof Page !== 'undefined',
    isWegame: typeof wx !== 'undefined' && typeof Page === 'undefined'
};




class $9775ae176386021e$var$Bitmap extends $6e6aa34d401012e1$export$2e2bcd8739ae039 {
    constructor(img, onLoad){
        super();
        if (typeof img === 'string') {
            if ($9775ae176386021e$var$Bitmap.cache[img]) {
                if ($4b9d8754c86fa455$export$2e2bcd8739ae039.isWeapp) {
                    this.img = $9775ae176386021e$var$Bitmap.cache[img].img;
                    this.rect = [
                        0,
                        0,
                        $9775ae176386021e$var$Bitmap.cache[img].width,
                        $9775ae176386021e$var$Bitmap.cache[img].height
                    ];
                    this.width = this.rect[2];
                    this.height = this.rect[3];
                } else {
                    this.img = $9775ae176386021e$var$Bitmap.cache[img];
                    this.rect = [
                        0,
                        0,
                        this.img.width,
                        this.img.height
                    ];
                    this.width = this.img.width;
                    this.height = this.img.height;
                }
                onLoad && onLoad.call(this);
            } else if ($4b9d8754c86fa455$export$2e2bcd8739ae039.isWeapp) $4b9d8754c86fa455$export$2e2bcd8739ae039.getImageInWx(img, (result)=>{
                this.img = result.img;
                if (!this.rect) this.rect = [
                    0,
                    0,
                    result.width,
                    result.height
                ];
                this.width = result.width;
                this.height = result.height;
                onLoad && onLoad.call(this);
                $9775ae176386021e$var$Bitmap.cache[img] = result;
            });
            else {
                this.img = $4b9d8754c86fa455$export$2e2bcd8739ae039.isWegame ? wx.createImage() : new window.Image();
                this.img.onload = ()=>{
                    if (!this.rect) this.rect = [
                        0,
                        0,
                        this.img.width,
                        this.img.height
                    ];
                    this.width = this.img.width;
                    this.height = this.img.height;
                    onLoad && onLoad.call(this);
                    $9775ae176386021e$var$Bitmap.cache[img] = this.img;
                };
                this.img.src = img;
            }
        } else {
            this.img = img;
            this.rect = [
                0,
                0,
                img.width,
                img.height
            ];
            this.width = img.width;
            this.height = img.height;
            $9775ae176386021e$var$Bitmap.cache[img.src] = img;
        }
    }
    clone() {
        // 复制完img宽度0？？所以直接传字符串
        const bitmap = new $9775ae176386021e$var$Bitmap(typeof this.img === 'string' ? this.img : this.img.src);
        bitmap.x = this.x;
        bitmap.y = this.y;
        bitmap.scaleX = this.scaleX;
        bitmap.scaleY = this.scaleY;
        bitmap.rotation = this.rotation;
        bitmap.skewX = this.skewX;
        bitmap.skewY = this.skewY;
        bitmap.originX = this.originX;
        bitmap.originY = this.originY;
        bitmap.width = this.width;
        bitmap.height = this.height;
        bitmap.cursor = this.cursor;
        return bitmap;
    }
}
$9775ae176386021e$var$Bitmap.cache = {
};
var $9775ae176386021e$export$2e2bcd8739ae039 = $9775ae176386021e$var$Bitmap;


class $845c974841b2f010$var$Sprite extends $6e6aa34d401012e1$export$2e2bcd8739ae039 {
    constructor(option){
        super();
        this.option = option;
        const len = this.option.imgs.length;
        let count = 0;
        const firstImg = this.option.imgs[0];
        this.imgMap = {
        };
        if ($4b9d8754c86fa455$export$2e2bcd8739ae039.isWeapp) this.option.imgs.forEach((img)=>{
            $4b9d8754c86fa455$export$2e2bcd8739ae039.getImageInWx(img, (result)=>{
                this.imgMap[img] = result.img;
                count++;
                if (count === len) {
                    this.img = this.imgMap[firstImg];
                    this.rect = [
                        0,
                        0,
                        0,
                        0
                    ];
                }
            });
        });
        else {
            if (typeof firstImg === 'string') {
                const len = this.option.imgs.length;
                let loadedCount = 0;
                this.option.imgs.forEach((src)=>{
                    if ($9775ae176386021e$export$2e2bcd8739ae039.cache[src]) {
                        this.imgMap[src] = $9775ae176386021e$export$2e2bcd8739ae039.cache[src];
                        loadedCount++;
                        if (loadedCount === len) {
                            this.img = this.imgMap[firstImg];
                            this.rect = [
                                0,
                                0,
                                0,
                                0
                            ];
                        }
                    } else {
                        const img = $4b9d8754c86fa455$export$2e2bcd8739ae039.isWegame ? wx.createImage() : new window.Image();
                        img.onload = ()=>{
                            this.imgMap[src] = img;
                            loadedCount++;
                            if (loadedCount === len) {
                                this.img = this.imgMap[firstImg];
                                this.rect = [
                                    0,
                                    0,
                                    0,
                                    0
                                ];
                            }
                            $9775ae176386021e$export$2e2bcd8739ae039.cache[src] = img;
                        };
                        img.src = src;
                    }
                });
            } else if (firstImg instanceof $9775ae176386021e$export$2e2bcd8739ae039) {
                this.rect = [
                    0,
                    0,
                    0,
                    0
                ];
                this.img = firstImg.img;
            } else {
                this.rect = [
                    0,
                    0,
                    0,
                    0
                ];
                this.img = firstImg;
            }
        }
        this.x = option.x || 0;
        this.y = option.y || 0;
        this.currentFrameIndex = 0;
        this.animationFrameIndex = 0;
        this.currentAnimation = option.currentAnimation || null;
        this.interval = 1000 / option.framerate;
        this.paused = false;
        this.animationEnd = option.animationEnd || function() {
        };
        if (this.currentAnimation) {
            if (option.playOnce) this.gotoAndPlayOnce(this.currentAnimation);
            else this.gotoAndPlay(this.currentAnimation);
        }
    }
    play() {
        this.paused = false;
    }
    pause() {
        this.paused = true;
    }
    reset() {
        this.currentFrameIndex = 0;
        this.animationFrameIndex = 0;
    }
    updateFrame() {
        if (!this.paused) {
            let opt = this.option;
            this.dt = Date.now() - this.startTime;
            let frames = opt.animations[this.currentAnimation].frames;
            const len = frames.length;
            const index = Math.floor(this.dt / this.interval % len);
            this.rect = opt.frames[frames[index]];
            const rectLen = this.rect.length;
            rectLen > 4 && (this.originX = this.rect[2] * this.rect[4]);
            rectLen > 5 && (this.originY = this.rect[3] * this.rect[5]);
            if (rectLen > 6) {
                const img = this.option.imgs[this.rect[6]];
                this.img = typeof img === 'string' ? this.imgMap[img] : img;
            }
            if (index === len - 1 && (!this.endTime || Date.now() - this.endTime > this.interval)) {
                this.endTime = Date.now();
                this.animationEnd();
                if (this._willDestroy) this.destroy();
            }
        }
    }
    gotoAndPlay(animation) {
        this.paused = false;
        this.reset();
        this.currentAnimation = animation;
        this.startTime = Date.now();
    }
    gotoAndStop(animation1) {
        this.reset();
        this.paused = true;
        this.currentAnimation = animation1;
        var opt = this.option;
        var frames = opt.animations[this.currentAnimation].frames;
        this.rect = opt.frames[frames[this.animationFrameIndex]];
        const rect = this.rect;
        this.width = rect[2];
        this.height = rect[3];
        const rectLen = rect.length;
        rectLen > 4 && (this.originX = rect[2] * rect[4]);
        rectLen > 5 && (this.originY = rect[3] * rect[5]);
        if (rectLen > 6) {
            const img = this.option.imgs[rect[6]];
            this.img = typeof img === 'string' ? this.imgMap[img] : img;
        }
    }
    gotoAndPlayOnce(animation2) {
        this.gotoAndPlay(animation2);
        this._willDestroy = true;
    }
}
var $845c974841b2f010$export$2e2bcd8739ae039 = $845c974841b2f010$var$Sprite;





let $45cf6d178e2acada$var$measureCtx;
if ($4b9d8754c86fa455$export$2e2bcd8739ae039.isWeapp) $45cf6d178e2acada$var$measureCtx = wx.createCanvasContext('measure0');
else if (typeof document !== 'undefined') $45cf6d178e2acada$var$measureCtx = document.createElement('canvas').getContext('2d');
class $45cf6d178e2acada$var$Text extends $6e6aa34d401012e1$export$2e2bcd8739ae039 {
    constructor(text, option){
        super();
        this.text = text;
        option = option || {
        };
        this.font = option.font || '10px sans-serif';
        this.color = option.color || 'black';
        this.textAlign = option.textAlign || 'left';
        this.baseline = option.baseline || 'top';
        this.stroke = option.stroke || "";
    }
    getWidth() {
        if (!$45cf6d178e2acada$var$measureCtx) {
            if ($4b9d8754c86fa455$export$2e2bcd8739ae039.isWegame) $45cf6d178e2acada$var$measureCtx = wx.createCanvas().getContext('2d');
        }
        if (this.font) $45cf6d178e2acada$var$measureCtx.font = this.font;
        return $45cf6d178e2acada$var$measureCtx.measureText(this.text).width;
    }
}
var $45cf6d178e2acada$export$2e2bcd8739ae039 = $45cf6d178e2acada$var$Text;


function $e97ce35fc7555aed$export$6897c284b6f9f4dc(pixels, ratio) {
    const d = pixels.data;
    ratio = ratio === undefined ? 1 : ratio;
    for(var i = 0; i < d.length; i += 4){
        d[i] = d[i] + ratio * (255 - 2 * d[i]);
        d[i + 1] = d[i + 1] + ratio * (255 - 2 * d[i + 1]);
        d[i + 2] = d[i + 2] + ratio * (255 - 2 * d[i + 2]);
    }
    return pixels;
}


let $8823adc769bb8453$var$tmpCtx = null;
if (typeof document !== 'undefined') $8823adc769bb8453$var$tmpCtx = document.createElement('canvas').getContext('2d');
else if (typeof wx !== 'undefined' && wx.createCanvas) $8823adc769bb8453$var$tmpCtx = wx.createCanvas().getContext('2d');
function $8823adc769bb8453$export$ad40c38a6f41c9cf(w, h) {
    return $8823adc769bb8453$var$tmpCtx.createImageData(w, h);
}


function $732c1c284a072bd6$export$2cc7ff91bcacba5e(pixels, diameter) {
    diameter = Math.abs(diameter);
    if (diameter <= 1) return pixels;
    var radius = diameter / 2;
    var len = Math.ceil(diameter) + (1 - Math.ceil(diameter) % 2);
    var weights = new Float32Array(len);
    var rho = (radius + 0.5) / 3;
    var rhoSq = rho * rho;
    var gaussianFactor = 1 / Math.sqrt(2 * Math.PI * rhoSq);
    var rhoFactor = -1 / (2 * rho * rho);
    var wsum = 0;
    var middle = Math.floor(len / 2);
    for(var i = 0; i < len; i++){
        var x = i - middle;
        var gx = gaussianFactor * Math.exp(x * x * rhoFactor);
        weights[i] = gx;
        wsum += gx;
    }
    for(var i = 0; i < weights.length; i++)weights[i] /= wsum;
    return $732c1c284a072bd6$var$separableConvolve(pixels, weights, weights, false);
}
function $732c1c284a072bd6$var$separableConvolve(pixels, horizWeights, vertWeights, opaque) {
    return $732c1c284a072bd6$var$horizontalConvolve($732c1c284a072bd6$var$verticalConvolve(pixels, vertWeights, opaque), horizWeights, opaque);
}
function $732c1c284a072bd6$var$horizontalConvolve(pixels, weightsVector, opaque) {
    var side = weightsVector.length;
    var halfSide = Math.floor(side / 2);
    var src = pixels.data;
    var sw = pixels.width;
    var sh = pixels.height;
    var w = sw;
    var h = sh;
    var output = $8823adc769bb8453$export$ad40c38a6f41c9cf(w, h);
    var dst = output.data;
    var alphaFac = opaque ? 1 : 0;
    for(var y = 0; y < h; y++)for(var x = 0; x < w; x++){
        var sy = y;
        var sx = x;
        var dstOff = (y * w + x) * 4;
        var r = 0, g = 0, b = 0, a = 0;
        for(var cx = 0; cx < side; cx++){
            var scy = sy;
            var scx = Math.min(sw - 1, Math.max(0, sx + cx - halfSide));
            var srcOff = (scy * sw + scx) * 4;
            var wt = weightsVector[cx];
            r += src[srcOff] * wt;
            g += src[srcOff + 1] * wt;
            b += src[srcOff + 2] * wt;
            a += src[srcOff + 3] * wt;
        }
        dst[dstOff] = r;
        dst[dstOff + 1] = g;
        dst[dstOff + 2] = b;
        dst[dstOff + 3] = a + alphaFac * (255 - a);
    }
    return output;
}
function $732c1c284a072bd6$var$verticalConvolve(pixels, weightsVector, opaque) {
    var side = weightsVector.length;
    var halfSide = Math.floor(side / 2);
    var src = pixels.data;
    var sw = pixels.width;
    var sh = pixels.height;
    var w = sw;
    var h = sh;
    var output = $8823adc769bb8453$export$ad40c38a6f41c9cf(w, h);
    var dst = output.data;
    var alphaFac = opaque ? 1 : 0;
    for(var y = 0; y < h; y++)for(var x = 0; x < w; x++){
        var sy = y;
        var sx = x;
        var dstOff = (y * w + x) * 4;
        var r = 0, g = 0, b = 0, a = 0;
        for(var cy = 0; cy < side; cy++){
            var scy = Math.min(sh - 1, Math.max(0, sy + cy - halfSide));
            var scx = sx;
            var srcOff = (scy * sw + scx) * 4;
            var wt = weightsVector[cy];
            r += src[srcOff] * wt;
            g += src[srcOff + 1] * wt;
            b += src[srcOff + 2] * wt;
            a += src[srcOff + 3] * wt;
        }
        dst[dstOff] = r;
        dst[dstOff + 1] = g;
        dst[dstOff + 2] = b;
        dst[dstOff + 3] = a + alphaFac * (255 - a);
    }
    return output;
}


function $a3f2202ccfd3d1a2$export$a9ff8c324fa29d66(pixels, adjustment) {
    const data = pixels.data;
    const length = data.length;
    for(let i = 0; i < length; i += 4){
        data[i] += adjustment;
        data[i + 1] += adjustment;
        data[i + 2] += adjustment;
    }
    return pixels;
}


function $0d2f74a94560bd8f$export$1ec78ac20028ebd4(pixels, contrast) {
    const data = pixels.data;
    const length = data.length;
    const factor = 259 * (contrast + 255) / (255 * (259 - contrast));
    for(let i = 0; i < length; i += 4){
        data[i] = factor * (data[i] - 128) + 128;
        data[i + 1] = factor * (data[i + 1] - 128) + 128;
        data[i + 2] = factor * (data[i + 2] - 128) + 128;
    }
    return pixels;
}


function $6c302fe7fd9a4778$export$6f416a6db2dfcd5c(pixels, adjustment) {
    const data = pixels.data;
    const length = data.length;
    for(let i = 0; i < length; i += 4){
        let r = data[i];
        let g = data[i + 1];
        let b = data[i + 2]; // CIE luminance for the RGB
        // The human eye is bad at seeing red and blue, so we de-emphasize them.
        let v = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        data[i] = r + (v - r) * adjustment;
        data[i + 1] = g + (v - g) * adjustment;
        data[i + 2] = b + (v - b) * adjustment;
    }
    return pixels;
}


function $fad325ef85118489$export$b385d4aa7dfee696(pixels, adjustment) {
    const data = pixels.data;
    const length = data.length;
    for(let i = 0; i < length; i += 4){
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const sr = r * 0.393 + g * 0.769 + b * 0.189;
        const sg = r * 0.349 + g * 0.686 + b * 0.168;
        const sb = r * 0.272 + g * 0.534 + b * 0.131;
        data[i] = r + (sr - r) * adjustment;
        data[i + 1] = g + (sg - g) * adjustment;
        data[i + 2] = b + (sb - b) * adjustment;
    }
    return pixels;
}


function $a79a4c718f899d45$export$454d09aca5f3ea63(pixels, threshold) {
    const data = pixels.data;
    const length = data.length;
    for(let i = 0; i < length; i += 4){
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const v = 0.2126 * r + 0.7152 * g + 0.0722 * b >= threshold ? 255 : 0;
        data[i] = data[i + 1] = data[i + 2] = v;
    }
    return pixels;
}


function $465a9b9bc9cf8fa5$export$a7ebe8cc6aaf8d37(pixels, adjustment) {
    const data = pixels.data;
    const length = data.length;
    for(let i = 0; i < length; i += 4){
        data[i] = Math.pow(data[i] / 255, adjustment) * 255;
        data[i + 1] = Math.pow(data[i + 1] / 255, adjustment) * 255;
        data[i + 2] = Math.pow(data[i + 2] / 255, adjustment) * 255;
    }
    return pixels;
}


function $9ae6d77ee604b688$export$dadab79c8a5157c0(pixels, option) {
    const data = pixels.data;
    const length = data.length;
    const hex = option.color.charAt(0) === '#' ? option.color.substr(1) : option.color;
    const colorRGB = {
        r: parseInt(hex.substr(0, 2), 16),
        g: parseInt(hex.substr(2, 2), 16),
        b: parseInt(hex.substr(4, 2), 16)
    };
    for(let i = 0; i < length; i += 4){
        data[i] -= (data[i] - colorRGB.r) * option.amount;
        data[i + 1] -= (data[i + 1] - colorRGB.g) * option.amount;
        data[i + 2] -= (data[i + 2] - colorRGB.b) * option.amount;
    }
    return pixels;
}


function $ec07b44d2596512e$export$3dea766d36a8935f(pixels, name) {
    if (typeof name === 'string') {
        let type = name.split('(')[0];
        let num = $ec07b44d2596512e$var$getNumber(name);
        switch(type){
            case 'invert':
                return $e97ce35fc7555aed$export$6897c284b6f9f4dc(pixels, num);
            case 'brightness':
                return $a3f2202ccfd3d1a2$export$a9ff8c324fa29d66(pixels, -255 + num * 255);
            case 'blur':
                return $732c1c284a072bd6$export$2cc7ff91bcacba5e(pixels, num);
            case 'contrast':
                return $0d2f74a94560bd8f$export$1ec78ac20028ebd4(pixels, -255 + num * 255);
            case 'grayscale':
                return $6c302fe7fd9a4778$export$6f416a6db2dfcd5c(pixels, num);
            case 'sepia':
                return $fad325ef85118489$export$b385d4aa7dfee696(pixels, num);
            case 'threshold':
                return $a79a4c718f899d45$export$454d09aca5f3ea63(pixels, num);
            case 'gamma':
                return $465a9b9bc9cf8fa5$export$a7ebe8cc6aaf8d37(pixels, num);
        }
    } else switch(name.type){
        case 'colorize':
            return $9ae6d77ee604b688$export$dadab79c8a5157c0(pixels, name);
    }
}
function $ec07b44d2596512e$var$getNumber(str) {
    str = str.replace(/(invert)|(brightness)|(blur)|(contrast)|(grayscale)|(sepia)|(threshold)|(gamma)?\(/g, '').replace(')', '');
    if (str.indexOf('%') !== -1) return Number(str.replace('%', '')) / 100;
    else if (str.indexOf('px') !== -1) return Number(str.replace('px', ''));
    else return Number(str);
}


class $527bd1b5168ebdb6$var$CanvasRender extends $8c28d3fc5f8c0c3e$export$2e2bcd8739ae039 {
    constructor(canvasOrContext, width, height){
        super();
        if (arguments.length === 3) {
            this.ctx = canvasOrContext;
            this.width = width;
            this.height = height;
        } else {
            this.ctx = canvasOrContext.getContext('2d');
            this.width = canvasOrContext.width;
            this.height = canvasOrContext.height;
        }
    }
    clear(ctx, width1, height1) {
        ctx.clearRect(0, 0, width1, height1);
    }
    render(ctx1, o, cacheData) {
        let mtx = o._matrix;
        if (o.children) {
            let list = o.children.slice(0), l = list.length;
            for(let i = 0; i < l; i++){
                let child = list[i];
                mtx.initialize(1, 0, 0, 1, 0, 0);
                mtx.appendTransform(o.x, o.y, o.scaleX, o.scaleY, o.rotation, o.skewX, o.skewY, o.originX, o.originY); // if (!this.checkBoundEvent(child)) continue
                ctx1.save();
                this._render(ctx1, child, cacheData ? null : mtx, cacheData, true);
                ctx1.restore();
            }
        } else this._render(ctx1, o, cacheData ? null : mtx, cacheData);
    }
    _render(ctx2, o1, mtx, cacheData1, inGroup) {
        if (!o1.isVisible()) return;
        if (mtx && !o1.fixed) o1._matrix.initialize(mtx.a, mtx.b, mtx.c, mtx.d, mtx.tx, mtx.ty);
        else if (cacheData1 && !o1.fixed) o1._matrix.initialize(cacheData1.scale, 0, 0, cacheData1.scale, cacheData1.x * -1, cacheData1.y * -1);
        else o1._matrix.initialize(1, 0, 0, 1, 0, 0);
        mtx = o1._matrix; // group 进行 cache canvas 内部的子元素需要进行appendTransform
        // cache canvas 渲染不叠加自身的 transform，因为进入主渲染会进行appendTransform
        if (inGroup || !cacheData1) mtx.appendTransform(o1.x, o1.y, o1.scaleX, o1.scaleY, o1.rotation, o1.skewX, o1.skewY, o1.originX, o1.originY);
        const ocg = o1.clipGraphics;
        if (ocg) {
            ctx2.beginPath();
            ocg._matrix.copy(mtx);
            ocg._matrix.appendTransform(ocg.x, ocg.y, ocg.scaleX, ocg.scaleY, ocg.rotation, ocg.skewX, ocg.skewY, ocg.originX, ocg.originY);
            ctx2.setTransform(ocg._matrix.a, ocg._matrix.b, ocg._matrix.c, ocg._matrix.d, ocg._matrix.tx, ocg._matrix.ty);
            ocg.render(ctx2);
            ctx2.clip(o1.clipRuleNonzero ? 'nonzero' : 'evenodd');
        }
        const oacg = o1.absClipGraphics;
        if (oacg) {
            ctx2.beginPath();
            oacg._matrix.initialize(1, 0, 0, 1, 0, 0);
            oacg._matrix.appendTransform(oacg.x, oacg.y, oacg.scaleX, oacg.scaleY, oacg.rotation, oacg.skewX, oacg.skewY, oacg.originX, oacg.originY);
            ctx2.setTransform(oacg._matrix.a, oacg._matrix.b, oacg._matrix.c, oacg._matrix.d, oacg._matrix.tx, oacg._matrix.ty);
            oacg.render(ctx2);
            ctx2.clip(o1.absClipRuleNonzero ? 'nonzero' : 'evenodd');
        } // if(!cacheData){
        ctx2.setTransform(mtx.a, mtx.b, mtx.c, mtx.d, mtx.tx, mtx.ty); // }
        if (o1._readyToCache || o1.cacheUpdating) {
            this.setComplexProps(ctx2, o1);
            o1._readyToCache = false;
            o1.cacheCtx.clearRect(0, 0, o1.cacheCanvas.width, o1.cacheCanvas.height);
            o1.cacheCtx.save();
            this.render(o1.cacheCtx, o1, o1._cacheData);
            o1.cacheCtx.restore(); // debug cacheCanvas
            // document.body.appendChild(o.cacheCanvas)
            if (o1._readyToFilter) {
                o1.cacheCtx.putImageData($ec07b44d2596512e$export$3dea766d36a8935f(o1.cacheCtx.getImageData(0, 0, o1.cacheCanvas.width, o1.cacheCanvas.height), o1._filterName), 0, 0);
                this._readyToFilter = false;
            }
            ctx2.drawImage(o1.cacheCanvas, o1._cacheData.x, o1._cacheData.y);
        } else if (o1.cacheCanvas && !cacheData1) {
            this.setComplexProps(ctx2, o1);
            ctx2.drawImage(o1.cacheCanvas, o1._cacheData.x, o1._cacheData.y);
        } else if (o1 instanceof $e47fc926a6af8e36$export$2e2bcd8739ae039) {
            let list = o1.children.slice(0), l = list.length;
            for(let i = 0; i < l; i++){
                ctx2.save();
                this._render(ctx2, list[i], mtx);
                ctx2.restore();
            }
        } else if (o1 instanceof $2d7fd1ae3cf06035$export$2e2bcd8739ae039) {
            this.setComplexProps(ctx2, o1);
            o1.render(ctx2);
        } else if (o1 instanceof $845c974841b2f010$export$2e2bcd8739ae039 && o1.rect) {
            this.setComplexProps(ctx2, o1);
            o1.updateFrame();
            let rect = o1.rect;
            ctx2.drawImage(o1.img, rect[0], rect[1], rect[2], rect[3], 0, 0, rect[2], rect[3]);
        } else if (o1 instanceof $9775ae176386021e$export$2e2bcd8739ae039 && o1.rect) {
            this.setComplexProps(ctx2, o1);
            let bRect = o1.rect;
            ctx2.drawImage(o1.img, bRect[0], bRect[1], bRect[2], bRect[3], 0, 0, bRect[2], bRect[3]);
        } else if (o1 instanceof $45cf6d178e2acada$export$2e2bcd8739ae039) {
            this.setComplexProps(ctx2, o1);
            ctx2.font = o1.font;
            ctx2.textAlign = o1.textAlign;
            ctx2.textBaseline = o1.baseline;
            if (o1.stroke) {
                ctx2.strokeStyle = o1.stroke;
                ctx2.strokeText(o1.text, 0, 0);
            }
            ctx2.fillStyle = o1.color;
            ctx2.fillText(o1.text, 0, 0);
        }
    }
    setComplexProps(ctx3, o2) {
        o2.complexCompositeOperation = ctx3.globalCompositeOperation = this.getCompositeOperation(o2);
        o2.complexAlpha = ctx3.globalAlpha = this.getAlpha(o2, 1);
        o2.complexShadow = this.getShadow(o2);
        if (o2.complexShadow) {
            ctx3.shadowColor = o2.complexShadow.color;
            ctx3.shadowOffsetX = o2.complexShadow.offsetX;
            ctx3.shadowOffsetY = o2.complexShadow.offsetY;
            ctx3.shadowBlur = o2.complexShadow.blur;
        }
    }
    getCompositeOperation(o3) {
        if (o3.compositeOperation) return o3.compositeOperation;
        if (o3.parent) return this.getCompositeOperation(o3.parent);
    }
    getAlpha(o4, alpha) {
        var result = o4.alpha * alpha;
        if (o4.parent) return this.getAlpha(o4.parent, result);
        return result;
    }
    getShadow(o5) {
        if (o5.shadow) return o5.shadow;
        if (o5.parent) return this.getShadow(o5.parent);
    }
}
var $527bd1b5168ebdb6$export$2e2bcd8739ae039 = $527bd1b5168ebdb6$var$CanvasRender;



class $9af8461b5f8eee4b$var$Renderer {
    constructor(canvasOrContext, width, height){
        this.renderList = [];
        if (arguments.length === 3) {
            this.renderer = new $527bd1b5168ebdb6$export$2e2bcd8739ae039(canvasOrContext, width, height);
            this.width = width;
            this.height = height;
        } else {
            this.renderer = new $527bd1b5168ebdb6$export$2e2bcd8739ae039(canvasOrContext);
            this.width = canvasOrContext.width;
            this.height = canvasOrContext.height;
        }
        this.ctx = this.renderer.ctx;
    }
    update(stage) {
        this.renderer.clear(this.ctx, this.width, this.height);
        this.renderer.render(this.ctx, stage);
        this.ctx.draw && this.ctx.draw();
    }
    getHitRenderList(stage1) {
        const objs = this.renderList;
        objs.length = 0;
        this.computeMatrix(stage1);
        return objs;
    }
    computeMatrix(stage2) {
        for(var i = 0, len = stage2.children.length; i < len; i++)this._computeMatrix(stage2.children[i]);
    }
    initComplex(o) {
        o.complexCompositeOperation = this._getCompositeOperation(o);
        o.complexAlpha = this._getAlpha(o, 1);
    }
    _computeMatrix(o1, mtx) {
        if (!o1.isVisible()) return;
        if (mtx && !o1.fixed) o1._matrix.initialize(mtx.a, mtx.b, mtx.c, mtx.d, mtx.tx, mtx.ty);
        else o1._matrix.initialize(1, 0, 0, 1, 0, 0);
        o1._matrix.appendTransform(o1.x, o1.y, o1.scaleX, o1.scaleY, o1.rotation, o1.skewX, o1.skewY, o1.originX, o1.originY);
        if (o1 instanceof $e47fc926a6af8e36$export$2e2bcd8739ae039) {
            var list = o1.children, len = list.length, i = 0;
            for(; i < len; i++)this._computeMatrix(list[i], o1._matrix);
        } else {
            // if (o instanceof Graphics) {
            //   this.renderList.push(o)
            //   this.initComplex(o)
            // } else {
            o1.initAABB(); // if (this.isInStage(o)) {
            this.renderList.push(o1);
            this.initComplex(o1); // }
        // }
        }
    }
    _getCompositeOperation(o2) {
        if (o2.compositeOperation) return o2.compositeOperation;
        if (o2.parent) return this._getCompositeOperation(o2.parent);
    }
    _getAlpha(o3, alpha) {
        var result = o3.alpha * alpha;
        if (o3.parent) return this._getAlpha(o3.parent, result);
        return result;
    }
    isInStage(o4) {
        return this.collisionBetweenAABB(o4.AABB, this.stage.AABB);
    }
    collisionBetweenAABB(AABB1, AABB2) {
        var maxX = AABB1[0] + AABB1[2];
        if (maxX < AABB2[0]) return false;
        var minX = AABB1[0];
        if (minX > AABB2[0] + AABB2[2]) return false;
        var maxY = AABB1[1] + AABB1[3];
        if (maxY < AABB2[1]) return false;
        var minY = AABB1[1];
        if (minY > AABB2[1] + AABB2[3]) return false;
        return true;
    }
}
var $9af8461b5f8eee4b$export$2e2bcd8739ae039 = $9af8461b5f8eee4b$var$Renderer;






class $8beb95fb9b1103f0$var$Event {
    constructor(){
        this.propagationStopped = false;
        this.stageX = null;
        this.stageY = null;
        this.pureEvent = null;
    }
    stopPropagation() {
        $4ca6ae723696d7dd$export$2e2bcd8739ae039.stagePropagationStopped[this.type] = true;
        this.propagationStopped = true;
    }
    preventDefault() {
        this.pureEvent.preventDefault();
    }
}
var $8beb95fb9b1103f0$export$2e2bcd8739ae039 = $8beb95fb9b1103f0$var$Event;





class $733c4474a63f8897$var$HitRender extends $8c28d3fc5f8c0c3e$export$2e2bcd8739ae039 {
    constructor(){
        super();
        if (typeof wx !== 'undefined' && wx.createCanvas) this.canvas = wx.createCanvas();
        else this.canvas = document.createElement('canvas');
        this.canvas.width = 1;
        this.canvas.height = 1;
        this.ctx = this.canvas.getContext('2d'); // debug event
        // this.canvas.width = 441
        // this.canvas.height = 441
        // this.ctx = this.canvas.getContext('2d')
        // document.body.appendChild(this.canvas)
        this.disableEvents = [
            'mouseover',
            'mouseout',
            'mousemove',
            'touchmove'
        ];
    }
    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }
    hitAABB(o, evt) {
        let list = o.children.slice(0), l = list.length;
        for(let i = l - 1; i >= 0; i--){
            let child = list[i]; // if (!this.isbindingEvent(child)) continue;
            let path = this._hitAABB(child, evt, [], true);
            if (path.length > 0) {
                let target = path[path.length - 1];
                this._dispatchEvent(target, evt);
                return target;
            }
        }
    }
    _hitAABB(o1, evt1, path, rootCall) {
        if (o1.ignoreHit || !o1.isVisible()) return;
        o1.initAABB();
        if (o1.AABB && this.checkPointInAABB(evt1.stageX, evt1.stageY, o1.AABB)) {
            // this._bubbleEvent(o, type, evt);
            o1.___$push = true;
            path.push(o1); //return o
        }
        if (o1 instanceof $e47fc926a6af8e36$export$2e2bcd8739ae039) {
            let list = o1.children.slice(0), l = list.length;
            for(let i = l - 1; i >= 0; i--){
                let child = list[i];
                this._hitAABB(child, evt1, path);
                if (child.___$push) {
                    delete child.___$push; //同级只找一个就好了，所有 break
                    break;
                } //if (target) return target
            }
        }
        if (rootCall) return path;
    }
    checkPointInAABB(x, y, AABB) {
        let minX = AABB[0];
        if (x < minX) return false;
        let minY = AABB[1];
        if (y < minY) return false;
        let maxX = minX + AABB[2];
        if (x > maxX) return false;
        let maxY = minY + AABB[3];
        if (y > maxY) return false;
        return true;
    }
    hitPixel(o2, evt2) {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, 2, 2);
        let mtx = o2._hitMatrix;
        let list = o2.children.slice(0), l = list.length;
        for(let i = l - 1; i >= 0; i--){
            let child = list[i];
            mtx.initialize(1, 0, 0, 1, 0, 0);
            mtx.appendTransform(o2.x - evt2.stageX, o2.y - evt2.stageY, o2.scaleX, o2.scaleY, o2.rotation, o2.skewX, o2.skewY, o2.originX, o2.originY); // if (!this.checkBoundEvent(child)) continue
            ctx.save();
            let target = this._hitPixel(child, evt2, mtx);
            ctx.restore();
            if (target) return target;
        }
    }
    _hitPixel(o3, evt3, mtx) {
        if (o3.ignoreHit || !o3.isVisible()) return;
        let ctx = this.ctx;
        if (o3.fixed) o3._hitMatrix.initialize(1, 0, 0, 1, -evt3.stageX, -evt3.stageY);
        else if (mtx) o3._hitMatrix.initialize(mtx.a, mtx.b, mtx.c, mtx.d, mtx.tx, mtx.ty);
        else o3._hitMatrix.initialize(1, 0, 0, 1, 0, 0);
        mtx = o3._hitMatrix;
        mtx.appendTransform(o3.x, o3.y, o3.scaleX, o3.scaleY, o3.rotation, o3.skewX, o3.skewY, o3.originX, o3.originY);
        const ocg = o3.clipGraphics;
        if (ocg) {
            ctx.beginPath();
            ocg._matrix.copy(mtx);
            ocg._matrix.appendTransform(ocg.x, ocg.y, ocg.scaleX, ocg.scaleY, ocg.rotation, ocg.skewX, ocg.skewY, ocg.originX, ocg.originY);
            ctx.setTransform(ocg._matrix.a, ocg._matrix.b, ocg._matrix.c, ocg._matrix.d, ocg._matrix.tx, ocg._matrix.ty);
            ocg.render(ctx);
            ctx.clip(o3.clipRuleNonzero ? 'nonzero' : 'evenodd');
        }
        const oacg = o3.absClipGraphics;
        if (oacg) {
            ctx.beginPath();
            oacg._matrix.initialize(1, 0, 0, 1, 0, 0);
            oacg._matrix.appendTransform(oacg.x, oacg.y, oacg.scaleX, oacg.scaleY, oacg.rotation, oacg.skewX, oacg.skewY, oacg.originX, oacg.originY);
            ctx.setTransform(oacg._matrix.a, oacg._matrix.b, oacg._matrix.c, oacg._matrix.d, oacg._matrix.tx, oacg._matrix.ty);
            oacg.render(ctx);
            ctx.clip(o3.absClipRuleNonzero ? 'nonzero' : 'evenodd');
        }
        if (o3.cacheCanvas) {
            ctx.setTransform(mtx.a, mtx.b, mtx.c, mtx.d, mtx.tx, mtx.ty);
            ctx.drawImage(o3.cacheCanvas, o3._cacheData.x, o3._cacheData.y);
        } else if (o3 instanceof $e47fc926a6af8e36$export$2e2bcd8739ae039) {
            let list = o3.children.slice(0), l = list.length;
            for(let i = l - 1; i >= 0; i--){
                ctx.save();
                let target = this._hitPixel(list[i], evt3, mtx);
                ctx.restore();
                if (target) return target;
            }
        } else {
            ctx.setTransform(mtx.a, mtx.b, mtx.c, mtx.d, mtx.tx, mtx.ty);
            if (o3 instanceof $2d7fd1ae3cf06035$export$2e2bcd8739ae039) {
                this.setComplexProps(ctx, o3);
                o3.render(ctx);
            } else if (o3 instanceof $845c974841b2f010$export$2e2bcd8739ae039 && o3.rect) {
                this.setComplexProps(ctx, o3);
                o3.updateFrame();
                let rect = o3.rect;
                ctx.drawImage(o3.img, rect[0], rect[1], rect[2], rect[3], 0, 0, rect[2], rect[3]);
            } else if (o3 instanceof $9775ae176386021e$export$2e2bcd8739ae039 && o3.rect) {
                this.setComplexProps(ctx, o3);
                let bRect = o3.rect;
                ctx.drawImage(o3.img, bRect[0], bRect[1], bRect[2], bRect[3], 0, 0, bRect[2], bRect[3]);
            } else if (o3 instanceof $45cf6d178e2acada$export$2e2bcd8739ae039) {
                this.setComplexProps(ctx, o3);
                ctx.font = o3.font;
                ctx.textAlign = o3.textAlign;
                ctx.textBaseline = o3.baseline;
                if (o3.stroke) {
                    ctx.strokeStyle = o3.stroke;
                    ctx.strokeText(o3.text, 0, 0);
                }
                ctx.fillStyle = o3.color;
                ctx.fillText(o3.text, 0, 0);
            }
        }
        if (o3.hitBox) {
            o3.initAABB();
            if (this.checkPointInAABB(evt3.stageX, evt3.stageY, o3.AABB)) {
                this._dispatchEvent(o3, evt3);
                return o3;
            }
        } else if (ctx.getImageData(0, 0, 1, 1).data[3] > 0) {
            this._dispatchEvent(o3, evt3);
            return o3;
        }
    }
    setComplexProps(ctx, o4) {
        ctx.globalCompositeOperation = o4.complexCompositeOperation;
        ctx.globalAlpha = o4.complexAlpha; // The shadow does not trigger the event, so remove it
    // if(o.complexShadow){
    //   ctx.shadowColor = o.complexShadow.color
    //   ctx.shadowOffsetX = o.complexShadow.offsetX
    //   ctx.shadowOffsetY = o.complexShadow.offsetY
    //   ctx.shadowBlur = o.complexShadow.blur
    // }
    }
    _dispatchEvent(obj, evt4) {
        if (this.disableEvents.indexOf(evt4.type) !== -1) return;
        let mockEvt = new $8beb95fb9b1103f0$export$2e2bcd8739ae039();
        mockEvt.stageX = evt4.stageX;
        mockEvt.stageY = evt4.stageY;
        mockEvt.pureEvent = evt4;
        mockEvt.type = evt4.type;
        obj.dispatchEvent(mockEvt);
    }
}
var $733c4474a63f8897$export$2e2bcd8739ae039 = $733c4474a63f8897$var$HitRender;











class $4262dba97b7afa52$var$WxHitRender extends $8c28d3fc5f8c0c3e$export$2e2bcd8739ae039 {
    constructor(ctx, component, canvasId){
        super();
        this.ctx = ctx;
        this._isWeapp = true;
        this._component = component;
        this._hitCanvasId = canvasId + 'Hit';
        this.disableEvents = [
            'mouseover',
            'mouseout',
            'mousemove',
            'touchmove'
        ];
    }
    clear() {
        this.ctx.clearRect(0, 0, 2, 2);
    }
    hitAABB(list, evt, cb) {
        const len = list.length;
        for(let i = len - 1; i >= 0; i--){
            let o = list[i];
            if (o.AABB && this.checkPointInAABB(evt.stageX, evt.stageY, o.AABB)) {
                this._dispatchEvent(o, evt);
                cb(o);
                return o;
            }
        }
    }
    checkPointInAABB(x, y, AABB) {
        let minX = AABB[0];
        if (x < minX) return false;
        let minY = AABB[1];
        if (y < minY) return false;
        let maxX = minX + AABB[2];
        if (x > maxX) return false;
        let maxY = minY + AABB[3];
        if (y > maxY) return false;
        return true;
    }
    hit(list1, evt1, cb1, current) {
        const ctx = this.ctx;
        const obj = list1[current];
        const mtx = obj._hitMatrix.initialize(1, 0, 0, 1, 0, 0);
        ctx.save();
        mtx.appendTransform(obj.x - evt1.stageX, obj.y - evt1.stageY, obj.scaleX, obj.scaleY, obj.rotation, obj.skewX, obj.skewY, obj.originX, obj.originY);
        ctx.globalCompositeOperation = obj.complexCompositeOperation;
        ctx.globalAlpha = obj.complexAlpha;
        ctx.setTransform(mtx.a, mtx.b, mtx.c, mtx.d, mtx.tx, mtx.ty);
        if (obj instanceof $2d7fd1ae3cf06035$export$2e2bcd8739ae039) obj.render(ctx);
        else if (obj instanceof $845c974841b2f010$export$2e2bcd8739ae039 && obj.rect) {
            obj.updateFrame();
            const rect = obj.rect;
            ctx.drawImage(obj.img, rect[0], rect[1], rect[2], rect[3], 0, 0, rect[2], rect[3]);
        } else if (obj instanceof $9775ae176386021e$export$2e2bcd8739ae039 && obj.rect) {
            const bRect = obj.rect;
            ctx.drawImage(obj.img, bRect[0], bRect[1], bRect[2], bRect[3], 0, 0, bRect[2], bRect[3]);
        } else if (obj instanceof $45cf6d178e2acada$export$2e2bcd8739ae039) {
            ctx.font = obj.font;
            ctx.textAlign = obj.textAlign;
            if (obj.stroke) {
                ctx.strokeStyle = obj.stroke;
                ctx.strokeText(obj.text, 0, 0);
            }
            ctx.fillStyle = obj.color;
            ctx.fillText(obj.text, 0, 0);
        }
        ctx.restore();
        current--;
        ctx.draw(false, ()=>{
            wx.canvasGetImageData({
                canvasId: this._hitCanvasId,
                x: 0,
                y: 0,
                width: 1,
                height: 1,
                success: (res)=>{
                    if (res.data[3] > 1) {
                        this._dispatchEvent(obj, evt1);
                        cb1(obj);
                    } else if (current > -1) this.hit(list1, evt1, cb1, current);
                }
            }, this._component);
        });
    }
    _dispatchEvent(obj, evt2) {
        if (this.disableEvents.indexOf(evt2.type) !== -1) return;
        let mockEvt = new $8beb95fb9b1103f0$export$2e2bcd8739ae039();
        mockEvt.stageX = evt2.stageX;
        mockEvt.stageY = evt2.stageY;
        mockEvt.pureEvent = evt2;
        mockEvt.type = evt2.type;
        obj.dispatchEvent(mockEvt);
    }
}
var $4262dba97b7afa52$export$2e2bcd8739ae039 = $4262dba97b7afa52$var$WxHitRender;



class $bc36c189fe40cd59$var$WeStage extends $e47fc926a6af8e36$export$2e2bcd8739ae039 {
    constructor(width, height, id, page){
        super();
        const component = page.selectComponent('#' + id);
        component.setData({
            width: width,
            height: height
        });
        component.stage = this;
        const canvasId = component.getCaxCanvasId();
        const ctx = wx.createCanvasContext(canvasId, component);
        const hitCtx = wx.createCanvasContext(canvasId + 'Hit', component);
        this.renderer = new $9af8461b5f8eee4b$export$2e2bcd8739ae039(ctx, width, height);
        this._hitRender = new $4262dba97b7afa52$export$2e2bcd8739ae039(hitCtx, component, canvasId);
        this._overObject = null;
        this.ctx = ctx;
        this.hitAABB = true;
        this.width = width;
        this.height = height;
    }
    touchStartHandler(evt) {
        const p1 = evt.changedTouches[0];
        evt.stageX = Math.round(p1.x * this.scaleX);
        evt.stageY = Math.round(p1.y * this.scaleY);
        this._getObjectUnderPoint(evt, (obj)=>{
            this.willDragObject = obj;
            this._mouseDownX = evt.stageX;
            this._mouseDownY = evt.stageY;
            this.preStageX = evt.stageX;
            this.preStageY = evt.stageY;
        });
    }
    touchMoveHandler(evt1) {
        const p1 = evt1.changedTouches[0];
        evt1.stageX = Math.round(p1.x * this.scaleX);
        evt1.stageY = Math.round(p1.y * this.scaleY);
        this._getObjectUnderPoint(evt1, (obj)=>{
            let mockEvt = new $8beb95fb9b1103f0$export$2e2bcd8739ae039();
            mockEvt.stageX = evt1.stageX;
            mockEvt.stageY = evt1.stageY;
            mockEvt.pureEvent = evt1;
            if (this.willDragObject) {
                mockEvt.type = 'drag';
                mockEvt.dx = mockEvt.stageX - this.preStageX;
                mockEvt.dy = mockEvt.stageY - this.preStageY;
                this.preStageX = mockEvt.stageX;
                this.preStageY = mockEvt.stageY;
                this.willDragObject.dispatchEvent(mockEvt);
            }
            if (obj) {
                if (this._overObject === null) this._overObject = obj;
                else if (obj.id !== this._overObject.id) this._overObject = obj;
                else {
                    mockEvt.type = 'touchmove';
                    obj.dispatchEvent(mockEvt);
                }
            } else if (this._overObject) this._overObject = null;
        });
    }
    touchEndHandler(evt2) {
        const p1 = evt2.changedTouches[0];
        evt2.stageX = Math.round(p1.x * this.scaleX);
        evt2.stageY = Math.round(p1.y * this.scaleY);
        let mockEvt = new $8beb95fb9b1103f0$export$2e2bcd8739ae039();
        mockEvt.stageX = evt2.stageX;
        mockEvt.stageY = evt2.stageY;
        mockEvt.pureEvent = evt2;
        this._getObjectUnderPoint(evt2, (obj)=>{
            this._mouseUpX = evt2.stageX;
            this._mouseUpY = evt2.stageY;
            this.willDragObject = null;
            this.preStageX = null;
            this.preStageY = null;
            if (obj && Math.abs(this._mouseDownX - this._mouseUpX) < 30 && Math.abs(this._mouseDownY - this._mouseUpY) < 30) {
                mockEvt.type = 'tap';
                obj.dispatchEvent(mockEvt);
            }
        });
    }
    _handleMouseOut(evt3) {
        this.dispatchEvent({
            pureEvent: evt3,
            type: 'mouseout',
            stageX: evt3.stageX,
            stageY: evt3.stageY
        });
    }
    _getObjectUnderPoint(evt4, cb) {
        const list = this.renderer.getHitRenderList(this);
        if (this.hitAABB) return this._hitRender.hitAABB(list, evt4, cb);
        else {
            this._hitRender.clear();
            this._hitRender.hit(list, evt4, cb, list.length - 1);
        }
    }
    on(type, cb1) {
        switch(type){
            case 'touchstart':
                this.touchStart = cb1;
                break;
            case 'touchmove':
                this.touchMove = cb1;
                break;
            case 'touchend':
                this.touchEnd = cb1;
                break;
        }
    }
    update() {
        this.renderer.update(this);
    }
}
var $bc36c189fe40cd59$export$2e2bcd8739ae039 = $bc36c189fe40cd59$var$WeStage;



class $7487d0d0460996a1$var$Stage extends $e47fc926a6af8e36$export$2e2bcd8739ae039 {
    constructor(width, height, renderTo){
        super();
        const len = arguments.length;
        this.isWegame = typeof wx !== 'undefined' && typeof Page === 'undefined';
        this.moveDetectionInterval = 0;
        if (len === 0) {
            // wegame
            this.canvas = $463719c37c18c090$export$2e2bcd8739ae039;
            this.disableMoveDetection = true;
            this.moveDetectionInterval = 500;
        } else if (len === 4) // weapp
        return new $bc36c189fe40cd59$export$2e2bcd8739ae039(arguments[0], arguments[1], arguments[2], arguments[3]);
        else {
            if (len === 1) this.canvas = typeof width === 'string' ? document.querySelector(width) : width;
            else {
                this.renderTo = typeof renderTo === 'string' ? document.querySelector(renderTo) : renderTo;
                if (this.renderTo.tagName === 'CANVAS') {
                    this.canvas = this.renderTo;
                    this.canvas.width = width;
                    this.canvas.height = height;
                } else {
                    this.canvas = document.createElement('canvas');
                    this.canvas.width = width;
                    this.canvas.height = height;
                    this.renderTo.appendChild(this.canvas);
                }
            } // get rect again when trigger onscroll onresize event!?
            this._boundingClientRect = this.canvas.getBoundingClientRect();
            this.offset = this._getOffset(this.canvas);
        }
        this.renderer = new $9af8461b5f8eee4b$export$2e2bcd8739ae039(this.canvas);
        if (this.isWegame) {
            wx.onTouchStart((evt)=>this._handleMouseDown(evt)
            );
            wx.onTouchMove((evt)=>this._handleMouseMove(evt)
            );
            wx.onTouchEnd((evt)=>this._handleMouseUp(evt)
            );
        } else {
            this.canvas.addEventListener('click', (evt)=>this._handleClick(evt)
            );
            this.canvas.addEventListener('mousedown', (evt)=>this._handleMouseDown(evt)
            );
            this.canvas.addEventListener('mousemove', (evt)=>this._handleMouseMove(evt)
            );
            this.canvas.addEventListener('mouseup', (evt)=>this._handleMouseUp(evt)
            );
            this.canvas.addEventListener('mouseout', (evt)=>this._handleMouseOut(evt)
            );
            this.canvas.addEventListener('touchstart', (evt)=>this._handleMouseDown(evt)
            );
            this.canvas.addEventListener('touchmove', (evt)=>this._handleMouseMove(evt)
            );
            this.canvas.addEventListener('touchend', (evt)=>this._handleMouseUp(evt)
            );
            this.canvas.addEventListener('dblclick', (evt)=>this._handleDblClick(evt)
            ); // this.addEvent(this.canvas, "mousewheel", this._handleMouseWheel.bind(this));
            document.addEventListener('contextmenu', (evt)=>this._handleContextmenu(evt)
            );
        }
        this.borderTopWidth = 0;
        this.borderLeftWidth = 0;
        this.hitAABB = false;
        this._hitRender = new $733c4474a63f8897$export$2e2bcd8739ae039();
        this._overObject = null;
        this._scaleX = 1;
        this._scaleY = 1;
        this._mouseDownX = 0;
        this._mouseDownY = 0;
        this._mouseUpX = 0;
        this._mouseUpY = 0;
        this.willDragObject = null;
        this.preStageX = null;
        this.preStageY = null;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.___instanceof = 'Stage';
        this._moveDetectionTime = Date.now();
    }
    _handleContextmenu(evt9) {
        this._getObjectUnderPoint(evt9);
    }
    _handleDblClick(evt1) {
        this._getObjectUnderPoint(evt1);
    }
    _handleClick(evt2) {
        if (Math.abs(this._mouseDownX - this._mouseUpX) < 20 && Math.abs(this._mouseDownY - this._mouseUpY) < 20) this._getObjectUnderPoint(evt2);
    }
    _handleMouseDown(evt3) {
        if (this.isWegame) evt3.type = 'touchstart';
        this.offset = this._getOffset(this.canvas);
        let obj = this._getObjectUnderPoint(evt3);
        this.willDragObject = obj;
        this._mouseDownX = evt3.stageX;
        this._mouseDownY = evt3.stageY;
        this.preStageX = evt3.stageX;
        this.preStageY = evt3.stageY;
    }
    scaleEventPoint(x, y) {
        this._scaleX = x;
        this._scaleY = y;
    }
    _handleMouseUp(evt4) {
        if (this.isWegame) evt4.type = 'touchend';
        const obj = this._getObjectUnderPoint(evt4);
        this._mouseUpX = evt4.stageX;
        this._mouseUpY = evt4.stageY;
        let mockEvt = new $8beb95fb9b1103f0$export$2e2bcd8739ae039();
        mockEvt.stageX = evt4.stageX;
        mockEvt.stageY = evt4.stageY;
        mockEvt.pureEvent = evt4;
        this.willDragObject = null;
        this.preStageX = null;
        this.preStageY = null;
        if (obj && evt4.type === 'touchend' && Math.abs(this._mouseDownX - this._mouseUpX) < 30 && Math.abs(this._mouseDownY - this._mouseUpY) < 30) {
            mockEvt.type = 'tap';
            obj.dispatchEvent(mockEvt);
        }
    }
    _handleMouseOut(evt5) {
        this._computeStageXY(evt5);
        this.dispatchEvent({
            pureEvent: evt5,
            type: 'mouseout',
            stageX: evt5.stageX,
            stageY: evt5.stageY
        });
    }
    _handleMouseMove(evt6) {
        if (Date.now() - this._moveDetectionTime < this.moveDetectionInterval) return;
        this._moveDetectionTime = Date.now();
        if (this.isWegame) evt6.type = 'touchmove';
        if (this.disableMoveDetection) return;
        let obj = this._getObjectUnderPoint(evt6);
        let mockEvt = new $8beb95fb9b1103f0$export$2e2bcd8739ae039();
        mockEvt.stageX = evt6.stageX;
        mockEvt.stageY = evt6.stageY;
        mockEvt.pureEvent = evt6;
        if (this.willDragObject) {
            mockEvt.type = 'drag';
            mockEvt.dx = mockEvt.stageX - this.preStageX;
            mockEvt.dy = mockEvt.stageY - this.preStageY;
            this.preStageX = mockEvt.stageX;
            this.preStageY = mockEvt.stageY;
            this.willDragObject.dispatchEvent(mockEvt);
        }
        if (obj) {
            if (this._overObject === null) {
                mockEvt.type = 'mouseover';
                obj.dispatchEvent(mockEvt);
                this._overObject = obj;
                this._setCursor(obj);
            } else if (obj.id !== this._overObject.id) {
                this._overObject.dispatchEvent({
                    pureEvent: evt6,
                    type: 'mouseout',
                    stageX: evt6.stageX,
                    stageY: evt6.stageY
                });
                mockEvt.type = 'mouseover';
                obj.dispatchEvent(mockEvt);
                this._setCursor(obj);
                this._overObject = obj;
            } else {
                mockEvt.type = 'mousemove';
                obj.dispatchEvent(mockEvt);
                mockEvt.type = 'touchmove';
                obj.dispatchEvent(mockEvt);
            }
        } else if (this._overObject) {
            mockEvt.type = 'mouseout';
            this._overObject.dispatchEvent(mockEvt);
            this._overObject = null;
            this._setCursor({
                cursor: 'default'
            });
        }
    }
    _setCursor(obj) {
        if (!this.canvas.style) return;
        if (obj.cursor) this.canvas.style.cursor = obj.cursor;
        else if (obj.parent) this._setCursor(obj.parent);
        else this._setCursor({
            cursor: 'default'
        });
    }
    _getObjectUnderPoint(evt7) {
        this._computeStageXY(evt7);
        if (this.hitAABB) return this._hitRender.hitAABB(this, evt7);
        else return this._hitRender.hitPixel(this, evt7);
    }
    _computeStageXY(evt8) {
        this._boundingClientRect = this.isWegame ? {
            left: 0,
            top: 0
        } : this.canvas.getBoundingClientRect();
        if (evt8.touches || evt8.changedTouches) {
            const firstTouch = evt8.touches[0] || evt8.changedTouches[0];
            if (firstTouch) {
                evt8.stageX = (firstTouch.pageX - this.offset[0]) / this._scaleX;
                evt8.stageY = (firstTouch.pageY - this.offset[1]) / this._scaleY;
            }
        } else {
            evt8.stageX = (evt8.clientX - this._boundingClientRect.left - this.borderLeftWidth) / this._scaleX;
            evt8.stageY = (evt8.clientY - this._boundingClientRect.top - this.borderTopWidth) / this._scaleY;
        }
    }
    _getOffset(el) {
        if (this.isWegame) return [
            0,
            0
        ];
        let _t = 0, _l = 0;
        if (document.documentElement.getBoundingClientRect && el.getBoundingClientRect) {
            let box = el.getBoundingClientRect();
            _l = box.left;
            _t = box.top;
        } else {
            while(el.offsetParent){
                _t += el.offsetTop;
                _l += el.offsetLeft;
                el = el.offsetParent;
            }
            return [
                _l,
                _t
            ];
        }
        return [
            _l + Math.max(document.documentElement.scrollLeft, document.body.scrollLeft),
            _t + Math.max(document.documentElement.scrollTop, document.body.scrollTop)
        ];
    }
    update() {
        this.renderer.update(this);
    }
    on(type, fn) {
        const handler = (evt)=>{
            if (!$4ca6ae723696d7dd$export$2e2bcd8739ae039.stagePropagationStopped[type]) {
                this._computeStageXY(evt);
                fn(evt);
            }
            $4ca6ae723696d7dd$export$2e2bcd8739ae039.stagePropagationStopped[type] = false;
        };
        fn.__handler__ = handler;
        this.canvas.addEventListener(type, handler);
    }
    off(type1, fn1) {
        this.canvas.removeEventListener(type1, fn1.__handler__ || fn1);
    }
}
var $7487d0d0460996a1$export$2e2bcd8739ae039 = $7487d0d0460996a1$var$Stage;









class $276d471f84376612$var$Shape extends $2d7fd1ae3cf06035$export$2e2bcd8739ae039 {
    // constructor() {
    //     super()
    // }
    draw() {
    }
    render(ctx) {
        this.clear();
        this.draw();
        super.render(ctx);
    }
}
var $276d471f84376612$export$2e2bcd8739ae039 = $276d471f84376612$var$Shape;



class $a2f532ad0cf5b255$var$RoundedRect extends $276d471f84376612$export$2e2bcd8739ae039 {
    constructor(width, height, r, option){
        super();
        this.option = Object.assign({
            lineWidth: 1,
            lt: true,
            rt: true,
            lb: true,
            rb: true
        }, option);
        this.r = r || 0;
        this.width = width;
        this.height = height;
    }
    draw() {
        const width = this.width, height = this.height, r = this.r;
        const ax = r, ay = 0, bx = width, by = 0, cx = width, cy = height, dx = 0, dy = height, ex = 0, ey = 0;
        this.beginPath();
        this.moveTo(ax, ay);
        if (this.option.rt) this.arcTo(bx, by, cx, cy, r);
        else this.lineTo(bx, by);
        if (this.option.rb) this.arcTo(cx, cy, dx, dy, r);
        else this.lineTo(cx, cy);
        if (this.option.lb) this.arcTo(dx, dy, ex, ey, r);
        else this.lineTo(dx, dy);
        if (this.option.lt) this.arcTo(ex, ey, ax, ay, r);
        else this.lineTo(ex, ey);
        if (this.option.fillStyle) {
            this.closePath();
            this.fillStyle(this.option.fillStyle);
            this.fill();
        }
        if (this.option.strokeStyle) {
            this.lineWidth(this.option.lineWidth);
            this.strokeStyle(this.option.strokeStyle);
            this.stroke();
        }
    }
}
var $a2f532ad0cf5b255$export$2e2bcd8739ae039 = $a2f532ad0cf5b255$var$RoundedRect;



class $d2fe41cb9e081f30$var$ArrowPath extends $276d471f84376612$export$2e2bcd8739ae039 {
    constructor(path, option){
        super();
        this.path = path;
        this.option = Object.assign({
            strokeStyle: 'black',
            lineWidth: 1,
            headSize: 10
        }, option);
    }
    draw() {
        const path = this.path;
        this.beginPath();
        const len = path.length;
        if (len === 2) this.drawArrow(path[0].x, path[0].y, path[1].x, path[1].y, 30);
        else {
            this.moveTo(path[0].x, path[0].y);
            for(let i = 1; i < len - 1; i++)this.lineTo(path[i].x, path[i].y);
            this.drawArrow(path[len - 2].x, path[len - 2].y, path[len - 1].x, path[len - 1].y, 30);
        }
        this.stroke();
    }
    drawArrow(fromX, fromY, toX, toY, theta) {
        let angle = Math.atan2(fromY - toY, fromX - toX) * 180 / Math.PI, angle1 = (angle + theta) * Math.PI / 180, angle2 = (angle - theta) * Math.PI / 180, hs = this.option.headSize, topX = hs * Math.cos(angle1), topY = hs * Math.sin(angle1), botX = hs * Math.cos(angle2), botY = hs * Math.sin(angle2);
        let arrowX = fromX - topX, arrowY = fromY - topY;
        this.moveTo(arrowX, arrowY);
        this.moveTo(fromX, fromY);
        this.lineTo(toX, toY);
        arrowX = toX + topX;
        arrowY = toY + topY;
        this.moveTo(arrowX, arrowY);
        this.lineTo(toX, toY);
        arrowX = toX + botX;
        arrowY = toY + botY;
        this.lineTo(arrowX, arrowY);
        this.strokeStyle(this.option.strokeStyle);
        this.lineWidth(this.option.lineWidth);
    }
}
var $d2fe41cb9e081f30$export$2e2bcd8739ae039 = $d2fe41cb9e081f30$var$ArrowPath;



class $3ec2487c3e49f282$var$Ellipse extends $276d471f84376612$export$2e2bcd8739ae039 {
    constructor(width, height, option){
        super();
        this.option = option || {
        };
        this.width = width;
        this.height = height;
    }
    draw() {
        const w = this.width;
        const h = this.height;
        const k = 0.5522848;
        const ox = w / 2 * k;
        const oy = h / 2 * k;
        const xe = w;
        const ye = h;
        const xm = w / 2;
        const ym = h / 2;
        this.beginPath();
        this.moveTo(0, ym);
        this.bezierCurveTo(0, ym - oy, xm - ox, 0, xm, 0);
        this.bezierCurveTo(xm + ox, 0, xe, ym - oy, xe, ym);
        this.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
        this.bezierCurveTo(xm - ox, ye, 0, ym + oy, 0, ym);
        if (this.option.strokeStyle) {
            if (this.option.lineWidth !== undefined) this.lineWidth(this.option.lineWidth);
            this.strokeStyle(this.option.strokeStyle);
            this.stroke();
        }
        if (this.option.fillStyle) {
            this.fillStyle(this.option.fillStyle);
            this.fill();
        }
    }
}
var $3ec2487c3e49f282$export$2e2bcd8739ae039 = $3ec2487c3e49f282$var$Ellipse;


// https://github.com/jkroso/parse-svg-path/blob/master/index.js
/**
 * expected argument lengths
 * @type {Object}
 */ var $37a52076234772c9$var$length = {
    a: 7,
    c: 6,
    h: 1,
    l: 2,
    m: 2,
    q: 4,
    s: 4,
    t: 2,
    v: 1,
    z: 0
};
/**
 * segment pattern
 * @type {RegExp}
 */ var $37a52076234772c9$var$segment = /([astvzqmhlc])([^astvzqmhlc]*)/ig;
/**
 * parse an svg path data string. Generates an Array
 * of commands where each command is an Array of the
 * form `[command, arg1, arg2, ...]`
 *
 * @param {String} path
 * @return {Array}
 */ function $37a52076234772c9$var$parse(path) {
    var data = [];
    path.replace($37a52076234772c9$var$segment, function(_, command, args) {
        var type = command.toLowerCase();
        args = $37a52076234772c9$var$parseValues(args); // overloaded moveTo
        if (type === 'm' && args.length > 2) {
            data.push([
                command
            ].concat(args.splice(0, 2)));
            type = 'l';
            command = command === 'm' ? 'l' : 'L';
        }
        while(true){
            if (args.length === $37a52076234772c9$var$length[type]) {
                args.unshift(command);
                return data.push(args);
            }
            if (args.length < $37a52076234772c9$var$length[type]) throw new Error('malformed path data');
            data.push([
                command
            ].concat(args.splice(0, $37a52076234772c9$var$length[type])));
        }
    });
    return data;
}
var $37a52076234772c9$var$number = /-?[0-9]*\.?[0-9]+(?:e[-+]?\d+)?/ig;
function $37a52076234772c9$var$parseValues(args) {
    var numbers = args.match($37a52076234772c9$var$number);
    return numbers ? numbers.map(Number) : [];
}
var $37a52076234772c9$export$2e2bcd8739ae039 = $37a52076234772c9$var$parse;



// https://github.com/colinmeinke/svg-arc-to-cubic-bezier
const $af6deb77e6d15853$var$TAU = Math.PI * 2;
const $af6deb77e6d15853$var$mapToEllipse = ({ x: x , y: y  }, rx, ry, cosphi, sinphi, centerx, centery)=>{
    x *= rx;
    y *= ry;
    const xp = cosphi * x - sinphi * y;
    const yp = sinphi * x + cosphi * y;
    return {
        x: xp + centerx,
        y: yp + centery
    };
};
const $af6deb77e6d15853$var$approxUnitArc = (ang1, ang2)=>{
    const a = 4 / 3 * Math.tan(ang2 / 4);
    const x1 = Math.cos(ang1);
    const y1 = Math.sin(ang1);
    const x2 = Math.cos(ang1 + ang2);
    const y2 = Math.sin(ang1 + ang2);
    return [
        {
            x: x1 - y1 * a,
            y: y1 + x1 * a
        },
        {
            x: x2 + y2 * a,
            y: y2 - x2 * a
        },
        {
            x: x2,
            y: y2
        }
    ];
};
const $af6deb77e6d15853$var$vectorAngle = (ux, uy, vx, vy)=>{
    const sign = ux * vy - uy * vx < 0 ? -1 : 1;
    const umag = Math.sqrt(ux * ux + uy * uy);
    const vmag = Math.sqrt(ux * ux + uy * uy);
    const dot = ux * vx + uy * vy;
    let div = dot / (umag * vmag);
    if (div > 1) div = 1;
    if (div < -1) div = -1;
    return sign * Math.acos(div);
};
const $af6deb77e6d15853$var$getArcCenter = (px, py, cx, cy, rx, ry, largeArcFlag, sweepFlag, sinphi, cosphi, pxp, pyp)=>{
    const rxsq = Math.pow(rx, 2);
    const rysq = Math.pow(ry, 2);
    const pxpsq = Math.pow(pxp, 2);
    const pypsq = Math.pow(pyp, 2);
    let radicant = rxsq * rysq - rxsq * pypsq - rysq * pxpsq;
    if (radicant < 0) radicant = 0;
    radicant /= rxsq * pypsq + rysq * pxpsq;
    radicant = Math.sqrt(radicant) * (largeArcFlag === sweepFlag ? -1 : 1);
    const centerxp = radicant * rx / ry * pyp;
    const centeryp = radicant * -ry / rx * pxp;
    const centerx = cosphi * centerxp - sinphi * centeryp + (px + cx) / 2;
    const centery = sinphi * centerxp + cosphi * centeryp + (py + cy) / 2;
    const vx1 = (pxp - centerxp) / rx;
    const vy1 = (pyp - centeryp) / ry;
    const vx2 = (-pxp - centerxp) / rx;
    const vy2 = (-pyp - centeryp) / ry;
    let ang1 = $af6deb77e6d15853$var$vectorAngle(1, 0, vx1, vy1);
    let ang2 = $af6deb77e6d15853$var$vectorAngle(vx1, vy1, vx2, vy2);
    if (sweepFlag === 0 && ang2 > 0) ang2 -= $af6deb77e6d15853$var$TAU;
    if (sweepFlag === 1 && ang2 < 0) ang2 += $af6deb77e6d15853$var$TAU;
    return [
        centerx,
        centery,
        ang1,
        ang2
    ];
};
const $af6deb77e6d15853$var$arcToBezier = ({ px: px , py: py , cx: cx , cy: cy , rx: rx , ry: ry , xAxisRotation: xAxisRotation = 0 , largeArcFlag: largeArcFlag = 0 , sweepFlag: sweepFlag = 0  })=>{
    const curves = [];
    if (rx === 0 || ry === 0) return [];
    const sinphi = Math.sin(xAxisRotation * $af6deb77e6d15853$var$TAU / 360);
    const cosphi = Math.cos(xAxisRotation * $af6deb77e6d15853$var$TAU / 360);
    const pxp = cosphi * (px - cx) / 2 + sinphi * (py - cy) / 2;
    const pyp = -sinphi * (px - cx) / 2 + cosphi * (py - cy) / 2;
    if (pxp === 0 && pyp === 0) return [];
    rx = Math.abs(rx);
    ry = Math.abs(ry);
    const lambda = Math.pow(pxp, 2) / Math.pow(rx, 2) + Math.pow(pyp, 2) / Math.pow(ry, 2);
    if (lambda > 1) {
        rx *= Math.sqrt(lambda);
        ry *= Math.sqrt(lambda);
    }
    let [centerx, centery, ang1, ang2] = $af6deb77e6d15853$var$getArcCenter(px, py, cx, cy, rx, ry, largeArcFlag, sweepFlag, sinphi, cosphi, pxp, pyp);
    const segments = Math.max(Math.ceil(Math.abs(ang2) / ($af6deb77e6d15853$var$TAU / 4)), 1);
    ang2 /= segments;
    for(let i = 0; i < segments; i++){
        curves.push($af6deb77e6d15853$var$approxUnitArc(ang1, ang2));
        ang1 += ang2;
    }
    return curves.map((curve)=>{
        const { x: x1 , y: y1  } = $af6deb77e6d15853$var$mapToEllipse(curve[0], rx, ry, cosphi, sinphi, centerx, centery);
        const { x: x2 , y: y2  } = $af6deb77e6d15853$var$mapToEllipse(curve[1], rx, ry, cosphi, sinphi, centerx, centery);
        const { x: x , y: y  } = $af6deb77e6d15853$var$mapToEllipse(curve[2], rx, ry, cosphi, sinphi, centerx, centery);
        return {
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2,
            x: x,
            y: y
        };
    });
};
var $af6deb77e6d15853$export$2e2bcd8739ae039 = $af6deb77e6d15853$var$arcToBezier;


class $647bcf0f7995e46a$var$Path extends $276d471f84376612$export$2e2bcd8739ae039 {
    constructor(d, option){
        super();
        this.d = d;
        option = Object.assign({
            lineWidth: 1
        }, option);
        this.option = option;
    }
    draw() {
        const cmds = $37a52076234772c9$export$2e2bcd8739ae039(this.d);
        this.beginPath(); // https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial/Paths
        // M = moveto
        // L = lineto
        // H = horizontal lineto
        // V = vertical lineto
        // C = curveto
        // S = smooth curveto
        // Q = quadratic Belzier curve
        // T = smooth quadratic Belzier curveto
        // A = elliptical Arc  暂时未实现，用贝塞尔拟合椭圆
        // Z = closepath
        // 以上所有命令均允许小写字母。大写表示绝对定位，小写表示相对定位(从上一个点开始)。
        let preX, preY, curves, lastCurve; // 参考我的 pasition https://github.com/AlloyTeam/pasition/blob/master/src/index.js
        for(let j = 0, cmdLen = cmds.length; j < cmdLen; j++){
            let item = cmds[j];
            let action = item[0];
            let preItem = cmds[j - 1];
            switch(action){
                case 'M':
                    preX = item[1];
                    preY = item[2];
                    this.moveTo(preX, preY);
                    break;
                case 'L':
                    preX = item[1];
                    preY = item[2];
                    this.lineTo(preX, preY);
                    break;
                case 'H':
                    preX = item[1];
                    this.lineTo(preX, preY);
                    break;
                case 'V':
                    preY = item[1];
                    this.lineTo(preX, preY);
                    break;
                case 'C':
                    preX = item[5];
                    preY = item[6];
                    this.bezierCurveTo(item[1], item[2], item[3], item[4], preX, preY);
                    break;
                case 'S':
                    if (preItem[0] === 'C' || preItem[0] === 'c') this.bezierCurveTo(preX + preItem[5] - preItem[3], preY + preItem[6] - preItem[4], item[1], item[2], item[3], item[4]);
                    else if (preItem[0] === 'S' || preItem[0] === 's') this.bezierCurveTo(preX + preItem[3] - preItem[1], preY + preItem[4] - preItem[2], item[1], item[2], item[3], item[4]);
                    preX = item[3];
                    preY = item[4];
                    break;
                case 'Q':
                    preX = item[3];
                    preY = item[4];
                    this.quadraticCurveTo(item[1], item[2], preX, preY);
                    break;
                case 'm':
                    preX += item[1];
                    preY += item[2];
                    this.moveTo(preX, preY);
                    break;
                case 'l':
                    preX += item[1];
                    preY += item[2];
                    this.lineTo(preX, preY);
                    break;
                case 'h':
                    preX += item[1];
                    this.lineTo(preX, preY);
                    break;
                case 'v':
                    preY += item[1];
                    this.lineTo(preX, preY);
                    break;
                case 'c':
                    this.bezierCurveTo(preX + item[1], preY + item[2], preX + item[3], preY + item[4], preX + item[5], preY + item[6]);
                    preX = preX + item[5];
                    preY = preY + item[6];
                    break;
                case 's':
                    if (preItem[0] === 'C' || preItem[0] === 'c') this.bezierCurveTo(preX + preItem[5] - preItem[3], preY + preItem[6] - preItem[4], preX + item[1], preY + item[2], preX + item[3], preY + item[4]);
                    else if (preItem[0] === 'S' || preItem[0] === 's') this.bezierCurveTo(preX + preItem[3] - preItem[1], preY + preItem[4] - preItem[2], preX + item[1], preY + item[2], preX + item[3], preY + item[4]);
                    preX += item[3];
                    preY += item[4];
                    break;
                case 'q':
                    this.quadraticCurveTo(preX + item[1], preY + item[2], item[3] + preX, item[4] + preY);
                    preX += item[3];
                    preY += item[4];
                    break;
                case 'Z':
                    this.closePath();
                    break;
                case 'z':
                    this.closePath();
                    break;
                case 'a':
                    curves = $af6deb77e6d15853$export$2e2bcd8739ae039({
                        rx: item[1],
                        ry: item[2],
                        px: preX,
                        py: preY,
                        xAxisRotation: item[3],
                        largeArcFlag: item[4],
                        sweepFlag: item[5],
                        cx: preX + item[6],
                        cy: preX + item[7]
                    });
                    lastCurve = curves[curves.length - 1];
                    curves.forEach((curve, index)=>{
                        if (index === 0) {
                            this.moveTo(preX, preY);
                            this.bezierCurveTo(curve.x1, curve.y1, curve.x2, curve.y2, curve.x, curve.y);
                        } else //curves[index - 1].x, curves[index - 1].y, 
                        this.bezierCurveTo(curve.x1, curve.y1, curve.x2, curve.y2, curve.x, curve.y);
                    });
                    preX = lastCurve.x;
                    preY = lastCurve.y;
                    break;
                case 'A':
                    curves = $af6deb77e6d15853$export$2e2bcd8739ae039({
                        rx: item[1],
                        ry: item[2],
                        px: preX,
                        py: preY,
                        xAxisRotation: item[3],
                        largeArcFlag: item[4],
                        sweepFlag: item[5],
                        cx: item[6],
                        cy: item[7]
                    });
                    lastCurve = curves[curves.length - 1];
                    curves.forEach((curve, index)=>{
                        if (index === 0) {
                            this.moveTo(preX, preY);
                            this.bezierCurveTo(curve.x1, curve.y1, curve.x2, curve.y2, curve.x, curve.y);
                        } else //curves[index - 1].x, curves[index - 1].y
                        this.bezierCurveTo(curve.x1, curve.y1, curve.x2, curve.y2, curve.x, curve.y);
                    });
                    preX = lastCurve.x;
                    preY = lastCurve.y;
                    break;
                case 'T':
                    if (preItem[0] === 'Q' || preItem[0] === 'q') {
                        preCX = preX + preItem[3] - preItem[1];
                        preCY = preY + preItem[4] - preItem[2];
                        this.quadraticCurveTo(preX, preY, preCX, preCY, item[1], item[2]);
                    } else if (preItem[0] === 'T' || preItem[0] === 't') {
                        this.quadraticCurveTo(preX, preY, preX + preX - preCX, preY + preY - preCY, item[1], item[2]);
                        preCX = preX + preX - preCX;
                        preCY = preY + preY - preCY;
                    }
                    preX = item[1];
                    preY = item[2];
                    break;
                case 't':
                    if (preItem[0] === 'Q' || preItem[0] === 'q') {
                        preCX = preX + preItem[3] - preItem[1];
                        preCY = preY + preItem[4] - preItem[2];
                        this.quadraticCurveTo(preX, preY, preCX, preCY, preX + item[1], preY + item[2]);
                    } else if (preItem[0] === 'T' || preItem[0] === 't') {
                        this.quadraticCurveTo(preX, preY, preX + preX - preCX, preY + preY - preCY, preX + item[1], preY + item[2]);
                        preCX = preX + preX - preCX;
                        preCY = preY + preY - preCY;
                    }
                    preX += item[1];
                    preY += item[2];
                    break;
            }
        }
        if (this.option.fillStyle) {
            this.fillStyle(this.option.fillStyle);
            this.fill();
        }
        if (this.option.strokeStyle) {
            this.lineWidth(this.option.lineWidth);
            this.strokeStyle(this.option.strokeStyle);
            this.stroke();
        }
    }
    clone() {
        return new $647bcf0f7995e46a$var$Path(this.d, {
            lineWidth: this.option.lineWidth,
            strokeStyle: this.option.strokeStyle,
            fillStyle: this.option.fillStyle
        });
    }
}
var $647bcf0f7995e46a$export$2e2bcd8739ae039 = $647bcf0f7995e46a$var$Path;






/*
Options
  font:
  text: 
  textColor:
  image: [path, width, height]
  bgColor: 
  bgImage: [path, width, height]
  borderRadius:
  borderColor:
*/ class $606798555f78d2f8$var$Button extends $e47fc926a6af8e36$export$2e2bcd8739ae039 {
    constructor(option){
        super();
        this.width = option.width;
        this.height = option.height;
        this.x = option.x;
        this.y = option.y;
        let textHeight = 0;
        var textGroup;
        if (option.text) {
            textGroup = new $e47fc926a6af8e36$export$2e2bcd8739ae039();
            this.text = new $45cf6d178e2acada$export$2e2bcd8739ae039(option.text, {
                font: option.font,
                color: option.color
            });
            const textWidth = this.text.getWidth();
            if (textWidth > option.width) {
                const step = Math.round(option.text.length * option.width / textWidth / 2);
                const textList = this.stringSplit(option.text, step);
                const lineHeight = option.lineHeight || 12;
                textHeight = textList.length * lineHeight + 6;
                textList.forEach((text, index)=>{
                    this.text = new $45cf6d178e2acada$export$2e2bcd8739ae039(text, {
                        font: option.font,
                        color: option.color
                    });
                    this.text.x = option.width / 2 - this.text.getWidth() / 2 * this.text.scaleX + (option.textX || 0);
                    this.text.y = Math.max(textHeight, option.height) / 2 - 10 + 5 * this.text.scaleY + (option.textY || 0) + index * 12 - textHeight / 2 + lineHeight / 2;
                    textGroup.add(this.text);
                });
            } else {
                this.text.x = option.width / 2 - this.text.getWidth() / 2 * this.text.scaleX + (option.textX || 0);
                this.text.y = option.height / 2 - 10 + 5 * this.text.scaleY + (option.textY || 0);
                textGroup.add(this.text);
            }
        }
        if (option.bgImage) {
            var ratio = option.ratio || 1;
            let bitmap = new $9775ae176386021e$export$2e2bcd8739ae039(option.bgImage[0]);
            bitmap.scaleX = ratio;
            bitmap.scaleY = ratio;
            bitmap.width = option.bgImage[1];
            bitmap.height = option.bgImage[2];
            bitmap.x = (this.width - bitmap.width) / 2;
            bitmap.y = (this.height - bitmap.height) / 2;
            this.add(bitmap);
        } else if (option.bgColor || option.borderColor) {
            this.roundedRect = new $a2f532ad0cf5b255$export$2e2bcd8739ae039(option.width, option.autoHeight ? Math.max(textHeight, option.height) : option.height, option.borderRadius, {
                strokeStyle: option.borderColor || 'black',
                fillStyle: option.bgColor || '#F5F5F5'
            });
            this.add(this.roundedRect);
        }
        if (option.image) {
            var ratio = option.ratio || 1;
            let bitmap = new $9775ae176386021e$export$2e2bcd8739ae039(option.image[0]);
            bitmap.scaleX = ratio;
            bitmap.scaleY = ratio;
            bitmap.width = option.image[1];
            bitmap.height = option.image[2];
            bitmap.x = (this.width - bitmap.width) / 2;
            bitmap.y = (this.height - bitmap.height) / 2;
            this.add(bitmap);
        }
        if (textGroup) this.add(textGroup);
    }
    stringSplit(str, len) {
        let arr = [], offset = 0, char_length = 0;
        for(let i = 0; i < str.length; i++){
            let son_str = str.charAt(i);
            encodeURI(son_str).length > 2 ? char_length += 1 : char_length += 0.5;
            if (char_length >= len || char_length < len && i === str.length - 1) {
                let sub_len = char_length == len ? i + 1 : i;
                arr.push(str.substr(offset, sub_len - offset + (char_length < len && i === str.length - 1 ? 1 : 0)));
                offset = i + 1;
                char_length = 0;
            }
        }
        return arr;
    }
}
var $606798555f78d2f8$export$2e2bcd8739ae039 = $606798555f78d2f8$var$Button;



class $527ccdb30b783a29$var$Rect extends $276d471f84376612$export$2e2bcd8739ae039 {
    constructor(width, height, option){
        super();
        this.width = width;
        this.height = height;
        this.option = option || {
        };
    }
    draw() {
        if (this.option.fillStyle) {
            this.fillStyle(this.option.fillStyle);
            this.fillRect(0, 0, this.width, this.height);
        }
        if (this.option.strokeStyle) {
            this.strokeStyle(this.option.strokeStyle);
            if (typeof this.option.lineWidth === 'number') this.lineWidth(this.option.lineWidth);
            this.strokeRect(0, 0, this.width, this.height);
        }
    }
}
var $527ccdb30b783a29$export$2e2bcd8739ae039 = $527ccdb30b783a29$var$Rect;



class $f2395e373a552439$var$Circle extends $276d471f84376612$export$2e2bcd8739ae039 {
    constructor(r, option){
        super();
        this.option = option || {
        };
        this.r = r;
        this._dp = Math.PI * 2;
    }
    draw() {
        this.beginPath();
        this.arc(0, 0, this.r, 0, this._dp, false);
        if (this.option.strokeStyle) {
            if (this.option.lineWidth !== undefined) this.lineWidth(this.option.lineWidth);
            this.strokeStyle(this.option.strokeStyle);
            this.stroke();
        }
        if (this.option.fillStyle) {
            this.fillStyle(this.option.fillStyle);
            this.fill();
        }
    }
}
var $f2395e373a552439$export$2e2bcd8739ae039 = $f2395e373a552439$var$Circle;



class $6d03225deb842719$var$Polygon extends $276d471f84376612$export$2e2bcd8739ae039 {
    constructor(vertex, options){
        super();
        this.vertex = vertex || [];
        this.options = options || {
        };
        this.strokeColor = this.options.strokeColor;
        this.fillColor = this.options.fillColor;
    }
    draw() {
        this.clear().beginPath();
        this.strokeStyle(this.strokeColor);
        this.moveTo(this.vertex[0][0], this.vertex[0][1]);
        for(let i = 1, len = this.vertex.length; i < len; i++)this.lineTo(this.vertex[i][0], this.vertex[i][1]);
        this.closePath(); // 路径闭合
        //  if (this.options.strokeStyle) {
        //    this.strokeStyle = strokeStyle;
        // this.lineWidth(this.options.width);
        // this.lineJoin('round');
        // this.stroke();
        //  }
        if (this.strokeColor) {
            this.strokeStyle(this.strokeColor);
            this.stroke();
        }
        if (this.fillColor) {
            this.fillStyle(this.fillColor);
            this.fill();
        }
    }
}
var $6d03225deb842719$export$2e2bcd8739ae039 = $6d03225deb842719$var$Polygon;



class $22eb7abad679bba0$var$EquilateralPolygon extends $276d471f84376612$export$2e2bcd8739ae039 {
    constructor(num, r, options){
        super();
        this.num = num;
        this.r = r;
        this.options = options || {
        };
        this.vertex = [];
        this.initVertex();
    }
    initVertex() {
        this.vertex.length = [];
        const num = this.num;
        const r = this.r;
        let i, startX, startY, newX, newY;
        if (num % 2 === 0) {
            startX = r * Math.cos(2 * Math.PI * 0 / num);
            startY = r * Math.sin(2 * Math.PI * 0 / num);
            this.vertex.push([
                startX,
                startY
            ]);
            for(i = 1; i < num; i++){
                newX = r * Math.cos(2 * Math.PI * i / num);
                newY = r * Math.sin(2 * Math.PI * i / num);
                this.vertex.push([
                    newX,
                    newY
                ]);
            }
        } else {
            startX = r * Math.cos(2 * Math.PI * 0 / num - Math.PI / 2);
            startY = r * Math.sin(2 * Math.PI * 0 / num - Math.PI / 2);
            this.vertex.push([
                startX,
                startY
            ]);
            for(i = 1; i < num; i++){
                newX = r * Math.cos(2 * Math.PI * i / num - Math.PI / 2);
                newY = r * Math.sin(2 * Math.PI * i / num - Math.PI / 2);
                this.vertex.push([
                    newX,
                    newY
                ]);
            }
        }
    }
    draw() {
        this.beginPath();
        this.moveTo(this.vertex[0][0], this.vertex[0][1]);
        for(let i = 1, len = this.vertex.length; i < len; i++)this.lineTo(this.vertex[i][0], this.vertex[i][1]);
        this.closePath();
        if (this.options.fillStyle) {
            this.fillStyle(this.options.fillStyle);
            this.fill();
        }
        if (this.options.strokeStyle) {
            this.strokeStyle(this.options.strokeStyle);
            if (typeof this.options.lineWidth === 'number') this.lineWidth(this.options.lineWidth);
            this.stroke();
        }
    }
}
var $22eb7abad679bba0$export$2e2bcd8739ae039 = $22eb7abad679bba0$var$EquilateralPolygon;



$f6c01cc9a280eff9$export$2e2bcd8739ae039.easing = {
    linear: (/*@__PURE__*/$parcel$interopDefault($b3be0e9a34bf22d9$exports)).Easing.Linear.None
};
const $84b79afa456f6c66$var$cax = {
    easing: {
        linear: (/*@__PURE__*/$parcel$interopDefault($b3be0e9a34bf22d9$exports)).Easing.Linear.None
    },
    util: {
        randomInt: (min, max)=>{
            return min + Math.floor(Math.random() * (max - min + 1));
        }
    },
    Stage: $7487d0d0460996a1$export$2e2bcd8739ae039,
    WeStage: $bc36c189fe40cd59$export$2e2bcd8739ae039,
    Graphics: $2d7fd1ae3cf06035$export$2e2bcd8739ae039,
    Bitmap: $9775ae176386021e$export$2e2bcd8739ae039,
    Text: $45cf6d178e2acada$export$2e2bcd8739ae039,
    Group: $e47fc926a6af8e36$export$2e2bcd8739ae039,
    Sprite: $845c974841b2f010$export$2e2bcd8739ae039,
    Shape: $276d471f84376612$export$2e2bcd8739ae039,
    ArrowPath: $d2fe41cb9e081f30$export$2e2bcd8739ae039,
    Ellipse: $3ec2487c3e49f282$export$2e2bcd8739ae039,
    Path: $647bcf0f7995e46a$export$2e2bcd8739ae039,
    Button: $606798555f78d2f8$export$2e2bcd8739ae039,
    RoundedRect: $a2f532ad0cf5b255$export$2e2bcd8739ae039,
    Rect: $527ccdb30b783a29$export$2e2bcd8739ae039,
    Circle: $f2395e373a552439$export$2e2bcd8739ae039,
    Polygon: $6d03225deb842719$export$2e2bcd8739ae039,
    EquilateralPolygon: $22eb7abad679bba0$export$2e2bcd8739ae039,
    setInterval: $b3d8b592aa6dd52e$export$f34283cc2c2ba8c8,
    clearInterval: $b3d8b592aa6dd52e$export$3ef6dffe869813b5,
    tick: function(fn) {
        return $b3d8b592aa6dd52e$export$f34283cc2c2ba8c8(fn, 16);
    },
    untick: function(tickId) {
        $b3d8b592aa6dd52e$export$3ef6dffe869813b5(tickId);
    },
    caxCanvasId: 0,
    TWEEN: (/*@__PURE__*/$parcel$interopDefault($b3be0e9a34bf22d9$exports)),
    To: $f6c01cc9a280eff9$export$2e2bcd8739ae039
};
[
    'Quadratic',
    'Cubic',
    'Quartic',
    'Quintic',
    'Sinusoidal',
    'Exponential',
    'Circular',
    'Elastic',
    'Back',
    'Bounce'
].forEach((item)=>{
    const itemLower = item.toLowerCase();
    $84b79afa456f6c66$var$cax.easing[itemLower + 'In'] = (/*@__PURE__*/$parcel$interopDefault($b3be0e9a34bf22d9$exports)).Easing[item].In;
    $84b79afa456f6c66$var$cax.easing[itemLower + 'Out'] = (/*@__PURE__*/$parcel$interopDefault($b3be0e9a34bf22d9$exports)).Easing[item].Out;
    $84b79afa456f6c66$var$cax.easing[itemLower + 'InOut'] = (/*@__PURE__*/$parcel$interopDefault($b3be0e9a34bf22d9$exports)).Easing[item].InOut;
    $f6c01cc9a280eff9$export$2e2bcd8739ae039.easing[itemLower + 'In'] = (/*@__PURE__*/$parcel$interopDefault($b3be0e9a34bf22d9$exports)).Easing[item].In;
    $f6c01cc9a280eff9$export$2e2bcd8739ae039.easing[itemLower + 'Out'] = (/*@__PURE__*/$parcel$interopDefault($b3be0e9a34bf22d9$exports)).Easing[item].Out;
    $f6c01cc9a280eff9$export$2e2bcd8739ae039.easing[itemLower + 'InOut'] = (/*@__PURE__*/$parcel$interopDefault($b3be0e9a34bf22d9$exports)).Easing[item].InOut;
});
const $84b79afa456f6c66$var$isWegame = typeof wx !== 'undefined' && typeof Page === 'undefined';
$84b79afa456f6c66$var$cax.loadImg = function(option) {
    const img = $84b79afa456f6c66$var$isWegame ? wx.createImage() : new Image();
    img.onload = function() {
        option.complete(this);
    };
    img.src = option.img;
};
$84b79afa456f6c66$var$cax.loadImgs = function(option) {
    const result = [];
    let loaded = 0;
    const len = option.imgs.length;
    option.imgs.forEach((src, index)=>{
        const img1 = $84b79afa456f6c66$var$isWegame ? wx.createImage() : new Image();
        img1.onload = (function(i, img) {
            return function() {
                result[i] = img;
                loaded++;
                option.progress && option.progress(loaded / len, loaded, i, img, result);
                if (loaded === len) option.complete && option.complete(result);
            };
        })(index, img1);
        img1.src = src;
    });
};
module.exports = $84b79afa456f6c66$var$cax;


