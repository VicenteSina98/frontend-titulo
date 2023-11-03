import PropTypes from "prop-types";

const Paragraph = ({
  content,
  textColor = "text-black",
  textAlign = "text-center",
  textSize = "text-xs",
  dark = "dark:text-white",
  responsive = "sm:text-sm md:text-base",
}) => {
  const classes = [
    content,
    textColor,
    textAlign,
    textSize,
    dark,
    responsive,
  ].join(" ");
  return <p className={classes}>{content}</p>;
};

Paragraph.propTypes = {
  content: PropTypes.string,
  textColor: PropTypes.string,
  textAlign: PropTypes.string,
  textSize: PropTypes.string,
  dark: PropTypes.string,
  responsive: PropTypes.string,
};

export default Paragraph;
