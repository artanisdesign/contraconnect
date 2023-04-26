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
  Autocomplete,
  CircularProgress,
  AutocompleteOption,
  ListItemContent,
  Typography,
} from "@mui/joy";

import { getData } from "data";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { saveAttempt, subscribeToAttemptResult } from "firestore/attempt";
import React from "react";
import { useParams } from "react-router-dom";
import { CaseTemplate, RadioOption, SelectOption } from "types";
import { HelpCircle } from "react-feather";
import { useGetCompanyList } from "api/companies";
import useDebounce from "hooks/useDebounce";

export default function DraftPage() {
  let { draftID } = useParams();
  let document: CaseTemplate | undefined;
  if (draftID) {
    document = getData(draftID);
  }
  const [docId, setDocId] = React.useState<string>();
  const [autoCompleteOpen, setAutoCompleteOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [downloadURL, setDownloadURL] = React.useState<string>();
  const [companyLookUpString, setCompanyLookUpString] =
    React.useState<string>("");
  const [formState, setFormState] = React.useState<{ [key: string]: any }>({});

  const searchText = useDebounce(companyLookUpString, 300);

  const {
    isLoading,
    isError,
    data: options,
    error,
    isFetching,
  } = useGetCompanyList(searchText);

  console.log("isLoading", isLoading, isError, options, error, isFetching);

  React.useEffect(() => {
    if (!autoCompleteOpen) {
      //setOptions([]);
    }
  }, [autoCompleteOpen]);

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
    console.log("handleSelectChange", name, value);
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

  if (!document) return <>Hamarosan...</>;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <form
        onSubmit={async (event) => {
          //setDownloadURL(undefined);
          //setDocId(undefined);

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
          //console.log(data);
          const formattedData: { [key: string]: any } = {};
          for (const [key, value] of Object.entries(data)) {
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

          //console.log("formatted", formattedData);
          setDownloadURL(undefined);
          try {
            setLoading(true);
            const id = await saveAttempt({
              ...formattedData,
              documents: document?.documentsDetails,
            });
            console.log(id);
            setDocId(id);
          } catch (error) {
            console.log(error);
            setLoading(false);
          }
        }}
      >
        <Typography
          sx={{
            //fontWeight: 600,
            mb: 2,
            mx: 1,
          }}
          level="h2"
          variant="plain"
          color="warning"
        >
          {document.title}
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
                key={section.id}
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

                  {section.type === "company" && (
                    <Grid container sx={{ p: 2 }} xs={12}>
                      <FormControl
                        id="company-lookup"
                        sx={{
                          width: "100%",
                        }}
                      >
                        <FormLabel>
                          Cég kereső név alapján (még nem tölti ki⚠️)
                        </FormLabel>
                        {
                          <Autocomplete
                            sx={{}}
                            size="sm"
                            placeholder="Kezdje el gépelni a cég nevét..."
                            open={autoCompleteOpen}
                            onOpen={() => {
                              setAutoCompleteOpen(true);
                            }}
                            onClose={() => {
                              setAutoCompleteOpen(false);
                            }}
                            onInputChange={(_, newInputValue) => {
                              setCompanyLookUpString(newInputValue);
                            }}
                            onChange={(_, newValue) => {
                              console.log("newValue", newValue);
                              if (newValue) {
                                /* setFormState((prevState) => ({
                                ...prevState,
                                [section.id]: newValue,
                              }));*/
                              }
                            }}
                            isOptionEqualToValue={(option, value) =>
                              option.RegNumber === value.RegNumber
                            }
                            renderOption={(props, option) => (
                              <AutocompleteOption
                                {...props}
                                key={option.RegNumber + option.Name}
                              >
                                <ListItemContent sx={{ fontSize: "sm" }}>
                                  {option.Name}
                                </ListItemContent>
                              </AutocompleteOption>
                            )}
                            getOptionLabel={(option) => option.Name}
                            options={options ?? []}
                            loading={isLoading}
                            loadingText={"..."}
                            endDecorator={
                              isFetching ? (
                                <CircularProgress
                                  size="sm"
                                  sx={{ bgcolor: "background.surface" }}
                                />
                              ) : null
                            }
                          />
                        }
                      </FormControl>
                    </Grid>
                  )}

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
                          key={"d" + index + field.id}
                        >
                          <FormControl key={field.id}>
                            <FormLabel
                              sx={{
                                fontSize: 14,
                                mb:0.5,
                                mt:0.5,
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
                                  field.options.map((option) => (
                                    <Radio
                                      value={(option as RadioOption).value}
                                      name={field.id}
                                      id={field.id}
                                      disabled={
                                        (option as RadioOption).disabled
                                      }
                                      label={(option as RadioOption).label}
                                      key={(option as RadioOption).value}
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
                              key={"select_" + field.id}
                              size="sm"
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
                                  variant={
                                    (option as SelectOption).disabled
                                      ? "solid"
                                      : undefined
                                  }
                                  disabled={(option as SelectOption).disabled}
                                  value={(option as SelectOption).value}
                                >
                                  {(option as SelectOption).value}
                                  {" - "}
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
                                key={(option as RadioOption).value}
                              >
                                <FormControl key={"xd" + field.id}>
                                  <Checkbox
                                    overlay
                                    label={(option as RadioOption).label}
                                    key={(option as RadioOption).value}
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
      </form>
    </Box>
  );
}
