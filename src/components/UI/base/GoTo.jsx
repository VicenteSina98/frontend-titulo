import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const GoTo = ({
  content,
  toPath,
  textColor = "text-blue-600",
  underline = "underline",
  transition = 'transition',
  hover = "hover:cursor-pointer hover:text-blue-800",
  dark = "dark:text-blue-400 dark:hover:text-blue-300",
}) => {
  const classes = [textColor, underline, transition, hover, dark].join(" ");
  return (
    <Link to={toPath} className={classes}>
      {content}
    </Link>
  );
};

GoTo.propTypes = {
  content: PropTypes.string,
  toPath: PropTypes.string,
  textColor: PropTypes.string,
  underline: PropTypes.string,
  transition: PropTypes.string,
  hover: PropTypes.string,
  dark: PropTypes.string,
};

export default GoTo;
