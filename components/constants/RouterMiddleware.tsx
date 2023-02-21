import { getRefreshToken } from "@/cookies/cookie";
import { AppProps } from "next/app";
import { useRouter } from "next/router";

export function RouterMiddleware({ Component, pageProps }: AppProps) {
    const router = useRouter();
    console.log("in here routermnidleware");
    // router.replace("/login");
  
  
  
    // dispatch(checkToken())
    if (!Boolean(getRefreshToken())) {
      router.replace("/login");
    }
  
    return <Component {...pageProps} />;
  }


export const AuthCheck = (props:any) => {
  const router = useRouter()
//   const isJWTValid = useIsJWTValid() // you need to implement this. In this example, undefined means things are still loading, null means user is not signed in, anything truthy means they're signed in

  if (typeof window !== 'undefined' && router.pathname!="/login" && !Boolean(getRefreshToken())) {
    router.replace("/login");
  }
   
  return props.children
}