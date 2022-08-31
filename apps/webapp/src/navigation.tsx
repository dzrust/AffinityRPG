import { FC, useEffect, useState, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
// import Login from "";
import AuthedRouter from "./authed-router";
import { firebaseAuth } from "./firebase";
import { useAppDispatch, useUserState } from "./hooks";
import { setUser } from "./slices/userSlice";
import { User } from "firebase/auth";
import Loading from "./views/loading/loading";

const LazyLogin = lazy(() => import("./views/login/login"));

const Navigation: FC = () => {
  const dispatch = useAppDispatch();
  const { isSignedIn } = useUserState();
  const [initialLoading, setInitialLoading] = useState(() => true);

  useEffect(() => {
    dispatch(setUser(firebaseAuth.currentUser?.toJSON() as User | null));
    const unsub = firebaseAuth.onAuthStateChanged((user) => {
      if (initialLoading) {
        setInitialLoading(false);
      }
      dispatch(setUser(user?.toJSON() as User | null));
    });
    return () => {
      unsub();
    };
  }, []);
  if (initialLoading) {
    return <Loading />;
  }
  if (isSignedIn) {
    return <AuthedRouter />;
  } else {
    return (
      <Routes>
        <Route
          path="*"
          element={
            <Suspense>
              <LazyLogin />
            </Suspense>
          }
        />
      </Routes>
    );
  }
};

export default Navigation;
