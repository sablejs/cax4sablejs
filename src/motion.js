const cax = require("../vendor/cax/src/index.js");
const { EASING, isPlainObject } = require("./common");

module.exports = (vm) => {
  const global = vm.getGlobal();
  const vCax = vm.getProperty(global, "cax");
  const vTo = vm.createFunction("To", function () {});
  const vGet = vm.createFunction("get", function (vElement) {
    const vToValue = vm.new(vTo);
    const vToValueRef = vm.asObject(vToValue);
    const vElementRef = vm.asObject(vElement);
    let target = vElementRef.value;
    if (!target) {
      target = {};
      const vObject = vm.getProperty(global, "Object");
      const vKeysFunc = vm.getProperty(vObject, "keys");
      const vKeys = vm.call(vKeysFunc, vm.createUndefined(), vElement);
      const vLength = vm.getProperty(vKeys, "length");
      const length = vm.asNumber(vLength);
      for (let i = 0; i < length; i++) {
        const vKey = vm.getProperty(vKeys, i);
        const key = vm.asString(vKey);
        const vValue = vm.getProperty(vElement, key);
        if (vm.isNumber(vValue)) {
          target[key] = vm.asNumber(vValue);
        }
      }
    }

    vToValueRef.value = cax.To.get(target);
    vToValueRef.value.__target__ = vElement;
    return vToValue;
  });

  const vToProto = vm.createObject();
  const key0or1ArgFuns = [
    "x",
    "y",
    "z",
    "rotation",
    "scaleX",
    "scaleY",
    "skewX",
    "skewY",
    "originX",
    "originY",
    "alpha",
    "wait",
    "start",
    "pause",
    "toggle",
    "play",
    "stop",
    "animate",
    "begin",
    "progress",
    "end",
    "cycle",
    "then",
  ];

  for (let key of key0or1ArgFuns) {
    const vFun = vm.createFunction(key, function () {
      const vThisRef = vm.asObject(this);
      const temp = [];
      for (let i = 0, length = arguments.length; i < length; i++) {
        const vItem = arguments[i];
        if (vm.isNumber(vItem)) {
          temp.push(vm.asNumber(vItem));
        } else if (vm.isString(vItem)) {
          temp.push(vm.asString(vItem));
        } else if (vm.isFunction(vItem)) {
          temp.push(function (object) {
            let target = vThisRef.value.__target__;
            if (isPlainObject(object)) {
              target = vm.createObject();
              for (let key in object) {
                if (object.hasOwnProperty(key) && typeof object[key] === "number") {
                  vm.setProperty(target, key, vm.createNumber(object[key]));
                }
              }
            }

            vm.call(vItem, vm.createUndefined(), target);
          });
        } else {
          temp.push(undefined);
        }
      }

      const easing = temp[temp.length - 1];
      if (typeof easing === "string") {
        temp[temp.length - 1] = cax.easing[easing] || easing;
      }

      vThisRef.value[key](...temp);
      return this;
    });

    vm.setProperty(vToProto, key, vFun);
  }

  const vToF = vm.createFunction("to", function () {
    const vThisRef = vm.asObject(this);
    let length = arguments.length;
    if (length === 0) {
      vThisRef.value.to();
      return this;
    }

    const vObject = vm.getProperty(global, "Object");
    const vKeysFunc = vm.getProperty(vObject, "keys");
    const vTarget = arguments[0];
    const vKeys = vm.call(vKeysFunc, vm.createUndefined(), vTarget);
    const vLength = vm.getProperty(vKeys, "length");
    const target = {};
    for (let i = 0, length = vm.asNumber(vLength); i < length; i++) {
      const vKey = vm.getProperty(vKeys, i);
      const key = vm.asString(vKey);
      const vValue = vm.getProperty(vTarget, key);
      target[key] = vm.asNumber(vValue);
    }

    const duration = length > 1 ? vm.asNumber(arguments[1]) : 0;
    const easing = length > 2 ? vm.asString(arguments[2]) : "linear";
    vThisRef.value.to(target, duration, cax.easing[easing]);
    return this;
  });

  const vSet = vm.createFunction("set", function (vProp, vValue, vDuration, vEasing) {
    const vThisRef = vm.asObject(this);
    const prop = vm.asString(vProp);
    const value = vm.asNumber(vValue);
    const duration = vm.isNumber(vDuration) ? vm.asNumber(vDuration) : 0;
    const easing = vm.isString(vEasing) ? vm.asString(vEasing) : "linear";
    vThisRef.value.set(prop, value, duration, cax.easing[easing]);
    return this;
  });

  vm.setProperty(vToProto, "to", vToF);
  vm.setProperty(vToProto, "set", vSet);
  vm.setProperty(vTo, "get", vGet);

  const vEasing = vm.createObject();
  vm.setProperty(vEasing, "linear", vm.createString(cax.easing.linear));
  for (let item of EASING) {
    for (let suffix of ["In", "Out", "InOut"]) {
      const key = `${item.toLowerCase()}${suffix}`;
      vm.setProperty(vEasing, key, vm.createString(key));
    }
  }

  vm.setProperty(vTo, "easing", vEasing);
  vm.setProperty(vCax, "easing", vEasing);

  vm.setPrototype(vTo, vToProto);
  vm.setProperty(vCax, "To", vTo);
};
