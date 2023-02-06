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

  console.log("Deploying ICake...");

  const ICake = await ethers.getContractFactory("ICake");

  const iCake = await ICake.deploy(
    config.default.CakePool[currentNetwork],
    config.default.Admin[currentNetwork],
    config.default.Ceiling[currentNetwork]
  );

  console.log("ICake deployed to:", iCake.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
