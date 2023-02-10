import LoginForm from "@/components/form/loginForm";
import { Button, Loader } from "rsuite";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();

  const handleGoToRegister = () => {
    console.log("going to register");
    router.replace("/register");
  };
  return (
    <div style={{ width: "100%", display: "flex", background: "grey" }}>
      <div
        style={{
          width: "50%",
          display: "flex",
          justifyContent: "center",
          border: "2px solid pink"
        }}
      >
        <div
          style={{
            width: "75%",
            border: "2px solid red"
          }}
        >
          <h1>Sign In</h1>
          <LoginForm />
          <Button onClick={handleGoToRegister}>
            Dont have an Account? Sign up
          </Button>
        </div>
      </div>
      <Loader size="lg" />
    </div>
  );
};
export default Login;
