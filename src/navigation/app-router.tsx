import { createHashRouter, RouterProvider } from "react-router-dom";

import { AuthWrapper } from "components/auth-wrapper/auth-wrapper";
import { MainLayout } from "components/main-layout/main-layout";
import { HomePage } from "pages/home.page";
import { LoginPage } from "pages/login.page";
import { NewsPage } from "pages/news.page";
import { UserProfilePage } from "pages/user-profile.page";
import { Auth, Main } from "./route-names";
import { useAppSelector } from "hooks/redux";
import { selectUserState } from "store/user/user.slice";

export const AppRouter = () => {
  const { user } = useAppSelector(selectUserState);
  const isAuthenticated = !!localStorage.getItem("token");

  const routes = [
    {
      path: Main.Home,
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: Main.News,
          element: <NewsPage />,
        },
        {
          path: Main.Profile,
          element: (
            <AuthWrapper
              isAllowed={isAuthenticated && !!user}
              redirectTo={Main.Home}
            >
              <UserProfilePage />
            </AuthWrapper>
          ),
        },
        {
          path: Auth.Login,
          element: (
            <AuthWrapper isAllowed={!isAuthenticated} redirectTo={Main.Profile}>
              <LoginPage />
            </AuthWrapper>
          ),
        },
      ],
    },
  ];

  const router = createHashRouter(routes);

  return <RouterProvider router={router} />;
};
