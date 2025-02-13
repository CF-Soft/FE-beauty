import { Box, Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  getServices,
  getUsers,
} from "../../store/actions/user-action";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { HOME_PAGE } from "../../routing/pats";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const AllWork = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const users = useSelector((state) => state.users.users);
  const data = useSelector((state) => state.users.work);
  const services = useSelector((state) => state.users.services);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      getServices({
        userId: open,
      })
    );
  }, [open, dispatch]);

  console.log(data);
  return (
    <Box component={Paper}>
      <Box p={2}></Box>
      <Box
        p={2}
        sx={{
          display: "flex",
          gap: "15px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Box>
          <Button variant="outlined" onClick={() => navigate(HOME_PAGE)}>
            <KeyboardBackspaceIcon />
            Վերադառնալ
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          padding: "15px",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        {users?.map((row) => (
          <Card
            sx={{
              width: 300,
              padding: "10px",
              backgroundColor: "#2C2125",
              color: "white",
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
            onClick={() => setOpen(row.id)}
          >
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {row.name}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
      <hr />
      <Box p={2}>
        <Typography gutterBottom variant="h5" component="div">
          Ծառայություներ
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          padding: "15px",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        {services?.length ? (
          services?.map((row) => (
            <Card
              sx={{
                width: 300,
                padding: "10px",
                backgroundColor: "#2C2125",
                color: "white",
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
              onClick={() => setOpen(row.id)}
            >
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {row.name}
                </Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography gutterBottom variant="h5" component="div">
            Դատարկ
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default AllWork;
