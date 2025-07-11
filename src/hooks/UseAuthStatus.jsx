import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export function UseAuthStatus() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
      setCheckingStatus(false);
    });
  }, []);
  return { loggedIn, checkingStatus };
}
