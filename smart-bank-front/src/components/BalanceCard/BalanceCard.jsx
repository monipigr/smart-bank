import { useState } from "react";
import { getUserBalance } from "../../provider";
import { Button, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export const BalanceCard = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [userBalance, setUserBalance] = useState(null);
  const [error, setError] = useState("");
  const [displayBalance, setDisplayBalance] = useState(false);

  const handleCheckBalance = async () => {
    try {
      const userBalance = await getUserBalance(walletAddress);
      setUserBalance(userBalance);
      setDisplayBalance(true);
    } catch (error) {
      setError(`${error}`);
      setTimeout(() => {
        setError("");
      }, 5000);
    } finally {
      setWalletAddress("");
      setTimeout(() => {
        setDisplayBalance(false);
      }, 10000);
    }
  };

  return (
    <div className="card balance">
      <div className="title">
        <p className="text-2xl">Consultar Balance</p>
      </div>

      <p className="text-sm font-semibold text-zinc-400 mt-1">
        Consulta el balance de cualquier dirección en SmartBank
      </p>
      <div className="info-detail mt-5">
        <div className="flex mt-1 justify-between">
          <p className="text-sm font-semibold mt-1">Dirección Ethereum </p>
          {error && <p className="text-sm font-bold text-red-300">{error}</p>}
        </div>
        <div className="flex flex-col gap-5 mt-3">
          <TextField
            placeholder="0x..."
            variant="outlined"
            fullWidth
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            sx={{ backgroundColor: "whitesmoke", borderRadius: "16px" }}
          ></TextField>
          <Button
            variant="contained"
            fullWidth
            onClick={handleCheckBalance}
            sx={{
              borderRadius: "16px",
              textTransform: "none",
              fontWeight: "bold",
              padding: "13px 14px",
            }}
          >
            <SearchIcon sx={{ marginRight: "8px" }}></SearchIcon>
            Consultar balance
          </Button>
        </div>
        <p className="text-sm font-semibold mt-4 text-green-200">
          {userBalance && displayBalance
            ? `El saldo es de ${userBalance} ETH`
            : ""}
        </p>
        <p className="text-sm font-semibold text-zinc-400 mt-5">
          Solo podrás consultar balances almacenados en SmartBank
        </p>
      </div>
    </div>
  );
};

export default BalanceCard;
