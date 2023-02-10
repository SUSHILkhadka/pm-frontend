import CustomSidenav from "@/components/customNavbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";
import "rsuite/dist/rsuite.min.css";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const [activeKey, setActiveKey] = React.useState("1");
  const [openKeys, setOpenKeys] = React.useState(["3", "4"]);
  const [expanded, setExpand] = React.useState(true);

  const loggedIn = false;

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {loggedIn && (
        <div>
          <div>Detail</div>
          <CustomSidenav
            activeKey={activeKey}
            openKeys={openKeys}
            onSelect={setActiveKey}
            onOpenChange={setOpenKeys}
            expanded={expanded}
            onExpand={setExpand}
          />
        </div>
      )}
      <Component {...pageProps} />
    </div>
  );
}
