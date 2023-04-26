import { Box, Grid } from "@mui/joy";
import CategoryCard from "../Cards/CategoryCard";
import * as ROUTES from "routes";
export interface CasesMainCardProps {
  title: string;
  href: string;
  description?: string;
  type: "bid" | "spa";
}

export const mainCategories: CasesMainCardProps[] = [
  {
    title: "Vételi ajánlat",
    href: ROUTES.CASES_BID,
    description: "Vételi ajánlat adatfeltöltése a Vevő jelenlétében",
    type: "bid",
  },
  {
    title: "Adásvételi szerződés",
    href: ROUTES.CASES_SPA,
    description: "Adásvételi szerződés adatfeltöltése minden Fél jelenlétében",
    type: "spa",
  },
];

export default function CasesPage() {
  return (
    <Box>
      <Grid
        container
        spacing={2}
        sx={{ flexGrow: 1 }}
        direction="row"
        justifyContent="flex-start"
        alignItems="stretch"
      >
        {mainCategories.map((item, index) => (
          <Grid xs={12} sm={12} md={6} lg={6} key={"mm_" + index} sx={{}}>
            <CategoryCard item={item} index={index} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
