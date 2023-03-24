import { Box, styled } from "@mui/material";
import React from "react";

const Task = ({ task }) => {
  return <Card>{task.draft}</Card>;
};

export default Task;

const Card = styled(Box)({
  padding: "20px",
  background: "#ffffff",
  border: "1px solid lightgray",
  borderRadius: "10px",
});
