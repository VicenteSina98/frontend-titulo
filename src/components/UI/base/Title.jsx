import PropTypes from "prop-types";

const Title = ({
  content,
  textColor = "text-black",
  textAlign = "text-center",
  textSize = "text-xl",
  textWeight = "font-bold",
  dark = "dark:text-white",
  responsive = "sm:text-2xl",
}) => {
  const classes = [
    textColor,
    textAlign,
    textSize,
    textWeight,
    dark,
    responsive,
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
  responsive: PropTypes.string,
};

export default Title;
