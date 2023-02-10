import LoginForm from "@/components/form/loginForm";
import RegisterForm from "@/components/form/registerForm";
import { Button, Loader } from "rsuite";
import { useRouter } from "next/router";

const Register = () => {
  const router = useRouter()
  const handleGoToLogin = () => {
    console.log("going to login");
    router.replace('/login')
  };
  return (
    <div style={{ width: "100%", display: "flex" ,background:'grey'}}>
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
          <h1>Sign Up</h1>
          <RegisterForm />
          <Button onClick={handleGoToLogin}>Already has an account? Sign in</Button>
        </div>
      </div>
      <Loader size="lg" />
    </div>
  );
};
export default Register;
