import PropTypes from "prop-types";

const Sentence = ({
  content,
  textAlign = "text-center",
  textSize = "text-base",
  textWeight = "font-normal",
  dark = "dark:text-white",
}) => {
  const classes = [
    content,
    textAlign,
    textSize,
    textWeight,
    dark,
  ].join(" ");
  return <p className={classes}>{content}</p>;
};

Sentence.propTypes = {
  content: PropTypes.any,
  textAlign: PropTypes.string,
  textSize: PropTypes.string,
  textWeight: PropTypes.string,
  dark: PropTypes.string,
};

export default Sentence;
