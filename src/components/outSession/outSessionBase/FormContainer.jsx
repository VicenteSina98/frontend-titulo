import PropTypes from "prop-types";

export const FormContainer = ({ children }) => {
  const classes = [
    "w-full",
    "p-0",
    "flex",
    "flex-col",
    "gap-4",
    "justify-center",
    "items-center",
    "xl:px-16",
  ].join(" ");
  return <div className={classes}>{children}</div>;
};

FormContainer.propTypes = {
  children: PropTypes.any,
};

export default FormContainer;
