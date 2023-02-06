import { ethers, network } from "hardhat";
import { parseEther } from "ethers/lib/utils";

const config = require("../config");
const currentNetwork = network.name;

async function main() {
  if (currentNetwork == "mainnet") {
    if (!process.env.KEY_MAINNET) {
      throw new Error("Missing private key, refer to README 'Deployment' section");
    }
  }

  console.log("Deploying to network:", currentNetwork);

  console.log("Deploying MasterChefV2...");

  const MasterChefV2 = await ethers.getContractFactory("MasterChefV2");

  const masterChefV2 = await MasterChefV2.deploy(
    config.default.MasterChefV1[currentNetwork],
    config.default.CakeToken[currentNetwork],
    config.default.MasterPID[currentNetwork],
    config.default.BurnAdmin[currentNetwork]
  );

  console.log("MasterChefV2 deployed to:", masterChefV2.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
