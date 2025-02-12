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
import AddIcon from "@mui/icons-material/Add";

import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { HOME_PAGE } from "../../routing/pats";
import {
  deleteCategory,
  getCategory,
} from "../../store/actions/category-action";
import { useNavigate } from "react-router-dom";
import AddCategory from "../../components/addCategory/AddCategory";

const Categories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const data = useSelector((state) => state.category.category);

  useEffect(() => {
    dispatch(getCategory({}));
  }, []);

  return (
    <Box component={Paper} sx={{ minHeight: "100vh" }}>
      <Box p={2}>
        <h1>կատեգորիա</h1>
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
          <Button variant="outlined" onClick={() => setOpen(true)}>
            <AddIcon />
            Ավելացնել
          </Button>
        </Box>
      </Box>

      <Box sx={{ overflow: "auto", marginBottom: "30px" }}>
        <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Անուն</TableCell>
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
                        {row?.name}
                      </TableCell>

                      <TableCell component="th" scope="row" align="left">
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => dispatch(deleteCategory(row.id))}
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
      <AddCategory open={open} setClose={setOpen} />
    </Box>
  );
};

export default Categories;
