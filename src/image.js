module.exports = (vm) => {
  if (window && window.Image) {
    const Image = window.Image;
    window.Image = function () {
      if (this instanceof window.Image) {
        const image = new Image();
        if (vm.crossOrigin) {
          image.crossOrigin = vm.crossOrigin;
        }
        return image;
      } else {
        throw new Error("should use new to create Image");
      }
    };
  }

  const global = vm.getGlobal();
  const vImage = vm.createFunction("Image", function (image) {
    const vThisRef = vm.asObject(this);
    const vImageRef = vm.asObject(image);
    vm.setProperty(this, "width", vm.createNumber(vImageRef.value.width));
    vm.setProperty(this, "height", vm.createNumber(vImageRef.value.height));
    vm.setProperty(this, "src", vm.createString(vImageRef.value.src));
    vThisRef.value = vImageRef.value;
  });

  vm.setProperty(global, "Image", vImage);
};
