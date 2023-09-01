import PropTypes from "prop-types";
import { Field } from "formik";
import FormError from "../error/FormError";

const InputPersonalDataForm = ({
  labelContent,
  nameField,
  typeField,
  errors,
  touched,
  options = [],
}) => {
  const styles =
    "rounded-sm border-2 px-2 py-1 text-xs " +
    "focus:border-blue-600 focus:outline-none " +
    "dark:border-neutral-400 dark:bg-neutral-800 dark:text-gray-300 dark:focus:border-blue-500 " +
    "sm:text-base";
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={nameField}
        className="text-sm dark:text-gray-200 sm:text-base"
      >
        {labelContent}
      </label>
      {typeField === "select" ? (
        <Field
          as={typeField}
          name={nameField}
          id={nameField}
          className={styles}
        >
          <option value="" selected disabled>
            -- Seleccione una opción --
          </option>
          {options.map(({ valueOption, contentOption }) => (
            <option key={valueOption} value={valueOption}>
              {contentOption}
            </option>
          ))}
        </Field>
      ) : (
        <Field
          type={typeField}
          name={nameField}
          id={nameField}
          className={styles}
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
  errors: PropTypes.any,
  touched: PropTypes.any,
  options: PropTypes.array,
};

export default InputPersonalDataForm;
