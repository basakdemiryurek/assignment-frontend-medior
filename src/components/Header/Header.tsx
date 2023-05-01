import { Box, Typography } from "@mui/material";

export interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => (
  <Box sx={{ p: "15px" }}>
    <Typography variant="h5" textAlign="center">
      {title}
    </Typography>
  </Box>
);

export default Header;
