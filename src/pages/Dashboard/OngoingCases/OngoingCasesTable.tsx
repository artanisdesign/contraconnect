import {
  Avatar,
  AvatarGroup,
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  Sheet,
  Typography,
} from "@mui/joy";
import { Folder } from "react-feather";

export default function OngoingCasesTable() {
  return (
    <>
      <Sheet
        variant="outlined"
        sx={{
          borderRadius: "sm",
          boxShadow: "sm",
          gridColumn: "1/-1",
          display: { xs: "none", sm: "grid" },
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          "& > *": {
            p: 2,
            "&:nth-of-type(n):not(:nth-last-of-type(-n+4))": {
              borderBottom: "1px solid",
              borderColor: "divider",
            },
          },
        }}
      >
        <Typography level="body3" fontWeight="md" noWrap>
          Név
        </Typography>
        <Typography level="body3" fontWeight="md" noWrap>
          Utolsó szerkesztés
        </Typography>
        <Typography level="body3" fontWeight="md" noWrap>
          Size
        </Typography>
        <Typography level="body3" fontWeight="md" noWrap>
          Szerkesztette
        </Typography>

        <Typography
          level="body2"
          startDecorator={<Folder size={18} />}
          sx={{ alignItems: "flex-start" }}
        >
          Gipsz Kft. alapítása
        </Typography>
        <Typography level="body2">21 October 2011, 3PM</Typography>
        <Typography level="body2" sx={{ color: "success.600" }}>
          987.5MB
        </Typography>
        <Box>
          <AvatarGroup
            size="sm"
            sx={{ "--AvatarGroup-gap": "-8px", "--Avatar-size": "24px" }}
          >
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
        <Typography
          level="body2"
          startDecorator={<Folder size={18} />}
          sx={{ alignItems: "flex-start" }}
        >
          Kovács József felmondása
        </Typography>
        <Typography level="body2">26 May 2010, 7PM</Typography>
        <Typography level="body2" sx={{ color: "success.600" }}>
          123.3KB
        </Typography>
        <Box>
          <AvatarGroup
            size="sm"
            sx={{ "--AvatarGroup-gap": "-8px", "--Avatar-size": "24px" }}
          >
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
      </Sheet>
      <Sheet
        variant="outlined"
        sx={{
          display: { xs: "inherit", sm: "none" },
          borderRadius: "sm",
          overflow: "auto",
          "& > *": {
            "&:nth-of-type(n):not(:nth-last-of-type(-n+4))": {
              borderBottom: "1px solid",
              borderColor: "divider",
            },
          },
        }}
      >
        <List
          aria-labelledby="table-in-list"
          sx={{
            "& .JoyListItemButton-root": { p: "0px" },
          }}
        >
          <ListItem>
            <ListItemButton variant="soft" sx={{ bgcolor: "transparent" }}>
              <ListItemContent sx={{ p: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography
                    level="body2"
                    startDecorator={<Folder />}
                    sx={{ alignItems: "flex-start" }}
                  >
                    Travel pictures
                  </Typography>
                  <Typography level="body2" sx={{ color: "success.600" }}>
                    987.5MB
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 2,
                  }}
                >
                  <Box>
                    <AvatarGroup
                      size="sm"
                      sx={{
                        "--AvatarGroup-gap": "-8px",
                        "--Avatar-size": "24px",
                      }}
                    >
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
                  <Typography level="body2">21 October 2011, 3PM</Typography>
                </Box>
              </ListItemContent>
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemButton variant="soft" sx={{ bgcolor: "transparent" }}>
              <ListItemContent sx={{ p: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography
                    level="body2"
                    startDecorator={<Folder />}
                    sx={{ alignItems: "flex-start" }}
                  >
                    Important documents
                  </Typography>
                  <Typography level="body2" sx={{ color: "success.600" }}>
                    123.3KB
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 2,
                  }}
                >
                  <Box>
                    <AvatarGroup
                      size="sm"
                      sx={{
                        "--AvatarGroup-gap": "-8px",
                        "--Avatar-size": "24px",
                      }}
                    >
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
                  <Typography level="body2">26 May 2010, 7PM</Typography>
                </Box>
              </ListItemContent>
            </ListItemButton>
          </ListItem>
        </List>
      </Sheet>
    </>
  );
}
