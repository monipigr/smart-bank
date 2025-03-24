import { useEffect, useState } from "react";
import { getContractInfo, setMaxBalance } from "../../provider";
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
  const [status, setStatus] = useState({
    success: false,
    error: false,
    message: "",
  });

  useEffect(() => {
    loadContractInfo();
  }, []);

  const loadContractInfo = async () => {
    try {
      const contractInfo = await getContractInfo();
      setContractInfo(contractInfo);
    } catch (error) {
      setError(`${error}`);
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
    if (!amount || isNaN(amount) || amount < 0.001 || amount > 2) {
      setStatus({
        error: true,
        message: "Por favor, ingresa una cantidad entre 0.001 y 2",
      });
      return;
    }
    try {
      console.log("try");

      setStatus({ success: false, error: false, message: "" });
      const tx = await setMaxBalance(amount);
      await tx.wait();
      await loadContractInfo();
      setStatus({
        success: true,
        message: "Balance máximo modificado",
      });
    } catch (e) {
      console.error(e);
      setStatus({
        error: true,
        message: "Ha habido un error",
      });
    } finally {
      setTimeout(() => {
        setDisplayInput(false);
        setStatus({ success: false, error: false, message: "" });
      }, 10000);
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
        {toggleVisibility && error ? (
          <p className="font-semibold text-sm text-red-300 mt-1 mb-1">
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
          <p className="font-semibold text-sm text-red-300 mt-1 mb-1">
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
          <p className="font-semibold text-sm text-red-300 mt-1 mb-1">
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
          <p className="font-semibold text-sm text-red-300 mt-1 mb-1">
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
          <>
            <div className="flex mt-1 gap-1">
              <TextField
                type="number"
                min="0.0001"
                max="1"
                className="maxBalance"
                placeholder="0.0 ETH"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                sx={{
                  "& fieldset": { border: "none" },
                }}
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
            {status.success && (
              <p className="text-xs font-bold text-green-200 mt-1">
                {status.message}
              </p>
            )}
            {status.error && (
              <p className="text-xs font-bold text-red-300 mt-1">
                {status.message}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default InfoCard;
