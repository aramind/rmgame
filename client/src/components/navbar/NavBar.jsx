import { AppBar, Box, Link, Stack, Toolbar, Typography } from "@mui/material";
import useIsInMobile from "../../hooks/useIsInMobile";
import NavLinksMobile from "./NavLinksMobile";
import NavbarLinks from "./NavbarLinks";
import { NavLink } from "react-router-dom";

const pages = [
  { text: "play", name: "play" },
  { text: "history", name: "history" },
  { text: "about", name: "about" },
];

const NavBar = () => {
  const isInMobile = useIsInMobile();
  return (
    <AppBar sx={{ maxHeight: "80px" }} elevation={0}>
      <Toolbar sx={{ backgroundColor: (theme) => theme.palette.black.main }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          width={1}
          alignItems="center"
          pr={{ md: 4 }}
        >
          <NavLink to={"/"}>
            <Typography
              variant={isInMobile ? "h5" : "h4"}
              fontWeight="bold"
              color="primary"
            >
              RM
            </Typography>
          </NavLink>
          <Box width={1} />
          {isInMobile ? (
            <NavLinksMobile pages={pages} />
          ) : (
            <NavbarLinks pages={pages} />
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
