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
    if (!config.CakePool[name] || config.CakePool[name] === constants.ZERO_ADDRESS) {
      throw new Error("Missing syrup address, refer to README 'Deployment' section");
    }
    if (!config.Cake[name] || config.Cake[name] === constants.ZERO_ADDRESS) {
      throw new Error("Missing syrup address, refer to README 'Deployment' section");
    }
    if (!config.MasterChefV2[name] || config.MasterChefV2[name] === constants.ZERO_ADDRESS) {
      throw new Error("Missing master address, refer to README 'Deployment' section");
    }
  }

  console.log("Deploying to network:", network);

  let cake, masterchefV2, cakePool, maxBoostPool, cA, cB;

  cakePool = config.CakePool[name];
  cake = config.Cake[name];
  masterchefV2 = config.MasterChefV2[name];
  maxBoostPool = config.MaxBoostPool[name];
  cA = config.cA[name];
  cB = config.cB[name];

  console.log("Deploying Farm Booster...");

  const FarmBoosterContract = await ethers.getContractFactory("FarmBooster");
  const farmBooster = await FarmBoosterContract.deploy(cake, cakePool, masterchefV2, maxBoostPool, cA, cB);
  await farmBooster.deployed();

  console.log("FarmBooster deployed to:", farmBooster.address);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
