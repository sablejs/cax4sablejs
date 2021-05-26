const cax = require("cax");

module.exports = (vm) => {
  const global = vm.getGlobal();
  const vCax = vm.getProperty(global, "cax");
  const vDisplayObject = vm.getProperty(global, "__DisplayObject__");
  const vDisplayObjectProto = vm.getPrototype(vDisplayObject);
  const vText = vm.createFunction("Text", function (vText, vOption) {
    const vThisRef = vm.asObject(this);
    const text = vm.asString(vText);
    const option = {};

    if (vm.isObject(vOption)) {
      for (let key of ["font", "color", "textAlign", "baseline"]) {
        const vValue = vm.getProperty(vOption, key);
        vm.setProperty(this, key, vValue);
        option[key] = vm.asString(vValue);
      }
    }

    vThisRef.value = new cax.Text(text, option);
    return vm.call(vDisplayObject, this);
  });

  const vFunction = vm.createFunction("function", function () {});
  vm.setPrototype(vFunction, vDisplayObjectProto);

  const vTextProto = vm.new(vFunction);
  const vGetWidth = vm.createFunction("Text.prototype.getWidth", function () {
    const vThisRef = vm.asObject(this);
    const width = vThisRef.value.getWidth();
    return vm.createNumber(width);
  });

  vm.setProperty(vTextProto, "getWidth", vGetWidth);
  vm.setPrototype(vText, vTextProto);
  vm.setProperty(vCax, "Text", vText);
};
