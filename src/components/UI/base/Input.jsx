import PropTypes from "prop-types";

const Input = ({
  // input properties
  typeInput,
  nameInput,
  idInput,
  placeholderInput,
  valueInput,
  onChangeFn,
  options = [],
  textSize = "text-base",
  width = "w-full",
  padding = "px-4 py-2",
  border = "border",
  borderRadius = "rounded-md",
  borderColor = "border-gray-400",
  backgroundColor = "bg-transparent",
  focus = "focus:outline-none focus:border-2 focus:border-cyan-700",
  dark = "dark:border-neutral-600 dark:text-neutral-300",
}) => {
  const classes = [
    textSize,
    width,
    padding,
    border,
    borderRadius,
    borderColor,
    backgroundColor,
    focus,
    dark,
  ].join(" ");
  return typeInput === "select" ? (
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
  ) : (
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
};

Input.propTypes = {
  typeInput: PropTypes.string,
  nameInput: PropTypes.string,
  idInput: PropTypes.string,
  placeholderInput: PropTypes.string,
  valueInput: PropTypes.string,
  onChangeFn: PropTypes.func,
  options: PropTypes.array,
  textSize: PropTypes.string,
  width: PropTypes.string,
  padding: PropTypes.string,
  border: PropTypes.string,
  borderRadius: PropTypes.string,
  borderColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  focus: PropTypes.string,
  dark: PropTypes.string,
};

export default Input;
