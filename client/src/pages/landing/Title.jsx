import { Box, Typography } from "@mui/material";
import useIsInMobile from "../../hooks/useIsInMobile";

const Title = () => {
  const isInMobile = useIsInMobile();
  return (
    <Box marginBottom={1} marginX="auto">
      <Typography
        variant="h1"
        fontSize={isInMobile ? "4rem" : null}
        sx={localStyles.title}
        color="primary"
      >
        RM GAME
      </Typography>
    </Box>
  );
};

export default Title;

const localStyles = {
  title: {
    fontFamily: (theme) => theme.typography.poppins,
    fontWeight: "bold",
    textAlign: "center",
  },
};
