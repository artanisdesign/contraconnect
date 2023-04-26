import { Box, Button, Card, Typography, Grid } from "@mui/joy";
import { Link as RouterLink } from "react-router-dom";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { CasesMainCardProps } from "pages/Dashboard/Cases/CasesPage";
export default function CategoryCard({
  item,
  index,
}: {
  item: CasesMainCardProps;
  index: number;
}) {
  return (
    <Grid
      container
      direction={"row"}
      justifyContent="flex-start"
      alignItems="stretch"
      spacing={0}
      sx={{
        height: "100%",
      }}
    >
      <Grid xs={12} sx={{ height: "100%" }}>
        <Card
          sx={{
            gap: 2,
            boxShadow: "md",
            backgroundColor: "warning." + (+(index ?? 0) + 5) + "00",
            overflow: "hidden",
            zIndex: 1,
            height: "100%",
          }}
          color="neutral"
          variant="solid"
          invertedColors
        >
          <Box
            component="img"
            alt=""
            src="/assets/boxbg.png"
            sx={{
              position: "absolute",
              height: "100%",
              top: 0,
              right: 0,
              opacity: 0.4,
            }}
          />

          <Typography
            fontSize="xl"
            fontWeight="lg"
            sx={{
              textShadow: "0px 1px 1px rgba(0, 0, 0, 0.10)",
            }}
          >
            {item.title}
          </Typography>
          <Typography
            fontSize="body2"
            sx={{
              textShadow: "0px 1px 0px rgba(0, 0, 0, 0.10)",
            }}
          >
            {item.description}
          </Typography>
          <Button
            variant="solid"
            color="warning"
            sx={{
              mt: "auto",
              "&:hover": { "--Button-gap": "0.8rem" },
              "& span": { transition: "0.15s" },
            }}
            component={RouterLink}
            to={item.href}
            endDecorator={<KeyboardArrowRightIcon />}
          >
            {item.type === "bid"
              ? "Új vételi ajánlat"
              : "Új adásvételi szerződés"}
          </Button>
        </Card>
      </Grid>
    </Grid>
  );
}
