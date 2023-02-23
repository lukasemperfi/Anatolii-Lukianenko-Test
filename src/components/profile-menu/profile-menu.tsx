import { Menu, MenuItem, PopoverOrigin, Typography } from "@mui/material";
import { FC, MouseEvent } from "react";
import { Link } from "react-router-dom";

export type MenuItem = {
  id: number;
  label: string;
  path: string;
};

interface ProfileMenuProps {
  menu: MenuItem[];
  open: boolean;
  anchorElUser: null | HTMLElement;
  onItemClick: (event: MouseEvent<HTMLElement>) => void;
  onClose: () => void;
}

const styles = {
  menu: { mt: "45px" },
  label: { color: "inherit" },
};

export const ProfileMenu: FC<ProfileMenuProps> = ({
  menu,
  open,
  anchorElUser,
  onItemClick,
  onClose,
}) => {
  const position: { [key: string]: PopoverOrigin } = {
    anchorOrigin: {
      vertical: "top",
      horizontal: "right",
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "right",
    },
  };

  return (
    <Menu
      sx={styles.menu}
      id="menu-appbar"
      anchorEl={anchorElUser}
      keepMounted
      open={open}
      onClose={onClose}
      {...position}
    >
      {menu.map((item) => (
        <MenuItem key={item.id} onClick={onItemClick} data-name={item.label}>
          <Typography
            component={Link}
            to={item.path}
            textAlign="center"
            sx={styles.label}
          >
            {item.label}
          </Typography>
        </MenuItem>
      ))}
    </Menu>
  );
};
