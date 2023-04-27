import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Radio,
  RadioGroup,
  Select,
  Option,
  Sheet,
  Tooltip,
  Typography,
  IconButton,
  Modal,
  ModalDialog,
  ModalClose,
  CircularProgress,
} from "@mui/joy";

import { getData } from "data";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { saveAttempt, subscribeToAttemptResult } from "firestore/attempt";
import React from "react";
import { useParams } from "react-router-dom";
import { CaseTemplate, RadioOption, SelectOption } from "types";
import { HelpCircle } from "react-feather";
import { AutoFixNormalRounded } from "@mui/icons-material";

export default function DraftPage() {
  let { draftID } = useParams();

  const [docId, setDocId] = React.useState<string>();

  const [document, setDocument] = React.useState<CaseTemplate>();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [tryPreLoad, setTryPreLoad] = React.useState(false);
  const [downloadURL, setDownloadURL] = React.useState<string>();

  const [formState, setFormState] = React.useState<{ [key: string]: any }>({});

  const handleRadioChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    reset = false
  ) => {
    if (reset) {
      setFormState({
        [event.target.name]: event.target.value,
      });
    } else {
      setFormState((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value,
      }));
    }
  };
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.checked,
    }));
  };
  const handleSelectChange = (name: string, value: string) => {
    //console.log("handleSelectChange", name, value);
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

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
        if (data && data.status === "failed") {
          setLoading(false);
          unsub && unsub();
        }
      });
      return () => {
        unsub && unsub();
      };
    }
  }, [docId]);

  React.useEffect(() => {
    if (tryPreLoad && document) {
      console.log("tryPreLoad", tryPreLoad);

      var nd = document;

      document.fieldSections.map((section, index) => {
        section.fields.map((field, index) => {
          if (
            field.fieldType === "text" &&
            field.preLoadValues &&
            field.preLoadValues.length > 0
          ) {
            //get random value from the array
            field.defaultValue =
              field.preLoadValues[
                Math.floor(Math.random() * field.preLoadValues.length)
              ];
          }
          if (field.defaultValue) {
            setFormState((prevState) => ({
              ...prevState,
              [field.id]: field.defaultValue,
            }));
          }
          return field;
        });
        section.step = Date.now();
        return section;
      });
      nd.updatedAt = Date.now();
      setDocument(nd);

      setTryPreLoad(false);
    }
  }, [tryPreLoad, document]);

  let _document: CaseTemplate | undefined;
  if (draftID && !document) {
    _document = getData(draftID);
    setDocument(_document);
  }

  if (!document) return <>Hamarosan...</>;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <form
        onSubmit={async (event) => {
          setDownloadURL(undefined);
          setDocId(undefined);

          event.preventDefault();
          //get the form data out of the event
          const target = event.target as any;

          const data: { [key: string]: any } = { ...formState };

          //console.log("formState", formState);

          document?.fieldSections.forEach((section) => {
            section.fields.forEach((field) => {
              if (target[field.id] && target[field.id].value !== undefined) {
                data[field.id] = target[field.id].value;
                //

                //console.log(field.id, target[field.id].value);
              }
              if (formState[field.id] !== undefined) {
                data[field.id] = formState[field.id];
              }
            });
          });
          const formattedData: { [key: string]: any } = {};

          for (const [key, value] of Object.entries(data)) {
            if (value) {
              if (
                value.toString().toLowerCase() === "true" ||
                value.toString().toLowerCase() === "yes"
              ) {
                formattedData[key] = true;
              } else if (
                value.toString().toLowerCase() === "false" ||
                value.toString().toLowerCase() === "no"
              ) {
                formattedData[key] = false;
              } else if (value !== "" && value !== undefined) {
                formattedData[key] = value;
              }
            }
          }

          setDownloadURL(undefined);
          try {
            setLoading(true);
            const id = await saveAttempt({
              ...formattedData,
              documents: document?.documentsDetails,
            });
            console.log(id);
            setDocId(id);
            setOpen(true);
          } catch (error) {
            console.log(error);
            setLoading(false);
          }
        }}
      >
        <Typography
          sx={{
            mb: 2,
            mx: 1,
          }}
          level="h2"
          variant="plain"
          color="warning"
        >
          {document.title}
          <IconButton
            variant="plain"
            sx={{
              ml: 2,
            }}
            onClick={() => {
              setTryPreLoad(true);
            }}
          >
            <AutoFixNormalRounded />
          </IconButton>
        </Typography>
        <Grid
          container
          spacing={2}
          sx={{ flexGrow: 1 }}
          direction="row"
          alignItems={"stretch"}
          justifyContent={"flex-start"}
        >
          {document.fieldSections.map((section) => {
            if (
              section.visibleState &&
              section.visibleState.length &&
              section.visibleCondition &&
              !section.visibleState.find(
                (state) => formState[state] === section.visibleCondition
              )
            ) {
              return null;
            }

            return (
              <Grid
                xs={12}
                sm={12}
                md={section.fullWidth ? 12 : 6}
                key={section.id + section.step}
              >
                <Card
                  sx={{
                    //height: "100%",
                    boxShadow: "sm",
                  }}
                  variant="outlined"
                >
                  <Typography
                    sx={{
                      fontWeight: 600,
                      p: 1,
                      mb: 1,
                    }}
                    level="h6"
                    color="neutral"
                    variant="soft"
                  >
                    {section.title}
                  </Typography>

                  <Grid container sx={{}} spacing={2}>
                    {section.fields.map((field, index) => {
                      if (
                        field.visibleState &&
                        field.visibleState.length &&
                        field.visibleCondition &&
                        !field.visibleState.find(
                          (state) => formState[state] === field.visibleCondition
                        )
                      ) {
                        return null;
                      }

                      return (
                        <Grid
                          xs={12}
                          sm={field.fullWidth ? 12 : 6}
                          key={"d" + index}
                        >
                          <FormControl key={field.id}>
                            <FormLabel
                              sx={{
                                fontSize: 14,
                                mb: 0.5,
                                mt: 0.5,
                                opacity: field.disabled ? 0.4 : 1,
                              }}
                            >
                              {field.title}
                              {field.mandatory ? " *" : ""}
                              {field.helperText && (
                                <Tooltip describeChild title={field.helperText}>
                                  <HelpCircle className="feather" />
                                </Tooltip>
                              )}
                            </FormLabel>
                            {field.fieldType === "radiogroup" && (
                              <RadioGroup
                                defaultValue={field.defaultValue}
                                onChange={(evt) =>
                                  handleRadioChange(evt, field.resetOnChange)
                                }
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "flex-start",
                                }}
                                name={field.id}
                                id={field.id}
                              >
                                {field.options &&
                                  field.options.map((option, index) => (
                                    <Radio
                                      value={(option as RadioOption).value}
                                      name={field.id}
                                      id={field.id}
                                      disabled={
                                        (option as RadioOption).disabled
                                      }
                                      label={(option as RadioOption).label}
                                      key={
                                        (option as RadioOption).value + index
                                      }
                                      sx={
                                        {
                                          //width: "100%",
                                        }
                                      }
                                    />
                                  ))}
                              </RadioGroup>
                            )}

                            {(field.fieldType === "text" ||
                              field.fieldType === "email" ||
                              field.fieldType === "number") && (
                              <Input
                                placeholder={field.placeholder || field.title}
                                required={field.mandatory}
                                variant="outlined"
                                color="neutral"
                                name={field.id}
                                disabled={field.disabled}
                                defaultValue={field.defaultValue || ""}
                                type={field.fieldType}
                                id={field.id}
                                size="sm"
                                sx={(theme) => ({
                                  backgroundColor: `rgba(${theme.palette.neutral.mainChannel} / 0.08 )`,
                                })}
                                startDecorator={field.startDecorator || null}
                                endDecorator={field.endDecorator || null}
                              />
                            )}
                          </FormControl>

                          {field.fieldType === "select" && field.options && (
                            <Select
                              variant="outlined"
                              color="neutral"
                              disabled={field.disabled}
                              key={"select_" + field.id}
                              size="sm"
                              defaultValue={field.defaultValue || ""}
                              onChange={(_e: any, newValue) => {
                                handleSelectChange(
                                  field.id,
                                  newValue as string
                                );
                              }}
                              sx={{
                                overflow: "hidden",
                              }}
                            >
                              {field.options.map((option, index) => (
                                <Option
                                  color="neutral"
                                  variant={
                                    (option as SelectOption).disabled
                                      ? "plain"
                                      : undefined
                                  }
                                  disabled={(option as SelectOption).disabled}
                                  value={(option as SelectOption).value}
                                  key={(option as SelectOption).value + index}
                                >
                                  {(option as RadioOption).label}
                                </Option>
                              ))}
                            </Select>
                          )}

                          {field.fieldType === "checkbox" &&
                            field.options &&
                            field.options.map((option, index) => (
                              <Sheet
                                variant="outlined"
                                sx={{
                                  bgcolor: "background.body",
                                  p: 1,
                                  my: 1,
                                  borderRadius: 6,
                                }}
                                key={(option as RadioOption).value + index}
                              >
                                <FormControl key={"xd" + field.id}>
                                  <Checkbox
                                    overlay
                                    label={(option as RadioOption).label}
                                    key={(option as RadioOption).value}
                                    disabled={(option as RadioOption).disabled}
                                    name={(option as RadioOption).value}
                                    checked={
                                      formState[
                                        (option as RadioOption).value
                                      ] ?? false
                                    }
                                    value={
                                      formState[
                                        (option as RadioOption).value
                                      ] ?? false
                                    }
                                    onChange={(evt) =>
                                      handleCheckboxChange(evt)
                                    }
                                  />
                                </FormControl>
                              </Sheet>
                            ))}
                        </Grid>
                      );
                    })}
                  </Grid>
                </Card>
              </Grid>
            );
          })}
        </Grid>
        <Button
          sx={{
            m: 2,
          }}
          size="lg"
          type="submit"
          loading={loading}
        >
          Kész
        </Button>

        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog
            color="neutral"
            layout="center"
            size="md"
            variant="outlined"
          >
            <ModalClose />
            <Typography>
              {loading ? "Fájlok készítése.." : "Elkészült fájlok letöltése"}
            </Typography>
            <Box
              sx={{
                flexDirection: "column",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              {loading && <CircularProgress sx={{ m: 2, mt: 3 }} />}
              <Button
                sx={{
                  mt: 2,
                }}
                fullWidth
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
                  Fájlok letöltése
                </a>
              </Button>
            </Box>
          </ModalDialog>
        </Modal>
      </form>
    </Box>
  );
}
