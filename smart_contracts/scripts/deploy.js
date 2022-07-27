const { ethers } = require("hardhat");

async function main() {
  const Campaign = await ethers.getContractFactory("CampaignFactory");
  const campaign = await Campaign.deploy();

  await campaign.deployed();

  console.log("Campaign deployed to:", campaign.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit = 1;
  });
