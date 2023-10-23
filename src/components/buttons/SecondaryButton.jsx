import PropTypes from "prop-types";

const SecondaryButton = ({
  valueContent,
  onClickFunction = () => {},
  onClickFnParameters = [],
  textColorBase = "text-cyan-700",
  hoverTextColorBase = "hover:text-white",
  textColorDark = "dark:text-cyan-500",
  hoverTextColorDark = "dark:hover:text-white",
  borderColorBase = "border-cyan-700",
  borderColorDark = "dark:border-cyan-500",
  hoverBgBase = "hover:bg-cyan-700",
  hoverBgDark = "dark:hover:bg-cyan-700",
}) => {
  const textStylesBase = `text-xs ${textColorBase} font-bold text-center capitalize`;
  const boxStylesBase = `w-full rounded my-2 px-2 py-4 border-2 ${borderColorBase} transition`;
  const hoverStyles = `hover:cursor-pointer ${hoverBgBase} hover:border-transparent ${hoverTextColorBase}`;
  const darkStyles = `${borderColorDark} ${textColorDark} ${hoverBgDark} ${hoverTextColorDark}`;
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

SecondaryButton.propTypes = {
  valueContent: PropTypes.string,
  onClickFunction: PropTypes.func,
  onClickFnParameters: PropTypes.array,
  textColorBase: PropTypes.string,
  hoverTextColorBase: PropTypes.string,
  textColorDark: PropTypes.string,
  hoverTextColorDark: PropTypes.string,
  borderColorBase: PropTypes.string,
  borderColorDark: PropTypes.string,
  hoverBgBase: PropTypes.string,
  hoverBgDark: PropTypes.string,
};

export default SecondaryButton;
