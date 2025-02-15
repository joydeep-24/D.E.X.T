require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    ganache: {
      url: process.env.PROVIDER_URL,
      chainId: 31337,
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
