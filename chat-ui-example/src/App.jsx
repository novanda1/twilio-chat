import WelcomeScreen from "./screens/Welcome";
import ChatScreen from "./screens/ChatScreen";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <WelcomeScreen />,
    },
    {
      path: "/chat",
      element: <ChatScreen />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
