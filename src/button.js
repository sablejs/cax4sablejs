const cax = require("cax");

module.exports = (vm) => {
  const global = vm.getGlobal();
  const vCax = vm.getProperty(global, "cax");
  const vGroup = vm.getProperty(vCax, "Group");
  const vGroupProto = vm.getPrototype(vGroup);
  const vButton = vm.createFunction("Button", function (vOption) {
    const vThisRef = vm.asObject(this);
    vm.call(vGroup, this);

    const vX = vm.getProperty(vOption, "x");
    const vY = vm.getProperty(vOption, "y");
    const vWidth = vm.getProperty(vOption, "width");
    const vHeight = vm.getProperty(vOption, "height");
    const vFont = vm.getProperty(vOption, "font");
    const vText = vm.getProperty(vOption, "text");
    const vTextX = vm.getProperty(vOption, "textX");
    const vTextY = vm.getProperty(vOption, "textY");
    const vColor = vm.getProperty(vOption, "color");
    const vImage = vm.getProperty(vOption, "image");
    const vBgColor = vm.getProperty(vOption, "bgColor");
    const vBgImage = vm.getProperty(vOption, "bgImage");
    const vBorderRadius = vm.getProperty(vOption, "borderRadius");
    const vBorderColor = vm.getProperty(vOption, "borderColor");
    const option = {};

    const keyNums = [
      ["x", vX],
      ["y", vY],
      ["width", vWidth],
      ["height", vHeight],
      ["textX", vTextX],
      ["textY", vTextY],
      ["borderRadius", vBorderRadius],
    ];

    for (let item of keyNums) {
      if (vm.isNumber(item[1])) {
        option[item[0]] = vm.asNumber(item[1]);
      }
    }

    const keyStrs = [
      ["font", vFont],
      ["text", vText],
      ["color", vColor],
      ["bgColor", vBgColor],
      ["borderColor", vBorderColor],
    ];

    for (let item of keyStrs) {
      if (vm.isString(item[1])) {
        option[item[0]] = vm.asString(item[1]);
      }
    }

    const keyArrs = [
      ["image", vImage],
      ["bgImage", vBgImage],
    ];

    for (let item of keyArrs) {
      if (vm.isArray(item[1])) {
        const vLength = vm.getProperty(item[1], "length");
        const length = vm.asNumber(vLength);
        const image = [];
        for (let i = 0; i < length; i++) {
          const vValue = vm.getProperty(item[1], i);
          if (i > 0) {
            image.push(vm.asNumber(vValue));
          } else {
            image.push(vm.asString(vValue));
          }
        }
        option[item[0]] = image;
      }
    }

    vThisRef.value = new cax.Button(option);
  });

  const vFunction = vm.createFunction("function", function () {});
  vm.setPrototype(vFunction, vGroupProto);

  const vButtonProto = vm.new(vFunction);
  vm.setPrototype(vButton, vButtonProto);
  vm.setProperty(vCax, "Button", vButton);
};
