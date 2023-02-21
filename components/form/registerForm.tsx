import React, { SyntheticEvent, useRef, useState } from "react";
import {
  Form,
  Button,
  ButtonToolbar,
  Schema,
  FlexboxGrid,
  InputGroup,
  useToaster,
  Input
} from "rsuite";
import AvatarIcon from "@rsuite/icons/legacy/Avatar";
import EyeIcon from "@rsuite/icons/legacy/Eye";
import EyeSlashIcon from "@rsuite/icons/legacy/EyeSlash";
import successMessage, { errorMessage } from "../utils/toastMessage";
import { login } from "@/axios/auth";
import { DEFAULT_ERR_MESSAGE } from "@/constants/common";
import { saveAccessToken, saveRefreshToken } from "@/cookies/cookie";
import { getDataFromJWTToken } from "@/utils/jwt.utils";
import { useDispatch } from "react-redux";
import { setAuthWithLoginResponse } from "@/redux_toolkit/slices/authSlice";
import { useRouter } from "next/router";
import formStyles from "@/styles/RegisterForm.module.scss";
const { StringType, NumberType } = Schema.Types;

const registerModel = Schema.Model({
  name: StringType().isRequired("This field is required."),
  email: StringType()
    .isEmail("Please enter a valid email address.")
    .isRequired("This field is required."),
  password: StringType().isRequired("This field is required."),
  verifyPassword: StringType()
    .addRule((value, data) => {
      if (value !== data.password) {
        return false;
      }
      return true;
    }, "The two passwords do not match")
    .isRequired("This field is required.")
});

const loginModel = Schema.Model({
  email: StringType()
    // .isEmail("Please enter a valid email address.")
    .isRequired("This field is required."),
  password: StringType().isRequired("This field is required.")
});

const TextField = React.forwardRef<any, any>((props, ref) => {
  const [visible, setVisible] = React.useState(false);
  const { name, label, icon, isPassword, accepter, ...rest } = props;
  const handleChange = () => {
    console.log("in here ", visible);
    setVisible(!visible);
  };

  const colorCode = "blue";
  return (
    <Form.Group controlId={`${name}-4`} ref={ref}>
      <Form.ControlLabel className={`${formStyles["input-label"]}`}>
        {label}{" "}
      </Form.ControlLabel>
      <InputGroup inside>
        {icon && (
          <InputGroup.Addon className={`${formStyles["input-icon-wrapper"]}`}>
            {icon}
          </InputGroup.Addon>
        )}
        <Form.Control
          className={`${formStyles["input"]}`}
          name={name}
          accepter={accepter}
          type={!isPassword || visible ? "text" : "password"}
          {...rest}
        />
        {isPassword && (
          <InputGroup.Button
            className={`${formStyles["eyeIcon"]}`}
            onClick={handleChange}
          >
            {visible ? <EyeIcon /> : <EyeSlashIcon />}
          </InputGroup.Button>
        )}
      </InputGroup>
    </Form.Group>
  );
});
TextField.displayName = "TextField";

type RegisterPropType = {
  isRegisterForm: boolean | undefined;
};

const RegisterForm = (props: RegisterPropType) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const toaster = useToaster();

  const formRef = useRef<any>();
  const [formValue, setFormValue] = useState({
    name: "a",
    email: "email of change",
    password: "change",
    verifyPassword: ""
  });

  const handleRegister = () => {
    if (!formRef.current.check()) {
      console.error("Form Error");
      return;
    }
    console.log("Form Value", formValue);
  };

  const handleLogin = async () => {
    if (!formRef.current.check()) {
      console.error("Form Error");
      return;
    }
    try {
      const response = await login(formValue);

      const { accessToken, refreshToken } = response.data;
      //save data from cookie to redux
      dispatch(setAuthWithLoginResponse(getDataFromJWTToken(refreshToken)));

      //save both tokens to cookies
      saveAccessToken(accessToken);
      saveRefreshToken(refreshToken);
      // router.push('/')
      toaster.push(successMessage(response.message), {});
    } catch (e: any) {
      console.log(e);
      toaster.push(errorMessage(DEFAULT_ERR_MESSAGE), {});
    }

    console.log("Form Value", formValue);
  };

  return (
    <FlexboxGrid className={`${formStyles["form-register"]}`}>
      <FlexboxGrid.Item colspan={24}>
        <Form
          fluid
          ref={formRef}
          onChange={
            setFormValue as (
              formValue: Record<string, any>,
              event?: SyntheticEvent<Element, Event> | undefined
            ) => void
          }
          formValue={formValue}
          model={props.isRegisterForm ? registerModel : loginModel}
        >
          {props.isRegisterForm && (
            <TextField
              name="name"
              label="Name"
              icon={<AvatarIcon className={`${formStyles["input-icon"]}`} />}
            />
          )}
          <TextField
            name="email"
            label="Email"
            icon={<AvatarIcon className={`${formStyles["input-icon"]}`} />}
          />
          <TextField
            name="password"
            label="Password"
            autoComplete="off"
            placeholder="Enter Password"
            isPassword={true}
            icon={<AvatarIcon className={`${formStyles["input-icon"]}`} />}
          />
          {props.isRegisterForm && (
            <TextField
              name="verifyPassword"
              label="Verify password"
              autoComplete="off"
              placeholder="Verify Password"
              isPassword={true}
              icon={<AvatarIcon className={`${formStyles["input-icon"]}`} />}
            />
          )}
          <ButtonToolbar>
            <Button
              style={{ width: "100%", padding: 12 }}
              appearance="primary"
              onClick={props.isRegisterForm ? handleRegister : handleLogin}
              type="submit"
            >
              {props.isRegisterForm ? "SIGN UP" : "SIGN IN"}
            </Button>
          </ButtonToolbar>
        </Form>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
};

export default RegisterForm;
