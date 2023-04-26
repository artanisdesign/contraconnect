import * as React from "react";
import { useState } from "react";

import * as ROUTES from "routes";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel, { formLabelClasses } from "@mui/joy/FormLabel";

import Link from "@mui/joy/Link";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";

//import GoogleIcon from "icons/GoogleIcon";
import { doSignInWithEmailAndPassword } from "_firebase/_auth";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { CircularProgress, FormHelperText } from "@mui/joy";
import {
  /*getAuth,*/ /* signInWithPopup,*/ GoogleAuthProvider,
} from "firebase/auth";
import { useAuth } from "hooks/useAuth";
import ColorSchemeToggle from "components/ColorSchemeToogle";

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
}
interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

function getMousePos(evt: MouseEvent) {
  var doc = document.documentElement || document.body;
  const event = window.event as MouseEvent;
  var pos = {
    x: evt ? evt.pageX : event.clientX + doc.scrollLeft - doc.clientLeft,
    y: evt ? evt.pageY : event.clientY + doc.scrollTop - doc.clientTop,
  };
  return pos;
}

function moveMouse(evt: MouseEvent) {
  var pos = getMousePos(evt),
    followMouses = document.getElementsByClassName(
      "_followMouse"
    ) as HTMLCollectionOf<HTMLElement>;
  if (followMouses.length > 0) {
    for (let item of followMouses) {
      item.style.backgroundPosition = pos.x + "px " + pos.y + "px";
    }
  }
}

