import { Button, Sheet, Stack, Table, Typography } from "@mui/joy";
import { useParams } from "react-router-dom";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import { mainCategories } from "pages/Dashboard/DashboardPage";
import { Link as RouterLink } from "react-router-dom";
import * as ROUTES from "routes";

export default function CasesCategoryPage() {
  let { caseID } = useParams();

  const foundMain = mainCategories.find((item) =>
    item.href.endsWith(caseID ?? "")
  );
  const filteredCases = foundMain?.popularItems;
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
        sx={{
          borderRadius: "sm",
          "--Table-headerUnderlineThickness": "1px",
          "--TableCell-height": "44px",
        }}
      >
        <thead>
          <tr>
            <th style={{ width: "30%" }}>Ügy</th>
            <th style={{ width: "20%" }}>Dokumentumok</th>
            <th style={{ width: "20%" }}> Frissítve</th>
            <th style={{ textAlign: "center" }}></th>
          </tr>
        </thead>
        <tbody>
          {filteredCases?.map((item, index) => (
            <tr key={"caselistx_" + index + item.title}>
              <td>
                <Typography level="body2" startDecorator={<FolderOpenIcon />}>
                  {item.title}
                </Typography>
              </td>
              <td>
                <Typography level="body2">{item.documentCount ?? 0}</Typography>
              </td>

              <td>
                <Typography level="body2">{item.updatedAt ?? ""}</Typography>
              </td>

              <td>
                <Stack direction={"row"} gap={2} justifyContent="flex-end">
                  <Button
                    size="sm"
                    disabled={item.href === "/"}
                    variant="plain"
                    color="neutral"
                  >
                    Információ
                  </Button>
                  <Button
                    size="sm"
                    color={"primary"}
                    disabled={item.href === "/"}
                    component={RouterLink}
                    to={ROUTES.DRAFT + "/" + caseID + item.href}
                  >
                    Szerkesztés
                  </Button>
                </Stack>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Sheet>
  );
}
