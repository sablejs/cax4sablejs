const cax = require("../vendor/cax/dist/cax");
const { PROPERTIES } = require("./common");

module.exports = (vm) => {
  const global = vm.getGlobal();
  const vCax = vm.getProperty(global, "cax");
  const vDisplayObject = vm.getProperty(global, "__DisplayObject__");
  const vDisplayObjectProto = vm.getPrototype(vDisplayObject);

  const vBitmap = vm.createFunction("Bitmap", function (img, onLoad) {
    const vThisRef = vm.asObject(this);
    if (!vm.isString(img)) {
      img = vm.asObject(img);
      img = img.value;
    } else {
      img = vm.asString(img);
    }

    vThisRef.value = new cax.Bitmap(img, function () {
      if (vm.isFunction(onLoad)) {
        vm.call(onLoad);
      }
    });

    for (let key of ["width", "height"]) {
      const getter = vm.createFunction(`${key}.getter`, function () {
        return vm.createNumber(vThisRef.value[key]);
      });

      const setter = vm.createFunction(`${key}.setter`, function (vValue) {
        vThisRef.value[key] = vm.asNumber(vValue);
        return vValue;
      });

      vm.defineProperty(this, key, { get: getter, set: setter });
    }

    const rectGetter = vm.createFunction("rect.getter", function () {
      const { rect } = vThisRef.value;
      const vRect = vm.createArray();
      for (let i = 0; i < rect.length; i++) {
        vm.setProperty(vRect, i, vm.createNumber(rect[i]));
      }
      return vRect;
    });

    const rectSetter = vm.createFunction("rect.setter", function (vRect) {
      const vLength = vm.getProperty(vRect, "length");
      const length = vm.asNumber(vLength);
      for (let i = 0; i < length; i++) {
        const vValue = vm.getProperty(vRect, i);
        vThisRef.value.rect[i] = vm.asNumber(vValue);
      }
      return vRect;
    });

    const imgGetter = vm.createFunction("img.getter", function () {
      const vObject = vm.createObject();
      const vObjectRef = vm.asObject(vObject);
      vObjectRef.value = vThisRef.value.img;
      return vm.new(vImage, vObject);
    });

    vm.defineProperty(this, "rect", { get: rectGetter, set: rectSetter });
    vm.defineProperty(this, "img", { get: imgGetter });

    vThisRef.value.shadow = { ...PROPERTIES.shadow };
    return vm.call(vDisplayObject, this);
  });

  const vFunction = vm.createFunction("function", function () {});
  vm.setPrototype(vFunction, vDisplayObjectProto);

  const vBitmapProto = vm.new(vFunction);
  const vClone = vm.createFunction("Bitmap.prototype.clone", function () {
    const vThisRef = vm.asObject(this);
    const { img } = vThisRef.value;
    const vSrc = vm.createString(typeof img === "string" ? img : img.src);
    const vCloneBitmap = vm.new(vBitmap, vSrc);
    const cloneKeyProp = [
      "x",
      "y",
      "scaleX",
      "scaleY",
      "rotation",
      "skewX",
      "skewY",
      "originX",
      "originY",
      "width",
      "height",
      "cursor",
    ];

    for (let key of cloneKeyProp) {
      const vValue = vm.getProperty(this, key);
      vm.setProperty(vCloneBitmap, key, vValue);
    }

    return vCloneBitmap;
  });

  vm.setProperty(vBitmapProto, "clone", vClone);
  vm.setPrototype(vBitmap, vBitmapProto);
  vm.setProperty(vCax, "Bitmap", vBitmap);
};
