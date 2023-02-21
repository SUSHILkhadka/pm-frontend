import React, { SyntheticEvent, useRef, useState } from "react";
import { Form, Button, Schema, FlexboxGrid, InputGroup } from "rsuite";
import AvatarIcon from "@rsuite/icons/legacy/Avatar";
const { StringType, NumberType } = Schema.Types;

const model = Schema.Model({
  email: StringType()
    .isEmail("Please enter a valid email address.")
    .isRequired("This field is required."),
  password: StringType().isRequired("This field is required.")
});

const TextField = React.forwardRef<any, any>((props, ref) => {
  const { name, label, accepter, ...rest } = props;
  return (
    <Form.Group controlId={`${name}-4`} ref={ref}>
      <Form.ControlLabel>{label} </Form.ControlLabel>
      <InputGroup inside>
        <InputGroup.Addon>
          <AvatarIcon />
        </InputGroup.Addon>
        <Form.Control name={name} accepter={accepter} {...rest} />
      </InputGroup>
    </Form.Group>
  );
});
TextField.displayName = "TextField";

const LoginForm = () => {
  const formRef = useRef<any>();
  const [formError, setFormError] = useState({});
  const [formValue, setFormValue] = useState({
    email: "email of change",
    password: "change"
  });

  const handleSubmit = () => {
    if (!formRef.current.check()) {
      console.error("Form Error");
      return;
    }
    console.log("Form Value", formValue);
  };

  return (
    <FlexboxGrid style={{ display: "100%" }}>
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
          <TextField name="email" label="Email" />
          <TextField
            name="password"
            label="Password"
            type="password"
            autoComplete="off"
          />
          <Button
            style={{ width: "100%", padding: 12 }}
            appearance="primary"
            onClick={handleSubmit}
            type="submit"
          >
            SIGN IN
          </Button>
        </Form>
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
};

export default LoginForm;
