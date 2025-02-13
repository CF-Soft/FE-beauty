import { Box, Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  addWork,
  deleteService,
  deleteWork,
  getServices,
  getUser,
  getWorks,
} from "../../store/actions/user-action";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Services from "../../components/sercvices/Services";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { HOME_PAGE } from "../../routing/pats";
import AddIcon from "@mui/icons-material/Add";
import AddServices from "../../components/addsercvices/AddServices";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CalculateIcon from "@mui/icons-material/Calculate";
import Results from "../../components/results/Results";
import { getMe } from "../../store/actions/auth-action";
import AddWork from "../../components/addWork/AddWork";
import dayjs from "dayjs";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const Work = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [current, setCurrent] = useState(null);
  const [arxive, setArxive] = useState(false);
  const [open, setOpen] = useState(false);
  const [add, setSetAdd] = useState(false);
  const [results, setResults] = useState(false);
  const firstDayOfMonth = dayjs().startOf("month");
  const lastDayOfMonth = dayjs().endOf("month");
  const [value, setValue] = useState();
  const [category, setCategory] = useState();
  const handleOpen = () => setOpen(true);
  const data = useSelector((state) => state.users.work);
  const role = useSelector((state) => state.auth.isSuper);
  const user = useSelector((state) => state.auth.user);
  const services = useSelector((state) => state.users.services);

  useEffect(() => {
    !arxive
      ? dispatch(
          getWorks({
            userId: id,
            // date: dayjs().format("YYYY-MM-DD"),
          })
        )
      : dispatch(
          getWorks({
            userId: id,
            date: value,
          })
        );
    dispatch(
      getServices({
        userId: id,
      })
    );
  }, [value, arxive]);

  useEffect(() => {
    dispatch(getUser({ id }));
    dispatch(getMe());
  }, []);

  return (
    <Box component={Paper} sx={{ minHeight: "100vh" }}>
      <Box p={2}>
        <h1>Աշխատանքներ` {user?.name}</h1>
      </Box>
      <Box
        p={2}
        sx={{
          display: "flex",
          gap: "15px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {!arxive && (
          <Box>
            <Button variant="outlined" onClick={() => navigate(HOME_PAGE)}>
              <KeyboardBackspaceIcon />
              Վերադառնալ
            </Button>
          </Box>
        )}
        {/* <Box>
          <Button
            variant="outlined"
            onClick={() => {
              setArxive(!arxive);
              setValue(null);
            }}
          >
            {arxive ? "Վերադառնալ" : "Դիտել արխիվը"}
          </Button>
        </Box> */}
        {/* {role === "admin" && !arxive && (
          <Box>
            <Button variant="outlined" onClick={() => setSetAdd(true)}>
              <AddIcon /> Ավելացնել
            </Button>
          </Box>
        )} */}
        {role === "superAdmin" && arxive && (
          <Box>
            <Button variant="outlined" onClick={() => setResults(true)}>
              <CalculateIcon /> Դիտել արդյունքները
            </Button>
          </Box>
        )}
        {arxive && (
          <Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  value={value}
                  minDate={role == "admin" ? firstDayOfMonth : null}
                  maxDate={role == "admin" ? lastDayOfMonth : null}
                  onChange={(newValue) =>
                    setValue(newValue.format("YYYY-MM-DD"))
                  }
                />
              </DemoContainer>
            </LocalizationProvider>
          </Box>
        )}
        <Box>
          {value && (
            <Button variant="outlined" onClick={() => setValue(null)}>
              <FilterAltOffIcon /> Ջնջել ամսաթվի ֆիլտրը
            </Button>
          )}
        </Box>
      </Box>
      {arxive ? (
        <Box sx={{ overflow: "auto", marginBottom: "100px" }}>
          <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Աշխատող</TableCell>
                    <TableCell align="left">Աշխատանքի տեսակը</TableCell>
                    <TableCell align="left">Ամսաթիվ</TableCell>
                    <TableCell align="left">Գին</TableCell>
                    <TableCell align="left">Աշխատավարձ</TableCell>
                    <TableCell align="left">Օգուտ</TableCell>
                    {role === "admin" && (
                      <TableCell align="left">Ջնջել</TableCell>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.length ? (
                    data?.map((row) => (
                      <TableRow
                        key={row.modeName}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row" align="left">
                          {row?.Service?.User?.name}
                        </TableCell>
                        <TableCell component="th" scope="row" align="left">
                          {row?.Service?.name}
                        </TableCell>
                        <TableCell component="th" scope="row" align="left">
                          {row?.Service?.price} ֏
                        </TableCell>{" "}
                        <TableCell component="th" scope="row" align="left">
                          {row.createdAt.slice(0, 10)}{" "}
                          {row.createdAt.slice(11, 16)}
                        </TableCell>
                        <TableCell component="th" scope="row" align="left">
                          {row?.Service?.benefit} ֏
                        </TableCell>{" "}
                        <TableCell component="th" scope="row" align="left">
                          {Number(row?.Service?.price) -
                            Number(row?.Service?.benefit)}{" "}
                          ֏
                        </TableCell>{" "}
                        {role === "admin" && (
                          <TableCell component="th" scope="row" align="left">
                            <Button
                              variant="outlined"
                              color="error"
                              onClick={() => dispatch(deleteWork(row.id, role))}
                            >
                              <DeleteIcon sx={{ color: "red" }} />
                            </Button>
                          </TableCell>
                        )}
                      </TableRow>
                    ))
                  ) : (
                    <Box
                      p={2}
                      sx={{
                        width: "100%",
                        height: "20vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      Դատարկ
                    </Box>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            padding: "15px",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          {services?.map((row) => (
            <Card
              sx={{
                width: 300,
                padding: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: current == row.id ? "white" : "#2C2125",
                color: current == row.id ? "#2C2125" : "white",
                border: "1px solid",
                borderColor: current == row.id ? "#2C2125" : "white",
                cursor: "pointer",
                flexDirection: "column",
              }}
              onClick={() => {
                setCurrent(row.id);
                setCategory(row);
                setSetAdd(true);
              }}
            >
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {row?.name}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  {row?.price} ֏
                </Typography>
              </CardContent>
            </Card>
          ))}
          {/* {current && (
            <Box mt={2} p={2}>
              <Button
                variant="contained"
                onClick={() => {
                  if (current) {
                    dispatch(
                      addWork({
                        userId: id,
                        serviceId: current,
                      })
                    );
                    setCurrent(null);
                    Swal.fire({
                      position: "center",
                      iconColor: "#1d37de",
                      icon: "success",
                      showConfirmButton: false,
                      timer: 1500,
                    });
                  }
                }}
              >
                Հաստատել
              </Button>
            </Box>
          )} */}
        </Box>
      )}

      <AddWork
        open={add}
        setClose={setSetAdd}
        current={current}
        category={category}
        setCurrent={setCurrent}
      />
      <Results open={results} setClose={setResults} all={false} />
    </Box>
  );
};

export default Work;
