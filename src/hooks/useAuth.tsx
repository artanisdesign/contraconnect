import { User, getIdTokenResult } from "firebase/auth";
import { auth } from "../_firebase/firebaseApp";
import React, { useState, useEffect, useContext, useCallback } from "react";
//import { setUserProperties, setUserId } from "firebase/analytics";
import { UserType } from "types";

const getUserType = async (user: User) => {
  const claims = await getClaims(user);
  const { admin, dashboard, permissions, features, email } = claims;

  const userType = {
    permissions,
    features,
  };

  if (
    admin ||
    (email === "admin@test.com" && process.env.REACT_APP_ENV === "development")
  ) {
    return { ...userType, role: UserType.ADMIN };
  }
  if (
    dashboard ||
    (email === "dashboard@test.com" &&
      process.env.REACT_APP_ENV === "development")
  ) {
    return { ...userType, role: UserType.DASHBOARD };
  }

  return { ...userType, role: "nothing" };
};

const getClaims = async (user: User, forceRefresh = false) => {
  try {
    const { claims } = await getIdTokenResult(user, forceRefresh);
    return claims;
  } catch (error) {
    // Get claims from loca
    await auth.signOut();
    throw error;
  }
};

interface AuthContextType {
  user: User | null;
  role: string | null;
  loading: boolean;
  //organisations: string[];
  // in case the dashboard user wants to switch between their own organizations
  //selectedOrganisation: string;
  //updateSelectedOrganisation: (organisation: Organisation) => void;
}

export const AuthContext = React.createContext<AuthContextType>({
  user: null,
  role: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<AuthContextType>({
    user: null,
    role: "",
    loading: true,
  });

  const onChange = useCallback(async (user: User | null) => {
    if (user && !user.isAnonymous) {
      //console.log("user", user);

      // Login
      const userType = await getUserType(user);
      //setstate with prevstate
      setState((prevState) => ({
        ...prevState,
        user,
        role: userType.role,
        loading: false,
      }));
    } else {
      // Logout
      setState((prevState) => ({
        ...prevState,
        user: null,
        role: null,
        loading: false,
      }));
    }
  }, []);

  useEffect(() => {
    // listen for auth state changes
    const unsubscribe = auth.onAuthStateChanged(onChange);
    // unsubscribe to the listener when unmounting
    return () => unsubscribe();
  }, [onChange]);

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const store = useContext(AuthContext);
  return store;
};
