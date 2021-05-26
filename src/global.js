const cax = require("cax");

module.exports = (vm) => {
  const global = vm.getGlobal();
  const vImage = vm.getProperty(global, "Image");
  const vCax = vm.createObject();
  const vCaxRef = vm.asObject(vCax);
  vCaxRef.value = cax;

  const vSetInterval = vm.createFunction("cax.setInterval", function (fn, interval) {
    interval = vm.asNumber(interval);
    const id = cax.setInterval(function () {
      if (vm.isFunction(fn)) {
        vm.call(fn);
      }
    }, interval);
    return vm.createNumber(id);
  });

  const vClearInterval = vm.createFunction("cax.clearInterval", function (id) {
    cax.clearInterval(vm.asNumber(id));
  });

  const vTick = vm.createFunction("cax.tick", function (fn) {
    const id = cax.tick(function () {
      if (vm.isFunction(fn)) {
        vm.call(fn);
      }
    });
    return vm.createNumber(id);
  });

  const vUntick = vm.createFunction("cax.untick", function (id) {
    cax.untick(vm.asNumber(id));
  });

  const vLoadImg = vm.createFunction("cax.loadImg", function (option) {
    const vImg = vm.getProperty(option, "img");
    const vComplete = vm.getProperty(option, "complete");
    if (vm.isUndefined(vImg)) {
      return;
    }

    cax.loadImg({
      img: vm.asString(vImg),
      complete(image) {
        if (vm.isFunction(vComplete)) {
          const vObject = vm.createObject();
          const vObjectRef = vm.asObject(vObject);
          vObjectRef.value = image;
          vm.call(vComplete, vm.createUndefined(), vm.new(vImage, vObject));
        }
      },
    });
  });

  const vLoadImgs = vm.createFunction("cax.loadImgs", function (option) {
    const vImgs = vm.getProperty(option, "imgs");
    const vComplete = vm.getProperty(option, "complete");
    const vProgress = vm.getProperty(option, "progress");
    if (!vm.isArray(vImgs)) {
      return;
    }

    const imgs = [];
    const vLength = vm.getProperty(vImgs, "length");
    const length = vm.asNumber(vLength);
    for (let i = 0; i < length; i++) {
      imgs.push(vm.asString(vm.getProperty(vImgs, i)));
    }

    cax.loadImgs({
      imgs,
      progress(percent, loaded, index, img, imgs) {
        if (vm.isFunction(vProgress)) {
          const vPercent = vm.createNumber(percent);
          const vLoaded = vm.createNumber(loaded);
          const vIndex = vm.createNumber(index);
          let vObject = vm.createObject();
          let vObjectRef = vm.asObject(vObject);
          vObjectRef.value = img;

          const vImg = vm.new(vImage, vObject);
          const vImages = vm.createArray(imgs.length);
          for (let i = 0, length = imgs.length; i < length; i++) {
            if (!imgs[i]) {
              continue;
            }
            
            vObject = vm.createObject();
            vObjectRef = vm.asObject(vObject);
            vObjectRef.value = imgs[i];
            vm.setProperty(vImages, i, vm.new(vImage, vObject));
          }
          vm.call(vProgress, vm.createUndefined(), vPercent, vLoaded, vIndex, vImg, vImages);
        }
      },
      complete(imgs) {
        if (vm.isFunction(vComplete)) {
          const vImages = vm.createArray(imgs.length);
          for (let i = 0, length = imgs.length; i < length; i++) {
            const vObject = vm.createObject();
            const vObjectRef = vm.asObject(vObject);
            vObjectRef.value = imgs[i];
            vm.setProperty(vImages, i, vm.new(vImage, vObject));
          }
          vm.call(vComplete, vm.createUndefined(), vImages);
        }
      },
    });
  });

  vm.setProperty(vCax, "setInterval", vSetInterval);
  vm.setProperty(vCax, "clearInterval", vClearInterval);
  vm.setProperty(vCax, "tick", vTick);
  vm.setProperty(vCax, "untick", vUntick);
  vm.setProperty(vCax, "loadImg", vLoadImg);
  vm.setProperty(vCax, "loadImgs", vLoadImgs);
  vm.setProperty(global, "cax", vCax);
};
