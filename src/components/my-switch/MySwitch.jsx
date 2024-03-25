import { useState } from "react";
import Switch from "@mui/material/Switch";
import { baseUrl, notifySuccess, notifyError } from "../../utils/generalUtils";
import { Box } from "@mui/material";

import axios from "axios";

export default function MySwitch({
  item,
  endpoint,
  key,
  id,
  initialStatus,
  color,
  // setForceUpdate,
}) {
  const [status, setStatus] = useState(initialStatus);
  const updateStatus = () => {
    axios
      .patch(
        `${baseUrl}/users/${id}/`,
        // { is_active: !user.is_active },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("acc-token")}`,
          },
        }
      )
      .then((res) => {
        // setForceUpdate((prev) => !prev);
        notifySuccess(`status is updated successfully!`);
      })
      .catch((err) => {
        notifyError("Something went wrong!");
        setStatus((prev) => !prev);
      });
  };
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Switch
        color={color}
        checked={status}
        onChange={() => {
          setStatus((prev) => !prev);
          updateStatus();
        }}
        inputProps={{ "aria-label": "controlled" }}
      />
    </Box>
  );
}
