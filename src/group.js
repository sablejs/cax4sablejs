const cax = require("../vendor/cax/dist/cax");
const { PROPERTIES } = require("./common");

module.exports = (vm) => {
  const global = vm.getGlobal();
  const vCax = vm.getProperty(global, "cax");
  const vDisplayObject = vm.getProperty(global, "__DisplayObject__");
  const vDisplayObjectProto = vm.getPrototype(vDisplayObject);

  const vGroup = vm.createFunction("Group", function () {
    const vThisRef = vm.asObject(this);
    const vDisplayObject = vm.getProperty(global, "__DisplayObject__");
    if (!vThisRef.value) {
      vThisRef.value = new cax.Group();
    }

    vm.setProperty(this, "children", vm.createArray());
    vThisRef.value.shadow = { ...PROPERTIES.shadow };
    return vm.call(vDisplayObject, this);
  });

  const vFunction = vm.createFunction("function", function () {});
  vm.setPrototype(vFunction, vDisplayObjectProto);

  const vGroupProto = vm.new(vFunction);
  const vAdd = vm.createFunction("Group.prototype.add", function () {
    const vThisRef = vm.asObject(this);
    const vChildren = vm.getProperty(this, "children");
    const vPush = vm.getProperty(vChildren, "push");
    for (let i = 0; i < arguments.length; i++) {
      const vChild = arguments[i];
      const vChildRef = vm.asObject(vChild);
      const vParent = vm.getProperty(vChild, "parent");
      if (vm.isObject(vParent)) {
        const vChildren = vm.getProperty(vParent, "children");
        const vIndexOf = vm.getProperty(vChildren, "indexOf");
        const vRemoveChildAt = vm.getProperty(vParent, "removeChildAt");
        const vIndex = vm.call(vIndexOf, vChildren, vChild);
        vm.call(vRemoveChildAt, vParent, vIndex);
      }

      vm.call(vPush, vChildren, vChild);
      vm.setProperty(vChild, "parent", this);
      vThisRef.value.add(vChildRef.value);
    }
  });

  const vAddChildAt = vm.createFunction("Group.prototype.addChildAt", function (vChild, vIndex) {
    const vThisRef = vm.asObject(this);
    const vChildRef = vm.asObject(vChild);
    const vParent = vm.getProperty(vChild, "parent");
    if (vm.isObject(vParent)) {
      const vChildren = vm.getProperty(vParent, "children");
      const vIndexOf = vm.getProperty(vChildren, "indexOf");
      const vRemoveChildAt = vm.getProperty(vParent, "removeChildAt");
      const vIndex = vm.call(vIndexOf, vChildren, vChild);
      vm.call(vRemoveChildAt, vParent, vIndex);
    }

    vm.setProperty(vChild, "parent", this);
    const vChildren = vm.getProperty(this, "children");
    const vSplice = vm.getProperty(vChildren, "splice");
    vm.call(vSplice, vChildren, vIndex, vm.createNumber(0), vChild);
    vThisRef.value.addChildAt(vChildRef.value, vm.asNumber(vIndex));
  });

  const vRemoveChildAt = vm.createFunction("Group.prototype.removeChildAt", function (vIndex) {
    const vThisRef = vm.asObject(this);
    const vChildren = vm.getProperty(this, "children");
    const vChild = vm.getProperty(vChildren, vIndex);
    if (vm.isObject(vChild)) {
      vm.setProperty(vChild, "parent", vm.createNull());
    }

    const vSplice = vm.getProperty(vChildren, "splice");
    vm.call(vSplice, vChildren, vIndex, vm.createNumber(1));
    vThisRef.value.removeChildAt(vm.asNumber(vIndex));
  });

  const vReplace = vm.createFunction("Group.prototype.replace", function (vCurrent, vPre) {
    const vParent = vm.getProperty(vPre, "parent");
    const vChildren = vm.getProperty(vParent, "children");
    const vIndexOf = vm.getProperty(vChildren, "indexOf");
    const vIndex = vm.call(vIndexOf, vChildren, vPre);
    const vRemoveChildAt = vm.getProperty(this, "removeChildAt");
    const vAddChildAt = vm.getProperty(this, "addChildAt");
    vm.call(vRemoveChildAt, this, vIndex);
    vm.call(vAddChildAt, this, vCurrent, vIndex);
  });

  const vRemove = vm.createFunction("Group.prototype.remove", function () {
    const vThisRef = vm.asObject(this);
    const vChildren = vm.getProperty(this, "children");
    const vSplice = vm.getProperty(vChildren, "splice");
    const len = arguments.length;
    const temp = [];
    for (let i = 0; i < len; i++) {
      const vArgRef = vm.asObject(arguments[i]);
      const vCLen = vm.getProperty(vChildren, "length");
      const cLen = vm.asNumber(vCLen);
      temp.push(vArgRef.value);

      for (let j = cLen - 1; j >= 0; j--) {
        const vChild = vm.getProperty(vChildren, j);
        const vChildRef = vm.asObject(vChild);
        if (vArgRef.value.id === vChildRef.value.id) {
          vm.setProperty(vChild, "parent", vm.createNull());
          vm.call(vSplice, vChildren, vm.createNumber(j), vm.createNumber(1));
        }
      }
    }

    vThisRef.value.remove(...temp);
  });

  const vEmpty = vm.createFunction("Group.prototype.empty", function () {
    const vThisRef = vm.asObject(this);
    const vChildren = vm.getProperty(this, "children");
    const vLength = vm.getProperty(vChildren, "length");
    const length = vm.asNumber(vLength);
    for (let i = 0; i < length; i++) {
      const vChild = vm.getProperty(vChildren, i);
      vm.setProperty(vChild, i, vm.createNull());
    }

    vm.setProperty(vChildren, "length", vm.createNumber(0));
    vThisRef.value.empty();
  });

  const vDestroy = vm.createFunction("Group.prototype.destroy", function () {
    const vThisRef = vm.asObject(this);
    const vEmpty = vm.getProperty(this, "empty");
    vm.call(vEmpty, this);

    const vParent = vm.getProperty(this, "parent");
    if (vm.isObject(vParent)) {
      const vDisplayObject = vm.getProperty(global, "__DisplayObject__");
      const vDisplayObjectProto = vm.getPrototype(vDisplayObject);
      const vDestroy = vm.getProperty(vDisplayObjectProto, "destroy");
      vm.call(vDestroy, this);
    }

    vThisRef.value.destroy();
  });

  vm.setProperty(vGroupProto, "add", vAdd);
  vm.setProperty(vGroupProto, "addChildAt", vAddChildAt);
  vm.setProperty(vGroupProto, "removeChildAt", vRemoveChildAt);
  vm.setProperty(vGroupProto, "replace", vReplace);
  vm.setProperty(vGroupProto, "remove", vRemove);
  vm.setProperty(vGroupProto, "empty", vEmpty);
  vm.setProperty(vGroupProto, "destroy", vDestroy);
  vm.setPrototype(vGroup, vGroupProto);
  vm.setProperty(vCax, "Group", vGroup);
};
