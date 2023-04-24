import * as React from "react";
//import Box from '@mui/joy/Box';
import IconButton from "@mui/joy/IconButton";
import List from "@mui/joy/List";
import ListSubheader from "@mui/joy/ListSubheader";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListItemContent from "@mui/joy/ListItemContent";

// Icons import
import FolderCopyRoundedIcon from "@mui/icons-material/FolderCopyRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import AssignmentTurnedInRoundedIcon from "@mui/icons-material/AssignmentTurnedInRounded";
import LinkRounded from "@mui/icons-material/LinkRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import CreateNewFolderRoundedIcon from '@mui/icons-material/CreateNewFolderRounded';
export default function Navigation() {
  return (
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
            <ListItemButton variant="soft" color="primary">
              <ListItemDecorator sx={{ color: "inherit" }}>
                <LinkRounded fontSize="small" />
              </ListItemDecorator>
              <ListItemContent>Kezdőlap</ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton color="warning" >
              <ListItemDecorator sx={{ color: "warning.300" }}>
                <CreateNewFolderRoundedIcon fontSize="small" />
              </ListItemDecorator>
              <ListItemContent>Új ügy létrehozása</ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
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
            <ListItemButton>
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
  );
}
