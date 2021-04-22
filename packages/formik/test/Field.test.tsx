import * as React from 'react';
import {
  act,
  cleanup,
  render,
  waitFor,
  fireEvent,
} from '@testing-library/react';
import * as Yup from 'yup';
import {
  Formik,
  Field,
  FastField,
  FieldAsProps,
  FormikProps,
  FormikConfig,
  FieldAttributes,
  FieldComponentProps,
  FieldRenderProps,
} from '../src';

import { noop } from './testHelpers';

const initialValues = { name: 'jared', email: 'hello@reason.nyc' };
type Values = typeof initialValues;
type $FixMe = any;

function renderForm(
  ui?: React.ReactNode,
  props?: Partial<FormikConfig<Values>>
) {
  let injected: FormikProps<Values>;
  const { rerender, ...rest } = render(
    <Formik onSubmit={noop} initialValues={initialValues} {...props}>
      {(formikProps: FormikProps<Values>) =>
        (injected = formikProps) && ui ? ui : null
      }
    </Formik>
  );

  return {
    getFormProps(): FormikProps<Values> {
      return injected;
    },
    ...rest,
    rerender: () =>
      rerender(
        <Formik onSubmit={noop} initialValues={initialValues} {...props}>
          {(formikProps: FormikProps<Values>) =>
            (injected = formikProps) && ui ? ui : null
          }
        </Formik>
      ),
  };
}

const createRenderField = (
  FieldComponent: React.ComponentType<FieldAttributes<any, any, any>>
) => (
  props: Partial<FieldAttributes<any, any, any>> = {},
  formProps?: Partial<FormikConfig<Values>>
) => {
  let injected: FieldRenderProps;

  if (!props.children && !props.render && !props.component && !props.as) {
    props.children = (fieldProps: FieldRenderProps) =>
      (injected = fieldProps) && (
        <input {...fieldProps.field} name="name" data-testid="name-input" />
      );
  }

  return {
    getProps() {
      return injected;
    },
    ...renderForm(
      <FieldComponent name="name" data-testid="name-input" {...props as any} />,
      formProps
    ),
  };
};

const renderField = createRenderField(Field as any);
const renderFastField = createRenderField(FastField as any);

function cases(
  title: string,
  tester: (arg: typeof renderField | typeof renderFastField) => void
) {
  describe(title, () => {
    it('<FastField />', async () => await tester(renderFastField));
    it('<Field />', async () => await tester(renderField));
  });
}

const TEXT = 'Mrs. Kato';

