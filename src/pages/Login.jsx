import { useState } from "react";
import {
  Grid,
  TextField,
  Box,
  Checkbox,
  styled,
  ButtonBase,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import * as Yup from "yup";
import { useFormik } from "formik";
// CUSTOM DEFINED HOOK
import useAuth from "hooks/useAuth";
// CUSTOM COMPONENTS
import { Link } from "components/link";
import { H5, H6, Paragraph } from "components/typography";
import { FlexBetween, FlexBox, FlexRowAlign } from "components/flexbox";
import useNavigate from "hooks/useNavigate";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
    remember: true,
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Must be a valid email")
      .max(255)
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password should be of minimum 6 characters length")
      .required("Password is required"),
  });
  const { errors, values, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: async (values) => {
        try {
          setIsLoading(true);
          //   await
          setTimeout(() => {
            // setIsLoading(false);
            localStorage.setItem("toimitek_token", "value");
            navigate("/units");
          }, 3000);
        } catch (error) {
          setIsLoading(false);
          console.log(error);
        }
      },
    });
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#EFF5F5",
      }}
    >
      <Box
        maxWidth={550}
        p={4}
        sx={{
          bgcolor: "#fff",
          borderRadius: "8px",
          boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          maxWidth: { xs: "90%", sm: "90%", md: "30%" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            justifyContent: "space-between",
            alignItems: "center",
            mb: "40px",
          }}
        >
          <Box
            component="img"
            src="/static/logo/logo.png"
            sx={{
              maxWidth: "100px",
              // mb: "30px",
            }}
          />
          {/* <Paragraph color="text.secondary">
            New user?
            <Box fontWeight={500} component={Link} href="/register">
              Create an Account
            </Box>
          </Paragraph> */}
        </Box>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                placeholder="Enter your email"
                name="email"
                onBlur={handleBlur}
                value={values.email}
                onChange={handleChange}
                helperText={touched.email && errors.email}
                error={Boolean(touched.email && errors.email)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
                name="password"
                onBlur={handleBlur}
                value={values.password}
                onChange={handleChange}
                helperText={touched.password && errors.password}
                error={Boolean(touched.password && errors.password)}
                InputProps={{
                  endAdornment: (
                    <FlexRowAlign
                      onClick={() => setShowPassword(!showPassword)}
                      sx={{
                        cursor: "pointer",
                      }}
                    >
                      {showPassword ? (
                        <VisibilityOff fontSize="small" />
                      ) : (
                        <Visibility fontSize="small" />
                      )}
                    </FlexRowAlign>
                  ),
                }}
              />

              <FlexBetween my={1}>
                <FlexBox alignItems="center" gap={1}>
                  <Checkbox
                    sx={{
                      p: 0,
                    }}
                    name="remember"
                    value={values.remember}
                    onChange={handleChange}
                    checked={values.remember}
                  />
                  <Paragraph fontWeight={500}>Remember me</Paragraph>
                </FlexBox>
              </FlexBetween>
            </Grid>

            <Grid item xs={12}>
              <LoadingButton
                sx={{
                  bgcolor: "#000",
                  transition: "opacity .5s",
                  "&:hover": {
                    bgcolor: "#000",
                    opacity: ".7",
                  },
                  "&.MuiLoadingButton-loading": {
                    color: "#000",
                    bgcolor: "#000",
                    opacity: ".7",
                  },
                }}
                loading={isLoading}
                type="submit"
                variant="contained"
                fullWidth
              >
                Sign In
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};
export default LoginPage;
