import { Box } from "@mui/system";
import { FC, MouseEvent } from "react";

interface BurgerButtonProps {
  onClick: (event?: MouseEvent<HTMLDivElement>) => void;
  isActive: boolean;
}

const styles = {
  main: {
    display: { xs: "block", md: "none" },
    zIndex: 2,
    marginRight: "20px",

    "& .line": {
      width: "30px",
      height: "3px",
      backgroundColor: "rgba(0, 0, 0, 0.87)",
      display: "block",
      margin: "5px auto",
      transition: "all 0.3s ease-in-out",
    },

    "&:hover": {
      cursor: "pointer",
    },
  },
  active: {
    "&  .line-2": {
      opacity: 0,
    },

    "&  .line-1": {
      transform: " translateY(7px) rotate(45deg)",
    },

    "& .line-3": {
      transform: "translateY(-9px) rotate(-45deg)",
    },
  },
};

export const BurgerButton: FC<BurgerButtonProps> = ({
  onClick,
  isActive = false,
}) => (
  <Box
    sx={{
      ...styles.main,
      ...(isActive && styles.active),
    }}
    onClick={onClick}
  >
    <span className="line line-1"></span>
    <span className="line line-2"></span>
    <span className="line line-3"></span>
  </Box>
);
