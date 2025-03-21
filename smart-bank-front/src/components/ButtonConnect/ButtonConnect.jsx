import { useState } from "react";
import { useNavigate } from "react-router";
import { connect } from "../../provider";
import { Button } from "@mui/material";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";

export const ButtonConnect = ({ styles, title }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleConnect = async () => {
    try {
      setLoading(true);
      await connect();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      navigate("/dashboard");
    }
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={handleConnect}
        loading={loading}
        startIcon={<AccountBalanceWalletOutlinedIcon />}
        sx={styles}
      >
        {title}
      </Button>
    </>
  );
};

export default ButtonConnect;
