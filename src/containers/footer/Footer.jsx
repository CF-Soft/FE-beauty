import React from "react";
import "../layout/sidebar/sidebar.css";
import CopyrightIcon from "@mui/icons-material/Copyright";
const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <div className="footerBox">
      <CopyrightIcon />
      <a href="https://createfuturesoftware.com/en" target="_blanc">
        Create Future Software {year}
      </a>
    </div>
  );
};

export default Footer;
