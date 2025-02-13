import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getResults } from "../../store/actions/user-action";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useParams } from "react-router-dom";
import { useIsMobile } from "../../hooks/useScreenType";
import CloseIcon from "@mui/icons-material/Close";
import { getMe } from "../../store/actions/auth-action";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MonthCalendar } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const Results = ({ open, setClose, all }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [value, setValue] = useState(null);
  const [month] = useState(null);
  const [monthly, setMontly] = useState(false);
  const data = useSelector((state) => state.users.results);
  const role = useSelector((state) => state.auth.isSuper);
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
    dispatch(getMe());
    if (role === "superAdmin") {
      const yourDateObject = new Date();

      const yourDayjsObject = dayjs(yourDateObject);

      const startOfMonth = yourDayjsObject.startOf("month");
      const endOfMonth = yourDayjsObject.endOf("month");

      const formattedStart = startOfMonth.format("YYYY-MM-DD");
      const formattedEnd = endOfMonth.format("YYYY-MM-DD");

      dispatch(
        getResults({
          start: formattedStart,
          end: formattedEnd,
        })
      );
    }
    all
      ? dispatch(
          getResults({
            date: value,
          })
        )
      : dispatch(
          getResults({
            userId: id,
            date: value,
          })
        );
  }, [id, open, value, monthly, all, dispatch, role]);

  const getMonth = (month) => {
    const startOfMonth = month?.startOf("month");
    const endOfMonth = month?.endOf("month");
    const formattedStart = startOfMonth?.format("YYYY-MM-DD");
    const formattedEnd = endOfMonth?.format("YYYY-MM-DD");


    dispatch(
      getResults({
        date: value,
        start: formattedStart,
        end: formattedEnd,
      })
    );
  };
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
          Արդյունքներ
        </Typography>

        <Box mt={2} p={2}>
          <Box pt={2}>
            <Button onClick={() => setMontly(!monthly)} variant="outlined">
              {monthly ? "Վերադառնալ" : "Դիտել ամսական"}
            </Button>
          </Box>
          {monthly ? (
            <Box>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <MonthCalendar
                    value={month}
                    onChange={(newValue) => getMonth(dayjs(newValue))}
                  />
                </DemoContainer>
              </LocalizationProvider>
              <Box>
                <Typography component="h3">
                  Ամբողջական - {data?.all} ֏
                </Typography>
                <Typography component="h3">
                  Օգուտ - {data?.cantora} ֏
                </Typography>
                <Typography component="h3">
                  Աշխատավարձ - {data?.benefit} ֏
                </Typography>
              </Box>
            </Box>
          ) : (
            <>
              <Box>
                <Box>
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
                </Box>
                <Box mt={1} mb={1}>
                  {value && (
                    <Button variant="outlined" onClick={() => setValue(null)}>
                      <FilterAltOffIcon /> Ջնջել ամսաթվի ֆիլտրը
                    </Button>
                  )}
                </Box>
              </Box>
              <Box>
                <Typography component="h3">
                  Ամբողջական - {data?.all} ֏
                </Typography>
                <Typography component="h3">
                  Օգուտ - {data?.cantora} ֏
                </Typography>
                <Typography component="h3">
                  Աշխատավարձ - {data?.benefit} ֏
                </Typography>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default Results;
