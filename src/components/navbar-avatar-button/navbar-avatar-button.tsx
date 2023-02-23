import { Tooltip, IconButton, Avatar, AvatarProps } from "@mui/material";
import { FC, MouseEvent } from "react";

interface NavbarAvatarButtonProps {
  onClick: (event: MouseEvent<HTMLElement>) => void;
  image?: string;
}

export const NavbarAvatarButton: FC<NavbarAvatarButtonProps> = ({
  onClick,
  image,
}) => (
  <Tooltip title="Open profile menu">
    <IconButton onClick={onClick} sx={{ p: 0 }}>
      <Avatar src={image} alt="avatar" />
    </IconButton>
  </Tooltip>
);
