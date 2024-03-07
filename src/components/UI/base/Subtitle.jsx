import PropTypes from "prop-types";

export const Subtitle = ({
  content,
  textColor = "text-black",
  textAlign = "text-center",
  textSize = "text-base",
  textWeight = "font-normal",
  dark = "dark:text-white",
  responsive = "sm:text-lg",
}) => {
  const classes = [
    textColor,
    textAlign,
    textSize,
    textWeight,
    dark,
    responsive,
  ].join(" ");
  return <h2 className={classes}>{content}</h2>;
};

Subtitle.propTypes = {
  content: PropTypes.string,
  textColor: PropTypes.string,
  textAlign: PropTypes.string,
  textSize: PropTypes.string,
  textWeight: PropTypes.string,
  dark: PropTypes.string,
  responsive: PropTypes.string,
};

export default Subtitle;
