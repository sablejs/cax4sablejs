const cax = require("../vendor/cax/src/index.js");

module.exports = (vm) => {
  const global = vm.getGlobal();
  const vCax = vm.getProperty(global, "cax");
  const vDisplayObject = vm.getProperty(global, "__DisplayObject__");
  const vDisplayObjectProto = vm.getPrototype(vDisplayObject);
  const vImage = vm.getProperty(global, "Image");

  const vSprite = vm.createFunction("Sprite", function (vOption) {
    const vThisRef = vm.asObject(this);
    const vFramerate = vm.getProperty(vOption, "framerate");
    const vImgs = vm.getProperty(vOption, "imgs");
    const vFrames = vm.getProperty(vOption, "frames");
    const vAnimations = vm.getProperty(vOption, "animations");
    const vPlayOnce = vm.getProperty(vOption, "playOnce");
    const vCurrentAnimation = vm.getProperty(vOption, "currentAnimation");
    const vAnimationEnd = vm.getProperty(vOption, "animationEnd");
    const option = {};

    if (vm.isNumber(vFramerate)) {
      option.framerate = vm.asNumber(vFramerate);
    }

    if (vm.isArray(vImgs)) {
      option.imgs = [];
      const vLength = vm.getProperty(vImgs, "length");
      const length = vm.asNumber(vLength);
      for (let i = 0; i < length; i++) {
        const vImg = vm.getProperty(vImgs, i);
        option.imgs.push(vm.asString(vImg));
      }
    }

    if (vm.isArray(vFrames)) {
      option.frames = [];
      const vFramesLength = vm.getProperty(vFrames, "length");
      const framesLength = vm.asNumber(vFramesLength);
      for (let i = 0; i < framesLength; i++) {
        const vFrame = vm.getProperty(vFrames, i);
        const vLength = vm.getProperty(vFrame, "length");
        const length = vm.asNumber(vLength);
        const frame = [];
        for (let j = 0; j < length; j++) {
          const vItem = vm.getProperty(vFrame, j);
          frame.push(vm.asNumber(vItem));
        }
        option.frames.push(frame);
      }
    }

    if (vm.isObject(vAnimations)) {
      option.animations = {};
      const vObject = vm.getProperty(global, "Object");
      const vKeysFunc = vm.getProperty(vObject, "keys");
      const vKeys = vm.call(vKeysFunc, vm.createUndefined(), vAnimations);
      const vKeysLength = vm.getProperty(vKeys, "length");
      const keysLength = vm.asNumber(vKeysLength);
      for (let i = 0; i < keysLength; i++) {
        const vKey = vm.getProperty(vKeys, i);
        const key = vm.asString(vKey);
        const vAnimation = vm.getProperty(vAnimations, key);
        const vFrames = vm.getProperty(vAnimation, "frames");
        const vFramesLength = vm.getProperty(vFrames, "length");
        const framesLength = vm.asNumber(vFramesLength);
        const frames = [];
        option.animations[key] = { frames };
        for (let j = 0; j < framesLength; j++) {
          const vFrame = vm.getProperty(vFrames, j);
          frames.push(vm.asNumber(vFrame));
        }
      }
    }

    if (vm.isBoolean(vPlayOnce)) {
      option.playOnce = vm.asBoolean(vPlayOnce);
    }

    if (vm.isString(vCurrentAnimation)) {
      option.currentAnimation = vm.asString(vCurrentAnimation);
    }

    if (vm.isFunction(vAnimationEnd)) {
      option.animationEnd = function () {
        vm.call(vAnimationEnd);
      };
    }

    for (let key of ["currentFrameIndex", "animationFrameIndex", "interval", "paused"]) {
      const getter = vm.createFunction(`${key}.getter`, function () {
        return vm.createNumber(vThisRef.value[key]);
      });

      const setter = vm.createFunction(`${key}.setter`, function (vValue) {
        vThisRef.value[key] = vm.asNumber(vValue);
        return vValue;
      });

      vm.defineProperty(this, key, { get: getter, set: setter });
    }

    const imgGetter = vm.createFunction("img.getter", function () {
      const vObject = vm.createObject();
      const vObjectRef = vm.asObject(vObject);
      vObjectRef.value = vThisRef.value.img;
      return vm.new(vImage, vObject);
    });

    vm.defineProperty(this, "img", { get: imgGetter });

    vThisRef.value = new cax.Sprite(option);
    return vm.call(vDisplayObject, this);
  });

  const vFunction = vm.createFunction("function", function () {});
  vm.setPrototype(vFunction, vDisplayObjectProto);

  const vSpriteProto = vm.new(vFunction);
  const vGotoAndPlay = vm.createFunction("Sprite.prototype.gotoAndPlay", function (vAnimationName) {
    const vThisRef = vm.asObject(this);
    vThisRef.value.gotoAndPlay(vm.asString(vAnimationName));
  });

  const vGotoAndStop = vm.createFunction("Sprite.prototype.gotoAndStop", function (vAnimationName) {
    const vThisRef = vm.asObject(this);
    vThisRef.value.gotoAndStop(vm.asString(vAnimationName));
  });

  const vGotoAndPlayOnce = vm.createFunction("Sprite.prototype.gotoAndPlayOnce", function (vAnimationName) {
    const vThisRef = vm.asObject(this);
    vThisRef.value.gotoAndPlayOnce(vm.asString(vAnimationName));
  });

  vm.setProperty(vSpriteProto, "gotoAndPlay", vGotoAndPlay);
  vm.setProperty(vSpriteProto, "gotoAndStop", vGotoAndStop);
  vm.setProperty(vSpriteProto, "gotoAndPlayOnce", vGotoAndPlayOnce);
  vm.setPrototype(vSprite, vSpriteProto);
  vm.setProperty(vCax, "Sprite", vSprite);
};
