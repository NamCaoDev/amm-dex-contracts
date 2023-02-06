import { ethers, network } from "hardhat";

const currentNetwork = network.name;
const config = require("../config");

async function main() {
  if (currentNetwork == "mainnet") {
    if (!process.env.KEY_MAINNET) {
      throw new Error("Missing private key, refer to README 'Deployment' section");
    }
  }

  console.log("Deploying to network:", currentNetwork);

  console.log("Deploying SyrupToken...");

  const SyrupToken = await ethers.getContractFactory("SyrupBar");
  console.log("Config", config);

  const syrupToken = await SyrupToken.deploy(config.default.CakeToken[currentNetwork]);

  console.log("SyrupToken deployed to:", syrupToken.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
