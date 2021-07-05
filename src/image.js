module.exports = (vm) => {
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
