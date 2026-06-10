import { api } from "@/utilities/appClient";
import { useGoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();

  const googleResponse = async (authResult) => {
    try {
      const res = await api.post(`/api/auth/google?code=${authResult["code"]}`);
      if (res.status === 201) {
        navigate("/", { replace: true });
        return;
      }
    } catch (err) {
      console.log("AuthErr:", err);
      toast.error(err.message ? err.message : "Error in login");
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
