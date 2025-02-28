import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeAccessedWork,
  deleteWork,
  getAccessWorks,
  getUsers,
} from "../../store/actions/user-action";
import { Box, Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../store/actions/auth-action";
import { HOME_PAGE } from "../../routing/pats";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Swal from "sweetalert2";

const Deleted = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.users.accessWorks);
  const role = useSelector((state) => state.auth.isSuper);

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getAccessWorks());
    dispatch(getMe());
  }, []);

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
                dispatch(getAccessWorks());
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

  return (
    <Box>
      <Box p={2}>
        <h1>Ջնջված տվյալները </h1>
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
      </Box>
      <Box sx={{ overflow: "auto", marginBottom: "100px" }}>
        <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Աշխատող</TableCell>

                  <TableCell align="left">Աշխատանքի տեսակը</TableCell>
                  <TableCell align="left">Գին</TableCell>
                  <TableCell align="left">Աշխատավարձ</TableCell>
                  <TableCell align="left">Ամսաթիվ</TableCell>
                  <TableCell align="left">վերադարձնել</TableCell>
                  <TableCell align="left">Ջնջել</TableCell>
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
                        {row?.Service?.benefit} ֏
                      </TableCell>{" "}
                      <TableCell component="th" scope="row" align="left">
                        {row.createdAt.slice(0, 10)}{" "}
                        {row.createdAt.slice(11, 16)}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          onClick={() => {
                            dispatch(changeAccessedWork(row.id));
                            setTimeout(() => {
                              dispatch(getAccessWorks());
                            }, "1000");
                          }}
                        >
                          վերադարձնել
                        </Button>
                      </TableCell>
                      <TableCell component="th" scope="row" align="left">
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleDeleteWork(deleteWork(row.id, role))}
                        >
                          <DeleteIcon sx={{ color: "red" }} />
                        </Button>
                      </TableCell>
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
    </Box>
  );
};

export default Deleted;
