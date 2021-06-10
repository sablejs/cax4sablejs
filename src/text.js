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

  const vMeasureText = vm.createFunction("Text.prototype.measureText", function () {
    let canvas = null;
    if (typeof wx !== "undefined" && typeof wx.createCanvas === "function") {
      canvas = wx.createCanvas();
    } else {
      canvas = document.createElement("canvas");
    }

    const context = canvas.getContext("2d");
    const vThisRef = vm.asObject(this);
    const text = vThisRef.value;
    context.font = text.font;
    context.textAlign = "left";
    context.textBaseline = "top";
    context.fillStyle = "#ff0000";

    const width = Math.floor(context.measureText("Mg").width);
    const height = Math.floor(width * 1.2);
    canvas.width = width;
    canvas.height = height;
    context.font = text.font;
    context.textAlign = "left";
    context.textBaseline = "top";
    context.fillStyle = "#ff0000";
    context.fillText("Mg", 0, 0);

    const { data } = context.getImageData(0, 0, width, height);
    let top = 0;
    let bottom = 0;
    top: for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        if (data[i * width * 4 + j * 4]) {
          top = i;
          break top;
        }
      }
    }

    bottom: for (let i = height; i >= 0; i--) {
      for (let j = 0; j < width; j++) {
        if (data[(i - 1) * 4 * width + j * 4]) {
          bottom = i;
          break bottom;
        }
      }
    }

    const vObject = vm.createObject();
    vm.setProperty(vObject, "width", vm.createNumber(context.measureText(text.text).width));
    vm.setProperty(vObject, "height", vm.createNumber(bottom - top));
    vm.setProperty(vObject, "top", vm.createNumber(top));
    vm.setProperty(vObject, "bottom", vm.createNumber(bottom));
    return vObject;
  });

  vm.setProperty(vTextProto, "getWidth", vGetWidth);
  vm.setProperty(vTextProto, "measureText", vMeasureText);
  vm.setPrototype(vText, vTextProto);
  vm.setProperty(vCax, "Text", vText);
};
