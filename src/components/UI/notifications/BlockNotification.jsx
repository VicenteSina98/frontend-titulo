import PropTypes from "prop-types";

export const BlockNotification = ({
  content,
  typeNotification,
  textAlign = "text-center",
  textSize = "text-base",
  textWeight = "font-bold",
  padding = "px-6 py-3",
  borderRadius = "rounded-md",
  hidden = "hidden",
}) => {
  let colors = "text-black bg-transparent dark: text-white";
  switch (typeNotification) {
    case "error":
      colors = "text-red-700 bg-red-200";
      break;
    case "success":
      colors = "text-green-700 bg-green-200";
      break;
    default:
      colors = "text-black bg-transparent dark:text-white";
      break;
  }
  const classes = [
    textAlign,
    textSize,
    textWeight,
    padding,
    borderRadius,
    hidden,
    colors,
  ].join(" ");
  return <p className={classes}>{content}</p>;
};

BlockNotification.propTypes = {
  content: PropTypes.string,
  typeNotification: PropTypes.string,
  textAlign: PropTypes.string,
  textSize: PropTypes.string,
  textWeight: PropTypes.string,
  padding: PropTypes.string,
  borderRadius: PropTypes.string,
  hidden: PropTypes.string,
};

export default BlockNotification;
