import { ethers, network, run } from "hardhat";
import config from "../config";

const main = async () => {
  // Compile contracts
  await run("compile");
  console.log("Compiled contracts.");

  const networkName = network.name;

  // Sanity checks
  if (networkName === "mainnet") {
    if (!process.env.KEY_MAINNET) {
      throw new Error("Missing private key, refer to README 'Deployment' section");
    }
  } else if (networkName === "testnet") {
    if (!process.env.KEY_TESTNET) {
      throw new Error("Missing private key, refer to README 'Deployment' section");
    }
  }

  if (!config.PancakeFactory[networkName] || config.PancakeFactory[networkName] === ethers.constants.AddressZero) {
    throw new Error("Missing router address, refer to README 'Deployment' section");
  }

  if (!config.WBNB[networkName] || config.WBNB[networkName] === ethers.constants.AddressZero) {
    throw new Error("Missing WBNB address, refer to README 'Deployment' section");
  }

  console.log("Deploying to network:", networkName);

  // Deploy Pancake Router
  console.log("Deploying Pancake Router..");

  const PancakeRouter = await ethers.getContractFactory("PancakeRouter");

  const pancakeRouter = await PancakeRouter.deploy(
    config.PancakeFactory[networkName],
    config.WBNB[networkName],
  );

  await pancakeRouter.deployed();

  console.log("pancakeRouter deployed to:", pancakeRouter.address);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
