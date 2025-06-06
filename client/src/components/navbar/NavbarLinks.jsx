import React from "react";
import { Stack, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const NavbarLinks = ({ pages }) => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={4}
    >
      {pages?.map((page) => (
        <NavLink
          key={page.name}
          to={`/${page.name}`}
          style={({ isActive }) => ({
            textDecoration: "none",
            color: isActive ? "#CCA114" : "#F2E7BF",
            transition: "color 0.3s",
          })}
        >
          {({ isActive }) => (
            <Typography
              variant="h6"
              noWrap
              sx={{
                "&:hover": {
                  color: "secondary.light",
                },
              }}
            >
              {page.text}
            </Typography>
          )}
        </NavLink>
      ))}
    </Stack>
  );
};

export default NavbarLinks;
