import { Chip, IconButton, Sheet, Table, Typography } from "@mui/joy";
//mport { useParams } from "react-router-dom";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
//import { Link as RouterLink } from "react-router-dom";
//import * as ROUTES from "routes";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
export interface inProgressItem {
  title: string;
  id: string;
  type: string;
  updatedAt?: string;
}

export default function CasesCategoryPage() {
  //let { caseID } = useParams();

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
  ];

  return (
    <Sheet
      variant="outlined"
      sx={{
        borderRadius: "sm",
      }}
    >
      <Table
        aria-label="table variants"
        variant={"plain"}
        stripe={"odd"}
        hoverRow
        sx={{
          borderRadius: "sm",
          overflow: "hidden",
          "--Table-headerUnderlineThickness": "1px",
          "--TableCell-height": "44px",
        }}
      >
        <thead>
          <tr>
            <th style={{ maxWidth: "50%", width: "40%" }}>Ügy</th>
            <th style={{}}>Ügytípus</th>
            <th style={{ textAlign: "right"}}>Frissítve</th>
            <th style={{ width: "10%", textAlign: "center" }}></th>
          </tr>
        </thead>
        <tbody>
          {inProgress.map((item, index) => (
            <tr key={"caselistx_" + index + item.title}>
              <td
              >
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
                <IconButton
                  size="sm"
                  variant="solid"
                  onClick={() => {
                    //navigate(ROUTES.DASHBOARD);
                  }}
                  sx={{ display: { sm: "inline-flex" } }}
                >
                  <EditRoundedIcon />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Sheet>
  );
}
