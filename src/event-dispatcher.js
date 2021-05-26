module.exports = (vm) => {
  const global = vm.getGlobal();
  const vEventDispatcher = vm.createFunction("__EventDispatcher__", function () {});

  const vEventDispatcherProto = vm.createObject();
  const vAddEventListener = vm.createFunction(
    "EventDispatcher.prototype.addEventListener",
    function (vType, vListener, vUseCapture) {
      const vThisRef = vm.asObject(this);
      const type = vm.asString(vType);
      const useCapture = vm.asBoolean(vUseCapture);
      const listener = function (event) {
        if (vm.isFunction(vListener)) {
          const vEvent = vm.getProperty(global, "__Event__");
          const vValue = vm.createObject();
          vValue.value.value = event;

          const vIEvent = vm.new(vEvent, vValue);
          vm.setProperty(vIEvent, "target", listener.__target__);
          vm.call(vListener, this, vIEvent);
        }
      };

      vListener.value.__ref__ = listener;
      listener.__target__ = { ...this };
      vThisRef.value.addEventListener(type, listener, useCapture);
    }
  );

  const vRemoveEventListener = vm.createFunction(
    "EventDispatcher.prototype.removeEventListener",
    function (vType, vListener, vUseCapture) {
      const vThisRef = vm.asObject(this);
      const type = vm.asString(vType);
      const useCapture = vm.asBoolean(vUseCapture);
      const listener = vListener.value.__ref__;
      vThisRef.value.removeEventListener(type, listener, useCapture);
    }
  );

  const vOn = vm.createFunction("EventDispatcher.prototype.on", function () {
    const vAddEventListener = vm.getProperty(this, "addEventListener");
    vm.call(vAddEventListener, this, ...arguments);
  });

  const vOff = vm.createFunction("EventDispatcher.prototype.off", function () {
    const vRemoveEventListener = vm.getProperty(this, "removeEventListener");
    vm.call(vRemoveEventListener, this, ...arguments);
  });

  const vDispatchEvent = vm.createFunction("EventDispatcher.prototype.dispatchEvent", function (vEvent) {
    const vThisRef = vm.asObject(this);
    const vObject = vm.getProperty(global, "Object");
    const vKeysFunc = vm.getProperty(vObject, "keys");
    const vKeys = vm.call(vKeysFunc, vm.createNull(), vEvent);
    const vLength = vm.getProperty(vKeys, "length");
    const length = vm.asNumber(vLength);
    const event = {};
    for (let i = 0; i < length; i++) {
      const vKey = vm.getProperty(vKeys, i);
      const key = vm.asString(vKey);
      const vValue = vm.getProperty(vEvent, key);
      if (vm.isString(vValue)) {
        event[key] = vm.asString(vValue);
      } else if (vm.isNumber(vValue)) {
        event[key] = vm.asNumber(vValue);
      } else if (vm.isBoolean(vValue)) {
        event[key] = vm.asBoolean(vValue);
      } else {
        event[key] = null;
      }
    }

    event.__target__ = this;
    vThisRef.value.dispatchEvent(event);
  });

  vm.setProperty(vEventDispatcherProto, "addEventListener", vAddEventListener);
  vm.setProperty(vEventDispatcherProto, "removeEventListener", vRemoveEventListener);
  vm.setProperty(vEventDispatcherProto, "on", vOn);
  vm.setProperty(vEventDispatcherProto, "off", vOff);
  vm.setProperty(vEventDispatcherProto, "dispatchEvent", vDispatchEvent);
  vm.setPrototype(vEventDispatcher, vEventDispatcherProto);
  vm.setProperty(global, "__EventDispatcher__", vEventDispatcher);
};
