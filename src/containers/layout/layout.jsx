import { useState } from "react";
import Navbar from "./navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import { useIsMobile } from "../../hooks/useScreenType";
import { isAuthPages, notAuthPages } from "../../routing/routes";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

import "./layout.css";
import Footer from "../footer/Footer";

export default function MainLayout() {
  const isMobile = useIsMobile();
  const [close, setClose] = useState(!isMobile);
  const auth = useSelector((state) => state.auth.isAuth);

  return (
    <div className="home">
      <div
        className="homeContainer"
        style={{ display: close && isMobile ? "none" : "block" }}
      >
        <Navbar close={close} setClose={setClose} />
        <Box>
          <Routes>
            {auth
              ? isAuthPages.map((i) => {
                  return (
                    <Route path={i.path} element={i.Component} key={i.id} />
                  );
                })
              : notAuthPages.map((i) => {
                  return (
                    <Route path={i.path} element={<i.Component />} key={i.id} />
                  );
                })}
          </Routes>
        </Box>
        <Box>{auth && <Footer />}</Box>
      </div>
    </div>
  );
}
