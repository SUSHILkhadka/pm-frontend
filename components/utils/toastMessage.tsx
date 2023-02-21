import { Message, useToaster } from "rsuite";
const successMessage = (msg: string) => {
  return (
    <Message showIcon type="success" duration={2000} closable>
      success: {msg}.
    </Message>
  );
};
export const errorMessage = (msg: string) => {
  return (
    <Message showIcon type="error" duration={2000} closable>
      error: {msg}.
    </Message>
  );
};

export const showDefaultErrorMessage = () => {
  errorMessage("Something went wrong. Please try later");
};
export default successMessage;
