import { useState } from "react";
import {
  connect,
  getContractName,
  getMaxBalance,
  getAdminAddress,
} from "../../provider";

/**
 * Agregar input para que usuario introduzca dirección de la que quiere ver el balance (function balanceOf o bien directamente mapping userBalance)
 * Agregar input para que el usuario pueda depositar Ether (function depositEther)
 * Agregar input con botón para que el usuario pueda retirar ether (function withdrawEther)
 * Agregar input con botón para que el usuario pueda modificar el balance maximo del contrato (function modifiyMaxBalance)
 * Separar por componentes
 * Hacer interfaz minimamente bonita
 * Deployear en Vercel
 * Hacer vídeo interactivo para el readme
 */

export const ButtonConnect = () => {
  const [loading, setLoading] = useState(false);
  const [contractName, setContractName] = useState("");
  const [adminAddress, setAdminAddress] = useState("");
  const [maxBalance, setMaxBalance] = useState("");

  const handleConnect = async () => {
    try {
      setLoading(true);
      await connect();
      const contractName = await getContractName();
      setContractName(contractName);
      const adminAddress = await getAdminAddress();
      setAdminAddress(adminAddress);
      const maxBalance = await getMaxBalance();
      setMaxBalance(maxBalance);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button onClick={handleConnect}>
        {loading ? "Loading..." : "Connect to Metamask"}
      </button>
      <p>Contract Name: {contractName}</p>
      <p>Admin Address: {adminAddress}</p>
      <p>Maximum balance: {maxBalance} Ethers</p>
    </>
  );
};

export default ButtonConnect;
