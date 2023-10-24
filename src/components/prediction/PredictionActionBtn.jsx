import PropTypes from "prop-types";
import useQuoter from "../../hooks/useQuoter";

const PredictionActionBtn = ({
  bgColor,
  bgColorDark,
  borderColor,
  borderColorDark,
  imgSrc,
  imgSrcDark = null,
  imgAlt,
  onClickFn,
  onClickParams = [],
  content = "",
}) => {
  const { isDark } = useQuoter();
  const srcDark = imgSrcDark ? imgSrcDark : imgSrc;
  return (
    <button
      className={`${bgColor} ${bgColorDark} w-max-max h-max-max flex flex-col items-center justify-center gap-3 rounded-md border px-4 py-2 font-bold text-white sm:flex-row ${borderColor} ${borderColorDark}`}
      onClick={() => onClickFn(...onClickParams)}
    >
      <img
        src={isDark ? srcDark : imgSrc}
        alt={imgAlt}
        className="w-8 md:w-6"
      />
      {content.length === 0 ? null : <p>{content}</p>}
    </button>
  );
};

PredictionActionBtn.propTypes = {
  bgColor: PropTypes.string,
  bgColorDark: PropTypes.string,
  borderColor: PropTypes.string,
  borderColorDark: PropTypes.string,
  imgSrc: PropTypes.any,
  imgSrcDark: PropTypes.any,
  imgAlt: PropTypes.string,
  onClickFn: PropTypes.func,
  onClickParams: PropTypes.array,
  content: PropTypes.string,
};

export default PredictionActionBtn;
