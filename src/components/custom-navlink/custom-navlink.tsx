import { Button } from "@mui/material";
import { FC } from "react";
import { NavLink, NavLinkProps } from "react-router-dom";

interface CustomNavlinkProps extends NavLinkProps {
  title: string;
}

const styles = {
  base: {
    color: "rgba(0, 0, 0, 0.87)",
    display: "inline-flex",
    alignItems: "flex-end",
    lineHeight: 1.334,
    padding: "3px 8px",
    minHeight: "32px",
    fontWeight: 600,
  },
  after: {
    position: "absolute",
    content: '""',
    width: "0",
    height: "2px",
    bottom: "0px",
    left: "50%",
    right: "0px",
    backgroundColor: "#4D8FC3",
    transition: "all 0.4s ease 0s",
    transform: "translateX(-50%)",
    overflow: "hidden",
  },
};

export const CustomNavlink: FC<CustomNavlinkProps> = ({
  title,
  ...linkProps
}) => (
  <NavLink {...linkProps}>
    {({ isActive }) => (
      <Button
        component={"span"}
        sx={{
          ...styles.base,
          "&::after": { ...styles.after, width: isActive ? "90%" : "0" },
        }}
      >
        {title}
      </Button>
    )}
  </NavLink>
);
