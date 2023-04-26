import { Box, Card, IconButton, useTheme } from "@mui/joy";
import Calendar from "@toast-ui/react-calendar";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";
import React from "react";
import {
  ArrowLeftCircle,
  ArrowRightCircle,
  Calendar as CalIcon,
} from "react-feather";
import ToastUIReactCalendar from "@toast-ui/react-calendar";
import { useMediaQuery } from "@mui/material";
export default function CalendarPage() {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));

  const calendarRef = React.useRef<ToastUIReactCalendar>(null);
  return (
    <Card
      variant="outlined"
      sx={{
        width: "100%",
        p: 0,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          flexDirection: "row",
          p: 1,
          display: "flex",
        }}
      >
        <IconButton
          variant="plain"
          sx={{ mr: "auto", ml: 0 }}
          onClick={() => {
            calendarRef.current?.getInstance()?.today();
          }}
        >
          <CalIcon className="feather" />
        </IconButton>

        <IconButton
          variant="plain"
          sx={{ ml: "auto" }}
          onClick={() => {
            calendarRef.current?.getInstance()?.prev();
          }}
        >
          <ArrowLeftCircle className="feather" />
        </IconButton>
        <IconButton
          variant="plain"
          sx={{ mr: 0 }}
          onClick={() => {
            calendarRef.current?.getInstance()?.next();
          }}
        >
          <ArrowRightCircle className="feather" />
        </IconButton>
      </Box>

      <Calendar
        ref={calendarRef}
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
            dueDateclassName: "",
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
            dueDateclassName: "",
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
            dueDateclassName: "",
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
            dueDateclassName: "",
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
            dueDateclassName: "",
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
            dueDateclassName: "",
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
            dueDateclassName: "",
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
            dueDateclassName: "",
            start: "2023-04-30T09:00:00+01:00",
            end: "2023-04-30T11:00:00+01:00",
          },
        ]}
        week={{
          taskView: false,
          eventView: true,
          hourStart: 7,
          hourEnd: 21,
          startDayOfWeek: 1,
          dayNames: ["Vas", "Hét", "Kedd", "Szer", "Csüt", "Pén", "Szom"],
        }}
        view={isSmall? "day" : "week"}
        gridSelection={{
          enableClick: true,
          enableDblClick: true,
        }}
        theme={{}}
      />
    </Card>
  );
}
