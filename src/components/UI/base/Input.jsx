import PropTypes from "prop-types";

export const Input = ({
  // input properties
  typeInput,
  nameInput,
  idInput,
  placeholderInput,
  valueInput,
  onChangeFn,
  options = [],
  textColor = "text-neutral-700 dark:text-neutral-300",
  textSize = "text-sm sm:text-base",
  width = "w-full",
  padding = "px-4 py-2",
  border = "border",
  borderRadius = "rounded-md",
  borderColor = "border-neutral-400 dark:border-neutral-600",
  backgroundColor = "bg-transparent",
  focus = "focus:outline-none focus:border-teal-700 dark:focus:border-teal-600",
  hidden = "",
  breakWords = "",
}) => {
  const classes = [
    textColor,
    textSize,
    width,
    padding,
    border,
    borderRadius,
    borderColor,
    backgroundColor,
    focus,
    hidden,
    breakWords,
  ].join(" ");
  switch (typeInput) {
    case "select":
      return (
        <select className={classes}>
          <option value="" selected disabled>
            -- Seleccione --
          </option>
          {options.map((valueOption) => (
            <option key={[idInput, valueOption].join("-")} value={valueOption}>
              {valueOption}
            </option>
          ))}
        </select>
      );
    default:
      return (
        <input
          type={typeInput}
          name={nameInput}
          id={idInput}
          placeholder={placeholderInput}
          value={valueInput}
          onChange={(event) => onChangeFn(event.target.value)}
          className={classes}
        />
      );
  }
};

Input.propTypes = {
  typeInput: PropTypes.string,
  nameInput: PropTypes.string,
  idInput: PropTypes.string,
  placeholderInput: PropTypes.string,
  valueInput: PropTypes.string,
  onChangeFn: PropTypes.func,
  options: PropTypes.array,
  textColor: PropTypes.string,
  textSize: PropTypes.string,
  width: PropTypes.string,
  padding: PropTypes.string,
  border: PropTypes.string,
  borderRadius: PropTypes.string,
  borderColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  focus: PropTypes.string,
  hidden: PropTypes.string,
  breakWords: PropTypes.string,
};

export default Input;
