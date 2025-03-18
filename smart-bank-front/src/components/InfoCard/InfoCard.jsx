import { useState } from "react";
import {
  connect,
  getContractName,
  getMaxBalance,
  getAdminAddress,
} from "../../provider";
import { Button, TextField } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export const InfoCard = () => {
  //   const [loading, setLoading] = useState(false);
  const [contractName, setContractName] = useState("");
  const [adminAddress, setAdminAddress] = useState("");
  const [maxBalance, setMaxBalance] = useState("");

  const handleInfoBank = async () => {
    try {
      //   setLoading(true);
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
      //   setLoading(false);
    }
  };

  return (
    <div className="card info">
      <div className="title">
        <p className="text-2xl">Información del Banco</p>
        <VisibilityIcon onClick={handleInfoBank}></VisibilityIcon>
      </div>

      <p className="text-sm font-semibold text-zinc-400 mt-1">
        Información detallada sobre el contrato de SmartBank
      </p>

      <div className="info-detail mt-5">
        <p className="text-sm font-semibold text-zinc-400 mt-1">
          Nombre comercial{" "}
        </p>
        <p className="font-bold">{contractName}</p>
      </div>

      <div className="info-detail mt-5">
        <p className="text-sm font-semibold text-zinc-400 mt-1">
          Dirección de contrato{" "}
        </p>
        <p className="font-bold">{0x000}(todo)</p>
      </div>

      <div className="info-detail mt-5">
        <p className="text-sm font-semibold text-zinc-400 mt-1">
          Administrador{" "}
        </p>
        <p className="font-bold">{adminAddress}</p>
      </div>

      <div className="info-detail mt-5">
        <p className="text-sm font-semibold text-zinc-400 mt-1">
          Balance máximo{" "}
        </p>
        <p className="font-bold">{maxBalance} ETH</p>
      </div>
    </div>
  );
};

export default InfoCard;
