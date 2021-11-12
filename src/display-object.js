const cax = require("../vendor/cax/dist/cax");
const { PROPERTIES } = require("./common");

module.exports = (vm) => {
  const global = vm.getGlobal();
  const vEventDispatcher = vm.getProperty(global, "__EventDispatcher__");
  const vEventDispatcherProto = vm.getPrototype(vEventDispatcher);
  function plainValueToBoxedValue(value) {
    if (value === undefined) {
      return vm.createUndefined();
    } else if (value === null) {
      return vm.createNull();
    } else if (typeof value === "boolean") {
      return vm.createBoolean(value);
    } else if (typeof value === "number") {
      return vm.createNumber(value);
    } else if (typeof value === "string") {
      return vm.createString(value);
    } else {
      return value;
    }
  }

  function boxedValueToPlainValue(value, vValue) {
    if (value === undefined) {
      return undefined;
    } else if (value === null) {
      return null;
    } else if (typeof value === "boolean") {
      return vm.asBoolean(vValue);
    } else if (typeof value === "number") {
      return vm.asNumber(vValue);
    } else if (typeof value === "string") {
      return vm.asString(vValue);
    } else {
      return vValue;
    }
  }

  const vDisplayObject = vm.createFunction("__DisplayObject__", function () {
    const vThisRef = vm.asObject(this);
    const vValueRef = vThisRef.value || { shadow: { ...PROPERTIES.shadow } };
    vm.call(vEventDispatcher, this);

    function defProperties(object, target, properties) {
      for (let key in properties) {
        const getter = vm.createFunction(`${key}.getter`, function () {
          return plainValueToBoxedValue(target[key] || properties[key]);
        });

        const setter = vm.createFunction(`${key}.setter`, function (vValue) {
          target[key] = boxedValueToPlainValue(properties[key], vValue);
          return vValue;
        });

        vm.defineProperty(object, key, { get: getter, set: setter });
      }
      return object;
    }

    // 除了shadow之外的属性，进行get/set映射：boxed type <-> cax
    const properties = { ...PROPERTIES };
    properties.shadow = null;
    delete properties.shadow;
    defProperties(this, vValueRef, properties);

    // 单独针对shadow的处理, object.shadow及object.shadow.color均要映射到对象中
    const { shadow } = PROPERTIES;
    let vShadow = defProperties(vm.createObject(), vValueRef.shadow, shadow);
    const vShadowGetter = vm.createFunction("shadow.getter", function () {
      return vShadow;
    });

    const vShadowSetter = vm.createFunction("shadow.setter", function (vValue) {
      const vThisRef = vm.asObject(this);
      if (!vm.isObject(vValue)) {
        vShadow = vValue;
        vThisRef.value.shadow = vValue.value;
        return vValue;
      }

      const target = {};
      for (let key in shadow) {
        const property = vm.getProperty(vValue, key);
        if (vm.isUndefined(property)) {
          target[key] = shadow[key];
        } else {
          target[key] = boxedValueToPlainValue(shadow[key], property);
        }
      }

      vShadow = defProperties(vValue, target, shadow);
      vThisRef.value.shadow = target;
      return vValue;
    });

    vm.defineProperty(this, "shadow", { get: vShadowGetter, set: vShadowSetter });

    // stage需要往父级查找
    const vStageGetter = vm.createFunction("stage.getter", function () {
      let vParent = this;
      while (true) {
        const parent = vm.getProperty(vParent, "parent");
        if (!vm.isObject(parent)) {
          break;
        }
        vParent = parent;
      }

      if (vm.isObject(vParent)) {
        const vParentRef = vm.asObject(vParent);
        if (vParentRef.value instanceof cax.Stage) {
          return vParent;
        }
      }
    });

    vm.defineProperty(this, "stage", { get: vStageGetter });

    // compositeOperation需要从底往上查找
    const vCompositeOperationGetter = vm.createFunction("compositeOperation.getter", function () {
      let target = this;
      let compositeOperation;
      do {
        if (!vm.isObject(target)) {
          break;
        }

        const vRef = vm.asObject(target);
        compositeOperation = vRef.value.compositeOperation;
        target = vm.getProperty(target, "parent");
      } while (!compositeOperation);

      if (compositeOperation) {
        return vm.createString(compositeOperation);
      } else {
        return vm.createUndefined();
      }
    });

    const vCompositeOperationSetter = vm.createFunction("compositeOperation.setter", function (vValue) {
      const vThisRef = vm.asObject(this);
      vThisRef.value.compositeOperation = vm.asString(vValue);
      return vValue;
    });

    vm.defineProperty(this, "compositeOperation", { get: vCompositeOperationGetter, set: vCompositeOperationSetter });

    // hitbox用于标明对应的事件响应范围
    const vHitboxGetter = vm.createFunction("hitbox.getter", function () {
      const vThisRef = vm.asObject(this);
      const { hitbox } = vThisRef.value;
      const vHitbox = vm.createArray();
      for (let i = 0, length = hitbox.length; i < length; i++) {
        vm.setProperty(vHitbox, i, vm.createNumber(hitbox[i]));
      }
      return vHitbox;
    });

    const vHitboxSetter = vm.createFunction("hitbox.setter", function (vValue) {
      const vThisRef = vm.asObject(this);
      const vLength = vm.getProperty(vValue, "length");
      const length = vm.asNumber(vLength);
      const hitbox = [];
      for (let i = 0; i < length; i++) {
        const item = vm.getProperty(vValue, i);
        hitbox.push(vm.asNumber(item));
      }
      vThisRef.value.hitbox = hitbox;
      return vValue;
    });

    vm.defineProperty(this, "hitbox", { get: vHitboxGetter, set: vHitboxSetter });

    // ignoreHit用于禁止点击触发事件
    const vIgnoreHitGetter = vm.createFunction("ignoreHit.getter", function () {
      const vThisRef = vm.asObject(this);
      return vm.createBoolean(vThisRef.value.ignoreHit);
    });

    const vIgnoreHitSetter = vm.createFunction("ignoreHit.setter", function (vIgnoreHit) {
      const vThisRef = vm.asObject(this);
      vThisRef.value.ignoreHit = vm.asBoolean(vIgnoreHit);
      return vIgnoreHit;
    });

    vm.defineProperty(this, "ignoreHit", { get: vIgnoreHitGetter, set: vIgnoreHitSetter });
  });

  const vFunction = vm.createFunction("function", function () {});
  vm.setPrototype(vFunction, vEventDispatcherProto);

  const vDisplayObjectProto = vm.new(vFunction);

  const vClip = vm.createFunction("DisplayObject.prototype.clip", function (vGraphics, vNotClipRuleNonzero) {
    const vThisRef = vm.asObject(this);
    const vGraphicsRef = vm.isObject(vGraphics) ? vm.asObject(vGraphics) : vm.createUndefined();
    const notClipRuleNonzero = vm.asBoolean(vNotClipRuleNonzero);
    vThisRef.value.clip(vGraphicsRef.value, notClipRuleNonzero);
  });

  const vUnclip = vm.createFunction("DisplayObject.prototype.unclip", function () {
    const vThisRef = vm.asObject(this);
    vThisRef.value.unclip();
  });

  const vAbsClip = vm.createFunction("DisplayObject.prototype.absClip", function (vGraphics, vNotClipRuleNonzero) {
    const vThisRef = vm.asObject(this);
    const vGraphicsRef = vm.isObject(vGraphics) ? vm.asObject(vGraphics) : vm.createUndefined();
    const notClipRuleNonzero = vm.asBoolean(vNotClipRuleNonzero);
    vThisRef.value.absClip(vGraphicsRef.value, notClipRuleNonzero);
  });

  const vUnAbsClip = vm.createFunction("DisplayObject.prototype.unAbsClip", function () {
    const vThisRef = vm.asObject(this);
    vThisRef.value.unAbsClip();
  });

  const vCache = vm.createFunction(
    "DisplayObject.prototype.cache",
    function (x, y, width, height, scale, cacheUpdating) {
      const vThisRef = vm.asObject(this);
      x = !vm.isNumber(x) ? 0 : vm.asNumber(x);
      y = !vm.isNumber(y) ? 0 : vm.asNumber(y);
      width = !vm.isNumber(width) ? 0 : vm.asNumber(width);
      height = !vm.isNumber(height) ? 0 : vm.asNumber(height);
      scale = !vm.isNumber(scale) ? 0 : vm.asNumber(scale);
      cacheUpdating = !vm.isBoolean(cacheUpdating) ? false : vm.asBoolean(cacheUpdating);

      vm.setProperty(this, "cacheUpdating", vm.createBoolean(cacheUpdating));
      vThisRef.value.cache(x, y, width, height, scale, cacheUpdating);
      return vm.createUndefined();
    }
  );

  const vUncache = vm.createFunction("DisplayObject.prototype.uncache", function () {
    const vThisRef = vm.asObject(this);
    vThisRef.value.uncache();
    return vm.createUndefined();
  });

  const vFilter = vm.createFunction("DisplayObject.prototype.filter", function (filterName) {
    const vThisRef = vm.asObject(this);
    vThisRef.value.filter(vm.asString(filterName));
    return vm.createUndefined();
  });

  const vUnfilter = vm.createFunction("DisplayObject.prototype.unfilter", function () {
    const vThisRef = vm.asObject(this);
    vThisRef.value.unfilter();
    return vm.createUndefined();
  });

  const vSetTransform = vm.createFunction("DisplayObject.prototype.setTransform", function () {
    const vThisRef = vm.asObject(this);
    const temp = [];
    for (let i = 0, length = arguments.length; i < length; i++) {
      temp.push(vm.asNumber(arguments[i]));
    }
    vThisRef.value.setTransform(...temp);
  });

  const vSetMatrix = vm.createFunction("DisplayObject.prototype.setMatrix", function () {
    const vThisRef = vm.asObject(this);
    const temp = [];
    for (let i = 0, length = arguments.length; i < length; i++) {
      temp.push(vm.asNumber(arguments[i]));
    }
    vThisRef.value.setMatrix(...temp);
  });

  const vDestroy = vm.createFunction("DisplayObject.prototype.destroy", function () {
    const vThisRef = vm.asObject(this);
    vThisRef.value.destroy();

    const vParent = vm.getProperty(this, "parent");
    const vRemove = vm.getProperty(vParent, "remove");
    vm.call(vRemove, vParent, this);
  });

  vm.setProperty(vDisplayObjectProto, "clip", vClip);
  vm.setProperty(vDisplayObjectProto, "unclip", vUnclip);
  vm.setProperty(vDisplayObjectProto, "absClip", vAbsClip);
  vm.setProperty(vDisplayObjectProto, "unAbsClip", vUnAbsClip);
  vm.setProperty(vDisplayObjectProto, "cache", vCache);
  vm.setProperty(vDisplayObjectProto, "uncache", vUncache);
  vm.setProperty(vDisplayObjectProto, "filter", vFilter);
  vm.setProperty(vDisplayObjectProto, "unfilter", vUnfilter);
  vm.setProperty(vDisplayObjectProto, "setTransform", vSetTransform);
  vm.setProperty(vDisplayObjectProto, "setMatrix", vSetMatrix);
  vm.setProperty(vDisplayObjectProto, "destroy", vDestroy);
  vm.setPrototype(vDisplayObject, vDisplayObjectProto);
  vm.setProperty(global, "__DisplayObject__", vDisplayObject);
};
