import React, { useState, useEffect } from "react";

import {
  Autocomplete,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const CustomDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiAutocomplete-root": {
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(4),
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderRadius: theme.spacing(2),
  },
}));

const ListNFTDialog = ({ open, setOpenDialog, tokens, ListItem }) => {
  const [amountError, setAmountError] = useState(false);
  const [amount, setAmount] = useState(0);
  const [token, setToken] = useState("");
  const [disable, setDisable] = useState(true);

  const onChange = (e) => {
    const num = Number(e.target.value);
    if (!Number.isNaN(num)) {
      setAmount(num);
      console.log(num);
      if (token != "" && token != null) {
        setDisable(false);
      }
      if (num <= 0) {
        setDisable(true);
      }
    }
  };
  const handleSubmit = () => {
    console.log(token);
    console.log(amount);
    if (token != "" && amount > 0 && token != null) {
      ListItem(token, amount);
    }
  };
  return (
    <>
      <CustomDialog
        onClose={() => {
          setOpenDialog(false);
          setDisable(true);
        }}
        open={open}
        fullWidth={true}
        maxWidth="xs"
        sx={{ margin: 4 }}
      >
        <DialogTitle>List Your NFT</DialogTitle>
        <DialogContent>Set Price and Token for Listing NFT</DialogContent>
        <Autocomplete
          onChange={(event, newValue) => {
            setToken(newValue);
            console.log(newValue);

            if (amount > 0) {
              setDisable(false);
            }
            if (newValue == null) {
              setDisable(true);
            }
          }}
          disablePortal
          id="combo-box-demo"
          options={tokens}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Token" />}
        />
        <TextField
          value={amount}
          onChange={onChange}
          error={amountError}
          id="standard-basic"
          label="Amount"
          sx={{
            padding: 2,
            paddingLeft: 4,
            width: 300,
            "& .MuiFormLabel-root": { padding: 2, paddingLeft: 4 },
          }}
        />
        <DialogActions>
          <Button onClick={handleSubmit} disabled={disable}>
            List
          </Button>
          <Button
            onClick={() => {
              setOpenDialog(false);
              setDisable(true);
            }}
            color="error"
          >
            Close
          </Button>
        </DialogActions>
      </CustomDialog>
    </>
  );
};

export default ListNFTDialog;
