const Stats = require("stats.js");

module.exports = (vm) => {
  const global = vm.getGlobal();
  const vStats = vm.createFunction("Stats", function () {
    const vThisRef = vm.asObject(this);
    const stats = new Stats();
    stats.showPanel(0);
    document.body.appendChild(stats.dom);
    vThisRef.value = stats;
  });

  const vStatsProto = vm.createObject();
  const vBegin = vm.createFunction("Stats.prototype.begin", function () {
    const vThisRef = vm.asObject(this);
    vThisRef.value.begin();
  });

  const vEnd = vm.createFunction("Stats.prototype.end", function () {
    const vThisRef = vm.asObject(this);
    vThisRef.value.end();
  });

  vm.setProperty(vStatsProto, "begin", vBegin);
  vm.setProperty(vStatsProto, "end", vEnd);
  vm.setPrototype(vStats, vStatsProto);
  vm.setProperty(global, "Stats", vStats);
};
