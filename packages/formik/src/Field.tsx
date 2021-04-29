import * as React from 'react';
import {
  FormikProps,
  GenericFieldHTMLAttributes,
  FieldMetaProps,
  FieldHelperProps,
  FieldInputProps,
  FieldValidator,
  PathMatchingValue,
} from './types';
import { isFunction, isEmptyChildren, isObject } from './utils';
import invariant from 'tiny-warning';
import { useFieldHelpers, useFieldMeta, useFieldProps } from './hooks/hooks';
import { useFormikConfig, useFormikContext } from './FormikContext';
import { selectFullState } from './helpers/form-helpers';

export type ParseFn<Value> = (value: unknown, name: string) => Value;
export type FormatFn<Value> = (value: Value, name: string) => any;

export type SingleValue<Value> =
  Value extends (infer SingleValue)[]
    ? SingleValue
    : Value;

/**
 * These props are passed from Config to Components.
 *
 * @private
 */
export type FieldPassThroughConfig<Values, Value> = {
  /**
   * Validate a single field value independently
   */
  validate?: FieldValidator<SingleValue<Value>>;

  /**
   * Function to parse raw input value before setting it to state
   */
  parse?: ParseFn<SingleValue<Value>>;

  /**
   * Function to transform value passed to input
   */
  format?: FormatFn<SingleValue<Value>>;

  /**
   * Wait until blur event before formatting input value?
   * @default false
   */
  formatOnBlur?: boolean;

  /**
   * HTML multiple attribute
   */
  multiple?: boolean;

  /**
   * Field name
   */
  name: PathMatchingValue<Values, Value>;

  /** HTML input type */
  type?: string;

  /** checkbox value to match against current value */
  value?: SingleValue<Value>;

  /** Inner ref */
  innerRef?: (instance: any) => void;
}

export type FieldHookConfig<Values, Value> =
  { as?: any } & FieldPassThroughConfig<Values, Value>

export function useField<
  Values = any,
  Value = any,
>(
  propsOrFieldName:
    PathMatchingValue<Values, Value> |
    FieldHookConfig<Values, Value>
): [
  FieldInputProps<Value>,
  FieldMetaProps<Value>,
  FieldHelperProps<Value>
] {
  const formik = useFormikContext<Values>();
  const {
    registerField,
    unregisterField,
  } = formik;

  const props: FieldHookConfig<Values, Value> = isObject(propsOrFieldName)
    ? propsOrFieldName
    : { name: propsOrFieldName };

  const { name: fieldName, validate: validateFn } = props;

  const fieldMeta = useFieldMeta<Value>(fieldName);

  React.useEffect(() => {
    if (fieldName) {
      registerField(fieldName, {
        validate: validateFn,
      });
    }
    return () => {
      if (fieldName) {
        unregisterField(fieldName);
      }
    };
  }, [registerField, unregisterField, fieldName, validateFn]);

  if (__DEV__) {
    invariant(
      formik,
      'useField() / <Field /> must be used underneath a <Formik> component or withFormik() higher order component'
    );
  }

  invariant(
    fieldName,
    'Invalid field name. Either pass `useField` a string or an object containing a `name` key.'
  );

  return [
    useFieldProps(props, fieldMeta),
    fieldMeta,
    useFieldHelpers(fieldName),
  ];
}

export type FieldAsProps<
  Value = any,
  Values = any
> =
  FieldPassThroughConfig<Values, Value> &
  FieldInputProps<Value>;

export type TypedAsField<
  Value,
> = <
  Values,
>(
  props: React.PropsWithChildren<FieldAsProps<
    Value,
    Values
  >>
) => React.ReactElement | null;

export abstract class FieldAsClass<
  Value,
> extends React.Component<
  FieldAsProps<
    Value,
    unknown
  >
> {}

export type FieldAsComponent<Values, Value> =
  React.ComponentType<FieldAsProps<
    Value,
    Values
  >>;

export type FieldComponentProps<
  Value = any,
  Values = any,
> =
  FieldPassThroughConfig<Values, Value> &
  LegacyBag<Values, Value>;

export abstract class FieldComponentClass<
  Value,
> extends React.Component<
  FieldComponentProps<
    Value,
    any
  >
> {}

type FieldComponentComponent<Values, Value> =
  React.ComponentType<FieldComponentProps<
    Value,
    Values
  >>;

type GenericFieldHTMLConfig = Omit<
  GenericFieldHTMLAttributes,
  keyof FieldPassThroughConfig<any, any>
>;

/**
 * Passed to `<Field component={Component} />`.
 */
type LegacyBag<Values, Value> = {
  field: FieldInputProps<Value>;
  // if ppl want to restrict this for a given form, let them.
  form: FormikProps<Values>;
}

/**
 * Passed to `render={Function}` or `children={Function}`.
 */
export type FieldRenderProps<Value = any, Values = any> =
  LegacyBag<Values, Value> & {
    meta: FieldMetaProps<Value>;
  }

export type FieldRenderFunction<Values, Value> = (
  props: FieldRenderProps<Value, Values>
) => React.ReactElement | null;

/**
 * @deprecated Field types do not share common props. Please choose:
 *
 * FieldComponentProps: `field.component = Component`,
 * FieldAsProps: `field.as = Component`,
 * FieldRenderProps: `field.render, field.children = Function`
 */
export type FieldProps<Value, Values> =
  FieldRenderProps<Value, Values>;

export type TypedComponentField<Value> = <Values>(
  props: FieldComponentProps<Value, Values>
) => React.ReactElement | null;

/**
 * `field.as = string`
 *
 * @private
 */
