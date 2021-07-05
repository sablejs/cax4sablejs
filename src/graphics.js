const cax = require("../vendor/cax/dist/cax");

module.exports = (vm) => {
  const global = vm.getGlobal();
  const vCax = vm.getProperty(global, "cax");
  const vDisplayObject = vm.getProperty(global, "__DisplayObject__");
  const vDisplayObjectProto = vm.getPrototype(vDisplayObject);
  const vGraphics = vm.createFunction("Graphics", function () {
    const vThisRef = vm.asObject(this);
    if (!vThisRef.value) {
      vThisRef.value = new cax.Graphics();
    }
    return vm.call(vDisplayObject, this);
  });

  const vFunction = vm.createFunction("function", function () {});
  vm.setPrototype(vFunction, vDisplayObjectProto);

  const vGraphicsProto = vm.new(vFunction);
  const keyMethods = [
    "clearRect",
    "clear",
    "rect",
    "strokeRect",
    "fillRect",
    "beginPath",
    "arc",
    "closePath",
    "stroke",
    "moveTo",
    "lineTo",
    "bezierCurveTo",
    "quadraticCurveTo",
    "createRadialGradient",
    "createLinearGradient",
    "fillGradient",
    "arcTo",
    "fill",
    "addColorStop",
    "fillStyle",
    "strokeStyle",
    "lineWidth",
    "lineCap",
    "lineDashOffset",
    "lineJoin",
    "miterLimit",
  ];

  for (let item of keyMethods) {
    const vValue = vm.createFunction(`Graphics.prototype.${item}`, function () {
      const vThisRef = vm.asObject(this);
      const temp = [];
      for (let i = 0, length = arguments.length; i < length; i++) {
        const item = arguments[i];
        if (vm.isString(item)) {
          temp.push(vm.asString(item));
        } else if (vm.isNumber(item)) {
          temp.push(vm.asNumber(item));
        } else if (vm.isBoolean(item)) {
          temp.push(vm.asBoolean(item));
        } else {
          temp.push(undefined);
        }
      }

      vThisRef.value[item](...temp);
      return this;
    });

    vm.setProperty(vGraphicsProto, item, vValue);
  }

  const vSetLineDash = vm.createFunction("Graphics.prototype.setLineDash", function (vSegments) {
    const vThisRef = vm.asObject(this);
    if (vm.isArray(vSegments)) {
      const segments = [];
      const vLength = vm.getProperty(vSegments, "length");
      const length = vm.asNumber(vLength);
      for (let i = 0; i < length; i++) {
        const vValue = vm.getProperty(vSegments, i);
        segments.push(vm.asNumber(vValue));
      }
      vThisRef.value.setLineDash(segments);
    }
    return this;
  });

  vm.setProperty(vGraphicsProto, "setLineDash", vSetLineDash);
  vm.setPrototype(vGraphics, vGraphicsProto);
  vm.setProperty(vCax, "Graphics", vGraphics);
};
