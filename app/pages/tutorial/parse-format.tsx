import React from 'react';
import ReactDOM from 'react-dom';
import { Formik, Field, Form } from 'formik';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const ParseFormatPage = () => {
  return (
    <div>
      <Formik
        initialValues={{
          username: '',
        }}
        onSubmit={async (values) => {
          await sleep(500);
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {({ values }) => (
          <Form>
            <label htmlFor="username">Username</label>
            <Field
              id="username"
              name="username"
              parse={(value: any) => value && value.toUpperCase()}
              format={(value: any) => (value ? value.toLowerCase() : '')}
            />

            <button type="submit">Submit</button>
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ParseFormatPage;