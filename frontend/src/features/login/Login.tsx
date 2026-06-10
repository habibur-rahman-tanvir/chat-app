import { api } from "@/utilities/appClient";
import { useGoogleLogin } from "@react-oauth/google";

const Login = () => {
  const googleResponse = (authResult) => {
    try {
      console.log(authResult);
      api.post(`/api/auth/google?code=${authResult["code"]}`);
    } catch (err) {
      console.log("AuthErr:", err);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: googleResponse,
    onError: googleResponse,
    flow: "auth-code",
  });

  return (
    <div className="h-screen flex justify-center items-center">
      <button
        className="border p-1.5 shadow font-semibold rounded-xl active:scale-95"
        onClick={() => {
          googleLogin();
        }}
      >
        Login with Google
      </button>
    </div>
  );
};

export default Login;
