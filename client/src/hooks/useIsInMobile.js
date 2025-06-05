import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@mui/material";

const useIsInMobile = () => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down("md"));
};

export default useIsInMobile;
