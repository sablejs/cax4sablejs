module.exports = {
  PROPERTIES: {
    x: 0,
    y: 0,
    visible: true,
    scaleX: 1,
    scaleY: 1,
    scale: 1,
    rotation: 0,
    skewX: 0,
    skewY: 0,
    originX: 0,
    originY: 0,
    alpha: 1,
    cursor: "",
    fixed: false,
    cacheUpdating: false,
    shadow: {
      color: "",
      offsetX: 0,
      offsetY: 0,
      blur: 0,
    },
  },
  SHAPES: {
    Rect: {
      width: Number,
      height: Number,
      option: {
        fillStyle: String,
        strokeStyle: String,
        lineWidth: Number,
      },
      props: ["width", "height", "option"],
    },
    Sector: {
      r: Number,
      from: Number,
      to: Number,
      option: {
        fillStyle: String,
        strokeStyle: String,
        lineWidth: Number,
      },
      props: ["r", "from", "to", "option"],
    },
    RoundedRect: {
      width: Number,
      height: Number,
      r: Number,
      option: {
        fillStyle: String,
        strokeStyle: String,
        lineWidth: Number,
        lt: Boolean,
        rt: Boolean,
        lb: Boolean,
        rb: Boolean,
      },
      props: ["width", "height", "r", "option"],
    },
    Polygon: {
      vertex: [[Number]],
      options: {
        strokeStyle: String,
        fillColor: String,
      },
      props: ["vertex", "options"],
    },
    Path: {
      d: String,
      option: {
        fillStyle: String,
        strokeStyle: String,
        lineWidth: Number,
      },
      props: ["d", "option"],
    },
    EquilateralPolygon: {
      num: Number,
      r: Number,
      options: {
        fillStyle: String,
        strokeStyle: String,
        lineWidth: Number,
      },
      props: ["num", "r", "options"],
    },
    Ellipse: {
      width: Number,
      height: Number,
      option: {
        fillStyle: String,
        strokeStyle: String,
        lineWidth: Number,
      },
      props: ["width", "height", "option"],
    },
    Circle: {
      r: Number,
      option: {
        fillStyle: String,
        strokeStyle: String,
        lineWidth: Number,
      },
      props: ["r", "option"],
    },
    ArrowPath: {
      path: [{ x: Number, y: Number }],
      option: {
        strokeStyle: String,
        lineWidth: Number,
        headSize: Number,
      },
      props: ["path", "option"],
    },
  },
  EASING: [
    "Quadratic",
    "Cubic",
    "Quartic",
    "Quintic",
    "Sinusoidal",
    "Exponential",
    "Circular",
    "Elastic",
    "Back",
    "Bounce",
  ],
  noop: () => {},
  isPlainObject(value) {
    if (!value || {}.toString.call(value) !== "[object Object]") {
      return false;
    }

    const proto = Object.getPrototypeOf(value);
    if (!proto) {
      return true;
    }

    const constructor = {}.hasOwnProperty.call(proto, "constructor") && proto.constructor;
    return (
      typeof constructor === "function" &&
      Function.prototype.toString.call(constructor) === Function.prototype.toString.call(Object)
    );
  },
};
