import React from 'react';
import {
  Formik,
  Form,
  ErrorMessage,
  createTypedField
} from 'formik';
import * as Yup from 'yup';
import { NumberField } from 'app/components/fields/number-as-field';
import { EmailFieldAsClass } from 'app/components/fields/email-field-as-class';

let renderCount = 0;

interface NameValue {
  first: string,
  last: string,
}

type BasePerson = {
  name: NameValue,
  email: string,
  hasNicknames: boolean,
  nicknames: string[],
  favoriteFoods: string[],
  age: number | '',
  favoriteNumbers: (number | "")[];
  motto: string;
}

type FormValues = BasePerson & {
  partner: BasePerson;
  friends: BasePerson[];
}

const basePerson: BasePerson = {
  name: {
    first: "",
    last: "",
  },
  email: "",
  hasNicknames: false,
  nicknames: [],
  favoriteFoods: [],
  age: 21,
  favoriteNumbers: [],
  motto: "",
}

const initialValues: FormValues = {
  ...basePerson,
  partner: basePerson,
  friends: [
    basePerson,
    basePerson
  ]
};

const TypedField = createTypedField<FormValues>();

const Basic = () => (
  <div>
    <h1>Sign Up</h1>
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Invalid email address').required('Required'),
        firstName: Yup.string().required('Required'),
        lastName: Yup.string()
          .min(2, 'Must be longer than 2 characters')
          .max(20, 'Nice try, nobody has a last name that long')
          .required('Required'),
      })}
      onSubmit={async values => {
        await new Promise(r => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));
      }}
    >
      <Form>
        <TypedField
          name="name.first"
          placeholder="Jane"
        />
        <ErrorMessage name="firstName" component="p" />

        <TypedField
          name="name.last"
          placeholder="Doe"
        />
        <ErrorMessage name="lastName" component="p" />

        <TypedField
          id="email"
          name="email"
          as={EmailFieldAsClass}
          type="email"
          hidden={true}
        />
        <ErrorMessage name="email" component="p" />

        <TypedField
          id="age"
          name="age"
          as={NumberField}
          type="number"
          hidden={false}
        />

        <TypedField
          id="favorite-numbers-0"
          name="favoriteNumbers.0"
          as={NumberField}
          placeholder="jane@acme.com"
          type="number"
          hidden={false}
        />

        <TypedField
          id="friends-0-favorite-numbers-0"
          name="friends.0.favoriteNumbers.0"
          as={NumberField}
          placeholder="Choose a favorite number"
          type="number"
          hidden={false}
        />

        <label>
          <TypedField type="checkbox" name="hasNicknames" />
          <span style={{ marginLeft: 3 }}>Toggle</span>
        </label>

        {/* todo: FieldArray for nicknames */}

        <div id="checkbox-group">Checkbox Group</div>
        <div role="group" aria-labelledby="checkbox-group">
          <label>
            <TypedField type="checkbox" name="favoriteFoods" value="Pizza" />
            Pizza
          </label>
          <label>
            <TypedField type="checkbox" name="favoriteFoods" value="Falafel" />
            Falafel
          </label>
          <label>
            <TypedField type="checkbox" name="favoriteFoods" value="Dim Sum" />
            Dim Sum
          </label>
        </div>
        <div id="my-radio-group">Picked</div>
        <div role="group" aria-labelledby="my-radio-group">
          <label>
            <TypedField type="radio" name="favoriteNumbers" value={1} />
            1
          </label>
          <label>
            <TypedField type="radio" name="favoriteNumbers" value={2} />
            2
          </label>
        </div>
        <div>
          <label>
            Textarea
            <TypedField name="motto" as="textarea" />
          </label>
        </div>
        <button type="submit">Submit</button>
        <div id="renderCounter">{renderCount++}</div>
      </Form>
    </Formik>
  </div>
);

export default Basic;
