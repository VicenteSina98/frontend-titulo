import PropTypes from "prop-types";

const Img = ({
  srcImg,
  altImg,
  width = "w-12",
  rounded = "rounded-full",
  responsive = "md:w-16",
}) => {
  const classes = [width, rounded, responsive].join(" ");
  return <img src={srcImg} alt={altImg} className={classes} />;
};

Img.propTypes = {
  srcImg: PropTypes.string,
  altImg: PropTypes.string,
  width: PropTypes.string,
  rounded: PropTypes.string,
  responsive: PropTypes.string,
};

export default Img;
