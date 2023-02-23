import { Container } from "@mui/material";
import { t } from "i18next";
import { FC } from "react";

import { CustomNavlink } from "components/custom-navlink/custom-navlink";

type MobileMenuLink = {
  name: string;
  path: string;
};

interface MobileMenuProps {
  links: MobileMenuLink[];
  open: boolean;
  onLinkClick?: () => void;
}

const styles = {
  container: {
    base: {
      display: { xs: "flex", md: "none" },
      position: "fixed",
      top: 0,
      left: 0,
      backgroundColor: "#f7f7f7",
      height: "100vh",
      width: { xs: "100vw", sm: "50vw" },
      zIndex: 1,
      flexDirection: "column",
      overflow: "hidden",
      p: 2,
      paddingTop: { xs: "60px", sm: "70px" },
      boxShadow: { xs: "none", sm: "rgb(0 0 0 / 20%) 3px 6px 4px 4px" },
      opacity: 0,
      visibility: "hidden",
      transform: " translateX(-100%)",
      transition: "all 0.3s",
    },
    active: {
      opacity: 1,
      visibility: "visible",
      transform: " translateX(0)",
    },
  },
};

export const MobileMenu: FC<MobileMenuProps> = ({
  links,
  open = false,
  onLinkClick,
}) => (
  <Container
    sx={{
      ...styles.container.base,
      ...(open && styles.container.active),
    }}
  >
    {links.map((link) => (
      <CustomNavlink
        to={link.path}
        title={t(link.name)}
        key={link.name}
        onClick={onLinkClick}
        end
      />
    ))}
  </Container>
);
