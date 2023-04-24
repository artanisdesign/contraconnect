import * as React from "react";
import GlobalStyles from "@mui/joy/GlobalStyles";
import IconButton from "@mui/joy/IconButton";
import Sheet from "@mui/joy/Sheet";
import ColorSchemeToggle from "../ColorSchemeToogle";
import { toggleSidebar } from "utils";
import DWLogo from "./DWLogo";
import { Menu } from "react-feather";
import { Typography } from "@mui/joy";

export default function Header() {
  return (
    <Sheet
      sx={{
        display: { xs: "flex", md: "none" },
        alignItems: "center",
        position: "fixed",
        top: 0,
        width: "100vw",
        height: "var(--Header-height)",
        zIndex: 95,
        py: 1,
        px: 2,
        gap: 1,
        boxShadow: "sm",
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ":root": {
            "--Header-height": "52px",
            [theme.breakpoints.up("md")]: {
              "--Header-height": "0px",
            },
          },
        })}
      />
      <IconButton
        onClick={() => toggleSidebar()}
        variant="outlined"
        color="neutral"
        size="sm"
      >
        <Menu className="feather" />
      </IconButton>
      <DWLogo
        variant="plain"
        sx={{ boxShadow: "none", mr: 0, width: 28, ml: "auto" }}
      />
      <Typography
        fontWeight="lg"
        sx={{
          fontSize: 24,
          lineHeight: "34px",
          background:
            "linear-gradient(120deg, #037AEB 0%, #4364F7 30%, #0d5bb2 45%, #037AEB 100%) repeat",
          backgroundClip: "text",
          textFillColor: "transparent",
          backgroundPposition: 0,
          backgroundSize: 800,
          fontFamily: "Lato",
          fontStyle: "italic",
          marginRight: "auto",
          ml:0
        }}
      >
        ContraConnect
      </Typography>
      <ColorSchemeToggle id={undefined} />
    </Sheet>
  );
}
