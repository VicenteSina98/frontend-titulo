import PropTypes from "prop-types";
import { Img } from "../base";

export const PrimaryButton = ({
  valueButton,
  src = undefined,
  alt = "",
  imgRounded = "rounded-full",
  onClickFn = () => {},
  onClickParams = [],
  textSize = "text-sm sm:text-base",
  textColor = "text-white",
  textWeight = "font-normal",
  textAlign = "text-center",
  display = "",
  hidden = "",
  width = "w-full",
  padding = "px-4 py-2",
  border = "border",
  borderRadius = "rounded-md",
  borderColor = "border-teal-700",
  backgroundColor = "bg-teal-700",
  transition = "transition",
  hover = "hover:cursor-pointer hover:bg-teal-800 hover:border-teal-800 dark:hover:bg-teal-700 dark:hover:border-teal-700",
  dark = "dark:bg-teal-600 dark:border-teal-600",
}) => {
  const classes = [
    textSize,
    textColor,
    textWeight,
    textAlign,
    display,
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
  return src ? (
    <button className={classes} onClick={() => onClickFn(...onClickParams)}>
      <Img srcImg={src} altImg={alt} width="w-8" rounded={imgRounded} />
      <span>{valueButton}</span>
    </button>
  ) : (
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
  src: PropTypes.any,
  alt: PropTypes.string,
  imgRounded: PropTypes.string,
  onClickFn: PropTypes.func,
  onClickParams: PropTypes.array,
  textSize: PropTypes.string,
  textColor: PropTypes.string,
  textWeight: PropTypes.string,
  textAlign: PropTypes.string,
  display: PropTypes.string,
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

export default PrimaryButton;
