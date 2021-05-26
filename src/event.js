const { noop } = require("./common");

module.exports = (vm) => {
  const global = vm.getGlobal();
  const vEvent = vm.createFunction("__Event__", function (vValue) {
    const vValueRef = vm.asObject(vValue);
    const event = vValueRef.value;
    event.stopPropagation = event.stopPropagation || noop;
    event.preventDefault = event.preventDefault || noop;

    for (let key in event) {
      const value = event[key];
      if (typeof value === "string") {
        vm.setProperty(this, key, vm.createString(value));
      } else if (typeof value === "number") {
        vm.setProperty(this, key, vm.createNumber(value));
      } else if (typeof value === "boolean") {
        vm.setProperty(this, key, vm.createBoolean(value));
      } else if (typeof value === "function" && !value.length) {
        vm.setProperty(this, key, vm.createFunction(key, event[key].bind(event)));
      } else {
        vm.setProperty(this, key, vm.createUndefined());
      }
    }
  });

  vm.setProperty(global, "__Event__", vEvent);
};
