import { Box } from "@mui/material";
import { FC } from "react";

import { CustomNavlink } from "components/custom-navlink/custom-navlink";
import { useTranslation } from "react-i18next";

type DesktopMenuLink = {
  name: string;
  path: string;
};

interface DesktopMenuProps {
  links: DesktopMenuLink[];
}

const styles = {
  container: {
    display: { xs: "none", md: "flex" },
    flexGrow: 1,
    overflow: "hidden",
    alignItems: "flex-end",
  },
};

export const DesktopMenu: FC<DesktopMenuProps> = ({ links }) => {
  const { t } = useTranslation();

  return (
    <Box sx={styles.container}>
      {links.map((link) => (
        <CustomNavlink
          to={link.path}
          title={t(link.name)}
          key={link.name}
          end
        />
      ))}
    </Box>
  );
};
