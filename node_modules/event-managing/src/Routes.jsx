import React from "react";
import { useRoutes } from "react-router-dom";
import Home from "pages/Home";
import NotFound from "pages/NotFound";
import Ajouteventpage from "pages/Ajouteventpage";
import SendmailguestpagePage from "pages/Sendmailguestpage";
import SendmaildriverpagePage from "pages/Sendmaildriverpage";
import GuestformpagePage from "pages/Guestformpage";
import GuestslistpagePage from "pages/Guestslistpage";
import DriverslistpagePage from "pages/Driverslistpage";
import DriverformpagePage from "pages/Driverformpage";
import ProfilepagePage from "pages/Profilepage";
import SignInPopup from "components/SignInPopup";
import SignUpPopup from "components/SignUpPopup";
import ExploreeventspagePage from "pages/Exploreeventspage";

const ProjectRoutes = () => {
  let element = useRoutes([
    { path: "/", element: <Home /> },
    { path: "home", element: <Home /> },
    { path: "*", element: <NotFound /> },
    {
      path: "signin",
      element: <SignInPopup />,
    },
    {
      path: "signup",
      element: <SignUpPopup />,
    },
    {
      path: "ajouteventpage",
      element: <Ajouteventpage />,
    },
    {
      path: "sendmailguestpage",
      element: <SendmailguestpagePage />,
    },
    {
      path: "sendmaildriverpage",
      element: <SendmaildriverpagePage />,
    },
    {
      path: "guestformpage/:eventId",
      element: <GuestformpagePage />,
    },
    {
      path: "guestslistpage",
      element: <GuestslistpagePage />,
    },
    {
      path: "driverslistpage",
      element: <DriverslistpagePage />,
    },
    {
      path: "driverformpage/:eventId",
      element: <DriverformpagePage />,
    },
    {
      path: "profilepage",
      element: <ProfilepagePage />,
    },
    {
      path: "exploreeventspage",
      element: <ExploreeventspagePage />,
    },
  ]);

  return element;
};

export default ProjectRoutes;
