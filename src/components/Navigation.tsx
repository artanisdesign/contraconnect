import * as React from "react";
//import Box from '@mui/joy/Box';
import IconButton from "@mui/joy/IconButton";
import List from "@mui/joy/List";
import ListSubheader from "@mui/joy/ListSubheader";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListItemContent from "@mui/joy/ListItemContent";
import Avatar from "@mui/joy/Avatar";
import * as ROUTES from "routes";
// Icons import
import FolderCopyRoundedIcon from "@mui/icons-material/FolderCopyRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import AssignmentTurnedInRoundedIcon from "@mui/icons-material/AssignmentTurnedInRounded";
import LinkRounded from "@mui/icons-material/LinkRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import CreateNewFolderRoundedIcon from "@mui/icons-material/CreateNewFolderRounded";
import { useNavigate } from "react-router-dom";
import { useAuth } from "hooks/useAuth";
import { Box, Button, Divider, Modal, ModalDialog, Typography } from "@mui/joy";
import { LogOut } from "react-feather";
import { doSignOut } from "_firebase/_auth";

export default function Navigation() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const { user } = useAuth();
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <List size="sm" sx={{ "--ListItem-radius": "8px", "--List-gap": "4px" }}>
        <ListItem nested>
          <ListSubheader>
            Navigáció
            <IconButton
              size="sm"
              variant="plain"
              color="primary"
              sx={{ "--IconButton-size": "24px", ml: "auto" }}
            >
              <KeyboardArrowDownRoundedIcon fontSize="small" color="primary" />
            </IconButton>
          </ListSubheader>
          <List
            aria-labelledby="nav-list-browse"
            sx={{
              "& .JoyListItemButton-root": { p: "8px" },
            }}
          >
            <ListItem>
              <ListItemButton
                onClick={() => {
                  navigate(ROUTES.DASHBOARD);
                }}
              >
                <ListItemDecorator sx={{ color: "inherit" }}>
                  <LinkRounded fontSize="small" />
                </ListItemDecorator>
                <ListItemContent>Kezdőlap</ListItemContent>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton
                color="warning"
                onClick={() => {
                  navigate(ROUTES.DASHBOARD_CASES);
                }}
              >
                <ListItemDecorator sx={{ color: "warning.300" }}>
                  <CreateNewFolderRoundedIcon fontSize="small" />
                </ListItemDecorator>
                <ListItemContent>Új ügy létrehozása</ListItemContent>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton
                onClick={() => {
                  navigate(ROUTES.DASHBOARD_ONGOING);
                }}
              >
                <ListItemDecorator sx={{ color: "neutral.500" }}>
                  <FolderCopyRoundedIcon fontSize="small" />
                </ListItemDecorator>
                <ListItemContent>Aktív ügyek</ListItemContent>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton disabled>
                <ListItemDecorator sx={{ color: "neutral.500" }}>
                  <AssignmentTurnedInRoundedIcon fontSize="small" />
                </ListItemDecorator>
                <ListItemContent>Lezárt ügyek</ListItemContent>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton
                onClick={() => {
                  navigate(ROUTES.DASHBOARD_CALENDAR);
                }}
              >
                <ListItemDecorator sx={{ color: "neutral.500" }}>
                  <CalendarMonthRoundedIcon fontSize="small" />
                </ListItemDecorator>
                <ListItemContent>Időpontok</ListItemContent>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton disabled>
                <ListItemDecorator sx={{ color: "neutral.500" }}>
                  <SettingsRoundedIcon fontSize="small" />
                </ListItemDecorator>
                <ListItemContent>Beállítások</ListItemContent>
              </ListItemButton>
            </ListItem>
          </List>
        </ListItem>
      </List>
      <Box
        sx={{
          mt: "auto",
          mb: "8px",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Avatar
          variant="outlined"
          src={user?.photoURL ?? undefined}
          size="md"
        />
        <Box sx={{ pl: 2, mt: "auto", display: "flex", alignItems: "center" }}>
          <div
            style={{
              marginRight: "8px",
            }}
          >
            <Typography
              fontWeight="lg"
              level="body2"
              sx={{
                maxWidth: {
                  sm: "80px",
                  md: "160px",
                },
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
                maxWidth: {
                  sm: "80px",
                  md: "160px",
                },
                display: {
                  //sm: "none",
                  md: "block",
                },
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
      </Box>

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
    </Box>
  );
}
