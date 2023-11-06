import PropTypes from "prop-types";
import Option from "./Option";
import { OPTIONS_ARRAY } from "../../helpers/constants";
import { useEffect } from "react";
import useQuoter from "../../hooks/useQuoter";

const OptionsContainer = ({
  check,
  index,
  handleOptionSelect,
  multipleOptionsSelected,
  display = "grid items-center justify-center gap-4",
  width = "w-full",
  textAlign = "text-center",
  textSize = "text-base",
}) => {
  const { setFinish } = useQuoter();
  const classes = [display, width, textAlign, textSize].join(" ");
  useEffect(() => {
    if (index === 17) setFinish(true);
  }, [index]);
  return index === 17 ? null : (
    <div
      className={
        classes +
        (OPTIONS_ARRAY[index]?.length === 2 ? " grid-cols-2 " : "") +
        (OPTIONS_ARRAY[index]?.length === 3
          ? " grid-cols-2 sm:grid-cols-3 "
          : "") +
        (OPTIONS_ARRAY[index]?.length === 4
          ? " grid-cols-2 sm:grid-cols-4 "
          : "") +
        (OPTIONS_ARRAY[index]?.length === 5
          ? " grid-cols-2 sm:grid-cols-5 "
          : "") +
        (OPTIONS_ARRAY[index]?.length === 6
          ? " grid-cols-2 sm:grid-cols-3 "
          : "") +
        (OPTIONS_ARRAY[index]?.length === 7
          ? " grid-cols-2 sm:grid-cols-4 md:grid-cols-7 "
          : "") +
        (OPTIONS_ARRAY[index]?.length === 8
          ? " grid-cols-2 sm:grid-cols-4 "
          : "") +
        (OPTIONS_ARRAY[index]?.length === 9
          ? " grid-cols-2 sm:grid-cols-3"
          : "")
      }
    >
      {OPTIONS_ARRAY[index]?.map((option, i) => (
        <Option
          key={i}
          content={option}
          onClickFn={handleOptionSelect}
          check={check}
          index={index}
          multipleOptionsSelected={multipleOptionsSelected}
        />
      ))}
    </div>
  );
};

OptionsContainer.propTypes = {
  check: PropTypes.object,
  index: PropTypes.number,
  handleOptionSelect: PropTypes.func,
  multipleOptionsSelected: PropTypes.func,
  display: PropTypes.string,
  width: PropTypes.string,
  textAlign: PropTypes.string,
  textSize: PropTypes.string,
};

export default OptionsContainer;
