import {
  Select,
  MenuItem,
  ListItemIcon,
  ListItemText,
  SelectChangeEvent,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import ukFlag from "assets/uk.png";
import uaFlag from "assets/ua.png";

const countries = [
  { name: "en", flag: ukFlag },
  { name: "ua", flag: uaFlag },
];

const styles = {
  select: {
    marginRight: "30px",
    "&::before": {
      border: "none",
    },
    "&::after": {
      border: "none",
    },
    " &:hover:not(.Mui-disabled, .Mui-error):before": {
      border: "none",
    },

    "& .MuiSelect-standard": {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      padding: "5px",
      border: "none",
    },
    "& .MuiInput-input:focus": {
      backgroundColor: "transparent",
    },

    " & .MuiListItemIcon-root": {
      minWidth: "0px",
    },
  },
  listItemText: { color: "rgba(0, 0, 0, 0.87)" },
};

export const LangSelect = () => {
  const { i18n } = useTranslation();

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    i18n.changeLanguage(event.target.value as string);
  };

  return (
    <Select
      defaultValue="ua"
      variant="standard"
      onChange={handleChange}
      sx={styles.select}
    >
      {countries.map((country) => (
        <MenuItem key={country.name} value={country.name}>
          <ListItemIcon>
            <img src={country.flag} alt={country.name} width={20} height={20} />
          </ListItemIcon>
          <ListItemText sx={styles.listItemText} primary={country.name} />
        </MenuItem>
      ))}
    </Select>
  );
};
