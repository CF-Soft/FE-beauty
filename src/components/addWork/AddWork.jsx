import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  addWork,
} from "../../store/actions/user-action";
import { useParams } from "react-router-dom";
import { useIsMobile } from "../../hooks/useScreenType";
import CloseIcon from "@mui/icons-material/Close";

const AddWork = ({ open, setClose, current, setCurrent, category }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMobile ? "100%" : 400,
    height: isMobile ? "100vh" : null,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  console.log(category, "category");
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key == "Enter") {
        dispatch(
          addWork({
            userId: id,
            serviceId: current,
          })
        );
        setCurrent(null);
        setClose(false);
      }
    };

    // Add event listener to the document
    document.addEventListener("keydown", handleKeyPress);

    // Cleanup: Remove event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <Modal
      open={open}
      onClose={() => {
        setClose(false);
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
          {category?.name} - {category?.price} ֏
        </Typography>

        <Box mt={2} p={2}>
          <Button
            variant="contained"
            onClick={() => {
              dispatch(
                addWork({
                  userId: id,
                  serviceId: current,
                })
              );
              setCurrent(null);
              setClose(false);
            }}
          >
            Հաստատել
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddWork;