describe('Field / FastField', () => {
  afterEach(cleanup);

  describe('renders an <input /> by default', () => {
    it('<Field />', () => {
      const { container } = renderForm(<Field name="name" />);
      expect(container.querySelectorAll('input')).toHaveLength(1);
    });

    it('<FastField />', () => {
      const { container } = renderForm(<FastField name="name" />);
      expect(container.querySelectorAll('input')).toHaveLength(1);
    });
  });

  describe('receives correct values and types without ExtraProps', () => {
    it('<Field />', () => {
      let renderInjectedProps: FieldRenderProps[] = [];
      let componentInjectedProps: FieldComponentProps = {} as any;
      let asInjectedProps: { field: FieldAsProps } = {} as any;

      const RenderField = (props: FieldRenderProps) => {
        renderInjectedProps.push(props);

        return <div data-testid="child">{TEXT}</div>;
      }
      const ComponentField = (props: FieldComponentProps) => {
        componentInjectedProps = props;

        return <div data-testid="child">{TEXT}</div>;
      }

      const AsField = (props: FieldAsProps) => {
        asInjectedProps = { field: props };

        return <div data-testid="child">{TEXT}</div>;
      }

      const { getFormProps, queryAllByText } = renderForm(
        <>
          <Field name="name" children={RenderField} />
          <Field name="name" render={RenderField} />
          <Field name="name" component={ComponentField} />
          <Field name="name" as={AsField} />
        </>
      );

      const { handleBlur } = getFormProps();
      [
        ...renderInjectedProps,
        componentInjectedProps,
        asInjectedProps
      ].forEach((props) => {
        expect(props.field.name).toBe('name');
        expect(props.field.value).toBe('jared');
        expect(props.field.onChange).toEqual(expect.any(Function));
        expect(props.field.onBlur).toBe(handleBlur);
      });

      expect((componentInjectedProps as any).meta).toBeUndefined();

        [
          ...renderInjectedProps,
          componentInjectedProps,
        ].forEach((props) => {
          expect(props.field.name).toBe('name');
          expect(props.field.value).toBe('jared');
          expect(props.field.onChange).toEqual(expect.any(Function));
          expect(props.field.onBlur).toBe(handleBlur);
          expect(props.form).toEqual(getFormProps());
        });

        renderInjectedProps.forEach((props) => {
            expect(props.meta.value).toBe('jared');
            expect(props.meta.error).toBeUndefined();
            expect(props.meta.touched).toBe(false);
            expect(props.meta.initialValue).toEqual('jared');
        });

        expect(queryAllByText(TEXT)).toHaveLength(4);
      });
    });

    describe('receives (or doesn\'t receive) ExtraProps', () => {
      it('<Field />', () => {
        let renderInjectedProps: FieldRenderProps[] = [];
        let componentInjectedProps: FieldComponentProps<any, any, { what: true }> = {} as any;
        let asInjectedProps: FieldAsProps<any, any, any, { what: true }> = {} as any;

        const RenderField = (props: FieldRenderProps) => {
          renderInjectedProps.push(props);

          return <div data-testid="child">{TEXT}</div>;
        }
        const ComponentField = (props: FieldComponentProps<any, any, any, { what: true }>) => {
          componentInjectedProps = props;

          return <div data-testid="child">{TEXT}</div>;
        }

        const AsField = (props: FieldAsProps<any, any, any, { what: true }>) => {
          asInjectedProps = props;

          return <div data-testid="child">{TEXT}</div>;
        }

        renderForm(
          <>
            <Field name="name" children={RenderField} what={true} />
            <Field name="name" render={RenderField as any} what={true} />
            <Field name="name" component={ComponentField} what={true} />
            <Field name="name" as={AsField} what={true} />
          </>
        );

        renderInjectedProps.forEach((props) => {
          expect((props as any).what).toBeUndefined();
        });

        expect(componentInjectedProps.what).toBe(true);
        expect(asInjectedProps.what).toBe(true);
      });

    it('<FastField />', () => {
      let renderInjectedProps: FieldRenderProps[] = [];
      let componentInjectedProps: FieldComponentProps = {} as any;
      let asInjectedProps: { field: FieldAsProps } = {} as any;

      const RenderField = (props: FieldRenderProps) => {
        renderInjectedProps.push(props);

        return <div data-testid="child">{TEXT}</div>;
      }
      const ComponentField = (props: FieldComponentProps) => {
        componentInjectedProps = props;

        return <div data-testid="child">{TEXT}</div>;
      }

      const AsField = (props: FieldAsProps) => {
        asInjectedProps = { field: props };

        return <div data-testid="child">{TEXT}</div>;
      }

      const { getFormProps, queryAllByText } = renderForm(
        <>
          <FastField name="name" children={RenderField} />
          <FastField name="name" render={RenderField} />
          <FastField name="name" component={ComponentField} />
          <FastField name="name" as={AsField} />
        </>
      );

      const { handleBlur } = getFormProps();
      [
        ...renderInjectedProps,
        componentInjectedProps,
        asInjectedProps
      ].forEach((props) => {
        expect(props.field.name).toBe('name');
        expect(props.field.value).toBe('jared');
        expect(props.field.onChange).toEqual(expect.any(Function));
        expect(props.field.onBlur).toBe(handleBlur);
      });

      expect((componentInjectedProps as any).meta).toBeUndefined();

      [
        ...renderInjectedProps,
        componentInjectedProps,
      ].forEach((props) => {
        expect(props.field.name).toBe('name');
        expect(props.field.value).toBe('jared');
        expect(props.field.onChange).toEqual(expect.any(Function));
        expect(props.field.onBlur).toBe(handleBlur);
        expect(props.form).toEqual(getFormProps());
      });

      renderInjectedProps.forEach((props) => {
          expect(props.meta.value).toBe('jared');
          expect(props.meta.error).toBeUndefined();
          expect(props.meta.touched).toBe(false);
          expect(props.meta.initialValue).toEqual('jared');
      });

      expect(queryAllByText(TEXT)).toHaveLength(4);
    });
  });

  describe('children', () => {
    cases('renders a child element with component', () => {
      const { container } = renderForm(
        <Field name="name" component="select">
          <option value="Jared" label={TEXT} />
          <option value="Brent" label={TEXT} />
        </Field>
      );

      expect(container.querySelectorAll('option')).toHaveLength(2);
    });

    cases('renders a child element with as', () => {
      const { container } = renderForm(
        <Field name="name" as="select">
          <option value="Jared" label={TEXT} />
          <option value="Brent" label={TEXT} />
        </Field>
      );

      expect(container.querySelectorAll('option')).toHaveLength(2);
    });
  });

  describe('component', () => {
    cases('renders string components', renderField => {
      const { container } = renderField({
        component: 'textarea',
      });

      expect((container.firstChild as $FixMe).type).toBe('textarea');
    });

    cases('assigns innerRef as a ref to string components', renderField => {
      const innerRef = jest.fn();
      const { container } = renderField({
        innerRef,
        component: 'input',
      });

      expect(innerRef).toHaveBeenCalledWith(container.firstChild);
    });

    cases('forwards innerRef to React component', renderField => {
      let injected: any; /** FieldProps ;) */
      const Component = (props: FieldComponentProps) => (injected = props) && null;

      const innerRef = jest.fn();
      renderField({ component: Component, innerRef });
      expect(injected.innerRef).toBe(innerRef);
    });
  });

  describe('as', () => {
    cases('renders string components', renderField => {
      const { container } = renderField({
        as: 'textarea',
      });

      expect((container.firstChild as $FixMe).type).toBe('textarea');
    });

    cases('assigns innerRef as a ref to string components', renderField => {
      const innerRef = jest.fn();
      const { container } = renderField({
        innerRef,
        as: 'input',
      });

      expect(innerRef).toHaveBeenCalledWith(container.firstChild);
    });

    cases('forwards innerRef to React component', renderField => {
      let injected: FieldAsProps = {} as any;

      const Component = (props: FieldAsProps) =>
        (injected = props) && null;

      const innerRef = jest.fn();
      renderField({ as: Component, innerRef });

      expect(injected.innerRef).toBe(innerRef);
    });
  });

  describe('validate', () => {
    cases('calls validate during onChange if present', async renderField => {
      const validate = jest.fn();
      const { getByTestId, rerender } = renderField({
        validate,
        component: 'input',
      });
      rerender();
      fireEvent.change(getByTestId('name-input'), {
        target: { name: 'name', value: 'hello' },
      });

      rerender();
      await waitFor(() => {
        expect(validate).toHaveBeenCalled();
      });
    });

    cases(
      'does NOT call validate during onChange if validateOnChange is set to false',
      async renderField => {
        const validate = jest.fn();
        const { getByTestId, rerender } = renderField(
          { validate, component: 'input' },
          { validateOnChange: false }
        );
        rerender();
        fireEvent.change(getByTestId('name-input'), {
          target: { name: 'name', value: 'hello' },
        });
        rerender();
        await waitFor(() => {
          expect(validate).not.toHaveBeenCalled();
        });
      }
    );

    cases('calls validate during onBlur if present', async renderField => {
      const validate = jest.fn();
      const { getByTestId, rerender } = renderField({
        validate,
        component: 'input',
      });
      rerender();
      fireEvent.blur(getByTestId('name-input'), {
        target: { name: 'name' },
      });
      rerender();
      await waitFor(() => {
        expect(validate).toHaveBeenCalled();
      });
    });

    cases(
      'does NOT call validate during onBlur if validateOnBlur is set to false',
      async renderField => {
        const validate = jest.fn();
        const { getByTestId, rerender } = renderField(
          { validate, component: 'input' },
          { validateOnBlur: false }
        );

        rerender();
        fireEvent.blur(getByTestId('name-input'), {
          target: { name: 'name' },
        });
        rerender();

        await waitFor(() => expect(validate).not.toHaveBeenCalled());
      }
    );

    cases(
      'runs validation when validateField is called (SYNC)',
      async renderField => {
        const validate = jest.fn(() => 'Error!');
        const { getFormProps, rerender } = renderField({
          validate,
          component: 'input',
        });
        rerender();

        act(() => {
          getFormProps().validateField('name');
        });

        rerender();
        await waitFor(() => {
          expect(validate).toHaveBeenCalled();
          expect(getFormProps().errors.name).toBe('Error!');
        });
      }
    );

    cases(
      'runs validation when validateField is called (ASYNC)',
      async renderField => {
        const validate = jest.fn(() => Promise.resolve('Error!'));

        const { getFormProps, rerender } = renderField({ validate });

        // workaround for `useEffect` to run: https://github.com/facebook/react/issues/14050
        rerender();

        act(() => {
          getFormProps().validateField('name');
        });

        expect(validate).toHaveBeenCalled();
        await waitFor(() => expect(getFormProps().errors.name).toBe('Error!'));
      }
    );

    cases(
      'runs validationSchema validation when validateField is called',
      async renderField => {
        const errorMessage = 'Name must be 100 characters in length';

        const validationSchema = Yup.object({
          name: Yup.string().min(100, errorMessage),
        });
        const { getFormProps, rerender } = renderField(
          {},
          { validationSchema }
        );

        rerender();

        act(() => {
          getFormProps().validateField('name');
        });

        await waitFor(() =>
          expect(getFormProps().errors).toEqual({
            name: errorMessage,
          })
        );
      }
    );
  });

  describe('warnings', () => {
    cases('warns about render prop deprecation', renderField => {
      global.console.warn = jest.fn();
      const { rerender } = renderField({
        render: () => null,
      });
      rerender();
      expect((global.console.warn as jest.Mock).mock.calls[0][0]).toContain(
        'deprecated'
      );
    });

    cases(
      'warns if both string component and children as a function',
      renderField => {
        global.console.warn = jest.fn();

        const { rerender } = renderField({
          component: 'select',
          children: () => <option value="Jared">{TEXT}</option>,
        });
        rerender();
        expect((global.console.warn as jest.Mock).mock.calls[0][0]).toContain(
          'Warning:'
        );
      }
    );

    cases(
      'warns if both string as prop and children as a function',
      renderField => {
        global.console.warn = jest.fn();

        const { rerender } = renderField({
          as: 'select',
          children: () => <option value="Jared">{TEXT}</option>,
        });
        rerender();
        expect((global.console.warn as jest.Mock).mock.calls[0][0]).toContain(
          'Warning:'
        );
      }
    );

    cases(
      'warns if both non-string component and children children as a function',
      renderField => {
        global.console.warn = jest.fn();

        const { rerender } = renderField({
          component: () => null,
          children: () => <option value="Jared">{TEXT}</option>,
        });
        rerender();
        expect((global.console.warn as jest.Mock).mock.calls[0][0]).toContain(
          'Warning:'
        );
      }
    );

    cases('warns if both string component and render', renderField => {
      global.console.warn = jest.fn();

      const { rerender } = renderField({
        // @ts-expect-error
        component: 'textarea',
        // @ts-expect-error
        render: () => <option value="Jared">{TEXT}</option>,
      });
      rerender();
      expect((global.console.warn as jest.Mock).mock.calls[0][0]).toContain(
        'Warning:'
      );
    });

    cases('warns if both non-string component and render', renderField => {
      global.console.warn = jest.fn();

      const { rerender } = renderField({
        // @ts-expect-error
        component: () => null,
        // @ts-expect-error
        render: () => <option value="Jared">{TEXT}</option>,
      });
      rerender();
      expect((global.console.warn as jest.Mock).mock.calls[0][0]).toContain(
        'Warning:'
      );
    });

    cases('warns if both children and render', renderField => {
      global.console.warn = jest.fn();

      // this type is impossible
      const { rerender } = renderField({
        // @ts-expect-error
        children: <div>{TEXT}</div>,
        // @ts-expect-error
        render: () => <div>{TEXT}</div>,
      });
      rerender();
      expect((global.console.warn as jest.Mock).mock.calls[0][0]).toContain(
        'Warning:'
      );
    });
  });

  cases('can resolve bracket paths', renderField => {
    const { getProps } = renderField(
      { name: 'user[superPowers][0]' },
      {
        initialValues: { user: { superPowers: ['Surging', 'Binding'] } } as any,
      } // TODO: fix generic type
    );

    expect(getProps().field.value).toBe('Surging');
  });

  cases('can resolve mixed dot and bracket paths', renderField => {
    const { getProps } = renderField(
      { name: 'user.superPowers[1]' },
      {
        initialValues: { user: { superPowers: ['Surging', 'Binding'] } } as any,
      } // TODO: fix generic type
    );

    expect(getProps().field.value).toBe('Binding');
  });

  cases('can resolve mixed dot and bracket paths II', renderField => {
    const { getProps } = renderField(
      // tslint:disable-next-line:quotemark
      { name: "user['superPowers'].1" },
      {
        initialValues: { user: { superPowers: ['Surging', 'Binding'] } } as any,
      } // TODO: fix generic type
    );

    expect(getProps().field.value).toBe('Binding');
  });
});
