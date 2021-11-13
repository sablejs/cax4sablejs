const cax = require("../vendor/cax/src/index.js");

module.exports = (vm) => {
  const global = vm.getGlobal();
  const vCax = vm.getProperty(global, "cax");
  const vGroup = vm.getProperty(vCax, "Group");
  const vGroupProto = vm.getPrototype(vGroup);
  const vStage = vm.createFunction("Stage", function () {
    const vThisRef = vm.asObject(this);
    for (let key of ["width", "height", "disableMoveDetection", "moveDetectionInterval"]) {
      const getter = vm.createFunction(`getter.${key}`, function () {
        return vm.createNumber(vThisRef.value[key]);
      });

      const setter = vm.createFunction(`setter.${key}`, function (vValue) {
        vThisRef.value[key] = vm.asNumber(vValue);
        return vValue;
      });

      vm.defineProperty(this, key, { get: getter, set: setter });
    }

    const length = arguments.length;
    let vWidth = arguments[0];
    let vHeight = arguments[1];
    let vRenderTo = arguments[2];
    let width, height, renderTo, weapp;
    if (length === 0) {
      vThisRef.value = new cax.Stage();
    } else if (length === 4) {
      width = vm.asNumber(vWidth);
      height = vm.asNumber(vHeight);
      renderTo = vm.isObject(vRenderTo) ? vm.asObject(vRenderTo) : vRenderTo;
      weapp = vm.asObject(arguments[3]).value;
      vThisRef.value = new cax.Stage(width, height, renderTo.value, weapp);
    } else {
      if (length === 1) {
        width = vm.isObject(vWidth) ? vm.asObject(vWidth) : vWidth;
        vThisRef.value = new cax.Stage(width.value);
      } else {
        width = vm.asNumber(vWidth);
        height = vm.asNumber(vHeight);
        renderTo = vm.isObject(vRenderTo) ? vm.asObject(vRenderTo) : vRenderTo;
        vThisRef.value = new cax.Stage(width, height, renderTo.value);
      }
    }

    return vm.call(vGroup, this);
  });

  const vFunction = vm.createFunction("function", function () {});
  vm.setPrototype(vFunction, vGroupProto);

  const vStageProto = vm.new(vFunction);
  const vUpdate = vm.createFunction("update", function () {
    const vThisRef = vm.asObject(this);
    vThisRef.value.update();
  });

  const vScaleEventPoint = vm.createFunction("scaleEventPoint", function (vX, vY) {
    const vThisRef = vm.asObject(this);
    vThisRef.value.scaleEventPoint(vm.asNumber(vX), vm.asNumber(vY));
  });

  const vOn = vm.createFunction("on", function (vType, vFn) {
    const vThisRef = vm.asObject(this);
    const type = vm.asString(vType);
    const fn = function (event) {
      if (vm.isFunction(vFn)) {
        const vEvent = vm.getProperty(global, "__Event__");
        const vValue = vm.createObject();
        vValue.value.value = event;

        const vIEvent = vm.new(vEvent, vValue);
        vm.setProperty(vIEvent, "target", fn.__target__);
        vm.call(vFn, this, vIEvent);
      }
    };

    vFn.value.__ref__ = fn;
    fn.__target__ = { ...this };
    vThisRef.value.on(type, fn);
  });

  const vOff = vm.createFunction("off", function (vType, vFn) {
    const vThisRef = vm.asObject(this);
    const type = vm.asString(vType);
    const fn = vFn.value.__ref__;
    vThisRef.value.off(type, fn);
  });

  vm.setProperty(vStageProto, "update", vUpdate);
  vm.setProperty(vStageProto, "scaleEventPoint", vScaleEventPoint);
  vm.setProperty(vStageProto, "on", vOn);
  vm.setProperty(vStageProto, "off", vOff);
  vm.setPrototype(vStage, vStageProto);
  vm.setProperty(vCax, "Stage", vStage);
};
