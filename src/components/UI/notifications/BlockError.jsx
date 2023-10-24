import PropTypes from "prop-types";

const BlockError = ({ message }) => (
  <p className="bg-red-700 text-lg text-white rounded-sm text-center p-4 m-4">{message}</p>
);

BlockError.propTypes = {
  message: PropTypes.string,
};

export default BlockError;
