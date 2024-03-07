// librereias
import PropTypes from "prop-types";
import { Field } from "formik";
// componentes
import { FormError } from "../outSessionBase";
import { Label } from "../../UI/base";

export const InputPersonalDataForm = ({
  labelContent,
  nameField,
  typeField,
  placeholderField,
  errors,
  touched,
  required = true,
  options = [],
}) => {
  const fieldClasses = [
    "text-neutral-700 dark:text-neutral-300",
    "text-sm sm:text-base",
    "w-full",
    "px-4 py-2",
    "border",
    "rounded-md",
    "border-neutral-400 dark:border-neutral-600",
    "bg-transparent",
    "focus:outline-none focus:border-teal-700 dark:focus:border-teal-600",
  ].join(" ");
  const optionClasses = [
    "text-neutral-700 dark:text-neutral-300",
    "text-sm sm:text-base",
    "w-full",
    "px-4 py-2",
    "border",
    "rounded-md",
    "border-neutral-400 dark:border-neutral-600",
    "bg-transparent",
    "focus:outline-none focus:border-teal-700 dark:focus:border-teal-600",
  ].join(" ");
  return (
    <div className="flex flex-col gap-1">
      <Label content={labelContent} forInput={nameField} required={required} />
      {typeField === "select" ? (
        <Field
          as={typeField}
          name={nameField}
          id={nameField}
          placeholder={placeholderField}
          className={fieldClasses + " hover:cursor-pointer"}
        >
          <option className={optionClasses} value="" selected disabled>
            -- Seleccione --
          </option>
          {options.map(({ valueOption, contentOption }) => (
            <option
              className={optionClasses}
              key={valueOption}
              value={valueOption}
            >
              {contentOption}
            </option>
          ))}
        </Field>
      ) : (
        <Field
          type={typeField}
          name={nameField}
          id={nameField}
          placeholder={placeholderField}
          className={
            fieldClasses + (typeField === "date" ? " hover:cursor-pointer" : "")
          }
        />
      )}
      {errors[nameField] && touched[nameField] ? (
        <FormError message={errors[nameField]} />
      ) : null}
    </div>
  );
};

InputPersonalDataForm.propTypes = {
  labelContent: PropTypes.string,
  nameField: PropTypes.string,
  typeField: PropTypes.string,
  placeholderField: PropTypes.string,
  errors: PropTypes.any,
  touched: PropTypes.any,
  required: PropTypes.bool,
  options: PropTypes.array,
};

export default InputPersonalDataForm;
