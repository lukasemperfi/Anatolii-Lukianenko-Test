import { MouseEvent, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";

import { ProfileMenu } from "components/profile-menu/profile-menu";
import { Auth, Main } from "navigation/route-names";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { logout, selectUserState } from "store/user/user.slice";
import { LangSelect } from "components/lang-select/lang-select";
import { DesktopMenu } from "components/navbar-menu/desktop-menu/desktop-menu";
import { NavbarAvatarButton } from "components/navbar-avatar-button/navbar-avatar-button";
import { MobileMenu } from "components/navbar-menu/mobile-menu/mobile-menu";
import { ReactComponent as CatPawIcon } from "assets/cat-paw.svg";
import { BurgerButton } from "components/burger-button/burger-button";

const links = [
  { name: "Home", path: "/" },
  { name: "News", path: "/news" },
];
const profileMenuItems = [
  { id: 1, label: "Profile", path: Main.Profile },
  { id: 2, label: "Logout", path: "#" },
];

const styles = {
  appBar: {
    backgroundColor: "#F7C815",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexGrow: 1,
    color: "inherit",
  },
  logoText: {
    mr: 2,
    fontFamily: "monospace",
    fontWeight: 700,
    letterSpacing: ".1rem",
    color: "rgba(0, 0, 0, 0.87)",
    textDecoration: "none",
  },
  profileMenuContainer: { flexGrow: 0 },
};

export const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuth, user } = useAppSelector(selectUserState);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClickUserMenuItem = (event: MouseEvent<HTMLElement>) => {
    const menuItemName = event.currentTarget.getAttribute("data-name");

    handleCloseUserMenu();

    if (menuItemName === "Logout") {
      event.preventDefault();
      dispatch(logout());
    }
  };

  const handleProfileClick = (event: MouseEvent<HTMLElement>) => {
    if (isAuth) {
      handleOpenUserMenu(event);
    } else {
      navigate(Auth.Login, { state: { backgroundLocation: location } });
    }
  };

  const handleMenuOpen = () => {
    setIsMenuOpen((prev) => !prev);
  };
  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <AppBar position="sticky" sx={styles.appBar}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <BurgerButton onClick={handleMenuOpen} isActive={isMenuOpen} />
          <Box component={Link} to={Main.Home} sx={styles.logo}>
            <CatPawIcon width={20} height={20} fill="rgba(0, 0, 0, 0.87)" />
            <Typography variant="h5" noWrap sx={styles.logoText}>
              PawPosts
            </Typography>{" "}
          </Box>
          <MobileMenu
            links={links}
            open={isMenuOpen}
            onLinkClick={handleMenuClose}
          />
          <DesktopMenu links={links} />
          <LangSelect />
          <NavbarAvatarButton
            image={user?.avatar ? user.avatar : undefined}
            onClick={handleProfileClick}
          />
          <Box sx={styles.profileMenuContainer}>
            {isAuth && (
              <ProfileMenu
                menu={profileMenuItems}
                open={Boolean(anchorElUser)}
                anchorElUser={anchorElUser}
                onClose={handleCloseUserMenu}
                onItemClick={handleClickUserMenuItem}
              />
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
