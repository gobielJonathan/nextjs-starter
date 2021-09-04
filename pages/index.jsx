import { Field, Form } from "react-final-form";
import styled from "styled-components";
import { intersection, object } from "superstruct";
import { Email, Required, Validation } from "../utils/form";

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

export default function Home() {
  return (
    <>
      <Title>welcome home</Title>

      <h3>Example Form</h3>
      <Form
        onSubmit={(value) => console.log(value)}
        validate={(value) => {
          return Validation(
            value,
            object({
              person: intersection([
                Required("Person must be required"),
                Email("person must be email format"),
              ]),
              password: Required("Password must be required"),
            })
          );
        }}
      >
        {({ handleSubmit, hasValidationErrors }) => (
          <form onSubmit={handleSubmit}>
            <Field name="person">
              {(props) => (
                <div>
                  <input {...props.input} />
                  {props.meta.error && props.meta.touched && (
                    <small style={{ color: "red" }}>{props.meta.error}</small>
                  )}
                </div>
              )}
            </Field>
            <Field name="password" type="password">
              {(props) => (
                <div>
                  <input {...props.input} />
                  {props.meta.error && props.meta.touched && (
                    <small style={{ color: "red" }}>{props.meta.error}</small>
                  )}
                </div>
              )}
            </Field>
            <button disabled={hasValidationErrors} type="submit">
              Submit
            </button>
          </form>
        )}
      </Form>
    </>
  );
}
