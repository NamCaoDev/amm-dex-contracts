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
    if (!config.FarmBooster[name] || config.FarmBooster[name] === constants.ZERO_ADDRESS) {
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

  let cake, masterchefV2, farmBooster;

  farmBooster = config.FarmBooster[name];
  cake = config.Cake[name];
  masterchefV2 = config.MasterChefV2[name];

  console.log("Deploying Farm Booster Proxy Factory...");

  const FarmBoosterProxyFactoryContract = await ethers.getContractFactory("FarmBoosterProxyFactory");
  const farmBoosterProxyFactory = await FarmBoosterProxyFactoryContract.deploy(farmBooster, masterchefV2, cake);
  await farmBoosterProxyFactory.deployed();

  console.log("FarmBoosterProxyFactory deployed to:", farmBoosterProxyFactory.address);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
