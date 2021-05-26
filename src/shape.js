const cax = require("cax");
const { SHAPES } = require("./common");

module.exports = (vm) => {
  const global = vm.getGlobal();
  const vCax = vm.getProperty(global, "cax");
  const vGraphics = vm.getProperty(vCax, "Graphics");
  const vGraphicsProto = vm.getPrototype(vGraphics);

  function boxedValueToPlainValue(vValue, property) {
    if (property === Number) {
      return vm.isUndefined(vValue) ? undefined : vm.asNumber(vValue);
    } else if (property === String) {
      return vm.isUndefined(vValue) ? undefined : vm.asString(vValue);
    } else if (property.length) {
      const vLength = vm.getProperty(vValue, "length");
      const length = vm.asNumber(vLength);
      const array = [];
      for (let i = 0; i < length; i++) {
        const vProp = vm.getProperty(vValue, i);
        array[i] = boxedValueToPlainValue(vProp, property[0]);
      }
      return array;
    } else {
      const object = {};
      for (let key in property) {
        const vProp = vm.getProperty(vValue, key);
        object[key] = boxedValueToPlainValue(vProp, property[key]);
      }
      return object;
    }
  }

  for (let key in SHAPES) {
    const vShape = vm.createFunction(key, function () {
      const vThisRef = vm.asObject(this);
      const temp = [];
      for (let i = 0, length = arguments.length; i < length; i++) {
        const match = SHAPES[key].props[i];
        temp.push(boxedValueToPlainValue(arguments[i], SHAPES[key][match]));
      }
      vThisRef.value = new cax[key](...temp);
      return vm.call(vGraphics, this);
    });

    const vFunction = vm.createFunction("function", function () {});
    vm.setPrototype(vFunction, vGraphicsProto);

    vm.setPrototype(vShape, vm.new(vFunction));
    vm.setProperty(vCax, key, vShape);
  }
};
