import { ethers } from "ethers";
import abi from "./abi/abi.json";

// const contractAddress = "0x514268F23BBCEf6ec190f9DC1B2aDCDC30b13563";
const contractAddress = "0xc08ba5c29763cc58c4edd6cce99be1b401d5390a"; //sepolia

let provider;
let signer;
let contract;

export const connect = async () => {
  try {
    if (window.ethereum == null) {
      console.log("MetaMask not installed; using read-only defaults");
      provider = ethers.getDefaultProvider();
    } else {
      provider = new ethers.BrowserProvider(window.ethereum);
      contract = new ethers.Contract(contractAddress, abi, provider);
      signer = await provider.getSigner();
      console.log("signer", signer);

      console.log("Contract:", contract);

      // const blockNumber = await provider.getBlockNumber();
      // console.log("Block number:", blockNumber);
    }
  } catch (error) {
    console.error("Error connecting to Metamask:", error);
  }
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
  console.log("GETBALANCE", balance);
  return ethers.formatEther(balance);
};

export const depositEther = async (amount) => {
  console.log("DEPOSIT ETHER");
  if (!signer || !contract) {
    throw new Error("Please connect to MetaMask first.");
  }
  // Crear una instancia del contrato con el signer para firmar la transacción
  const contractWithSigner = contract.connect(signer);
  // Enviar la transacción para depositar ether
  const tx = await contractWithSigner.depositEther({
    value: ethers.parseEther(amount.toString()),
  });
  // Esperar a que la transacción sea minada
  await tx.wait();
  console.log(`Deposit of ${amount} ETH successful!`);
};

export const subscribeDepositEvent = (callback) => {
  if (!contract) {
    connect();
    throw new Error("Contrato no inicializado. Conecta tu billetera.");
  }

  // Suscribirse al evento
  contract.on("EtherDeposit", (user, amount, event) => {
    console.log("Evento EtherDeposit recibido:", { user, amount, event });
    callback(user, amount);
  });

  // Desuscribirse del evento
  return () => {
    contract.removeAllListeners("EtherDeposit");
  };
};

export const withdrawEther = async (amount) => {
  console.log("WITHDRAW ETHER");
  if (!signer || !contract) {
    throw new Error("Please connect to MetaMask first.");
  }
  const contractWithSigner = contract.connect(signer);
  const tx = await contractWithSigner.withdrawEther(
    ethers.parseEther(amount.toString())
  );
  await tx.wait();
  console.log(`Withdraw of ${amount} ETH successful!`);
};

export const subscribeWithdrawEvent = (callback) => {
  if (!contract) {
    throw new Error("Contrato no inicializado. Conecta tu billetera.");
  }
  contract.on("EtherWithdraw", (user, amount) => {
    callback(user, amount);
  });
  return () => {
    contract.removeAllListeners("EtherWithdraw");
  };
};
