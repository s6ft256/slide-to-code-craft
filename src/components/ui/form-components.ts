import * as React from "react";
import { Controller, FieldPath, FieldValues, FormProvider } from "react-hook-form";

const Form = FormProvider;

const FormFieldContext = React.createContext({} as any);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ ...props }: any) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

export { Form, FormField };