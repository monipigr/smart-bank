import { ethers } from "ethers";
import abi from "./abi/abi.json";

const contractAddress = "0x514268F23BBCEf6ec190f9DC1B2aDCDC30b13563";

// let signer = null;
let provider;
let contract;
export const connect = async () => {
  if (window.ethereum == null) {
    console.log("MetaMask not installed; using read-only defaults");
    provider = ethers.getDefaultProvider();
  } else {
    provider = new ethers.BrowserProvider(window.ethereum);

    // signer = await provider.getSigner();

    console.log("CONNECTED");

    contract = new ethers.Contract(contractAddress, abi, provider);
    console.log("Contract:", contract);

    const blockNumber = await provider.getBlockNumber();
    console.log("Block number:", blockNumber);
  }
};

export const getContractName = async () => {
  const name = await contract.name();
  return name;
};

export const readContractBalance = async () => {
  const balance = await provider.getBalance(contractAddress);
  const readableBalance = ethers.formatEther(balance);
  return readableBalance;
};

export const getMaxBalance = async () => {
  const maxBalance = await contract.maxBalance();
  return ethers.formatEther(maxBalance);
};

export const getAdminAddress = async () => {
  const adminAddress = await contract.admin();
  return adminAddress;
};
