import "./sidebar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { HOME_PAGE } from "../../../routing/pats";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import CloseIcon from "@mui/icons-material/Close";
import { Tooltip } from "@mui/material";
import { useIsMobile } from "../../../hooks/useScreenType";
import { useEffect, useState } from "react";

const Sidebar = ({ close, setClose }) => {
  let location = useLocation();
  const isMobile = useIsMobile();
  const [pathName, setPathName] = useState(location.pathname);
  const isAuth = useSelector((state) => state.auth.isAuth);

  const pages = [{ id: 1, path: HOME_PAGE, name: "home" }];

  useEffect(() => {
    setPathName(location.pathname);
    pathName !== window.location.pathname && setClose(false);
  }, [window.location.pathname]);

  return (
    <div className="sidebar">
      {isMobile && (
        <div className="sidebar-close">
          <Tooltip title="Sidebar" arrow>
            {close ? (
              <CloseIcon
                onClick={() => setClose(!close)}
                style={{
                  cursor: "pointer",
                }}
                fontSize="large"
                sx={{ color: "white", fontSize: "25px" }}
              />
            ) : (
              <ClearAllIcon
                onClick={() => setClose(!close)}
                style={{
                  cursor: "pointer",
                }}
                sx={{ color: "white" }}
              />
            )}
          </Tooltip>
        </div>
      )}
      <ul>
        {isAuth &&
          pages?.map(({ id, path, name }) => {
            return (
              <div key={id}>
                <Link
                  to={path}
                  style={{ textDecoration: "none" }}
                  key={id}
                  className={
                    location.pathname === path ? "activeLink" : "pasiveLink"
                  }
                >
                  <li>{name}</li>
                </Link>
              </div>
            );
          })}
      </ul>
    </div>
  );
};

export default Sidebar;
