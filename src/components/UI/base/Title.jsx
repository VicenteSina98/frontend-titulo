import PropTypes from "prop-types";

export const Title = ({
  content,
  textColor = "text-black",
  textAlign = "text-center",
  textSize = "text-lg sm:text-xl",
  textWeight = "font-bold",
  dark = "dark:text-white",
}) => {
  const classes = [
    textColor,
    textAlign,
    textSize,
    textWeight,
    dark,
  ].join(" ");
  return <h1 className={classes}>{content}</h1>;
};

Title.propTypes = {
  content: PropTypes.string,
  textColor: PropTypes.string,
  textAlign: PropTypes.string,
  textSize: PropTypes.string,
  textWeight: PropTypes.string,
  dark: PropTypes.string,
};

export default Title;
