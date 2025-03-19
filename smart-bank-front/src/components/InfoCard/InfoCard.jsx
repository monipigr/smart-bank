import { useEffect, useState } from "react";
import { connect, getContractInfo } from "../../provider";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PasswordIcon from "@mui/icons-material/Password";

export const InfoCard = () => {
  const [toggleVisibility, setToggleVisibility] = useState(false);
  const [contractInfo, setContractInfo] = useState({});

  useEffect(() => {
    loadContractInfo();
  }, []);

  const loadContractInfo = async () => {
    await connect();
    const contractInfo = await getContractInfo();
    setContractInfo(contractInfo);
  };

  const handleInfoBank = async () => {
    try {
      setToggleVisibility(!toggleVisibility);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card info">
      <div className="title">
        <p className="text-2xl">Información del Banco</p>
        {toggleVisibility ? (
          <VisibilityIcon
            sx={{ cursor: "pointer" }}
            onClick={handleInfoBank}
          ></VisibilityIcon>
        ) : (
          <VisibilityOffIcon onClick={handleInfoBank}></VisibilityOffIcon>
        )}
      </div>

      <p className="text-sm font-semibold text-zinc-400 mt-1">
        Información detallada sobre el contrato SmartBank
      </p>

      <div className="info-detail mt-5">
        <p className="text-sm font-semibold text-zinc-400 mt-1">Nombre legal</p>
        {toggleVisibility ? (
          <p className="font-bold">{contractInfo.contractName}</p>
        ) : (
          <PasswordIcon></PasswordIcon>
        )}
      </div>

      <div className="info-detail mt-5">
        <p className="text-sm font-semibold text-zinc-400 mt-1">
          Dirección de contrato
        </p>
        {toggleVisibility ? (
          <p className="font-bold">{contractInfo.contractAddress}</p>
        ) : (
          <PasswordIcon></PasswordIcon>
        )}
      </div>

      <div className="info-detail mt-5">
        <p className="text-sm font-semibold text-zinc-400 mt-1">
          Administrador
        </p>
        {toggleVisibility ? (
          <p className="font-bold">{contractInfo.adminAddress}</p>
        ) : (
          <PasswordIcon></PasswordIcon>
        )}
      </div>

      <div className="info-detail mt-5">
        <p className="text-sm font-semibold text-zinc-400 mt-1">
          Balance máximo
        </p>
        {toggleVisibility ? (
          <p className="font-bold">{contractInfo.maxBalance} ETH</p>
        ) : (
          <PasswordIcon></PasswordIcon>
        )}
      </div>
    </div>
  );
};

export default InfoCard;
