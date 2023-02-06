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

  console.log("Deploying to network:", networkName);

  // Deploy PancakeFactory
  console.log("Deploying Pancake Factory..");

  const PancakeFactory = await ethers.getContractFactory("PancakeFactory");

  const pancakeFactory = await PancakeFactory.deploy(
    config.FeeToSetter[networkName],
  );

  await pancakeFactory.deployed();

  console.log("pancakeFactory deployed to:", pancakeFactory.address);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
