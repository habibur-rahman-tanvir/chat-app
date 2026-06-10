import { GoogleOAuthProvider } from "@react-oauth/google";
import ThemeProvider from "./theme/ThemeProvider";

type Props = {
  children: React.ReactNode;
};

const AppContext = ({ children }: Props) => {
  return (
    <ThemeProvider>
      <GoogleOAuthProvider
        clientId={
          "1054207461078-joffdi1imp9p89m7hfakko7b17vvllc0.apps.googleusercontent.com"
        }
      >
        <>{children}</>
      </GoogleOAuthProvider>
    </ThemeProvider>
  );
};

export default AppContext;
