import { forwardRef } from "react";
// STYLED COMPONENT
import { StyledAvatar } from "./styles";

// ==============================================================

// ==============================================================

const AvatarLoading = forwardRef((props, ref) => {
  const {
    percentage,
    alt = "user",
    borderSize = 1,
    src = "/static/user/user-11.png",
    ...others
  } = props;
  const DEG = Math.round(percentage / 100 * 360);
  return <StyledAvatar ref={ref} alt={alt} src={src} deg={DEG} borderSize={borderSize} {...others} />;
});
export default AvatarLoading;