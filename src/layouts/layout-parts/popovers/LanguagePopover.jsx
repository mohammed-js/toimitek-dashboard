import { Fragment, useRef, useState, useContext } from "react";
import { IconButton, MenuItem, Popover, styled } from "@mui/material";
import { useTranslation } from "react-i18next";
import { SettingsContext } from "contexts/settingsContext";

// ==============================================================

// ==============================================================

// STYLED COMPONENTS
const IconWrapper = styled("div")({
  width: 24,
  height: 24,
  padding: "2px",
  display: "flex",
  "& img": {
    width: "100%",
    borderRadius: "50%",
    objectFit: "cover",
  },
});
const LanguagePopover = () => {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const { settings, saveSettings } = useContext(SettingsContext);
  const { i18n, t } = useTranslation();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (language, dir) => {
    if (language !== settings.language) {
      window.location.reload();
      i18n.changeLanguage(language);
      saveSettings({
        ...settings,
        language: language,
        direction: dir,
      });
    }

    setOpen(false);
  };

  // LANGUAGE OPTIONS
  const languageOptions = {
    en: {
      icon: "/static/flags/usa-round.png",
      label: t("english"),
      dir: "ltr",
    },
    ar: {
      icon: "/static/flags/sd-round.png",
      label: t("arabic"),
      dir: "rtl",
    },
  };
  const selectedLanguage = languageOptions[i18n.language];
  console.log(selectedLanguage);
  return (
    <Fragment>
      <IconButton onClick={handleOpen} ref={anchorRef}>
        <IconWrapper>
          <img alt={selectedLanguage.label} src={selectedLanguage.icon} />
        </IconWrapper>
      </IconButton>

      <Popover
        keepMounted
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        anchorOrigin={{
          horizontal: "center",
          vertical: "bottom",
        }}
        slotProps={{
          paper: {
            sx: {
              width: 110,
              py: 1,
            },
          },
        }}
      >
        {Object.entries(languageOptions).map(([language, options]) => (
          <MenuItem
            key={languageOptions[language].label}
            onClick={() => {
              handleChange(language, options.dir);
            }}
          >
            {languageOptions[language].label}
          </MenuItem>
        ))}
      </Popover>
    </Fragment>
  );
};
export default LanguagePopover;
