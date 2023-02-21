import LoginForm from "@/components/form/loginForm";
import { Button, Loader } from "rsuite";
import { useRouter } from "next/router";
import styles from "@/styles/Login.module.scss";
import RegisterForm from "@/components/form/registerForm";
// import "../styles/Login.module.css"

const Login = () => {
  const router = useRouter();

  const handleGoToRegister = () => {
    console.log("going to register");
    router.replace("/register");
  };
  return (
    <div
      className={`${styles["w-100"]} ${styles.flex} ${styles["page-login"]}`}
    >
      <div
        style={{
          width: "50%",
          display: "flex",
          justifyContent: "center"
        }}
      >
        <div
          style={{
            width: "75%"
          }}
        >
          <h1>Sign In</h1>
          <RegisterForm isRegisterForm={false} />
          <div
            className={`${styles["changepage-div"]}`}
            onClick={handleGoToRegister}
          >
            Dont have an Account? Sign up
          </div>
        </div>
      </div>
      <div className={styles.parentImageContainer}>
        <div>
          <img
            alt="loading"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjm8kaOLaAPWSD-lpafTh1WRzqS8MB58xK-A&usqp=CAU"
          />
        </div>
      </div>{" "}
    </div>
  );
};
export default Login;
