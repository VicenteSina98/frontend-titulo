import PropTypes from "prop-types";

const Label = ({
  content,
  forInput,
  required = true,
  textAlign = "text-left",
  textSize = "text-base",
  dark = "dark:text-white",
}) => {
  const classes = [content, forInput, textAlign, textSize, dark].join(" ");
  return (
    <label htmlFor={forInput} className={classes}>
      {content}{" "}
      {required ? (
        <span className="text-red-500 dark:text-red-300">*</span>
      ) : null}
    </label>
  );
};

Label.propTypes = {
  content: PropTypes.string,
  forInput: PropTypes.string,
  required: PropTypes.bool,
  textAlign: PropTypes.string,
  textSize: PropTypes.string,
  dark: PropTypes.string,
};

export default Label;
