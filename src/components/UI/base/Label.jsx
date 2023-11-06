import PropTypes from "prop-types";

export const Label = ({
  content,
  forInput,
  required = true,
  textColor = "text-black",
  textAlign = "text-left",
  textSize = "text-base",
  dark = "dark:text-white",
}) => {
  const classes = [textColor, textAlign, textSize, dark].join(" ");
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
  textColor: PropTypes.string,
  textAlign: PropTypes.string,
  textSize: PropTypes.string,
  dark: PropTypes.string,
};

export default Label;
