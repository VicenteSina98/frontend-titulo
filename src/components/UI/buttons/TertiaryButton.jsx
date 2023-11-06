import PropTypes from "prop-types";

export const TertiaryButton = ({
  valueButton,
  onClickFn = () => {},
  onClickParams = [],
  textSize = "text-base",
  textColor = "text-white",
  textWeight = "font-normal",
  textAlign = "text-center",
  width = "w-full",
  padding = "px-4 py-2",
  border = "border-2",
  borderRadius = "rounded-md",
  borderColor = "border-teal-700",
  backgroundColor = "bg-teal-700",
  transition = "transition",
  hover = "hover:cursor-pointer hover:bg-teal-800 hover:border-teal-800",
  dark = "dark:bg-teal-800 dark:border-teal-800 dark:hover:bg-teal-700 dark:hover:border-teal-700",
}) => {
  const classes = [
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

TertiaryButton.propTypes = {
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

export default TertiaryButton;