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

  console.log("Deploying MasterChef...");

  const MasterChef = await ethers.getContractFactory("MasterChef");

  const masterChef = await MasterChef.deploy(
    config.default.CakeToken[currentNetwork],
    config.default.SyrupToken[currentNetwork],
    config.default.DevAddress[currentNetwork],
    String(parseEther(config.default.CakePerBlock[currentNetwork])),
    config.default.StartBlock[currentNetwork]
  );

  console.log("MasterChef deployed to:", masterChef.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
