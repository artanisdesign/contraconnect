import { Box, Grid } from "@mui/joy";
import CategoryCard from "../Cards/CategoryCard";
import { mainCategories } from "../DashboardPage";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
export default function CasesPage() {
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.up('sm'));
  return (
    <Box>
      <Grid
        container
        spacing={2}
        sx={{ flexGrow: 1, maxHeight: 300 }}
        direction="row"
        justifyContent="flex-start"
        alignItems="stretch"
      >
        {mainCategories.map((item, index) => (
          <Grid
            xs={12}
            sm={12}
            md={6}
            lg={6}
            key={"mm_" + index}
            sx={{
              height: sm ? 260 : 300,
            }}
          >
            <CategoryCard item={item} index={index} isColumn={false}/>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
