import { useState } from "react";
import { getUserBalance } from "../../provider";
import { Button, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export const BalanceCard = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [userBalance, setUserBalance] = useState(null);

  const handleCheckBalance = async () => {
    console.log("click handle check balance e", walletAddress);
    const userBalance = await getUserBalance(walletAddress);
    console.log("userBalance:", userBalance);
    setUserBalance(userBalance);
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
        <p className="text-sm font-semibold mt-1">Dirección Ethereum </p>
        <div className="flex flex-col gap-5 mt-3">
          <TextField
            label="0x..."
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
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: "bold",
            }}
          >
            <SearchIcon sx={{ marginRight: "8px" }}></SearchIcon>
            Consultar balance
          </Button>
        </div>
        <p className="text-sm font-semibold mt-4">
          {userBalance
            ? `El saldo de la billetera ${walletAddress} es ${userBalance}`
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
