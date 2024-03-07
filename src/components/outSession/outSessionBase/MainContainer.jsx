import PropTypes from "prop-types";

export const MainContainer = ({ children }) => {
  const classes = [
    "bg-white",
    "h-full",
    "w-full",
    "p-0",
    "overflow-y-auto",
    "flex",
    "flex-col",
    "items-center",
    "justify-start",
    "gap-4 sm:gap-1",
    "dark:bg-neutral-800",
    "sm:rounded-xl sm:shadow-lg",
  ].join(" ");
  return <div className={classes}>{children}</div>;
};

MainContainer.propTypes = {
  children: PropTypes.any,
};

export default MainContainer;
