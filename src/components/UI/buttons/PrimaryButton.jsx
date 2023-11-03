import PropTypes from "prop-types";

const PrimaryButton = ({
  // button properties
  valueButton,
  onClickFn = () => {},
  onClickParams = [],
  // button styles
  textSize = "text-base",
  textColor = "text-white",
  textWeight = "font-normal",
  textAlign = "text-center",
  width = "w-full",
  padding = "px-4 py-2",
  border = "border-2",
  borderRadius = "rounded-md",
  borderColor = "border-cyan-700",
  backgroundColor = "bg-cyan-700",
  transition = "transition",
  hover = "hover:cursor-pointer hover:bg-cyan-800 hover:border-cyan-800",
  dark = "dark:bg-cyan-700 dark:border-cyan-700 dark:hover:bg-cyan-600 dark:hover:border-cyan-600",
}) => {
  const classes = [
    valueButton,
    onClickFn,
    onClickParams,
    textSize,
    textColor,
    textWeight,
    textAlign,
    width,
    padding,
    border,
    borderRadius,
    borderColor,
    backgroundColor,
    transition,
    hover,
    dark,
  ].join(" ");
  return (
    <input
      type="submit"
      className={classes}
      value={valueButton}
      onClick={() => onClickFn(...onClickParams)}
    />
  );
};

PrimaryButton.propTypes = {
  valueButton: PropTypes.string,
  onClickFn: PropTypes.func,
  onClickParams: PropTypes.array,
  textSize: PropTypes.string,
  textColor: PropTypes.string,
  textWeight: PropTypes.string,
  textAlign: PropTypes.string,
  width: PropTypes.string,
  padding: PropTypes.string,
  border: PropTypes.string,
  borderRadius: PropTypes.string,
  borderColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  transition: PropTypes.string,
  hover: PropTypes.string,
  dark: PropTypes.string,
};

export default PrimaryButton;
