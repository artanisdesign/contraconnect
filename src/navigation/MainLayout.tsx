import {
  Box,
  CircularProgress,
  CssBaseline,
  CssVarsProvider,
  IconButton,
  Typography,
} from "@mui/joy";
import React from "react";
import ColorSchemeToggle from "components/ColorSchemeToogle";
import { useAuth } from "hooks/useAuth";
import { Outlet } from "react-router-dom";
//import { Home, ChevronRight } from "react-feather";
//import { Link as RouterLink } from "react-router-dom";
//import * as ROUTES from "routes";
//import { mainCategories } from "pages/Dashboard/DashboardPage";
import Layout from "components/Layout";
import Navigation from "components/Navigation";

import LinkRoundedIcon from "@mui/icons-material/LinkRounded";
import MenuIcon from "@mui/icons-material/Menu";

export function MainLayout() {
  const { loading, user } = useAuth();
  //let location = useLocation();
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  if (loading) {
    return (
      <CircularProgress
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    );
  }
  if (!user) return null;

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      {drawerOpen && (
        <Layout.SideDrawer onClose={() => setDrawerOpen(false)}>
          <Navigation />
        </Layout.SideDrawer>
      )}
      <Layout.Root
        sx={{
          ...(drawerOpen && {
            height: "100vh",
            overflow: "hidden",
          }),
        }}
      >
        <Layout.Header>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <IconButton
              variant="outlined"
              size="sm"
              onClick={() => setDrawerOpen(true)}
              sx={{ display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <IconButton
              size="sm"
              variant="solid"
              sx={{ display: { xs: "none", sm: "inline-flex" } }}
            >
              <LinkRoundedIcon />
            </IconButton>
            <Typography
              fontWeight="lg"
              sx={{
                fontSize: 24,
                lineHeight: "34px",
                background:
                  "linear-gradient(120deg,#84cc16 0%, #65a30d 30%, #bef264 60%, #84cc16 100%) repeat",
                backgroundClip: "text",
                textFillColor: "transparent",
                backgroundPposition: 0,
                backgroundSize: 800,
                fontFamily: "Lato",
                fontStyle: "italic",
                marginRight: "auto",
                ml: 0,
              }}
            >
              ContraConnect
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 1.5 }}>
            <ColorSchemeToggle />
          </Box>
        </Layout.Header>
        <Layout.SideNav>
          <Navigation />
        </Layout.SideNav>
        {/* <Layout.SidePane>
          <Box
            sx={{
              p: 2,
              mb: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              textColor="neutral.500"
              fontWeight={700}
              sx={{
                fontSize: "10px",
                textTransform: "uppercase",
                letterSpacing: ".1rem",
              }}
            >
              Unread
            </Typography>
            <IconButton
              size="sm"
              variant="plain"
              color="primary"
              sx={{ "--IconButton-size": "24px" }}
            >
              <KeyboardArrowDownRoundedIcon fontSize="small" color="primary" />
            </IconButton>
          </Box>
          <Box sx={{ py: 10 }}>
            <Typography
              textColor="text.tertiary"
              level="body2"
              sx={{ textAlign: "center" }}
            >
              You&apos;ve read all messages in your inbox.
            </Typography>
          </Box>
          <Box
            sx={{
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              textColor="neutral.500"
              fontWeight={700}
              sx={{
                fontSize: "10px",
                textTransform: "uppercase",
                letterSpacing: ".1rem",
              }}
            >
              Everything else
            </Typography>
            <IconButton
              size="sm"
              variant="plain"
              color="primary"
              sx={{ "--IconButton-size": "24px" }}
            >
              <KeyboardArrowDownRoundedIcon fontSize="small" color="primary" />
            </IconButton>
          </Box>
        </Layout.SidePane>*/}

        <Layout.Main>
          <Outlet />
        </Layout.Main>
      </Layout.Root>
    </CssVarsProvider>
  );
}
