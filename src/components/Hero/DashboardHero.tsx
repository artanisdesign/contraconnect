import { Box, Button, Sheet, Typography } from "@mui/joy";
import { ArrowRightCircle } from "react-feather";
import { Link as RouterLink } from "react-router-dom";
import * as ROUTES from "routes";

export default function DashboardHero() {
  const color = "warning";
  return (
    <Sheet
      variant="solid"
      color={color}
      invertedColors
      sx={{
        flexGrow: 1,
        display: "flex",

        p: { xs: "36px", md: "70px" },
        pt: { xs: "24px", md: "60px" },
        mt: {
          xs: 1,
          md: 0,
        },
        borderRadius: "40px",
        maxHeight: "350px",
        overflow: "hidden",
        "& button": { borderRadius: "xl" },
        boxShadow: {
          xs: "md",
        },
      }}
    >
      <Box sx={{ zIndex: 1, position: "relative" }}>
        <Typography
          level="display2"
          sx={{
            textShadow: "0px 1px 0px rgba(0, 0, 0, 0.25)",
            fontSize: {
              xs: 32,
              sm: 60,
            },
          }}
        >
          Kezdjük el!
        </Typography>
        <Typography
          sx={{
            mt: 1,
            mb: 3,
            mr: {
              xs: 0,
              sm: 25,
              textShadow: "0px 1px 0px rgba(0, 0, 0, 0.15)",
            },
          }}
        >
          Az új ügy létrehozása menüpont alatt érhetőek el a kitölthető
          nyomtatványok.
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            flexWrap: "wrap",
            maxWidth: "max-content",
            "& > *": { flexGrow: 1, fontWeight: "lg" },
          }}
        >
          <Button
            variant="outlined"
            //color="neutral"
            component={RouterLink}
            to={ROUTES.CASES_BID}
            endDecorator={<ArrowRightCircle size={20} />}
            sx={{
              "&:hover": { "--Button-gap": "0.8rem" },
              "& span": { transition: "0.15s" },
            }}
          >
            Új vételi ajánlat
          </Button>
          <Button
            sx={{
              minWidth: 120,
              "&:hover": { "--Button-gap": "0.8rem" },
              "& span": { transition: "0.15s" },
              borderRadius: "xl",
            }}
            component={RouterLink}
            to={ROUTES.CASES_SPA}
            endDecorator={<ArrowRightCircle size={20} />}
          >
            Új adásvétel
          </Button>
        </Box>
      </Box>
      <Box
        component="img"
        alt=""
        src="/assets/hero.png"
        sx={{ position: "absolute", height: "100%", top: 0, right: 0 }}
      />
    </Sheet>
  );
}
