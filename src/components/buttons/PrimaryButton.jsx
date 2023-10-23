import PropTypes from "prop-types";

const PrimaryButton = ({
  valueContent,
  onClickFunction = () => {},
  onClickFnParameters = [],
}) => {
  const textStylesBase = "text-xs text-white font-bold text-center capitalize";
  const boxStylesBase = "w-full rounded my-2 px-2 py-4 bg-cyan-700 border-2 border-cyan-700 transition";
  const hoverStyles = "hover:cursor-pointer hover:bg-cyan-800";
  const darkStyles = "dark:bg-cyan-800 dark:border-cyan-800 dark:hover:bg-cyan-700 dark:hover:border-cyan-700";
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

PrimaryButton.propTypes = {
  valueContent: PropTypes.string,
  onClickFunction: PropTypes.func,
  onClickFnParameters: PropTypes.array,
};

export default PrimaryButton;
