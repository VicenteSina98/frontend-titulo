import PropTypes from "prop-types";

const SecondaryButton = ({
  valueButton,
  onClickFn = () => {},
  onClickParams = [],
  textSize = "text-base",
  textColor = "text-cyan-900",
  textWeight = "font-normal",
  textAlign = "text-center",
  width = "w-full",
  padding = "px-4 py-2",
  border = "border",
  borderRadius = "rounded-md",
  borderColor = "border-cyan-800",
  backgroundColor = "transparent",
  transition = "transition",
  wordBreak = "break-all",
  hover = "hover:cursor-pointer hover:text-white hover:bg-cyan-800 hover:border-cyan-800",
  dark = "dark:text-cyan-400 dark:border-cyan-600 dark:hover:text-white dark:hover:bg-cyan-700 dark:hover:border-cyan-700",
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
    wordBreak,
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

SecondaryButton.propTypes = {
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
  wordBreak: PropTypes.string,
  hover: PropTypes.string,
  dark: PropTypes.string,
};

export default SecondaryButton;
