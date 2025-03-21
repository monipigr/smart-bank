import React from "react";
import { Button, TextField } from "@mui/material";
import VerticalAlignBottomOutlinedIcon from "@mui/icons-material/VerticalAlignBottomOutlined";
import UpgradeOutlinedIcon from "@mui/icons-material/UpgradeOutlined";

import SearchIcon from "@mui/icons-material/Search";

export const TransactionInput = ({
  transactionStatus,
  handleDepositEther,
  amount,
  setAmount,
  title,
  textButton,
}) => {
  return (
    <>
      <div className="flex mt-1 justify-between">
        <p className="text-sm font-semibold mt-5">{title}</p>
        {transactionStatus.success && (
          <p className="text-sm font-bold text-green-200 mt-5">
            {transactionStatus.message}
          </p>
        )}
        {transactionStatus.error && (
          <p className="text-sm font-bold text-red-400 mt-5">
            {transactionStatus.message}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-5 mt-3">
        <TextField
          placeholder="0.0 ETH"
          variant="outlined"
          fullWidth
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          sx={{
            backgroundColor: "whitesmoke",
            borderRadius: "16px",
          }}
        ></TextField>
        <Button
          variant="contained"
          fullWidth
          onClick={handleDepositEther}
          sx={{
            borderRadius: "16px",
            textTransform: "none",
            fontWeight: "bold",
            padding: "13px 14px",
          }}
        >
          <SearchIcon sx={{ marginRight: "8px" }}></SearchIcon>
          {textButton}
        </Button>
      </div>
    </>
  );
};

export default TransactionInput;