export type FieldAsStringConfig<Values, Value> =
  React.PropsWithChildren<{
    as: string,
    component?: undefined,
    render?: undefined,
  }>
    & FieldPassThroughConfig<Values, Value>
    & GenericFieldHTMLConfig;


/**
 * `field.as = Component`
 *
 * @private
 */
export type FieldAsComponentConfig<Values, Value> =
  React.PropsWithChildren<
    {
      as: FieldAsComponent<Values, Value>;
      component?: undefined,
      render?: undefined,
    }
  >
    & FieldPassThroughConfig<Values, Value>;

/**
 * `field.component = string`
 *
 * @private
 */
export type FieldStringComponentConfig<Values, Value> =
  React.PropsWithChildren<{
    component: string,
    as?: undefined,
    render?: undefined,
  }>
    & FieldPassThroughConfig<Values, Value>
    & GenericFieldHTMLConfig;

/**
 * `field.component = Component`
 *
 * @private
 */
export type FieldComponentConfig<Values, Value> =
  React.PropsWithChildren<
    {
      component: FieldComponentComponent<Values, Value>;
      as?: undefined,
      render?: undefined,
    }
  >
    & FieldPassThroughConfig<Values, Value>;

/**
 * `field.render = Function`
 *
 * @private
 */
export type FieldRenderConfig<Values, Value> =
  {
    render: FieldRenderFunction<Values, Value>;
    as?: undefined,
    component?: undefined,
    children?: undefined
  } & FieldPassThroughConfig<Values, Value>;

/**
 * `field.children = Function`
 *
 * @private
 */
export type FieldChildrenConfig<Values, Value> =
  {
    children: FieldRenderFunction<Values, Value>;
    as?: undefined,
    component?: undefined,
    render?: undefined,
  } & FieldPassThroughConfig<Values, Value>;

/**
 * no config, `<Field name="">`
 *
 * @private
 */
export type FieldDefaultConfig<Values, Value> =
  {
    as?: undefined,
    component?: undefined,
    render?: undefined,
    children?: undefined,
  }
    & FieldPassThroughConfig<Values, Value>
    & GenericFieldHTMLConfig;

export type FieldConfig<Values, Value> =
  FieldAsStringConfig<Values, Value> |
  FieldAsComponentConfig<Values, Value> |
  FieldStringComponentConfig<Values, Value> |
  FieldComponentConfig<Values, Value> |
  FieldRenderConfig<Values, Value> |
  FieldChildrenConfig<Values, Value> |
  FieldDefaultConfig<Values, Value>;

/**
 * @deprecated use `FieldConfig`
 */
export type FieldAttributes<Values, Value> =
  FieldConfig<Values, Value>;

export function Field<
  Values = any,
  Value = any,
>(
  props: FieldConfig<Values, Value>
) {

  if (__DEV__) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      invariant(
        !props.render,
        `<Field render> has been deprecated and will be removed in future versions of Formik. Please use a child callback function instead. To get rid of this warning, replace <Field name="${props.name}" render={({field, form}) => ...} /> with <Field name="${props.name}">{({field, form, meta}) => ...}</Field>`
      );

      invariant(
        !(props.as && props.children && isFunction(props.children)),
        'You should not use <Field as> and <Field children> as a function in the same <Field> component; <Field as> will be ignored.'
      );

      invariant(
        !(props.component && props.children && isFunction(props.children)),
        'You should not use <Field component> and <Field children> as a function in the same <Field> component; <Field component> will be ignored.'
      );

      invariant(
        !(
          props.render &&
          props.children &&
          // impossible type
          !isEmptyChildren((props as any).children)
        ),
        'You should not use <Field render> and <Field children> in the same <Field> component; <Field children> will be ignored'
      );
      // eslint-disable-next-line
    }, []);
  }

  const [field, meta] = useField(props);

  /**
   * If we use render function or use functional children, we continue to
   * subscribe to the full FormikState because these do not have access to hooks.
   * We also do this for Component for backwards compatibility.
   *
   * Otherwise, we will pointlessly get the initial values but never subscribe to updates.
   */
  const formikApi = useFormikContext<Values>();
  const formikConfig = useFormikConfig();
  const formikState = formikApi.useState(
    selectFullState,
    Object.is,
    !!props.render || isFunction(props.children) || (!!props.component && typeof props.component !== 'string')
  );

  const form = {
      ...formikApi,
      ...formikConfig,
      ...formikState,
  };

  if (props.render) {
    return props.render({ field, form, meta });
  }

  if (isFunction(props.children)) {
    return props.children({ field, form, meta });
  }

  if (props.as && typeof props.as !== 'string') {
    // not sure why as !== string isn't removing FieldAsStringConfig
    const {
      render,
      component,
      as,
      children,
      ...fieldAsProps
    } = props;
    return React.createElement(
      as,
      { ...fieldAsProps, ...field } as any,
      children
    );
  }

  if (props.component && typeof props.component !== 'string') {
    // not sure why component !== string isn't removing FieldStringComponentConfig
    const {
      // render props
      render,
      children,
      as,
      component,
      ...componentProps
    } = props;

    // We don't pass `meta` for backwards compat
    return React.createElement(
      component,
      { field, ...componentProps, form } as any,
      children
    );
  }

  const {
    innerRef,
    validate,
    parse,
    format,
    formatOnBlur,
    name,
    value,
    as,
    component,
    render,
    children,
    ...htmlProps
  } = props;

  return React.createElement(
    props.as || props.component || "input",
    // field has FieldValue<> while HTML expects
    { ref: props.innerRef, ...field, ...htmlProps },
    children
  );
}
