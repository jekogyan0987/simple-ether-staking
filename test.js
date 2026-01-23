const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Staker", function () {
  it("Should accept stakes and allow withdrawals", async function () {
    const [owner] = await ethers.getSigners();
    const Staker = await ethers.getContractFactory("Staker");
    const staker = await Staker.deploy();
    await staker.deployed();

    // Stake 1 ETH
    await staker.stake({ value: ethers.utils.parseEther("1.0") });
    expect(await staker.getBalance()).to.equal(ethers.utils.parseEther("1.0"));

    // Withdraw
    await staker.withdraw();
    expect(await staker.getBalance()).to.equal(0);
  });
});
