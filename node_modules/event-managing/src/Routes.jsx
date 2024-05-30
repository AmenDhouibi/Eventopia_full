import React from "react";
import { useRoutes } from "react-router-dom";
import Home from "pages/Home";
import NotFound from "pages/NotFound";
import Ajouteventpage from "pages/Ajouteventpage";

const ProjectRoutes = () => {
  let element = useRoutes([
    { path: "/", element: <Home /> },
    { path: "home", element: <Home /> },
    { path: "*", element: <NotFound /> },
    {
      path: "ajouteventpage",
      element: <Ajouteventpage />,
    },
  ]);

  return element;
};

export default ProjectRoutes;
