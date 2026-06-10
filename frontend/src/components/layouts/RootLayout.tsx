// import toast from "react-hot-toast";
import { api } from "@/utilities/appClient";

const RootLayout = () => {
  const handleCheckLogin = async () => {
    try {
      const res = await api.get("/api/health/check");
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <button onClick={handleCheckLogin} className="border m-2 rounded-md">
        Check login
      </button>
    </div>
  );
};

export default RootLayout;
