import PropTypes from "prop-types";

const FormError = ({ message }) => <p className="text-xs text-red-500 dark:text-red-400 sm:text-sm">{message}</p>;

FormError.propTypes = {
  message: PropTypes.string,
};

export default FormError;
