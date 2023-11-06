import PropTypes from "prop-types";

export const FieldContainer = ({ children }) => {
  const classes = ["flex", "flex-col", "gap-1"].join(" ");
  return <div className={classes}>{children}</div>;
};

FieldContainer.propTypes = {
  children: PropTypes.any,
};

export default FieldContainer;
