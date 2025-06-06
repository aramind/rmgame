import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import React, { useState } from "react";
import { HamburgerIcon } from "../../utils/muiIcons";
import { NavLink } from "react-router-dom";

const NavLinksMobile = ({ pages }) => {
  const [anchorMenu, setAnchorMenu] = useState(null);

  const handleCloseMenu = () => {
    setAnchorMenu(null);
  };

  return (
    <>
      <IconButton onClick={(e) => setAnchorMenu(e.currentTarget)}>
        <HamburgerIcon
          sx={{
            fontSize: "50px",
            color: (theme) => theme.palette.secondary.main,
          }}
        />
      </IconButton>

      <Menu
        id="navlinks-mobile"
        open={Boolean(anchorMenu)}
        anchorEl={anchorMenu}
        onClose={handleCloseMenu}
        slotProps={{
          paper: {
            sx: {
              backgroundColor: (theme) => theme.palette.black.light,
            },
          },
        }}
      >
        {pages?.map((page, index) => (
          <MenuItem key={index} onClick={handleCloseMenu} className="centered">
            <NavLink
              to={`/${page.name}`}
              style={({ isActive }) => ({
                textDecoration: "none",
                color: isActive ? "#CCA114" : "#F2E7BF",
                width: "100%",
                transition: "color 0.3s",
              })}
            >
              <Typography
                variant="h6"
                noWrap
                textAlign="center"
                width={1}
                sx={{
                  "&:hover": {
                    color: "secondary.light",
                  },
                }}
              >
                {page.text}
              </Typography>
            </NavLink>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default NavLinksMobile;
