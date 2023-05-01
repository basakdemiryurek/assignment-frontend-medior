import { Box, Stack } from "@mui/material";
import styled from "styled-components";

export const StyledItem = styled(Box)(() => ({
  backgroundColor: "#fff",
  padding: "15px",
  borderRadius: '5px'
}));

export const StyledStack = styled(Stack)(() => ({
  padding: "5px",
  maxHeight: "300px",
  overflow: "auto",
  gap: "5px",
}));
