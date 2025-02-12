import React, { useEffect, useState } from "react";
import "./navbar.css";
import Menu from "@mui/material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import { getMe, logoutAction } from "../../../store/actions/auth-action";
import {
  DELETED_PAGE,
  HOME_PAGE,
  LOGIN_PAGE,
  SETTINGS_PAGE,
} from "../../../routing/pats";
import {
  changeAccessedWork,
  getAccessWorks,
} from "../../../store/actions/user-action";
import { Button } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";

const Navbar = ({ close, setClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const role = useSelector((state) => state.auth.isSuper);
  const data = useSelector((state) => state.users.accessWorks);
  const deleted = useSelector((state) => state.users.accessWorks);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  useEffect(() => {
    dispatch(getMe());
  }, []);
  useEffect(() => {
    dispatch(getAccessWorks());
  }, [role]);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogOut = () => {
    dispatch(logoutAction());
    navigate(LOGIN_PAGE);
  };
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="items">
          {isAuth && (
            <div className="item">
              <PersonIcon
                sx={{
                  color: "white",
                }}
                fontSize="large"
                onClick={() => navigate(HOME_PAGE)}
                className="avatar"
              />
            </div>
          )}
          {role == "superAdmin" && (
            <div className="item">
              <Button
                sx={{ color: "white" }}
                onClick={() => navigate(SETTINGS_PAGE)}
              >
                <SettingsIcon sx={{ color: "white" }} />
              </Button>
            </div>
          )}
          <div className="item">
            {data?.length > 0 && role == "superAdmin" && (
              <Button
                variant="outlined"
                sx={{
                  // background: "white",
                  color: "white",
                  "&:hover": {
                    color: "#2C2125",
                    backgroundColor: "white",
                  },
                }}
                onClick={() => navigate(DELETED_PAGE)}
              >
                <NotificationsIcon sx={{ color: "red" }} />
                <span
                  style={{
                    fontSize: "10px",
                    position: "absolute",
                    top: "2px",
                    right: "10px",
                    color: "red",
                  }}
                >
                  {data?.length}
                </span>
              </Button>
            )}
          </div>
          {isAuth && (
            <div className="item">
              <h2 style={{ color: "white" }}>
                {role == "superAdmin" ? "Սուպեր Ադմին" : "Ադմին"}
              </h2>
            </div>
          )}

          {data?.length > 0 && role == "admin" && (
            <div className="item">
              <Button
                variant="contained"
                sx={{
                  background: "white",
                  color: "red",
                  "&:hover": {
                    color: "#1d37de",
                    backgroundColor: "white",
                  },
                }}
                onClick={handleClick}
              >
                ջնջված տվյալներ
              </Button>
              <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                {deleted?.map((row) => {
                  return (
                    <MenuItem>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          <h4>{row?.Service?.User?.name}</h4>
                          <h5>
                            {row?.Service?.name} | {row.createdAt.slice(0, 10)}
                            {row.createdAt.slice(11, 16)}
                          </h5>
                        </div>
                        <div>
                          <Button
                            onClick={() => {
                              dispatch(changeAccessedWork(row.id));
                              handleClose();
                              dispatch(getAccessWorks());
                            }}
                          >
                            վերադարձնել
                          </Button>
                        </div>
                      </div>
                    </MenuItem>
                  );
                })}
              </Menu>
            </div>
          )}
        </div>
      </div>
      {isAuth && (
        <div className="revert">
          <Button sx={{ color: "white" }} onClick={handleLogOut}>
            <LogoutIcon />
            Logout
          </Button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
