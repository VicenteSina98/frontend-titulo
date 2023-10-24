import PropTypes from "prop-types";

const Title = ({ content }) => (
  <h1 className="text-xl font-bold dark:text-white sm:text-2xl">
    {content}
  </h1>
);

Title.propTypes = {
  content: PropTypes.string,
};

export default Title;
