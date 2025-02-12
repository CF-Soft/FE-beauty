import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editService } from "../../store/actions/user-action";
import { useIsMobile } from "../../hooks/useScreenType";
import CloseIcon from "@mui/icons-material/Close";

const Services = ({ open, setClose, data }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [benefit, setBenefit] = useState();
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
  useEffect(() => {
    setName(data?.name);
    setPrice(data?.price);
    setBenefit(data?.benefit);
  }, [data]);
  return (
    <Modal
      open={open}
      onClose={() => {
        setClose(false);
        setName("");
        setPrice("");
        setBenefit("");
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
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Ծառայություներ
        </Typography>
        <Box mt={2}>
          <TextField
            label="Անուն"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Box>
        <Box mt={2}>
          <TextField
            label="Գին"
            variant="outlined"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Box>
        <Box mt={2}>
          <TextField
            label="Աշխատավարձ"
            variant="outlined"
            value={benefit}
            onChange={(e) => setBenefit(e.target.value)}
          />
        </Box>
        <Box mt={2}>
          <Button
            variant="contained"
            onClick={() => {
              if (name !== "" && price !== "" && benefit !== "") {
                dispatch(
                  editService({
                    id: data.id,
                    name,
                    price,
                    benefit,
                  })
                );
                setClose(false);
              }
            }}
          >
            Խմբագրել
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default Services;
