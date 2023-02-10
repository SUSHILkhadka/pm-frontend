import React, { SyntheticEvent, useRef, useState } from "react";
import {
  Form,
  Button,
  ButtonToolbar,
  Schema,
  FlexboxGrid,
  InputGroup
} from "rsuite";
import AvatarIcon from "@rsuite/icons/legacy/Avatar";
const { StringType, NumberType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired("This field is required."),
  email: StringType()
    .isEmail("Please enter a valid email address.")
    .isRequired("This field is required."),
  age: NumberType("Please enter a valid number.").range(
    18,
    30,
    "Please enter a number from 18 to 30"
  ),
  password: StringType().isRequired("This field is required."),
  verifyPassword: StringType()
    .addRule((value, data) => {
      console.log(data);

      if (value !== data.password) {
        return false;
      }

      return true;
    }, "The two passwords do not match")
    .isRequired("This field is required.")
});

const TextField = React.forwardRef<any, any>((props, ref) => {
  const { name, label, accepter, ...rest } = props;
  return (
    <Form.Group controlId={`${name}-4`} ref={ref}>
      <Form.ControlLabel>{label} </Form.ControlLabel>
      <InputGroup inside>
        <Form.Control name={name} accepter={accepter} {...rest} />
        <InputGroup.Addon>
          <AvatarIcon />
        </InputGroup.Addon>
      </InputGroup>
    </Form.Group>
  );
});
TextField.displayName = "TextField";

const RegisterForm = () => {
  const formRef = useRef<any>();
  const [formError, setFormError] = useState({});
  const [formValue, setFormValue] = useState({
    name: "a",
    email: "",
    age: "22",
    password: "ff",
    verifyPassword: ""
  });

  const handleSubmit = () => {
    if (!formRef.current.check()) {
      console.error("Form Error");
      return;
    }
    console.log("Form Value", formValue);
  };

  return (
    <FlexboxGrid>
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
          onCheck={setFormError}
          formValue={formValue}
          model={model}
        >
          <TextField name="name" label="Name" />

          <TextField name="email" label="Email" />
          <TextField
            name="password"
            label="Password"
            type="password"
            autoComplete="off"
          />
          <TextField
            name="verifyPassword"
            label="Verify password"
            type="password"
            autoComplete="off"
          />

          <ButtonToolbar>
            <Button appearance="primary" onClick={handleSubmit} type="submit">
              SIGN UP
            </Button>
          </ButtonToolbar>
        </Form>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
};

export default RegisterForm;
