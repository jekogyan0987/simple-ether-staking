const hre = require("hardhat");

async function main() {
  const Staker = await hre.ethers.getContractFactory("Staker");
  const staker = await Staker.deploy();

  await staker.deployed();

  console.log("Staker contract deployed to:", staker.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
