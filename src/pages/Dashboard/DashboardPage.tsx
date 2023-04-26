import { Box, Grid, List, ListSubheader, useTheme } from "@mui/joy";
import Card from "@mui/joy/Card";
import DashboardHero from "components/Hero/DashboardHero";
import Calendar from "@toast-ui/react-calendar";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";
import CasesCategoryPage from "./Cases/CasesCategory/CasesCategoryPage";
import { useMediaQuery } from "@mui/material";

export default function DashboardPage() {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box sx={{}}>
      <DashboardHero />
      <Box>
        <List size="sm" sx={{ mt: 4 }}>
          <ListSubheader>Folyamatban levó ügyek</ListSubheader>
        </List>
        <CasesCategoryPage />
        <List size="sm" sx={{ mt: 4 }}>
          <ListSubheader>Elérhető időpontok</ListSubheader>
        </List>
        <Grid
          container
          sx={{
            width: "100%",
          }}
        >
          <Card
            variant="outlined"
            sx={{
              width: "100%",
              p: 0,
              overflow: "hidden",
            }}
          >
            <Calendar
              usageStatistics={false}
              template={{
                allday(event) {
                  return ``;
                },
              }}
              events={[
                {
                  id: "1",
                  calendarId: "1",
                  title: "Szabad időpont",
                  category: "time",
                  dueDateClass: "",
                  backgroundColor: "#65a30d",
                  color: "#ffffff",
                  start: "2023-04-29T12:30:00+01:00",
                  end: "2023-04-29T14:30:00+01:00",
                },
                {
                  id: "2",
                  calendarId: "2",
                  title: "Szabad időpont",
                  category: "time",
                  dueDateClass: "",
                  backgroundColor: "#65a30d",
                  color: "#ffffff",
                  start: "2023-04-28T12:30:00+01:00",
                  end: "2023-04-28T14:30:00+01:00",
                },
                {
                  id: "3",
                  calendarId: "2",
                  title: "Szabad időpont",
                  category: "time",
                  backgroundColor: "#65a30d",
                  color: "#ffffff",
                  dueDateClass: "",
                  start: "2023-04-28T15:00:00+01:00",
                  end: "2023-04-28T17:00:00+01:00",
                },
                {
                  id: "3",
                  calendarId: "2",
                  title: "Szabad időpont",
                  category: "time",
                  backgroundColor: "#65a30d",
                  color: "#ffffff",
                  dueDateClass: "",
                  start: "2023-04-27T14:30:00+01:00",
                  end: "2023-04-27T16:30:00+01:00",
                },
                {
                  id: "3",
                  calendarId: "2",
                  title: "Szabad időpont",
                  category: "time",
                  backgroundColor: "#65a30d",
                  color: "#ffffff",
                  dueDateClass: "",
                  start: "2023-04-27T09:00:00+01:00",
                  end: "2023-04-27T11:00:00+01:00",
                },
                {
                  id: "3",
                  calendarId: "2",
                  title: "Szabad időpont",
                  category: "time",
                  backgroundColor: "#65a30d",
                  color: "#ffffff",
                  dueDateClass: "",
                  start: "2023-04-27T12:00:00+01:00",
                  end: "2023-04-27T14:00:00+01:00",
                },
                {
                  id: "3",
                  calendarId: "2",
                  title: "Szabad időpont",
                  category: "time",
                  backgroundColor: "#65a30d",
                  color: "#ffffff",
                  dueDateClass: "",
                  start: "2023-04-24T09:00:00+01:00",
                  end: "2023-04-24T11:00:00+01:00",
                },
                {
                  id: "3",
                  calendarId: "2",
                  title: "Szabad időpont",
                  category: "time",
                  backgroundColor: "#65a30d",
                  color: "#ffffff",
                  dueDateClass: "",
                  start: "2023-04-30T09:00:00+01:00",
                  end: "2023-04-30T11:00:00+01:00",
                },
              ]}
              height="500px"
              week={{
                taskView: false,
                eventView: true,
                hourStart: 7,
                hourEnd: 21,
                startDayOfWeek: 1,
                dayNames: ["Vas", "Hét", "Kedd", "Szer", "Csüt", "Pén", "Szom"],
              }}
              view={isSmall ? "day" : "week"}
              gridSelection={{
                enableClick: true,
                enableDblClick: true,
              }}
              theme={{}}
            />
          </Card>
        </Grid>
      </Box>
    </Box>
  );
}
