import { LoadingButton } from "@mui/lab";
import { Box, TextField, Typography } from "@mui/material";
import { ChangeEvent, FC, useState, FormEvent } from "react";

import { useAppDispatch, useAppSelector } from "hooks/redux";
import { login, selectUserState } from "store/user/user.slice";

interface BackgroundLocation {
  backgroundLocation?: Location;
}

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    margin: "auto",
    width: { xs: "100%", sm: "550px" },
  },
  title: { color: "rgba(0, 0, 0, 0.87)" },
  error: { paddingLeft: "15px", color: "red" },
  button: {
    backgroundColor: "#F7C815",
    color: "rgba(0, 0, 0, 0.87)",
    fontWeight: 500,
    "&:hover": {
      backgroundColor: "#ac8c0e",
    },
    "&:active": {
      backgroundColor: "#ac8c0e",
    },
    "&:focus": {
      backgroundColor: "#ac8c0e",
    },
  },
};

export const LoginForm: FC = () => {
  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });
  const dispatch = useAppDispatch();
  const { error, isLoading } = useAppSelector(selectUserState);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(login(formState));
  };

  const handleFormFields = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={styles.form}>
      <Typography variant="h4" align="center" sx={styles.title}>
        Login
      </Typography>
      <TextField
        required
        fullWidth
        label="username: 'admin'"
        name="username"
        type="text"
        value={formState.username}
        onChange={handleFormFields}
      />
      <TextField
        required
        fullWidth
        label="password: '12345'"
        name="password"
        type="password"
        value={formState.password}
        onChange={handleFormFields}
      />
      {error && (
        <Box>
          <Typography sx={styles.error}>{error?.details?.reason}</Typography>
        </Box>
      )}
      <LoadingButton
        type="submit"
        variant="contained"
        loading={isLoading}
        sx={styles.button}
      >
        Login
      </LoadingButton>
    </Box>
  );
};
