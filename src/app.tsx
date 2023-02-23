import { useEffect } from "react";

import { useAppDispatch } from "hooks/redux";
import { AppRouter } from "navigation/app-router";
import { checkAuth } from "store/user/user.slice";

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {

      dispatch(checkAuth());
    }
  }, []);

  return (
    <>
      <AppRouter />
    </>
  );
};
