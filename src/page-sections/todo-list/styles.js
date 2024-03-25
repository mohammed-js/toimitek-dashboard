import { styled, IconButton } from "@mui/material";
export const DroppableWrapper = styled("div")({
  maxHeight: "calc(100% - 53px)",
  minHeight: "calc(100% - 53px)",
  padding: "1rem",
  overflow: "auto",
  "&[data-rbd-droppable-id='todo']": {
    maxHeight: "calc(100% - 129px)",
    minHeight: "calc(100% - 129px)"
  }
});
export const MoreButton = styled(IconButton)(({
  theme
}) => ({
  backgroundColor: theme.palette.grey[50],
  border: `1px solid ${theme.palette.grey[100]}`
}));