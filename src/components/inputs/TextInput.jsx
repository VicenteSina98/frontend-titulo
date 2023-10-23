import PropTypes from "prop-types";

const TextInput = ({
  nameInput,
  placeholderContent,
  valueContent,
  onChangeFunction,
}) => {
  const textStylesBase = "text-xs";
  const boxStylesBase =
    "w-full my-2 p-2 border rounded border-gray-400 bg-transparent";
  const focusStylesBase =
    "focus:outline-none focus:border-2 focus:border-cyan-700";
  const darkStyles = "dark:border-neutral-600 dark:text-neutral-300";
  const responsiveStyles = "sm:text-sm md:text-base md:mx-auto";
  const styles = [
    textStylesBase,
    boxStylesBase,
    focusStylesBase,
    darkStyles,
    responsiveStyles,
  ].join(" ");
  return (
    <input
      type="text"
      name={nameInput}
      id={nameInput}
      placeholder={placeholderContent}
      className={styles}
      value={valueContent}
      onChange={(event) => onChangeFunction(event.target.value)}
    />
  );
};

TextInput.propTypes = {
  nameInput: PropTypes.string,
  placeholderContent: PropTypes.string,
  valueContent: PropTypes.string,
  onChangeFunction: PropTypes.func,
};

export default TextInput;
