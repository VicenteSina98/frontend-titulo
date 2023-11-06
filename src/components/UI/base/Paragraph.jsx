import PropTypes from "prop-types";

export const Paragraph = ({
  content,
  role = "none",
  textColor = "text-black",
  textAlign = "text-center",
  textSize = "text-sm sm:text-base",
  textWeight = "font-normal",
  padding = "p-0",
  width = "w-full",
  borderRadius = "rounded-0",
  backgroundColor = "bg-transparent",
  shadow = "shadow-none",
  dark = "dark:text-white",
  hidden = "",
}) => {
  const classes = [
    textColor,
    textAlign,
    textSize,
    textWeight,
    padding,
    width,
    borderRadius,
    backgroundColor,
    shadow,
    dark,
    hidden,
  ].join(" ");
  return (
    <p className={classes} role={role}>
      {content}
    </p>
  );
};

Paragraph.propTypes = {
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  role: PropTypes.string,
  textColor: PropTypes.string,
  textAlign: PropTypes.string,
  textSize: PropTypes.string,
  textWeight: PropTypes.string,
  padding: PropTypes.string,
  width: PropTypes.string,
  borderRadius: PropTypes.string,
  backgroundColor: PropTypes.string,
  shadow: PropTypes.string,
  dark: PropTypes.string,
  hidden: PropTypes.string,
};

export default Paragraph;
