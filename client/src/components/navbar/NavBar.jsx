import { AppBar, Box, Link, Stack, Toolbar, Typography } from "@mui/material";
import useIsInMobile from "../../hooks/useIsInMobile";
import NavLinksMobile from "./NavLinksMobile";
import NavbarLinks from "./NavbarLinks";
const sections = [
  { text: "play", name: "play" },
  { text: "leaderboard", name: "leaderboard" },
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
        >
          <Link href={`#`}>
            <Typography
              variant={isInMobile ? "h5" : "h4"}
              fontWeight="bold"
              color="primary"
            >
              RM
            </Typography>
          </Link>
          <Box width={1} />
          {isInMobile ? (
            <NavLinksMobile sections={sections} />
          ) : (
            <NavbarLinks sections={sections} />
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
