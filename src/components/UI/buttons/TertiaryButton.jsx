import PropTypes from "prop-types";

export const TertiaryButton = ({
  valueButton,
  onClickFn = () => {},
  onClickParams = [],
  textSize = "text-sm sm:text-base",
  textColor = "text-neutral-500",
  textWeight = "font-normal",
  textAlign = "text-center",
  hidden = "",
  width = "w-full",
  padding = "px-4 py-2",
  border = "border-none",
  borderRadius = "rounded-md",
  borderColor = "",
  backgroundColor = "bg-transparent",
  transition = "transition",
  hover = "hover:cursor-pointer hover:text-neutral-300 hover:bg-neutral-2 00 hover:text-neutral- dark:hover:bg-neutral-700",
  dark = "dark:text-neutral-300",
}) => {
  const classes = [
    textSize,
    textColor,
    textWeight,
    textAlign,
    hidden,
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
  hidden: PropTypes.string,
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
