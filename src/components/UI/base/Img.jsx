import PropTypes from "prop-types";

export const Img = ({
  srcImg,
  altImg,
  height = "h-auto",
  width = "w-12",
  rounded = "rounded-full",
}) => {
  const classes = [height, width, rounded].join(" ");
  return <img src={srcImg} alt={altImg} className={classes} />;
};

Img.propTypes = {
  srcImg: PropTypes.string,
  altImg: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
  rounded: PropTypes.string,
};

export default Img;
