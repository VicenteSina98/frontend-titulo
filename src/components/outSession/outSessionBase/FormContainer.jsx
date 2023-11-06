import PropTypes from "prop-types";

export const FormContainer = ({ children }) => {
  const classes = [
    "w-full",
    "px-8 py-4",
    "flex",
    "flex-col",
    "gap-6",
    "justify-center",
    "items-center",
    "xl:px-7",
    "2xl:px-24",
  ].join(" ");
  return <div className={classes}>{children}</div>;
};

FormContainer.propTypes = {
  children: PropTypes.any,
};

export default FormContainer;
