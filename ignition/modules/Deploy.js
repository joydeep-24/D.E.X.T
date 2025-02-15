const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("ETContract", (m) => {
  const et_c = m.contract("ETContract" , [], {});
  return { et_c };
});
