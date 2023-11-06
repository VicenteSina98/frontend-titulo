import PropTypes from "prop-types";

export const MultiselectItem = ({ content }) => {
  const classes = [
    "text-xs",
    "text-black",
    "bg-neutral-200",
    "rounded-sm",
    "px-2 py-1",
    "dark:bg-neutral-700 dark:text-neutral-200",
  ].join(" ");
  return <button className={classes}>✅ {content}</button>;
};

MultiselectItem.propTypes = {
  content: PropTypes.string,
};

export default MultiselectItem;
