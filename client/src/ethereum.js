import detectEthereumProvider from "@metamask/detect-provider";
import { ethers, Contract } from "ethers";
import CampaignFactory from "./artifacts/contracts/Campaign.sol/CampaignFactory.json";
import Campaign from "./artifacts/contracts/Campaign.sol/Campaign.json";

export const campaignContract = async (address) => {
  try {
    let provider = await detectEthereumProvider();
    if (provider) {
      const accounts = await provider.request({
        method: "eth_requestAccounts",
      });
      provider = new ethers.providers.Web3Provider(provider);
      const signer = await provider.getSigner();
      return new Contract(address, Campaign.abi, signer);
    }
  } catch (err) {
    console.log(err);
  }
};
export const getAcs = async () => {
  try {
    let provider = await detectEthereumProvider();
    if (provider) {
      const accounts = await provider.request({
        method: "eth_requestAccounts",
      });
      provider = new ethers.providers.Web3Provider(provider);
      const signer = await provider.getSigner();
      return { accounts, signer };
    }
  } catch (err) {
    console.log(err);
  }
};

const getBlockchain = () =>
  new Promise(async (resolve, reject) => {
    let provider = await detectEthereumProvider();
    if (provider) {
      const accounts = await provider.request({
        method: "eth_requestAccounts",
      });
      const networkID = await provider.request({ method: "net_version" });
      provider = new ethers.providers.Web3Provider(provider);
      const signer = await provider.getSigner();
      console.log({
        provider: provider,
        "normal signer": signer,
        "signer from ethereum": signer.getAddress(),
      });
      const campaignFactory = new Contract(
        "0x5FbDB2315678afecb367f032d93F642f64180aa3",
        CampaignFactory.abi,
        signer
      );
      resolve({ campaignFactory, accounts, networkID, signer });
      return;
    }
    reject("Install Metamask");
  });

export default getBlockchain;
