import CustomSidenav from "@/components/customNavbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import React, { useEffect } from "react";
import "rsuite/dist/rsuite.min.css";
import "../styles/globals.css";
import { CustomProvider, Radio } from "rsuite";
import "rsuite/dist/rsuite.css";

import "styles/_colors.scss";
import { RootState, store } from "../redux_toolkit/stores/store";
import { Provider, useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getRefreshToken } from "@/cookies/cookie";
import { checkToken } from "@/redux_toolkit/slices/authSlice";

export default function App({ Component, pageProps }: AppProps) {
  const [activeKey, setActiveKey] = React.useState("1");
  const [openKeys, setOpenKeys] = React.useState(["3", "4"]);
  const [expanded, setExpand] = React.useState(true);

  const [theme, setTheme] = React.useState<"light" | "dark" | "high-contrast">(
    "light"
  );

  const loggedIn = false;
  const handleThemeChange = () => {
    if (theme == "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <Provider store={store}>
      <CustomProvider theme={theme}>
        {/* <Radio onClick={handleThemeChange}>Dark Mode</Radio> */}
        <div className="flex flex-row">
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
          <AuthCheck>
            <Component {...pageProps} />
          </AuthCheck>
        </div>
      </CustomProvider>
    </Provider>
  );
}

export const AuthCheck = (props: any) => {
  const router = useRouter();
  const authInfo = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<any>();
  useEffect(() => {
    dispatch(checkToken());
  }, []);
  if (
    authInfo.status == "loading"
  ) {
return(<>
loading...</>)  }

  // if (
  //   typeof window !== "undefined" &&
  //   router.pathname != "/login" &&
  //   router.pathname != "/register" &&
  //   (!Boolean(getRefreshToken()) || authInfo.status == "rejected")
  // ) {
  //   router.replace("/login");
  // }
  // if (
  //   (router.pathname == "/login" || router.pathname == "/register") &&
  //   authInfo.status == "fulfilled"
  // ) {
  //   router.replace("/");
  // }

  return props.children;
};
