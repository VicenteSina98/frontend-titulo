import PropTypes from "prop-types";

const Subtitle = ({ content }) => (
  <h2 className="text-lg font-bold dark:text-white sm:text-xl">
    {content}
  </h2>
);

Subtitle.propTypes = {
  content: PropTypes.string,
};

export default Subtitle;
