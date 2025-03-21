import { useEffect, useState } from "react";
import { connect, getContractInfo, setMaxBalance } from "../../provider";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import PasswordIcon from "@mui/icons-material/Password";
import { Button, TextField } from "@mui/material";

export const InfoCard = () => {
  const [toggleVisibility, setToggleVisibility] = useState(false);
  const [contractInfo, setContractInfo] = useState({});
  const [displayInput, setDisplayInput] = useState(false);
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadContractInfo();
  }, []);

  const loadContractInfo = async () => {
    try {
      await connect();
      const contractInfo = await getContractInfo();
      setContractInfo(contractInfo);
    } catch (error) {
      console.error("ERROR", error);
      setError("Fallo al obtener la información");
    }
  };

  const handleInfoBank = async () => {
    try {
      setToggleVisibility(!toggleVisibility);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDisplayInput = () => {
    setDisplayInput(!displayInput);
  };

  const handleMaxBalance = async () => {
    if (!amount || isNaN(amount)) {
      console.error("Por favor, ingresa una cantidad válida.");
      return;
    }
    setMaxBalance(amount);
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
        {toggleVisibility && error ? (
          <p className="font-semibold text-sm text-red-400 mt-1 mb-1">
            {error}
          </p>
        ) : toggleVisibility ? (
          <p className="font-bold">{contractInfo.contractName}</p>
        ) : (
          <PasswordIcon></PasswordIcon>
        )}
      </div>

      <div className="info-detail mt-5">
        <p className="text-sm font-semibold text-zinc-400 mt-1">
          Dirección de contrato
        </p>
        {toggleVisibility && error ? (
          <p className="font-semibold text-sm text-red-400 mt-1 mb-1">
            {error}
          </p>
        ) : toggleVisibility ? (
          <p className="font-bold">{contractInfo.contractAddress}</p>
        ) : (
          <PasswordIcon></PasswordIcon>
        )}
      </div>

      <div className="info-detail mt-5">
        <p className="text-sm font-semibold text-zinc-400 mt-1">
          Administrador
        </p>
        {toggleVisibility && error ? (
          <p className="font-semibold text-sm text-red-400 mt-1 mb-1">
            {error}
          </p>
        ) : toggleVisibility ? (
          <p className="font-bold">{contractInfo.adminAddress}</p>
        ) : (
          <PasswordIcon></PasswordIcon>
        )}
      </div>

      <div className="info-detail mt-5">
        <p className="text-sm font-semibold text-zinc-400 mt-1">
          Balance máximo
        </p>
        {toggleVisibility && error ? (
          <p className="font-semibold text-sm text-red-400 mt-1 mb-1">
            {error}
          </p>
        ) : toggleVisibility ? (
          <p className="font-bold">{contractInfo.maxBalance} ETH</p>
        ) : (
          <PasswordIcon></PasswordIcon>
        )}
        <p
          className="text-xs text-zinc-400 underline"
          onClick={handleDisplayInput}
        >
          Modificar
        </p>
        {displayInput && (
          <div className="flex mt-1 gap-1">
            <TextField
              className="maxBalance"
              placeholder="0.0 ETH"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            ></TextField>
            <Button
              sx={{
                textTransform: "none",
                fontWeight: "bold",
              }}
              variant="contained"
              onClick={handleMaxBalance}
            >
              Modificar
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoCard;
