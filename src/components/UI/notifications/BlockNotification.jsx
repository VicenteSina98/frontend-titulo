import PropTypes from "prop-types";

const BlockNotification = ({
  content,
  textAlign = "text-center",
  textSize = "text-base",
  textColor = "text-black",
  padding = "px-4 py-2",
  backgroundColor = "transparent",
  borderRadius = "rounded-md",
}) => {
  const classes = [
    textAlign,
    textSize,
    textColor,
    padding,
    backgroundColor,
    borderRadius,
  ].join(" ");
  return <p className={classes}>{content}</p>;
};

BlockNotification.propTypes = {
  content: PropTypes.string,
  textAlign: PropTypes.string,
  textSize: PropTypes.string,
  textColor: PropTypes.string,
  padding: PropTypes.string,
  backgroundColor: PropTypes.string,
  borderRadius: PropTypes.string,
};

export default BlockNotification;
