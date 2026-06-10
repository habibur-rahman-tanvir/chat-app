import AppContext from "./contexts/AppContext";
import { RouterProvider } from "react-router";
import router from "./routes";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <AppContext>
      <Toaster />
      <RouterProvider router={router} />
    </AppContext>
  );
};

export default App;
