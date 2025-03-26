import { ethers } from "ethers";
import abi from "./abi/abi.json";

const contractAddress = "0xc08ba5c29763cc58c4edd6cce99be1b401d5390a";

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
  if (!signer || !contract) {
    throw new Error("No se pudo obtener la información. Conecta tu billetera");
  }
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
  if (!signer || !contract) {
    throw new Error("Conecta tu billetera");
  }
  try {
    const userBalance = await contract.userBalance(addr);
    return ethers.formatEther(userBalance);
  } catch (error) {
    if (
      error.code === "UNSUPPORTED_OPERATION" ||
      error.code === "INVALID_ARGUMENT"
    )
      throw new Error("Dirección no válida");
    throw error;
  }
};

export const getBalance = async () => {
  if (!signer || !contract) {
    throw new Error("Conecta tu billetera");
  }
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  const balance = await contract.balanceOf(accounts[0]);
  return ethers.formatEther(balance);
};

export const setMaxBalance = async (amount) => {
  if (!amount || isNaN(amount) || amount < 0.001 || amount > 2)
    throw new Error("Balance máximo no permitido");

  let adminAddress = await getAdminAddress();
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  if (adminAddress.toLowerCase() !== accounts[0].toLowerCase()) {
    throw new Error("Solo el administrador puede modificar el balance máximo");
  }

  try {
    const contractWithSigner = contract.connect(signer);
    const amountInWei = ethers.parseUnits(amount.toString(), 18);
    const tx = await contractWithSigner.modifyMaxBalance(amountInWei);
    await tx.wait();
    return tx;
  } catch (error) {
    if (error.code === 4001 || error.code === "ACTION_REJECTED")
      throw new Error("Transacción rechazada");
    throw error;
  }
};

export const depositEther = async (amount) => {
  if (!signer || !contract) throw new Error("Conecta tu billetera");
  if (amount <= 0) throw new Error("Introduce una cantidad válida");

  try {
    const userAddress = await signer.getAddress();
    const walletBalance = await contract.runner.provider.getBalance(
      userAddress
    );
    const walletBalanceInEth = ethers.formatEther(walletBalance);
    if (amount > walletBalanceInEth) throw new Error("Fondos insuficientes");

    const maxBalance = Number(ethers.formatEther(await contract.maxBalance()));
    const userBalance = Number(await getBalance());
    const userAmount = Number(amount);
    if (userBalance + userAmount > maxBalance) {
      throw new Error("Balance máximo alcanzado");
    }

    // Crear una instancia del contrato con el signer para firmar la transacción
    const contractWithSigner = contract.connect(signer);
    // Enviar la transacción para depositar ether
    const tx = await contractWithSigner.depositEther({
      value: ethers.parseEther(amount.toString()),
    });
    // Esperar a que la transacción sea minada
    await tx.wait();
  } catch (error) {
    if (error.code === 4001 || error.code === "ACTION_REJECTED")
      throw new Error("Transacción rechazada");
    throw error;
  }
};

export const subscribeDepositEvent = (callback) => {
  if (!contract) {
    throw new Error("Conecta tu billetera");
  }
  contract.on("EtherDeposit", (user, amount) => {
    callback(user, amount);
  });
  return () => {
    contract.removeAllListeners("EtherDeposit");
  };
};

export const withdrawEther = async (amount) => {
  if (!signer || !contract) throw new Error("Conecta tu billetera");
  if (amount <= 0) throw new Error("Introduce una cantidad válida");

  try {
    const balance = await getBalance();
    if (amount > balance) throw new Error("Fondos insuficientes");

    const contractWithSigner = contract.connect(signer);
    const tx = await contractWithSigner.withdrawEther(
      ethers.parseEther(amount.toString())
    );
    return await tx.wait();
  } catch (error) {
    if (error.code === 4001 || error.code === "ACTION_REJECTED")
      throw new Error("Transacción rechazada");
    throw error;
  }
};

export const subscribeWithdrawEvent = (callback) => {
  if (!contract) {
    throw new Error("Conecta tu billetera");
  }
  contract.on("EtherWithdraw", (user, amount) => {
    callback(user, amount);
  });
  return () => {
    contract.removeAllListeners("EtherWithdraw");
  };
};
