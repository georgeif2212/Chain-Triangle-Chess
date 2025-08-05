import { Snackbar, Alert as MuiAlert, AlertTitle } from "@mui/material";

const CustomAlert = ({ open, onClose, title, message, severity = "error" }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <MuiAlert
        variant="filled"
        onClose={onClose}
        severity={severity}
        sx={{ width: "100%" }}
      >
        {title && <AlertTitle>{title}</AlertTitle>}
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default CustomAlert;
