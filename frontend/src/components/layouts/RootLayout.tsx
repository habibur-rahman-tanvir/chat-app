// import toast from "react-hot-toast";
import { api } from "@/utilities/appClient";
import toast from "react-hot-toast";

const RootLayout = () => {
  const handleCheckLogin = async () => {
    try {
      const res = await api.get("/api/health/check");
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogOut = async () => {
    try {
      const res = await api.post("/api/auth/logout");
      if (res.status === 200) {
        localStorage.removeItem("accessToken");
        toast.success("Logout success");
        return;
      }
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <button
        onClick={handleCheckLogin}
        className="px-3 py-1.5 border m-2 rounded-xl active:scale-95"
      >
        Check login
      </button>
      <button
        onClick={handleLogOut}
        className="px-3 py-1.5 border m-2 rounded-xl active:scale-95"
      >
        Logout
      </button>
    </div>
  );
};

export default RootLayout;
