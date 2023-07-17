import PropTypes from "prop-types";

const Success = ({ message }) => (
  <p className="mx-auto mb-4 p-4 rounded-sm bg-green-700 text-center text-lg text-white">
    {message}
  </p>
);

Success.propTypes = {
  message: PropTypes.string,
};

export default Success;
