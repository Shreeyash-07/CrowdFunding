const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const compiledFactory = require("../artifacts/contracts/Campaign.sol/CampaignFactory.json");
const compiledCampaign = require("../artifacts/contracts/Campaign.sol/Campaign.json");

let accounts;
let factory;
let compaignAddress;
let campaign;

beforeEach(async () => {
  accounts = await web3.eth.Contract();
});
