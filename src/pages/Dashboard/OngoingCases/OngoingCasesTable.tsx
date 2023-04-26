import { Chip, IconButton, Sheet, Stack, Table, Typography } from "@mui/joy";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
export interface inProgressItem {
  title: string;
  id: string;
  type: string;
  updatedAt?: string;
}

export default function OngoingCasesTable() {
  const inProgress: inProgressItem[] = [
    {
      title: "Kovács Márta - Gipsz Péter",
      id: "2",
      type: "Adásvétel",
      updatedAt: "ma",
    },
    {
      title: "Kiss Péter - Trax Kft",
      id: "4",
      type: "Adásvétel",
      updatedAt: "tegnap",
    },
    {
      title: "Nagy Lajos - Utca Kft",
      id: "3",
      type: "Vételi ajánlat",
      updatedAt: "2023.04.11.",
    },
    {
      title: "Tamás Béla - Nagy Piroska",
      id: "4",
      type: "Adásvétel",
      updatedAt: "2023.04.11.",
    },
    {
      title: "Bérc Vivien - Léva János",
      id: "5",
      type: "Vételi ajánlat",
      updatedAt: "2023.04.11.",
    },
    {
      title: "Nagy Lajos - Utca Kft",
      id: "3",
      type: "Vételi ajánlat",
      updatedAt: "2023.04.11.",
    },
    {
      title: "Tamás Béla - Nagy Piroska",
      id: "4",
      type: "Adásvétel",
      updatedAt: "2023.04.11.",
    },
    {
      title: "Bérc Vivien - Léva János",
      id: "5",
      type: "Vételi ajánlat",
      updatedAt: "2023.04.11.",
    },
  ];

  return (
    <>
      <Sheet
        variant="outlined"
        sx={{
          pt: 1,
          borderRadius: "sm",
        }}
      >
        <Table
          aria-label="table variants"
          //variant={"plain"}
          stripe="odd"
          hoverRow
          sx={{
            borderRadius: "sm",
            "--Table-headerUnderlineThickness": "1px",
            "--TableCell-height": "44px",
            overflow: "hidden",
          }}
        >
          <thead>
            <tr>
              <th style={{ maxWidth: "50%", width: "40%" }}>Ügy</th>
              <th style={{}}>Ügytípus</th>
              <th style={{ textAlign: "right" }}>Frissítve</th>
              <th style={{ width: "10%", textAlign: "center" }}></th>
            </tr>
          </thead>
          <tbody>
            {inProgress.map((item, index) => (
              <tr key={"caselistx_" + index + item.title}>
                <td>
                  <Typography level="body2" startDecorator={<FolderOpenIcon />}>
                    {item.title}
                  </Typography>
                </td>
                <td>
                  <Chip
                    color={item.type === "Adásvétel" ? "info" : "neutral"}
                    onClick={function () {}}
                    size="sm"
                  >
                    {item.type}
                  </Chip>
                </td>
                <td>
                  <Typography
                    level="body2"
                    sx={{
                      textAlign: "right",
                      fontSize: {
                        xs: "11px",
                        sm: "13px",
                      }
                    }}
                  >
                    {item.updatedAt ?? ""}
                  </Typography>
                </td>

                <td>
                  <Stack direction={"row"} gap={2} justifyContent="flex-end">
                    {/*
                    <Button
                    size="sm"
                    color={"primary"}
                    component={RouterLink}
                    to={ROUTES.DRAFT + "/" + caseID + item.id}
                  >
                    Szerkesztés
                  </Button>
          */}
                    <IconButton
                      size="sm"
                      variant="solid"
                      onClick={() => {
                        //navigate(ROUTES.DASHBOARD);
                      }}
                    >
                      <EditRoundedIcon />
                    </IconButton>
                  </Stack>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
    </>
  );
}
