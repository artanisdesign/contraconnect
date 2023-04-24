import * as React from "react";
import { deepmerge } from "@mui/utils";
import * as ROUTES from "routes";
import { experimental_extendTheme as extendMuiTheme } from "@mui/material/styles";
import colors from "@mui/joy/colors";
import { theme as customTheme } from "./theme/theme";
import {
  extendTheme as extendJoyTheme,
  CssVarsProvider,
} from "@mui/joy/styles";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "hooks/useAuth";
import { MainLayout } from "navigation";
import { CircularProgress, CssBaseline, GlobalStyles } from "@mui/joy";
import { LoginPage } from "pages/Login";
import Dashboard from "pages/Dashboard";
import Cases from "pages/Dashboard/Cases";
import OngoingCases from "pages/Dashboard/OngoingCases";
import ArchivedCases from "pages/Dashboard/ArchivedCases";
import Users from "pages/Dashboard/Users";
import MyData from "pages/Dashboard/MyData";
import CasesCategory from "pages/Dashboard/Cases/CasesCategory";
import Draft from "pages/Dashboard/Draft";

const { unstable_sxConfig: muiSxConfig, ...muiTheme } = extendMuiTheme({
  // This is required to point to `var(--joy-*)` because we are using
  // `CssVarsProvider` from Joy UI.
  cssVarPrefix: "joy",
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: colors.blue[500],
        },
        grey: colors.grey,
        error: {
          main: colors.red[500],
        },
        info: {
          main: colors.purple[500],
        },
        success: {
          main: colors.green[500],
        },
        warning: {
          main: colors.yellow[200],
        },
        common: {
          white: "#FFF",
          black: "#09090D",
        },
        divider: colors.grey[200],
        text: {
          primary: colors.grey[800],
          secondary: colors.grey[600],
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: colors.blue[600],
        },
        grey: colors.grey,
        error: {
          main: colors.red[600],
        },
        info: {
          main: colors.purple[600],
        },
        success: {
          main: colors.green[600],
        },
        warning: {
          main: colors.yellow[300],
        },
        common: {
          white: "#FFF",
          black: "#09090D",
        },
        divider: colors.grey[800],
        text: {
          primary: colors.grey[100],
          secondary: colors.grey[300],
        },
      },
    },
  },
});

const { unstable_sxConfig: joySxConfig, ...joyTheme } =
  extendJoyTheme(customTheme);

const mergedTheme = {
  ...muiTheme,
  ...joyTheme,
  colorSchemes: deepmerge(muiTheme.colorSchemes, joyTheme.colorSchemes),
  typography: {
    ...muiTheme.typography,
    ...joyTheme.typography,
  },
} as unknown as ReturnType<typeof extendJoyTheme>;

mergedTheme.generateCssVars = (colorScheme) => ({
  css: {
    ...muiTheme.generateCssVars(colorScheme).css,
    ...joyTheme.generateCssVars(colorScheme).css,
  },
  vars: joyTheme.generateCssVars(colorScheme).vars,
});

mergedTheme.unstable_sxConfig = {
  ...muiSxConfig,
  ...joySxConfig,
};

export default function App() {
  return (
    <CssVarsProvider
      theme={mergedTheme}
      defaultMode="system"
      modeStorageKey="contraconnect-system-mode"
    >
      <CssBaseline />
      <GlobalStyles
        styles={{
          ":root": {
            "--Collapsed-breakpoint": "769px", // form will stretch when viewport is below `769px`
            "--Cover-width": "40vw", // must be `vw` only
            "--Form-maxWidth": "700px",
            "--Transition-duration": "0.4s", // set to `none` to disable transition
          },
          "[data-feather], .feather": {
            color: "var(--Icon-color)",
            margin: "var(--Icon-margin)",
            fontSize: "var(--Icon-fontSize, 20px)",
            width: "1em",
            height: "1em",
          },
        }}
      />
      <Routes>
        <Route path={ROUTES.DEFAULT} element={<PublicPage />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.SIGNUP} element={<LoginPage />} />
        <Route
          path={ROUTES.DASHBOARD}
          element={
            <RequireAuth>
              <MainLayout />
            </RequireAuth>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path={ROUTES.DASHBOARD_CASES}>
            <Route index element={<Cases />} />
            <Route
              path={ROUTES.DASHBOARD_CASES + "/:caseID"}
              element={<CasesCategory />}
            />
          </Route>

          <Route path={ROUTES.DASHBOARD_ONGOING} element={<OngoingCases />} />
          <Route path={ROUTES.DASHBOARD_ARCHIVED} element={<ArchivedCases />} />
          <Route path={ROUTES.DASHBOARD_USERS} element={<Users />} />
          <Route path={ROUTES.DASHBOARD_DATA} element={<MyData />} />

          <Route path={ROUTES.DRAFT}>
            <Route index element={<Draft />} />
            <Route
              path={ROUTES.DRAFT + "/:caseID/:draftID"}
              element={<Draft />}
            />
          </Route>
        </Route>
        <Route path="*" element={<PublicPage />} />
      </Routes>
    </CssVarsProvider>
  );
}

function PublicPage() {
  let { user, loading } = useAuth();

  if (user && !loading) {
    return <Navigate to={ROUTES.DASHBOARD} />;
  } else if (!user && !loading) {
    return <Navigate to={ROUTES.LOGIN} />;
  } else {
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
  }
  //this should be a landing page at some point, but now it should just redirect to login

  //return <h3>Public</h3>;
}

function RequireAuth({ children }: { children: JSX.Element }) {
  let { user, loading } = useAuth();
  let location = useLocation();

  if (!user && !loading) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
