import { Link, Stack, Typography } from "@mui/material";
import React from "react";

const NavbarLinks = ({ sections }) => {
  const active = false;
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={4}
    >
      {sections?.map((s) => (
        <Link
          href={`#${s.name}`}
          sx={{
            color: active === s.name ? "secondary.main" : "white.main",
            transition: "color 0.3s",
            "&:hover": {
              color: "secondary.light",
            },
          }}
        >
          <Typography variant="h6" noWrap>
            {s.text}
          </Typography>
        </Link>
      ))}
    </Stack>
  );
};

export default NavbarLinks;
