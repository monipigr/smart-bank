import { ethers } from "ethers";
import abi from "./abi/abi.json";

const contractAddress = "0xc08ba5c29763cc58c4edd6cce99be1b401d5390a";

let provider;
let signer;
let contract;

// export const connect = async () => {
//   try {
//     if (window.ethereum == null) {
//       console.log("MetaMask not installed; using read-only defaults");
//       provider = ethers.getDefaultProvider();
//     } else {
//       provider = new ethers.BrowserProvider(window.ethereum);
//       contract = new ethers.Contract(contractAddress, abi, provider);
//       signer = await provider.getSigner();
//       console.log("signer", signer);
//       console.log("Contract:", contract);
//     }
//   } catch (error) {
//     console.error("Error connecting to Metamask:", error);
//   }
// };

export const connect = async () => {
  console.log("FAKE CONNECT");
};

export const getContractName = async () => {
  const name = await contract.name();
  return name;
};

export const getMaxBalance = async () => {
  const maxBalance = await contract.maxBalance();
  return ethers.formatEther(maxBalance);
};

export const getAdminAddress = async () => {
  const adminAddress = await contract.admin();
  return adminAddress;
};

export const getContractInfo = async () => {
  const contractName = await contract.name();
  const contractAddress = "0x514268F23BBCEf6ec190f9DC1B2aDCDC30b13563";
  const adminAddress = await contract.admin();
  const maxBalance = ethers.formatEther(await contract.maxBalance());
  return {
    contractName,
    contractAddress,
    adminAddress,
    maxBalance,
  };
};

export const getUserBalance = async (addr) => {
  const userBalance = await contract.userBalance(addr);
  return ethers.formatEther(userBalance);
};

export const getBalance = async () => {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  const balance = await contract.balanceOf(accounts[0]);
  return ethers.formatEther(balance);
};

export const setMaxBalance = async (amount) => {
  const contractWithSigner = contract.connect(signer);
  const newMaxBalance = await contractWithSigner.modifyMaxBalance(amount);
  await newMaxBalance.wait();
  return newMaxBalance;
};

export const depositEther = async (amount) => {
  if (!signer || !contract) {
    throw new Error("Connect to MetaMask");
  }
  // Crear una instancia del contrato con el signer para firmar la transacción
  const contractWithSigner = contract.connect(signer);
  // Enviar la transacción para depositar ether
  const tx = await contractWithSigner.depositEther({
    value: ethers.parseEther(amount.toString()),
  });
  // Esperar a que la transacción sea minada
  await tx.wait();
};

export const subscribeDepositEvent = (callback) => {
  if (!contract) {
    throw new Error("Connect to MetaMask");
  }
  contract.on("EtherDeposit", (user, amount) => {
    callback(user, amount);
  });
  return () => {
    contract.removeAllListeners("EtherDeposit");
  };
};

export const withdrawEther = async (amount) => {
  if (!signer || !contract) {
    throw new Error("Connect to MetaMask");
  }
  const contractWithSigner = contract.connect(signer);
  const tx = await contractWithSigner.withdrawEther(
    ethers.parseEther(amount.toString())
  );
  await tx.wait();
};

export const subscribeWithdrawEvent = (callback) => {
  if (!contract) {
    throw new Error("Connect to MetaMask");
  }
  contract.on("EtherWithdraw", (user, amount) => {
    callback(user, amount);
  });
  return () => {
    contract.removeAllListeners("EtherWithdraw");
  };
};
