import PropTypes from "prop-types";

const TertiaryButton = ({
  valueContent,
  onClickFunction = () => {},
  onClickFnParameters = [],
  textColorBase = "text-cyan-700",
  hoverTextColorBase = "hover:text-cyan-600",
  textColorDark = "dark:text-cyan-500",
  hoverTextColorDark = "dark:hover:text-cyan-600",
}) => {
  const textStylesBase = `text-xs ${textColorBase} font-bold text-center capitalize underline`;
  const boxStylesBase = "w-full my-2 px-2 py-4 transition";
  const hoverStyles = `hover:cursor-pointer ${hoverTextColorBase}`;
  const darkStyles = `${textColorDark} ${hoverTextColorDark}`;
  const responseStyles = "sm:text-sm md:text-base md:mx-auto md:w-1/2";
  const styles = [
    textStylesBase,
    boxStylesBase,
    hoverStyles,
    darkStyles,
    responseStyles,
  ].join(" ");
  return (
    <input
      type="submit"
      className={styles}
      value={valueContent}
      onClick={() => onClickFunction(...onClickFnParameters)}
    />
  );
};

TertiaryButton.propTypes = {
  valueContent: PropTypes.string,
  onClickFunction: PropTypes.func,
  onClickFnParameters: PropTypes.array,
  textColorBase: PropTypes.string,
  hoverTextColorBase: PropTypes.string,
  textColorDark: PropTypes.string,
  hoverTextColorDark: PropTypes.string,
};

export default TertiaryButton;
