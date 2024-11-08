import { useStoreHeaderData } from "@/store/headerStore";
import { useEffect } from "react";

const Dashboard = () => {
  const { setHeaderData } = useStoreHeaderData();
  useEffect(() => {
    setHeaderData({
      heading: "Dashboard",
      description: "Welcome to the dashboard",
    });
  }, [setHeaderData]);
  return <div>Dashboard</div>;
};

export default Dashboard;
