import CustomEvent from "@/core/CustomEvent";
import { Outlet } from "react-router";

const EventLayout = () => {
  return (
    <CustomEvent>
      <Outlet />
    </CustomEvent>
  );
};

export default EventLayout;
