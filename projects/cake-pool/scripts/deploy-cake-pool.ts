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
    if (!config.Syrup[name] || config.Syrup[name] === constants.ZERO_ADDRESS) {
      throw new Error("Missing syrup address, refer to README 'Deployment' section");
    }
    if (!config.Cake[name] || config.Cake[name] === constants.ZERO_ADDRESS) {
      throw new Error("Missing syrup address, refer to README 'Deployment' section");
    }
    if (!config.MasterChef[name] || config.MasterChef[name] === constants.ZERO_ADDRESS) {
      throw new Error("Missing master address, refer to README 'Deployment' section");
    }
  }

  console.log("Deploying to network:", network);

  let cake, masterchefV2, admin, treasury, operator, cakePoolPID;

  admin = config.Admin[name];
  treasury = config.Treasury[name];
  cake = config.Cake[name];
  masterchefV2 = config.MasterChefV2[name];
  operator = config.Operator[name];
  cakePoolPID = config.CakePoolPID[name];

  console.log("Deploying Cake Pool...");

  const CakePoolContract = await ethers.getContractFactory("CakePool");
  const cakePool = await CakePoolContract.deploy(cake, masterchefV2, admin, treasury, operator, cakePoolPID);
  await cakePool.deployed();

  console.log("CakePool deployed to:", cakePool.address);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
