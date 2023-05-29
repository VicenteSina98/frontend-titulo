import PropTypes from "prop-types";

const Error = ({ message }) => <p className="text-md text-red-500 dark:text-red-400">{message}</p>;

Error.propTypes = {
  message: PropTypes.string,
};

export default Error;
