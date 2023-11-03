import PropTypes from "prop-types";

const FormError = ({
  message,
  textSize = "text-base",
  textColor = "text-red-500",
  dark = 'dark:text-red-300'
}) => {
  const classes = [textSize, textColor, dark].join(" ");
  return <p className={classes}>{message}</p>;
};

FormError.propTypes = {
  message: PropTypes.string,
  textSize: PropTypes.string,
  textColor: PropTypes.string,
  dark: PropTypes.string,
};

export default FormError;
