import * as React from "react";
import Box from "@mui/joy/Box";
import Chip from "@mui/joy/Chip";
import List from "@mui/joy/List";
import ListSubheader from "@mui/joy/ListSubheader";
import ListItem from "@mui/joy/ListItem";
import ListItemContent from "@mui/joy/ListItemContent";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListItemButton from "@mui/joy/ListItemButton";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { closeSidebar } from "utils";
import { Folder, Bookmark, LogOut } from "react-feather";
import { useAuth } from "hooks/useAuth";
import { doSignOut } from "_firebase/_auth";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Divider, Modal, ModalDialog } from "@mui/joy";
import { mainCategories } from "pages/Dashboard/DashboardPage";
import { Link as RouterLink } from "react-router-dom";

export default function SecondSidebar() {
  const { user } = useAuth();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  let location = useLocation();
  return (
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

      <Sheet
        className="SecondSidebar"
        sx={{
          position: {
            xs: "fixed",
            //lg: "sticky",
            xl: "sticky",
          },
          transform: {
            xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--FirstSidebar-width, 0px)))",
            //lg: "none",
            xl: "none",
          },
          borderRight: "1px solid",
          borderColor: "divider",
          transition: "transform 0.4s",
          zIndex: 99,
          height: "100dvh",
          top: 0,
          p: 2,
          py: 3,
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <List
          sx={{
            "--ListItem-radius": "8px",
            "--ListItem-minHeight": "32px",
            "--List-gap": "4px",
          }}
        >
          <ListSubheader role="presentation" sx={{ color: "text.primary" }}>
            Ügycsoportok
          </ListSubheader>
          {mainCategories.map((category, index) => (
            <ListItem key={index + category.href}>
              <ListItemButton
                onClick={() => closeSidebar()}
                component={RouterLink}
                to={category.href}
                selected={location.pathname === category.href}
                variant={
                  location.pathname === category.href ? "soft" : undefined
                }
              >
                <ListItemDecorator>
                  <Folder className="feather" />
                </ListItemDecorator>
                <ListItemContent>{category.title}</ListItemContent>
                {category.popularItems?.length && (
                  <Chip variant="soft" size="sm">
                    {category.popularItems?.length}
                  </Chip>
                )}
              </ListItemButton>
            </ListItem>
          ))}

          <ListItem>
            <ListItemButton disabled onClick={() => closeSidebar()}>
              <ListItemDecorator>
                <Bookmark className="feather" />
              </ListItemDecorator>
              <ListItemContent>Mentett</ListItemContent>
            </ListItemButton>
          </ListItem>
        </List>
        <Box sx={{ pl: 1, mt: "auto", display: "flex", alignItems: "center" }}>
          <div
            style={{
              marginRight: "8px",
            }}
          >
            <Typography
              fontWeight="lg"
              level="body2"
              sx={{
                maxWidth: "160px",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >
              {user?.displayName || "Felhasználó"}
            </Typography>
            <Typography
              level="body2"
              sx={{
                maxWidth: "160px",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >
              {user?.email}
            </Typography>
          </div>
          <IconButton
            variant="plain"
            sx={{ ml: "auto" }}
            onClick={() => {
              setOpen(true);
            }}
          >
            <LogOut className="feather" />
          </IconButton>
        </Box>
      </Sheet>

      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          variant="outlined"
          role="alertdialog"
          aria-labelledby="alert-dialog-modal-title"
          aria-describedby="alert-dialog-modal-description"
        >
          <Typography
            id="alert-dialog-modal-title"
            component="h2"
            fontSize="lg"
            fontWeight="lg"
          >
            Kijelentkezés
          </Typography>
          <Divider inset="none" />
          <Typography
            id="alert-dialog-modal-description"
            textColor="text.tertiary"
            sx={{
              my: 3,
            }}
          >
            Biztosan ki akar lépni?
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              justifyContent: "flex-end",
              pt: 2,
              bgcolor: "background.level1",
              //opacity: 0.8,
              px: 2,
              py: 1.5,
              m: "calc(-1 * var(--ModalDialog-padding))",
              mt: 2,
              borderBottomLeftRadius: "var(--ModalDialog-radius)",
              borderBottomRightRadius: "var(--ModalDialog-radius)",
              textAlign: "right",
            }}
          >
            <Button
              variant="plain"
              color="neutral"
              size="sm"
              onClick={() => setOpen(false)}
            >
              Mégsem
            </Button>
            <Button
              variant="solid"
              color="danger"
              size="sm"
              onClick={() => {
                doSignOut().then(() => navigate("/"));
              }}
            >
              Kilépés
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
