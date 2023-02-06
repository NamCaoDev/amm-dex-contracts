import { ethers, network, run } from "hardhat";
import config from "../config";
import { constants } from "@openzeppelin/test-helpers";

const main = async () => {
  // Get network name: hardhat, testnet or mainnet.
  const { name } = network;

  if (name == "mainnet") {
    if (!process.env.KEY_MAINNET) {
      throw new Error("Missing private key, refer to README 'Deployment' section");
    }
    if (!config.Admin[name] || config.Admin[name] === constants.ZERO_ADDRESS) {
      throw new Error("Missing admin address, refer to README 'Deployment' section");
    }
    if (!config.Treasury[name] || config.Treasury[name] === constants.ZERO_ADDRESS) {
      throw new Error("Missing treasury address, refer to README 'Deployment' section");
    }
    if (!config.Cake[name] || config.Cake[name] === constants.ZERO_ADDRESS) {
      throw new Error("Missing syrup address, refer to README 'Deployment' section");
    }
    if (!config.CakePool[name] || config.CakePool[name] === constants.ZERO_ADDRESS) {
      throw new Error("Missing master address, refer to README 'Deployment' section");
    }
  }

  console.log("Deploying to network:", network);

  let cake, cakePool, admin, treasury;

  admin = config.Admin[name];
  treasury = config.Treasury[name];
  cake = config.Cake[name];
  cakePool = config.CakePool[name];

  console.log("Deploying Cake Flexibable Pool...");

  const CakeFlexiblePoolContract = await ethers.getContractFactory("CakeFlexiblePool");
  const cakeFlexiblePool = await CakeFlexiblePoolContract.deploy(cake, cakePool, admin, treasury);
  await cakeFlexiblePool.deployed();

  console.log("Cake Flexiable Pool deployed to:", cakeFlexiblePool.address);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
