import { Avatar, Box, Paper, Typography } from "@mui/material";

import { ProfileItem } from "./profile-item";
import { useAppSelector } from "hooks/redux";
import { selectUserState } from "store/user/user.slice";
import { Loader } from "components/loader/loader";

const styles = {
  container: {
    margin: "auto",
    p: 3,
  },
  avatarContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    marginBottom: "40px",
  },
  avatar: { width: 150, height: 150 },
  infoContainer: { display: "flex", flexDirection: "column", gap: "20px" },
};

export const UserProfile = () => {
  const { user } = useAppSelector(selectUserState);

  return (
    <>
      {user ? (
        <Paper sx={styles.container} elevation={4}>
          <Box sx={styles.avatarContainer}>
            <Avatar
              alt={`${user.first_name} ${user.last_name}`}
              src={user.avatar ? user.avatar : undefined}
              sx={styles.avatar}
            />
            <Typography component="div" variant="h4">
              {user?.username}
            </Typography>
          </Box>
          <Box sx={styles.infoContainer}>
            <ProfileItem name="First Name" value={user.first_name} />
            <ProfileItem name="Last Name" value={user.last_name} />
            <ProfileItem name="Email" value={user.email} />
          </Box>
        </Paper>
      ) : (
        <Loader />
      )}
    </>
  );
};
