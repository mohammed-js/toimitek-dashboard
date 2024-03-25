import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import axios from "axios";
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { baseUrl, notifySuccess, notifyError } from "../../utils/generalUtils";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function MyDialog({
  dialogOpen,
  setDialogOpen,
  setIsLoading,
  setForceUpdate,
  item,
  currentItem,
  setCurrentItem,
}) {
  const handleAgree = () => {
    setIsLoading(true);
    axios
      .delete(`${baseUrl}/productsServices/${item}/${currentItem.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("acc-token")}`,
        },
      })
      .then((res) => {
        setForceUpdate((prev) => !prev);
        setCurrentItem({});
      })
      .catch((err) => {
        notifyError("Something went wrong!");
        setForceUpdate((prev) => !prev);
        setCurrentItem({});
      });
    setDialogOpen(false);
  };

  const handleDisagree = () => {
    setDialogOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={dialogOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => {
          setDialogOpen(false);
        }}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Alert!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete this item!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDisagree}>Disagree</Button>
          <Button onClick={handleAgree}>Agree</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