export function LoginPage() {
  //const auth = getAuth();

  const provider = new GoogleAuthProvider();
  //provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
  provider.addScope("email");
  provider.setCustomParameters({
    login_hint: "user@example.com",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);

  let from = ROUTES.DASHBOARD;

  const { user, loading: authLoading } = useAuth();

  if (authLoading) {
    return (
      <CircularProgress
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    );
  } else if (user && !authLoading) {
    return <Navigate to={ROUTES.DASHBOARD} />;
  }

  if (
    location.state?.from?.pathname &&
    location.state?.from?.pathname.startsWith(ROUTES.DASHBOARD)
  ) {
    from = location.state?.from?.pathname;
  }

  document.onmousemove = moveMouse;
  /*
  function handleGoogleLogin() {
    //console.log("handleGoogleLogin");
    setLoading(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential) {
          //const token = credential.accessToken;
          // The signed-in user info.
          //const user = result.user;
          // IdP data available using getAdditionalUserInfo(result)
          // ...
        }
        navigate(from, { replace: true });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.log(errorCode, errorMessage, email, credential);
      })
      .finally(() => {
        setLoading(false);
      });
  }
*/
  function handleSubmit(event: React.FormEvent<SignInFormElement>) {
    event.preventDefault();
    setLoading(true);
    let formData = new FormData(event.currentTarget);
    let email = formData.get("email") as string;
    let password = formData.get("password") as string;

    doSignInWithEmailAndPassword(email.trim(), password)
      .then(() => {
        // Send them back to the page they tried to visit when they were
        // redirected to the login page. Use { replace: true } so we don't create
        // another entry in the history stack for the login page.  This means that
        // when they get to the protected page and click the back button, they
        // won't end up back on the login page, which is also really nice for the
        // user experience.
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setLoginError(true);
      });
  }

  return (
    <>
      <Box
        sx={(theme) => ({
          width:
            "clamp(100vw - var(--Cover-width), (var(--Collapsed-breakpoint) - 100vw) * 999, 100vw)",
          transition: "width var(--Transition-duration)",
          //transitionDelay: "calc(var(--Transition-duration))",
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "flex-end",
          backdropFilter: "blur(8px)",
          backgroundColor: "rgba(255 255 255 / 0.9)",
          [theme.getColorSchemeSelector("dark")]: {
            backgroundColor: "rgba(19 19 24 / 0.9)",
          },
        })}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100dvh",
            width:
              "clamp(var(--Form-maxWidth), (var(--Collapsed-breakpoint) - 100vw) * 999, 100%)",
            maxWidth: "100%",
            px: 2,
          }}
        >
          <Box
            component="header"
            sx={{
              py: 3,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-end",
            }}
          >
            <ColorSchemeToggle />
          </Box>
          <Box
            component="main"
            sx={{
              my: "auto",
              py: 1,
              pb: 5,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: 400,
              maxWidth: "100%",
              mx: "auto",
              borderRadius: "sm",
              "& form": {
                display: "flex",
                flexDirection: "column",
                gap: 2,
              },
              [`& .${formLabelClasses.asterisk}`]: {
                visibility: "hidden",
              },
            }}
          >
            <div>
              <Typography
                fontWeight="lg"
                className="_followMouse"
                sx={{
                  fontSize: 50,
                  //lineHeight: "48px",
                  marginBottom: 2,
                  background:
                    "linear-gradient(120deg,#84cc16 0%, #65a30d 30%, #bef264 60%, #84cc16 100%) repeat",
                  backgroundClip: "text",
                  textFillColor: "transparent",
                  backgroundPosition: 0,
                  backgroundSize: 1600,
                  textShadow: "0px 1px 1px rgba(0,0,0,0.04)",
                  fontFamily: "Lato",
                  fontStyle: "italic",
                  marginRight: 0,
                  "&ß.endDecorator": {
                    marginStart: 0,
                  },
                }}
              >
                ContraConnect
              </Typography>
              <Typography
                level="body2"
                className="_followMouse"
                sx={{
                  mt: -2,
                  mb: 3,
                  fontStyle: "italic",
                  background:
                    "linear-gradient(120deg,#84cc16 0%, #bef264 30%, #65a30d 60%, #84cc16 100%) repeat",
                  backgroundClip: "text",
                  textFillColor: "transparent",
                  backgroundPosition: 0,
                  backgroundSize: 1600,
                }}
                color="primary"
              >
                Illés és Szabó Ügyvédi Társulás
              </Typography>
              <Typography component="h2" fontSize="xl2" fontWeight="lg" pt={2}>
                Üdvözlünk
              </Typography>
              <Typography level="body2" sx={{ my: 1, mb: 3 }}>
                Kérjük add meg a belépési adataidat vagy regisztrálj!
              </Typography>
            </div>
            <form onSubmit={handleSubmit}>
              <FormControl required disabled={loading} error={loginError}>
                <FormLabel>Email</FormLabel>
                <Input
                  placeholder="Email cím"
                  style={{ textTransform: "lowercase" }}
                  type="email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={() => setLoginError(false)}
                />
                <FormHelperText>
                  {loginError &&
                    "Hiba történt, ellenőrizd a felhasználónevet és a jelszót!"}
                </FormHelperText>
              </FormControl>
              <FormControl required disabled={loading} error={loginError}>
                <FormLabel>Jelszó</FormLabel>
                <Input
                  placeholder="•••••••"
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  onChange={() => setLoginError(false)}
                />
              </FormControl>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Link
                  fontSize="sm"
                  href="#replace-with-a-link"
                  fontWeight="lg"
                  disabled
                >
                  Elfelejtett jelszó
                </Link>
              </Box>
              <Button type="submit" fullWidth loading={loading}>
                Belépés
              </Button>
            </form>
            {/*
            }
            <Button
              variant="outlined"
              color="neutral"
              fullWidth
              disabled={true}
              onClick={handleGoogleLogin}
              startDecorator={<GoogleIcon />}
            >
              Google belépés
            </Button>
          */}
            <Divider> vagy </Divider>
            <Button
              type="submit"
              fullWidth
              disabled
              variant={"outlined"}
              color={"neutral"}
            >
              Regisztráció
            </Button>
          </Box>
          <Box component="footer" sx={{ py: 3 }}>
            <Typography level="body3" textAlign="center">
              © Capitol Reef Consulting {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={(theme) => ({
          height: "100%",
          position: "fixed",
          right: 0,
          top: 0,
          bottom: 0,

          opacity: {
            xs: 0.2,
            sm: 0.6,
            md: 0.6,
          },
          left: "clamp(0px, (100vw - var(--Collapsed-breakpoint)) * 999, 100vw - var(--Cover-width))",
          transition:
            "background-image var(--Transition-duration), left var(--Transition-duration) !important",
          //transitionDelay: "calc(var(--Transition-duration))",
          backgroundColor: "background.level1",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundImage:
            "url(https://images.unsplash.com/photo-1616046229478-9901c5536a45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80)",
        })}
      />
    </>
  );
}

