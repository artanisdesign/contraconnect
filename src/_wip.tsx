import * as React from "react";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
//import Card from "@mui/joy/Card";
//import CardOverflow from "@mui/joy/CardOverflow";
//import CardCover from "@mui/joy/CardCover";
//import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Input from "@mui/joy/Input";
import IconButton from "@mui/joy/IconButton";
//import Divider from "@mui/joy/Divider";
import Sheet from "@mui/joy/Sheet";
//import List from "@mui/joy/List";
//import ListItem from "@mui/joy/ListItem";
//import ListItemButton from "@mui/joy/ListItemButton";
//import ListItemContent from "@mui/joy/ListItemContent";

// Icons import
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import FindInPageRoundedIcon from "@mui/icons-material/FindInPageRounded";
import MenuIcon from "@mui/icons-material/Menu";
//import FolderOpenIcon from "@mui/icons-material/FolderOpen";
//import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
//import CloseIcon from '@mui/icons-material/Close';
import BookRoundedIcon from "@mui/icons-material/BookRounded";

// custom
import Menu from "./components/Menu";
import Layout from "./components/Layout";
import Navigation from "./components/Navigation";
import { FormControl, FormLabel } from "@mui/joy";
import { saveAttempt, subscribeToAttemptResult } from "./firestore/attempt";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

function ColorSchemeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <IconButton size="sm" variant="outlined" color="primary" />;
  }
  return (
    <IconButton
      id="toggle-mode"
      size="sm"
      variant="outlined"
      color="primary"
      onClick={() => {
        if (mode === "light") {
          setMode("dark");
        } else {
          setMode("light");
        }
      }}
    >
      {mode === "light" ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
}

export default function FilesExample() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [docId, setDocId] = React.useState<string>();
  const [loading, setLoading] = React.useState(false);
  const [downloadURL, setDownloadURL] = React.useState<string>();

  React.useEffect(() => {
    if (docId) {
      const unsub = subscribeToAttemptResult(docId, (snapshot) => {
        const data = snapshot.data();
        console.log("snapshot", snapshot.data());
        if (data && data.status === "success") {
          const storage = getStorage();
          getDownloadURL(ref(storage, data.url))
            .then((url) => {
              setLoading(false);
              setDownloadURL(url);
            })
            .catch((error) => {
              // Handle any errors
              setLoading(false);
            });

          unsub && unsub();
        }
      });
      return () => {
        unsub && unsub();
      };
    }
  }, [docId]);

  return (
    <CssVarsProvider disableTransitionOnChange >
      <CssBaseline />
      {drawerOpen && (
        <Layout.SideDrawer onClose={() => setDrawerOpen(false)}>
          <Navigation />
        </Layout.SideDrawer>
      )}
      <Layout.Root
        sx={{
          gridTemplateColumns: {
            xs: "1fr",
            sm: "minmax(64px, 200px) minmax(450px, 1fr)",
            md: "minmax(160px, 300px) minmax(600px, 1fr) minmax(300px, 420px)",
          },
          ...(drawerOpen && {
            height: "100vh",
            overflow: "hidden",
          }),
        }}
      >
        <Layout.Header>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <IconButton
              variant="outlined"
              size="sm"
              onClick={() => setDrawerOpen(true)}
              sx={{ display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <IconButton
              size="sm"
              variant="solid"
              sx={{ display: { xs: "none", sm: "inline-flex" } }}
            >
              <FindInPageRoundedIcon />
            </IconButton>
            <Typography component="h1" fontWeight="xl">
              Doc kitöltő
            </Typography>
          </Box>
          {/*  <Input
            size="sm"
            placeholder="Search anything…"
            startDecorator={<SearchRoundedIcon color="primary" />}
            endDecorator={
              <IconButton variant="outlined" size="sm" color="neutral">
                <Typography
                  fontWeight="lg"
                  fontSize="sm"
                  textColor="text.tertiary"
                >
                  /
                </Typography>
              </IconButton>
            }
            sx={{
              flexBasis: "500px",
              display: {
                xs: "none",
                sm: "flex",
              },
            }}
          />*/}

          <Box sx={{ display: "flex", flexDirection: "row", gap: 1.5 }}>
            <IconButton
              size="sm"
              variant="outlined"
              color="primary"
              sx={{ display: { xs: "inline-flex", sm: "none" } }}
            >
              <SearchRoundedIcon />
            </IconButton>
            <IconButton
              size="sm"
              variant="outlined"
              color="primary"
              component="a"
              href="/blog/first-look-at-joy/"
            >
              <BookRoundedIcon />
            </IconButton>
            <Menu
              id="app-selector"
              control={
                <IconButton
                  size="sm"
                  variant="outlined"
                  color="primary"
                  aria-label="Apps"
                >
                  <GridViewRoundedIcon />
                </IconButton>
              }
              menus={[
                {
                  label: "Email",
                  href: "/joy-ui/getting-started/templates/email/",
                },
                {
                  label: "Team",
                  href: "/joy-ui/getting-started/templates/team/",
                },
                {
                  label: "Files",
                  active: true,
                  href: "/joy-ui/getting-started/templates/files/",
                  "aria-current": "page",
                },
              ]}
            />
            <ColorSchemeToggle />
          </Box>
        </Layout.Header>
        <Layout.SideNav>
          <Navigation />
        </Layout.SideNav>
        <Layout.Main>
          <form
            onSubmit={async (event) => {
              setDownloadURL(undefined);
              setDocId(undefined);

              event.preventDefault();
              //get the form data out of the event
              const target = event.target as any;
            

              try {
                setLoading(true);
                const id = await saveAttempt({
                  company_name: target.company_name.value,
                  company_address_city: target.company_address_city.value,
                  company_address_street: target.company_address_street.value,
                  company_address_postcode: target.company_address_postcode.value,
                  company_address_street_number: target.company_address_street_number.value,
                  company_representative: target.company_representative.value,
                  employee_name: target.employee_name.value,
                  employee_birth_date: target.employee_birth_date.value,
                  employee_birth_city: target.employee_birth_city.value,
                  employee_address: target.employee_address.value,
                  employee_mothers_name: target.employee_mothers_name.value,
                  employment_start_date: target.employment_start_date.value,
                  employment_end_date: target.employment_end_date.value,
                  current_date: target.current_date.value,
                  city: target.city.value,
                });
                console.log(id);
                setDocId(id);
              } catch (error) {
                console.log(error);
                setLoading(false);
              }
            }}
          >
            <Box
              sx={{
                display: "grid",
                gap: 2,
              }}
            >
              <Sheet
                variant="outlined"
                sx={{
                  borderRadius: "sm",
                  p: 2,
                }}
              >
                <Typography
                  fontSize="xs2"
                  textColor="text.tertiary"
                  textTransform="uppercase"
                  letterSpacing="md"
                  fontWeight="lg"
                  sx={{ mb: 2 }}
                >
                  Munkáltató adatai
                </Typography>
                <Sheet
                  variant="outlined"
                  sx={{
                    borderRadius: "sm",
                    gridColumn: "1/-1",
                    display: { xs: "none", sm: "grid" },
                    gridTemplateColumns: "1fr 1fr 1fr 1fr",
                    "& > *": {
                      p: 2,
                      "&:nth-child(n):not(:nth-last-child(-n+4))": {
                        borderBottom: "1px solid",
                        borderColor: "divider",
                      },
                    },
                  }}
                >
                  <FormControl>
                    <FormLabel>Cég neve</FormLabel>
                    <Input
                      placeholder="Cég neve"
                      required
                      name="company_name"
                      id="company_name"
                      size="md"
                      sx={{ mb: 1, fontSize: "var(--joy-fontSize-md)" }}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Ügyvezető</FormLabel>
                    <Input
                      placeholder="Ügyvezető"
                      required
                      name="company_representative"
                      id="company_representative"
                      size="md"
                      sx={{ mb: 1, fontSize: "var(--joy-fontSize-md)" }}
                    />
                  </FormControl>
                  <Box></Box>
                  <Box></Box>
                  <FormControl>
                    <FormLabel>Cím</FormLabel>
                    <Input
                      placeholder="Város"
                      required
                      name="company_address_city"
                      id="company_address_city"
                      size="md"
                      sx={{ mb: 1, fontSize: "var(--joy-fontSize-md)" }}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>&nbsp;</FormLabel>
                    <Input
                      placeholder="Irányítószám"
                      required
                      name="company_address_postcode"
                      id="company_address_postcode"
                      size="md"
                      sx={{ mb: 1, fontSize: "var(--joy-fontSize-md)" }}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>&nbsp;</FormLabel>
                    <Input
                      placeholder="Utca"
                      required
                      name="company_address_street"
                      id="company_address_street"
                      size="md"
                      sx={{ mb: 1, fontSize: "var(--joy-fontSize-md)" }}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>&nbsp;</FormLabel>
                    <Input
                      placeholder="Házszám"
                      required
                      name="company_address_street_number"
                      id="company_address_street_number"
                      size="md"
                      sx={{ mb: 1, fontSize: "var(--joy-fontSize-md)" }}
                    />
                  </FormControl>
                </Sheet>
              </Sheet>
              <Sheet
                variant="outlined"
                sx={{
                  borderRadius: "sm",
                  p: 2,
                }}
              >
                <Typography
                  fontSize="xs2"
                  textColor="text.tertiary"
                  textTransform="uppercase"
                  letterSpacing="md"
                  fontWeight="lg"
                  sx={{ mb: 2 }}
                >
                  Munkavállaló adatai
                </Typography>
                <Sheet
                  variant="outlined"
                  sx={{
                    borderRadius: "sm",
                    gridColumn: "1/-1",
                    display: { xs: "none", sm: "grid" },
                    gridTemplateColumns: "1fr 1fr 1fr 1fr",
                    "& > *": {
                      p: 2,
                      "&:nth-child(n):not(:nth-last-child(-n+4))": {
                        borderBottom: "1px solid",
                        borderColor: "divider",
                      },
                    },
                  }}
                >
                  <FormControl>
                    <FormLabel>Név</FormLabel>
                    <Input
                      placeholder="Név"
                      required
                      name="employee_name"
                      id="employee_name"
                      size="md"
                      sx={{ mb: 1, fontSize: "var(--joy-fontSize-md)" }}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Anyja neve</FormLabel>
                    <Input
                      placeholder="Anyja neve"
                      required
                      name="employee_mothers_name"
                      id="employee_mothers_name"
                      size="md"
                      sx={{ mb: 1, fontSize: "var(--joy-fontSize-md)" }}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Születési hely</FormLabel>
                    <Input
                      placeholder="Születési hely"
                      required
                      name="employee_birth_city"
                      id="employee_birth_city"
                      size="md"
                      sx={{ mb: 1, fontSize: "var(--joy-fontSize-md)" }}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Születési idő</FormLabel>
                    <Input
                      placeholder="Születési idő"
                      required
                      name="employee_birth_date"
                      id="employee_birth_date"
                      size="md"
                      sx={{ mb: 1, fontSize: "var(--joy-fontSize-md)" }}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Cím</FormLabel>
                    <Input
                      placeholder="Teljes cím"
                      required
                      name="employee_address"
                      id="employee_address"
                      size="md"
                      sx={{ mb: 1, fontSize: "var(--joy-fontSize-md)" }}
                    />
                  </FormControl>
                  <Box></Box> <Box></Box> <Box></Box>
                </Sheet>
              </Sheet>
              <Sheet
                variant="outlined"
                sx={{
                  borderRadius: "sm",
                  p: 2,
                }}
              >
                <Typography
                  fontSize="xs2"
                  textColor="text.tertiary"
                  textTransform="uppercase"
                  letterSpacing="md"
                  fontWeight="lg"
                  sx={{ mb: 2 }}
                >
                  Munkaviszony adatai
                </Typography>
                <Sheet
                  variant="outlined"
                  sx={{
                    borderRadius: "sm",
                    gridColumn: "1/-1",
                    display: { xs: "none", sm: "grid" },
                    gridTemplateColumns: "1fr 1fr 1fr 1fr",
                    "& > *": {
                      p: 2,
                      "&:nth-child(n):not(:nth-last-child(-n+4))": {
                        borderBottom: "1px solid",
                        borderColor: "divider",
                      },
                    },
                  }}
                >
                  <FormControl>
                    <FormLabel>Munkaviszony kezdete</FormLabel>
                    <Input
                      placeholder="Dátum"
                      required
                      name="employment_start_date"
                      id="employment_start_date"
                      size="md"
                      sx={{ mb: 1, fontSize: "var(--joy-fontSize-md)" }}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Munkaviszony vége</FormLabel>
                    <Input
                      placeholder="Dátum"
                      required
                      name="employment_end_date"
                      id="employment_end_date"
                      size="md"
                      sx={{ mb: 1, fontSize: "var(--joy-fontSize-md)" }}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Kelt</FormLabel>
                    <Input
                      placeholder="Dátum"
                      required
                      name="current_date"
                      id="current_date"
                      size="md"
                      sx={{ mb: 1, fontSize: "var(--joy-fontSize-md)" }}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Hely</FormLabel>
                    <Input
                      placeholder="Hely"
                      required
                      name="city"
                      id="city"
                      size="md"
                      sx={{ mb: 1, fontSize: "var(--joy-fontSize-md)" }}
                    />
                  </FormControl>
                </Sheet>
              </Sheet>

              <Sheet
                variant="outlined"
                sx={{
                  borderRadius: "sm",
                  gridColumn: "1/-1",
                  display: { xs: "none", sm: "grid" },
                  gridTemplateColumns: "1fr 1fr 1fr 1fr",
                  "& > *": {
                    p: 2,
                    "&:nth-child(n):not(:nth-last-child(-n+4))": {
                      borderBottom: "1px solid",
                      borderColor: "divider",
                    },
                  },
                }}
              >
                <Button
                  sx={{
                    m: 2,
                  }}
                  type="submit"
                  loading={loading}
                >
                  Kész
                </Button>
                <Button
                  sx={{
                    m: 2,
                  }}
                  disabled={!downloadURL}
                >
                  <a
                    href={downloadURL}
                    target="_blank"
                    download
                    rel="noreferrer"
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    Fájl letöltése
                  </a>
                </Button>
              </Sheet>
            </Box>
          </form>
        </Layout.Main>
        {/* <Sheet
          sx={{
            display: { xs: 'none', sm: 'initial' },
            borderLeft: '1px solid',
            borderColor: 'neutral.outlinedBorder',
          }}
        >
          <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ flex: 1 }}>torres-del-paine.png</Typography>
            <IconButton variant="outlined" color="neutral" size="sm">
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />
          <Box sx={{ display: 'flex' }}>
            <Button
              variant="soft"
              sx={{
                borderRadius: 0,
                borderBottom: '2px solid',
                borderColor: 'primary.solidBg',
                flex: 1,
                py: '1rem',
              }}
            >
              Details
            </Button>
            <Button
              variant="plain"
              color="neutral"
              sx={{ borderRadius: 0, flex: 1, py: '1rem' }}
            >
              Activity
            </Button>
          </Box>
          <AspectRatio ratio="21/9">
            <img
              alt=""
              src="https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?auto=format&fit=crop&w=774"
            />
          </AspectRatio>
          <Box sx={{ p: 2, display: 'flex', gap: 1, alignItems: 'center' }}>
            <Typography level="body2" mr={1}>
              Shared with
            </Typography>
            <AvatarGroup size="sm" sx={{ '--Avatar-size': '24px' }}>
              <Avatar
                src="https://i.pravatar.cc/24?img=6"
                srcSet="https://i.pravatar.cc/48?img=6 2x"
              />
              <Avatar
                src="https://i.pravatar.cc/24?img=7"
                srcSet="https://i.pravatar.cc/48?img=7 2x"
              />
              <Avatar
                src="https://i.pravatar.cc/24?img=8"
                srcSet="https://i.pravatar.cc/48?img=8 2x"
              />
              <Avatar
                src="https://i.pravatar.cc/24?img=9"
                srcSet="https://i.pravatar.cc/48?img=9 2x"
              />
            </AvatarGroup>
          </Box>
          <Divider />
          <Box
            sx={{
              gap: 2,
              p: 2,
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              '& > *:nth-child(odd)': { color: 'text.secondary' },
            }}
          >
            <Typography level="body2">Type</Typography>
            <Typography level="body2" textColor="text.primary">
              Image
            </Typography>

            <Typography level="body2">Size</Typography>
            <Typography level="body2" textColor="text.primary">
              3,6 MB (3,258,385 bytes)
            </Typography>

            <Typography level="body2">Storage used</Typography>
            <Typography level="body2" textColor="text.primary">
              3,6 MB (3,258,385 bytes)
            </Typography>

            <Typography level="body2">Location</Typography>
            <Typography level="body2" textColor="text.primary">
              Travel pictures
            </Typography>

            <Typography level="body2">Owner</Typography>
            <Typography level="body2" textColor="text.primary">
              Michael Scott
            </Typography>

            <Typography level="body2">Modified</Typography>
            <Typography level="body2" textColor="text.primary">
              26 October 2016
            </Typography>

            <Typography level="body2">Created</Typography>
            <Typography level="body2" textColor="text.primary">
              5 August 2016
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ py: 2, px: 1 }}>
            <Button variant="plain" size="sm" endDecorator={<EditOutlinedIcon />}>
              Add a description
            </Button>
          </Box>
        </Sheet> */}
      </Layout.Root>
    </CssVarsProvider>
  );
}
