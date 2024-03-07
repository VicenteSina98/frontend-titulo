import PropTypes from "prop-types";

const Option = ({
  content,
  onClickFn,
  check,
  countCheck,
  index,
  multipleOptionsSelected,
  text = "text-sm",
  display = "flex justify-center items-center",
  width = "w-full",
  height = "h-full md:h-10",
  border = "border",
  borderRadius = "rounded",
  padding = "p-1",
  transition = "transition",
  selectedBorderColor = "border-cyan-700",
  selectedBackgroundColor = "bg-cyan-700",
  selectedTextColor = "text-white",
  selectedShadow = "shadow-md",
  notSelectedBorderColor = "border-neutral-700 dark:border-neutral-300",
  notSelectedBackgroundColor = "bg-transparent",
  notSelectedTextColor = "text-neutral-700 dark:text-neutral-300",
  notSelectedShadow = "shadow-none",
}) => {
  const baseClasses = [
    text,
    display,
    width,
    height,
    border,
    borderRadius,
    padding,
    transition,
  ].join(" ");
  const selectedClasses = [
    selectedBorderColor,
    selectedBackgroundColor,
    selectedTextColor,
    selectedShadow,
  ].join(" ");
  const notSelectedClasses = [
    notSelectedBorderColor,
    notSelectedBackgroundColor,
    notSelectedTextColor,
    notSelectedShadow,
  ].join(" ");
  return (
    <div
      className={
        baseClasses +
        " " +
        (check[index][content] ? selectedClasses : notSelectedClasses) +
        " " +
        ((content !== "Ninguno" && check[index]["Ninguno"]) ||
        (content === "Ninguno" &&
          multipleOptionsSelected(check, index) &&
          !check[index][content]) ||
        ((index === 6 || index === 7) &&
          countCheck === 1 &&
          !check[index][content])
          ? "hover:cursor-not-allowed"
          : "hover:cursor-pointer")
      }
      onClick={onClickFn}
    >
      {content}
    </div>
  );
};

Option.propTypes = {
  content: PropTypes.string,
  onClickFn: PropTypes.func,
  check: PropTypes.object,
  countCheck: PropTypes.string,
  index: PropTypes.number,
  multipleOptionsSelected: PropTypes.func,
  text: PropTypes.string,
  display: PropTypes.string,
  width: PropTypes.string,
  border: PropTypes.string,
  borderRadius: PropTypes.string,
  padding: PropTypes.string,
  transition: PropTypes.string,
  selectedBorderColor: PropTypes.string,
  selectedBackgroundColor: PropTypes.string,
  selectedTextColor: PropTypes.string,
  selectedShadow: PropTypes.string,
  notSelectedBorderColor: PropTypes.string,
  notSelectedBackgroundColor: PropTypes.string,
  notSelectedTextColor: PropTypes.string,
  notSelectedShadow: PropTypes.string,
  height: PropTypes.string,
};

export default Option;
