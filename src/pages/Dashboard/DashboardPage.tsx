import { Box, Divider, Grid, List, ListSubheader } from "@mui/joy";
import * as ROUTES from "routes";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import Chip from "@mui/joy/Chip";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import DashboardHero from "components/Hero/DashboardHero";
import { BookmarkAddOutlined, BookmarkOutlined } from "@mui/icons-material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Briefcase } from "react-feather";
import { BasicCardProps, CategoryCardProps } from "types/Cards";
import Calendar from "@toast-ui/react-calendar";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";
import CasesCategoryPage from "./Cases/CasesCategory/CasesCategoryPage";

const cardItems: BasicCardProps[] = [
  {
    title: "Ingatlan Bérbeadás",
    description: "",
    noOfDocuments: 3,
    category: "Ingatlan",
    isBookmarked: false,
    tagLine: "Újdonság",
    href: "/",
    active: true,
  },
  {
    title: "Egyszemélyes Kft. alapítása",
    description: "Alapítás mintával",
    noOfDocuments: 11,
    category: "Cégeljárás",
    isBookmarked: false,
    tagLine: "Hamarosan",
    href: "/",
    active: false,
  },
  {
    title: "Többszemélyes Kft. alapítása",
    description: "Alapítás mintával",
    noOfDocuments: 14,
    category: "Cégeljárás",
    isBookmarked: false,
    tagLine: "Hamarosan",
    href: "/",
    active: false,
  },
  {
    title: "Közös felmondás",
    description: "Leírás",
    noOfDocuments: 2,
    category: "Munkaügy",
    isBookmarked: true,
    tagLine: "Hamarosan",
    href: "/",
    active: false,
  },
];

export const mainCategories: CategoryCardProps[] = [
  {
    title: "Cégeljárás",
    href: ROUTES.CASES_COMPANY_REGISTRATION,
    count: 9,
    description: "Cégek alapítása, módosítása...",
    popularItems: [
      {
        title: "Egyszemélyes Kft. alapítása",
        href: "/",
      },
      {
        title: "Többszemélyes Kft. alapítása",
        href: "/",
      },
      {
        title: "Kft. módosítása",
        href: "/",
      },
      {
        title: "Bt. alapítása",
        href: "/",
      },
      {
        title: "Bt. felszámolása",
        href: "/",
      },
    ],
  },
  {
    title: "Munkaügy",
    href: ROUTES.CASES_LABOUR,
    count: 5,
    description: "Munkaszerződés, felmondás...",
    popularItems: [
      {
        title: "Munkaszerződés",
        href: "/",
      },
      {
        title: "Közös felmondás",
        href: "/",
      },
      {
        title: "Munkavállalói jogok",
        href: "/",
      },
    ],
  },
  {
    title: "Ingatlan",
    href: ROUTES.CASES_REAL_ESTATE,
    description: "Adás-vétel, bérlet...",
    popularItems: [
      {
        title: "Ingatlan Bérbeadás",
        href: "/lease3252",
        documentCount: 3,
      },
      {
        title: "Ingatlan Adás-Vétel",
        href: "/",
        documentCount: 3,
      },
      {
        title: "Telek megosztása",
        href: "/",
        documentCount: 2,
      },
      {
        title: "Telek összevonása",
        href: "/",
        documentCount: 1,
      },
    ],
  },

  {
    title: "Egyéb",
    href: ROUTES.CASES_OTHERS,
    description: "Egyéb ügyek, szerződések...",
    popularItems: [
      {
        title: "Ügyfélazonosítás, tényleges tulajdonos..",
        href: "/client-identification-3252",
        documentCount: 2,
      },
      {
        title: "Statiszta szerződés",
        href: "/",
      },
      {
        title: "Autó Adás-Vétel",
        href: "/",
      },
    ],
  },
];

export default function DashboardPage() {
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
              template={{}}
              height="400px"
              week={{
                taskView: false,
                eventView: true,
                hourStart: 7,
                hourEnd: 21,
                startDayOfWeek: 1,
                dayNames: ["Vas", "Hét", "Kedd", "Szer", "Csüt", "Pén", "Szom"],
              }}
              view="week"
              gridSelection={{
                enableClick: true,
                enableDblClick: true,
              }}
              theme={{}}
            />
          </Card>
        </Grid>
        {false && (
          <>
            <List size="sm" sx={{ mt: 4 }}>
              <ListSubheader>Újdonságok</ListSubheader>
            </List>
            <Grid
              container
              spacing={2}
              sx={{ flexGrow: 1 }}
              direction="row"
              justifyContent="flex-start"
              alignItems="stretch"
            >
              {cardItems.map((item, index) => (
                <Grid xs={12} sm={6} md={4} lg={3} key={"cc_i" + index}>
                  <BasicCard {...item} />
                </Grid>
              ))}
            </Grid>{" "}
          </>
        )}
      </Box>
    </Box>
  );
}

function BasicCard(item: BasicCardProps) {
  return (
    <Card
      sx={{ gap: 2, boxShadow: "sm", height: "100%" }}
      variant="outlined"
      color="neutral"
    >
      {item.tagLine && (
        <Chip
          size="sm"
          variant="solid"
          disabled={!item.active}
          color={!item.active ? "neutral" : "warning"}
          sx={{ alignSelf: "flex-start", borderRadius: "xl" }}
        >
          {item.tagLine}
        </Chip>
      )}

      <IconButton
        variant="soft"
        color="neutral"
        disabled={!item.active}
        size="sm"
        sx={{ position: "absolute", top: "0.75rem", right: "0.75rem" }}
      >
        {!item.isBookmarked && <BookmarkAddOutlined />}
        {item.isBookmarked && <BookmarkOutlined />}
      </IconButton>

      <Typography
        //fontSize="md"
        level="h6"
        fontWeight="lg"
        sx={{
          maxHeight: 55,
          whiteSpace: "pre-wrap",
          textOverflow: "ellipsis",
          overflow: "hidden",
          lineClamp: 4,
        }}
      >
        {item.title}
      </Typography>
      <Typography level="body2" sx={{}}>
        {item.description}
      </Typography>

      <Divider inset="none" sx={{ mt: "auto" }} />
      <Typography
        level="body3"
        sx={{
          mb: 0,
        }}
        startDecorator={<Briefcase size={15} />}
      >
        {item.category} - {item.noOfDocuments} dokumentum
      </Typography>
      <Button
        variant="soft"
        color="neutral"
        disabled={!item.active}
        sx={{ ml: "auto", fontWeight: 600 }}
        endDecorator={<KeyboardArrowRightIcon />}
      >
        Bővebben
      </Button>
    </Card>
  );
}
