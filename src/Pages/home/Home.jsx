import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  dengerDelete,
  getUsers,
} from "../../store/actions/user-action";
import { Box, Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import UserModal from "../../components/usermodal/UserModal";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../store/actions/auth-action";
import CalculateIcon from "@mui/icons-material/Calculate";
import Results from "../../components/results/Results";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  CATEGORIES_PAGE,
  SALARY_PAGE,
} from "../../routing/pats";
import { getCategory } from "../../store/actions/category-action";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [results, setResults] = useState(false);
  const [type, setType] = useState(null);
  const handleOpen = (data) => {
    setType(data);
    setOpen(true);
  };
  const role = useSelector((state) => state.auth.isSuper);
  const category = useSelector((state) => state.category.category);

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getMe());
    dispatch(getCategory());
  }, []);
  return (
    <Box component={Paper} sx={{ minHeight: "100vh" }}>
      <Box
        p={2}
        sx={{
          display: "flex",
          gap: "15px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {role === "superAdmin" ? (
          <Box>
            <Button variant="outlined" onClick={() => navigate(SALARY_PAGE)}>
              <CalculateIcon /> Դիտել արդյունքները
            </Button>
          </Box>
        ) : (
          <>
            {/* <Box>
              <Button
                variant="outlined"
                onClick={() => navigate(ALL_WORK_PAGE)}
              >
                Ծառայություններ
              </Button>
            </Box> */}
            <Box>
              <Button variant="outlined" onClick={() => navigate(SALARY_PAGE)}>
                <CalculateIcon /> Դիտել արդյունքները
              </Button>
            </Box>
          </>
        )}
        {role === "superAdmin" && (
          <Box>
            <Button
              variant="outlined"
              onClick={() => dispatch(dengerDelete())}
              sx={{ color: "red", borderColor: "red" }}
            >
              <DeleteForeverIcon sx={{ color: "red" }} /> Ջնջել բոլոր տվյալները
            </Button>
          </Box>
        )}
      </Box>
      <Box p={2}>
        {role === "superAdmin" && (
          <Box>
            <Button
              variant="outlined"
              onClick={() => navigate(CATEGORIES_PAGE)}
            >
              Կատեգորիաներ
            </Button>
          </Box>
        )}
      </Box>
      <Box p={2}>
        {category?.map((i) => {
          return (
            <Box>
              <Typography gutterBottom variant="h5" component="div">
                {i?.name}
              </Typography>
              {role == "superAdmin" && (
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
                    <Button variant="outlined" onClick={() => handleOpen(i.id)}>
                      <AddIcon />
                      Ավելացնել
                    </Button>
                  </Box>
                </Box>
              )}
              <Box
                sx={{
                  display: "flex",
                  padding: "15px",
                  gap: "10px",
                  flexWrap: "wrap",
                }}
              >
                {i.Users?.map((row) => (
                  <Card
                    sx={{
                      width: 300,
                      padding: "10px",
                      backgroundColor: "#2C2125",
                      color: "white",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onClick={() =>
                      role == "admin" && navigate(`/work/${row.id}`)
                    }
                  >
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {row.name}
                      </Typography>
                    </CardContent>
                    {role == "superAdmin" && (
                      <>
                        <CardActions
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                          }}
                        >
                          <Button
                            variant="outlined"
                            onClick={() => {
                              navigate(`/user/${row.id}`);
                            }}
                            sx={{
                              width: "200px",
                              background: "white",
                              color: "#2C2125",
                              "&:hover": {
                                width: "210px",
                                color: "#2C2125",
                                backgroundColor: "white",
                                transition: ".5s",
                              },
                            }}
                          >
                            <VisibilityIcon /> Ծառայություններ
                          </Button>
                        </CardActions>
                        <CardActions
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                          }}
                        >
                          <Button
                            color="error"
                            variant="outlined"
                            onClick={() => {
                              dispatch(deleteUser(row.id));
                              dispatch(getCategory());
                              setTimeout(() => {
                                dispatch(getCategory());
                              }, "1000");
                            }}
                            sx={{ width: "200px" }}
                          >
                            <DeleteIcon sx={{ color: "red" }} />
                          </Button>
                        </CardActions>
                      </>
                    )}
                  </Card>
                ))}
              </Box>
            </Box>
          );
        })}
      </Box>
      <UserModal open={open} setClose={setOpen} type={type} />
      <Results open={results} setClose={setResults} all={true} />
    </Box>
  );
};

export default Home;
