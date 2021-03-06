const stat = require("./src/stat");
const event = require("./src/event");
const image = require("./src/image");
const global = require("./src/global");
const dispatcher = require("./src/event-dispatcher");
const displayObject = require("./src/display-object");
const group = require("./src/group");
const stage = require("./src/stage");
const bitmap = require("./src/bitmap");
const sprite = require("./src/sprite");
const text = require("./src/text");
const graphics = require("./src/graphics");
const shape = require("./src/shape");
const button = require("./src/button");
const motion = require("./src/motion");

module.exports = (vm) => {
  stat(vm);
  event(vm);
  image(vm);
  global(vm);
  dispatcher(vm);
  displayObject(vm);
  group(vm);
  stage(vm);
  bitmap(vm);
  sprite(vm);
  text(vm);
  graphics(vm);
  shape(vm);
  button(vm);
  motion(vm);
};
