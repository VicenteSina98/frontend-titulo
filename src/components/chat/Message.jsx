import PropTypes from "prop-types";
import { Paragraph } from "../UI/base";

const Message = ({ data, isIA }) => {
  const borderRadius = "rounded-md";
  const bgIa = "bg-neutral-200 dark:bg-neutral-700";
  const bgUser = "bg-neutral-100 dark:bg-neutral-600";
  const baseClasses = ["w-full", "flex", "gap-2", "break-words"].join(" ");
  const isIaClasses = [baseClasses, "flex-col"].join(" ");
  const isUserClasses = [baseClasses, "justify-end"].join(" ");
  const isPredictionClasses = [isIaClasses, borderRadius].join(" ");
  return isIA ? (
    data?.includes("\n") ? (
      <div className={isPredictionClasses}>
        <Paragraph
          content={data?.split("\n").filter((d) => d !== "")}
          textAlign="text-left"
          textSize="text-sm"
          padding="px-4 py-2"
          //width="max-w-max"
          backgroundColor={bgIa}
          shadow="shadow-md dark:shadow-lg"
        />
      </div>
    ) : (
      <div className={isIaClasses}>
        <Paragraph
          content={data}
          textAlign="text-left"
          textSize="text-sm"
          padding="px-4 py-2"
          width="max-w-max"
          backgroundColor={bgIa}
          borderRadius={borderRadius}
          shadow="shadow-md dark:shadow-lg"
        />
      </div>
    )
  ) : (
    <div className={isUserClasses}>
      <Paragraph
        content={data}
        textAlign="text-left"
        textSize="text-sm"
        padding="px-4 py-2"
        width="max-w-max"
        backgroundColor={bgUser}
        borderRadius={borderRadius}
        shadow="shadow-md dark:shadow-lg"
        hidden={!data ? "hidden" : ""}
      />
    </div>
  );
};

Message.propTypes = {
  data: PropTypes.string,
  isIA: PropTypes.bool,
};

export default Message;
