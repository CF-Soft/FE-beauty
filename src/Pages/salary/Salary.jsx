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
import { useNavigate } from "react-router-dom";
import {
  deleteWork,
  getResults,
  getUsers,
  getWorks,
} from "../../store/actions/user-action";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { HOME_PAGE } from "../../routing/pats";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { getMe } from "../../store/actions/auth-action";
import dayjs from "dayjs";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { MonthCalendar } from "@mui/x-date-pickers";
import Swal from "sweetalert2";

const Salary = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const firstDayOfMonth = dayjs().startOf("month");
  const lastDayOfMonth = dayjs().endOf("month");
  const [value, setValue] = useState();
  const [access, setAccess] = useState(false);
  const [month] = useState(null);
  const [monthly, setMontly] = useState(false);
  const data = useSelector((state) => state.users.work);
  const role = useSelector((state) => state.auth.isSuper);
  const users = useSelector((state) => state.users.users);
  const calc = useSelector((state) => state.users.results);
  const [usersName, setUsersName] = useState({})

  useEffect(() => {
    dispatch(
      getWorks({
        userId: user,
        date: value,
      })
    );
    dispatch(
      getResults({
        userId: user,
        date: value,
      })
    );
  }, [dispatch, user, value]);

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getMe());
  }, []);

    useEffect(() => {
        if (users) {
            const newUsersName = { ...usersName }; // Copy the existing state

            for (let i = 0; i < users.length; i++) {
                console.log(users[i]?.id, 'users[i]?.id');
                console.log(users[i]?.name, 'users[i]?.name');
                newUsersName[users[i]?.id] = users[i]?.name; // Accumulate updates
            }

            setUsersName(newUsersName); // Set the state once after the loop
        }
    }, [users]);

  const handleDeleteWork = (id, role)=>{
      Swal.fire({
          title: "Համոզվա՞ծ ես։",
          text: "Դուք ցանկանում եք ջնջել?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          cancelButtonText: "Ոչ",
          confirmButtonText: "Այո՛"
      }).then((result) => {
          if (result.isConfirmed) {
              dispatch(deleteWork(id, role));
              Swal.fire({
                  title: "Ջնջված է",
                  text: "Ձեր ֆայլը ջնջվել է:",
                  showConfirmButton: false,
                  icon: "success",
                  timer: 1500,
              });
          }
      });
  }
  const getMonth = (month) => {
    const startOfMonth = month?.startOf("month");
    const endOfMonth = month?.endOf("month");
    const formattedStart = startOfMonth?.format("YYYY-MM-DD");
    const formattedEnd = endOfMonth?.format("YYYY-MM-DD");

    getWorks({
      userId: user,
      start: formattedStart,
      end: formattedEnd,
    });
    dispatch(
      getWorks({
        userId: user,
        start: formattedStart,
        end: formattedEnd,
      })
    );
  };

  return (
    <Box component={Paper}>
      <Box p={2}>
        <h1>Աշխատանքներ</h1>
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
        <Box>
          <Button variant="outlined" onClick={() => navigate(HOME_PAGE)}>
            <KeyboardBackspaceIcon />
            Վերադառնալ
          </Button>
        </Box>
        <Box>
          <Select
            fullWidth
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={user}
            label="Ծառայություն"
            onChange={(e) => setUser(e.target.value)}
            sx={{
              width: "300px",
              color: "black",
            }}
          >
            {users?.map((i) => (
              <MenuItem value={i?.id} key={i?.id}>
                {i?.name}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box>
          {user && (
            <Button variant="outlined" onClick={() => setUser(null)}>
              <FilterAltOffIcon /> Ջնջել աշխատողի ֆիլտրը
            </Button>
          )}
        </Box>
        {role == "admin" ? (
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
        ) : (
          <Box>
            <Box pt={2}>
              <Button onClick={() => setMontly(!monthly)} variant="outlined">
                {monthly ? "Օրական" : "Դիտել ամսական"}
              </Button>
            </Box>
            {monthly ? (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <MonthCalendar
                    value={month}
                    onChange={(newValue) => getMonth(dayjs(newValue))}
                  />
                </DemoContainer>
              </LocalizationProvider>
            ) : (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    value={value}
                    onChange={(newValue) =>
                      setValue(newValue.format("YYYY-MM-DD"))
                    }
                  />
                </DemoContainer>
              </LocalizationProvider>
            )}
          </Box>
        )}

        <Box>
          {value && (
            <Button
              variant="outlined"
              onClick={() => setValue(null)}
              color="error"
            >
              <FilterAltOffIcon sx={{ color: "red" }} /> Ջնջել ամսաթվի ֆիլտրը
            </Button>
          )}
        </Box>
        <Box>
          <Button
            variant="outlined"
            color="error"
            onClick={() => setAccess(!access)}
          >
            <DeleteIcon /> {access ? "ետ" : "Ջնջել"}
          </Button>
        </Box>
      </Box>
      <hr />
      <Box
        p={2}
        sx={{
          display: "flex",
        }}
      >
        <Box>
          <h1>Արդյունքներ</h1>
          <h3>Ամբողջական - {calc?.all} ֏</h3>
          <h3>Օգուտ - {calc?.cantora} ֏</h3>
          <h3>Աշխատավարձ - {calc?.benefit} ֏</h3>
        </Box>
      </Box>
      <hr />

      <Box sx={{ overflow: "auto", marginBottom: "100px" }}>
        <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {/* <TableCell align="left">Աշխատանքի տեսակը</TableCell>
                  <TableCell align="left">Գին</TableCell>
                  <TableCell align="left">Աշխատողի աշխատանքը</TableCell>
                  <TableCell align="left">Ամսաթիվ</TableCell> */}

                  <TableCell align="left">Աշխատող</TableCell>
                  <TableCell align="left">Աշխատանքի տեսակը</TableCell>
                  <TableCell align="left">Ամսաթիվ</TableCell>
                  <TableCell align="left">Գին</TableCell>
                  <TableCell align="left">Աշխատավարձ</TableCell>
                  <TableCell align="left">Օգուտ</TableCell>
                  {access && <TableCell align="left">Ջնջել</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.length ? (
                  data?.map((row, index) => {
                      return (
                    <TableRow
                      key={index}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      {/* <TableCell component="th" scope="row" align="left">
                        {row?.Service?.name}
                      </TableCell>
                      <TableCell component="th" scope="row" align="left">
                        {row?.Service?.price} ֏
                      </TableCell>{" "}
                      <TableCell component="th" scope="row" align="left">
                        {row?.Service?.benefit} ֏
                      </TableCell>{" "}
                      <TableCell component="th" scope="row" align="left">
                        {row.createdAt.slice(0, 10)}{" "}
                        {row.createdAt.slice(11, 16)}
                      </TableCell> */}
                      <TableCell component="th" scope="row" align="left">
                        {row?.Service?.User?.name || usersName[row?.userId]}
                      </TableCell>
                      <TableCell component="th" scope="row" align="left">
                        {row?.Service?.name}
                      </TableCell>
                      <TableCell component="th" scope="row" align="left">
                        {row.createdAt.slice(0, 10)}{" "}
                        {row.createdAt.slice(11, 16)}
                      </TableCell>
                      <TableCell component="th" scope="row" align="left">
                        {row?.Service?.price} ֏
                      </TableCell>{" "}
                      <TableCell component="th" scope="row" align="left">
                        {row?.Service?.benefit} ֏
                      </TableCell>{" "}
                      <TableCell component="th" scope="row" align="left">
                        {Number(row?.Service?.price) -
                          Number(row?.Service?.benefit)}{" "}
                        ֏
                      </TableCell>{" "}
                      {access && (
                        <TableCell component="th" scope="row" align="left">
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={() => handleDeleteWork(row.id, role)}
                          >
                            <DeleteIcon sx={{ color: "red" }} />
                          </Button>
                        </TableCell>
                      )}
                    </TableRow>
                  )})
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
    </Box>
  );
};

export default Salary;
