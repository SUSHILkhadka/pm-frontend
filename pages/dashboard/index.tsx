import CustomSidenav from "@/components/customNavbar";
import React, { useEffect } from "react";

const Dashboard = () => {
  const [activeKey, setActiveKey] = React.useState("1");
  const [openKeys, setOpenKeys] = React.useState(["3", "4"]);
  const [expanded, setExpand] = React.useState(true);

  useEffect(()=>{
    console.log('in dashboard')
  })
  return (
    <div>
Dashboard
      
    </div>
  );
};

export default Dashboard;
