import { ethers, network } from "hardhat";

const currentNetwork = network.name;

async function main() {
  if (currentNetwork == "mainnet") {
    if (!process.env.KEY_MAINNET) {
      throw new Error("Missing private key, refer to README 'Deployment' section");
    }
  }

  console.log("Deploying to network:", currentNetwork);

  console.log("Deploying CakeToken...");

  const CakeToken = await ethers.getContractFactory("CakeToken");

  const cakeToken = await CakeToken.deploy();

  console.log("CakeToken deployed to:", cakeToken.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
