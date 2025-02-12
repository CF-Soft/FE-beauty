import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../store/actions/user-action";
import { useIsMobile } from "../../hooks/useScreenType";
import CloseIcon from "@mui/icons-material/Close";
import { getCategory } from "../../store/actions/category-action";

const UserModal = ({ open, setClose, type }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const isMobile = useIsMobile();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMobile ? "100%" : 400,
    height: isMobile ? "50vh" : null,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <Modal
      open={open}
      onClose={() => {
        setClose(false);
        setName("");
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div
          className="clone_btn"
          onClick={() => {
            setClose(false);
          }}
        >
          <CloseIcon />
        </div>
        <Typography p={2} id="modal-modal-title" variant="h6" component="h2">
          Ավելացնել նոր օգտվող
        </Typography>
        <Box mt={2} p={2}>
          <TextField
            label="Անուն"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Box>
        <Box mt={2} p={2}>
          <Button
            variant="contained"
            onClick={() => {
              if (name !== "") {
                dispatch(addUser({ name: name, type }));
                setName("");
                setClose(false);
                dispatch(getCategory());
                setTimeout(() => {
                  dispatch(getCategory());
                }, "1000");
              }
            }}
          >
            Ավելացնել
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default UserModal;
