import PropTypes from "prop-types";

const FormError = ({ message }) => <p className="text-md text-red-500 dark:text-red-400">{message}</p>;

FormError.propTypes = {
  message: PropTypes.string,
};

export default FormError;
