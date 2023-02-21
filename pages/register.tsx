import LoginForm from "@/components/form/loginForm";
import RegisterForm from "@/components/form/registerForm";
import { Button, Loader } from "rsuite";
import { useRouter } from "next/router";
import styles from "@/styles/Login.module.scss";

const Register = () => {
  const router = useRouter();
  const handleGoToLogin = () => {
    console.log("going to login");
    router.replace("/login");
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
          <h1>Sign Up</h1>
          <RegisterForm isRegisterForm={true} />
          <div
            className={`${styles["changepage-div"]}`}
            onClick={handleGoToLogin}
          >
            Already has an account? Sign in
          </div>
        </div>
      </div>
      <div className={styles.parentImageContainer}>
        <div>
          <img
            alt="loading"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjm8kaOLaAPWSD-lpafTh1WRzqS8MB58xK-A&usqp=CAU"
          ></img>
        </div>
      </div>
    </div>
  );
};
export default Register;
