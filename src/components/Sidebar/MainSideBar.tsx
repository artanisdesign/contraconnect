import * as React from "react";
import GlobalStyles from "@mui/joy/GlobalStyles";
import Avatar from "@mui/joy/Avatar";
import Divider from "@mui/joy/Divider";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import Sheet from "@mui/joy/Sheet";
import Tooltip from "@mui/joy/Tooltip";
import { closeSidebar, openSidebar } from "utils";
import * as ROUTES from "routes";
import DWLogo from "components/Header/DWLogo";
import {
  Home,
  Briefcase,
  Layers,
  Archive,
  Users,
  Settings,
  Inbox,
  LifeBuoy,
  //LifeBuoy,
} from "react-feather";
import { useAuth } from "hooks/useAuth";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Box } from "@mui/joy";

export const menuItems = [
  {
    title: "Kezdőlap",
    icon: <Home className="feather" />,
    href: ROUTES.DASHBOARD,
    action: () => closeSidebar(),
    isActive: true,
  },
  {
    title: "Ügycsoportok",
    icon: <Briefcase className="feather" />,
    href: ROUTES.DASHBOARD_CASES,
    action: () => openSidebar(),
    isActive: true,
  },
  {
    title: "Folyamatban",
    icon: <Inbox className="feather" />,
    href: ROUTES.DASHBOARD_ONGOING,
    action: () => openSidebar(),
    isActive: true,
  },
  {
    title: "Lezárt",
    icon: <Archive className="feather" />,
    href: ROUTES.DASHBOARD_ARCHIVED,
    action: () => openSidebar(),
    isActive: false,
  },
  {
    title: "Adataim",
    icon: <Layers className="feather" />,
    href: ROUTES.DASHBOARD_DATA,
    action: () => closeSidebar(),
    isActive: false,
  },

  {
    title: "Felhasználók",
    icon: <Users className="feather" />,
    href: ROUTES.DASHBOARD_USERS,
    action: () => closeSidebar(),
    isActive: false,
  },
];

export default function MainSidebar() {
  const { user } = useAuth();
  let location = useLocation();
  return (
    <>
      <React.Fragment>
        <Box
          className="SecondSidebar-overlay"
          sx={{
            position: "fixed",
            zIndex: 98,
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            bgcolor: "background.body",
            opacity: "calc(var(--SideNavigation-slideIn, 0) - 0.2)",
            transition: "opacity 0.4s",
            transform: {
              xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--FirstSidebar-width, 0px)))",
              xl: "translateX(-100%)",
            },
          }}
          onClick={() => closeSidebar()}
        />
      </React.Fragment>
      <Sheet
        className="MainSidebar"
        variant="soft"
        color="primary"
        invertedColors
        sx={{
          position: {
            xs: "fixed",
            md: "sticky",
          },
          transform: {
            xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
            md: "none",
          },
          transition: "transform 0.4s",
          zIndex: 100,
          height: "100dvh",
          width: "var(--FirstSidebar-width)",
          top: 0,
          p: 1.5,
          py: 3,
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          borderRight: "1px solid",
          borderColor: "divider",
        }}
      >
        <GlobalStyles
          styles={{
            ":root": {
              "--FirstSidebar-width": "68px",
            },
          }}
        />
        <DWLogo sx={{ mb: 1 }} />
        <List sx={{ "--ListItem-radius": "8px", "--List-gap": "12px" }}>
          {menuItems.map((item, i) => {
            const isSelected =
              (ROUTES.DASHBOARD === item.href &&
                item.href === location.pathname) ||
              (location.pathname.startsWith(item.href) &&
                item.href !== ROUTES.DASHBOARD);
            return (
              <ListItem key={i + item.title}>
                <Tooltip
                  title={item.title}
                  placement="right"
                  variant="solid"
                  color="neutral"
                >
                  <ListItemButton
                    selected={isSelected}
                    disabled={!item.isActive}
                    variant={isSelected ? "solid" : undefined}
                    color={isSelected ? "primary" : undefined}
                    component={RouterLink}
                    to={item.href}
                    onClick={() => {
                      if (item.action) item.action();
                    }}
                  >
                    {item.icon}
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            );
          })}
        </List>
        <List
          sx={{
            mt: "auto",
            flexGrow: 0,
            "--ListItem-radius": "8px",
            "--List-gap": "8px",
          }}
        >
          {
            <ListItem>
              <Tooltip
                title="Segítség"
                placement="right"
                variant="solid"
                color="neutral"
              >
                <ListItemButton disabled>
                  <LifeBuoy className="feather" />
                </ListItemButton>
              </Tooltip>
            </ListItem>
          }
          <ListItem>
            <Tooltip
              title="Beállítások"
              placement="right"
              variant="solid"
              color="neutral"
            >
              <ListItemButton disabled>
                <Settings className="feather" />
              </ListItemButton>
            </Tooltip>
          </ListItem>
        </List>
        <Divider />

        <Avatar variant="outlined" src={user?.photoURL ?? undefined} />
      </Sheet>
    </>
  );
}
