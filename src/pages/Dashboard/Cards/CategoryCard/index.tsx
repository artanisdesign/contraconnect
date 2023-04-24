import {
  Box,
  Button,
  Card,
  Chip,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemDecorator,
  ListItemContent,
} from "@mui/joy";
import { Link as RouterLink } from "react-router-dom";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { CategoryCardProps } from "types/Cards";
import { FileText } from "react-feather";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
export default function CategoryCard({
  item,
  index,
  isColumn = true,
}: {
  item: CategoryCardProps;
  index: number;
  isColumn?: boolean;
}) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  if (matches) {
    isColumn = true;
  }
  return (
    <Grid
      container
      direction={isColumn ? "column" : "row"}
      justifyContent="flex-start"
      alignItems="stretch"
      spacing={0}
      sx={{
        height: "100%",
      }}
    >
      <Grid xs={isColumn ? 12 : 6} sx={{ height: isColumn ? "60%" : "100%" }}>
        <Card
          sx={{
            gap: 2,
            boxShadow: "md",
            backgroundColor: "primary." + (+(index ?? 0) + 5) + "00",
            overflow: "hidden",
            zIndex: 1,
            height: "100%",
          }}
          color="primary"
          variant="solid"
          invertedColors
        >
          <Box
            component="img"
            alt=""
            src="/assets/boxbg.png"
            sx={{
              position: "absolute",
              height: "100%",
              top: 0,
              right: 0,
              opacity: 0.3,
            }}
          />
          {item.count && (
            <Chip
              size="sm"
              variant="soft"
              sx={{
                alignSelf: "flex-start",
                borderRadius: "xl",
                position: "absolute",
                top: "1rem",
                right: "1rem",
                display: {
                  xs: "flex",
                  sm: "none",
                  md: "flex",
                },
              }}
            >
              {item.count}
            </Chip>
          )}
          <Typography
            fontSize="xl"
            fontWeight="lg"
            sx={{
              textShadow: "0px 1px 1px rgba(0, 0, 0, 0.10)",
            }}
          >
            {item.title}
          </Typography>
          <Typography
            fontSize="body2"
            sx={{
              textShadow: "0px 1px 0px rgba(0, 0, 0, 0.10)",
            }}
          >
            {item.description}
          </Typography>
          <Button
            variant="solid"
            sx={{
              mt: "auto",
              "&:hover": { "--Button-gap": "0.8rem" },
              "& span": { transition: "0.15s" },
            }}
            component={RouterLink}
            to={item.href}
            endDecorator={<KeyboardArrowRightIcon />}
          >
            Tovább
          </Button>
        </Card>
      </Grid>
      <Grid
        xs={isColumn ? 12 : 6}
        sx={{
          mt: "auto",
          mb: 0,
          height: isColumn ? "40%" : "100%",
        }}
      >
        <Card
          sx={{
            mt: isColumn ? -1 : 0,
            ml: isColumn ? "auto" : -1,
            mr: isColumn ? "auto" : 0,
            width: "100%",
            boxShadow: "sm",
            zIndex: 0,
            height: "100%",
            minHeight: "136px",
          }}
        >
          <List
            aria-labelledby="nav-list-browser"
            sx={{
              "--ListItem-radius": "8px",
              "--List-gap": "2px",
              ml: isColumn ? 0 : 1,
            }}
            size="sm"
          >
            {item.popularItems?.map((_item, index) =>
              isColumn && index > 2 ? null : (
                <ListItem key={"yy" + index + _item.title}>
                  <ListItemButton
                    variant="plain"
                    color="warning"
                    component={RouterLink}
                    to={item.href}
                  >
                    <ListItemDecorator sx={{ color: "inherit" }}>
                      <FileText size={18} />
                    </ListItemDecorator>
                    <ListItemContent
                      sx={{
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        ml: -1,
                      }}
                    >
                      {_item.title}
                    </ListItemContent>
                  </ListItemButton>
                </ListItem>
              )
            )}
          </List>
        </Card>
      </Grid>
    </Grid>
  );
}
