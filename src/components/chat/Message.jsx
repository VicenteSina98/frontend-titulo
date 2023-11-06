import PropTypes from "prop-types";
import { Paragraph } from "../UI/base";

const Message = ({ data, isIA }) => {
  const predictionResponse = data?.split("\n").filter((d) => d !== "");
  const msgContainerStyles = "flex flex-col  gap-2 break-words";
  return (
    <>
      <div
        className={
          msgContainerStyles + (isIA || data == undefined ? " hidden" : "")
        }
      >
        <Paragraph
          content={data}
          textAlign="text-left"
          padding="px-4 py-2"
          width="max-w-max"
          backgroundColor="bg-slate-200 dark:bg-slate-600"
          borderRadius="rounded-md"
          shadow="shadow dark:shadow-md"
        />
      </div>
      <div className={msgContainerStyles + (!isIA ? " hidden" : "")}>
        {predictionResponse?.length > 0 ? (
          <Paragraph
            content={predictionResponse}
            textAlign="text-left"
            padding="px-4 py-2"
            width="max-w-max"
            backgroundColor="bg-slate-300 dark:bg-slate-700"
            borderRadius="rounded-md"
            shadow="shadow-md dark:shadow-lg"
          />
        ) : (
          <Paragraph
            content={data}
            textAlign="text-left"
            padding="px-4 py-2"
            width="max-w-max"
            backgroundColor="bg-slate-300 dark:bg-slate-700"
            borderRadius="rounded-md"
            shadow="shadow-md dark:shadow-lg"
          />
        )}
      </div>
    </>
  );
};

Message.propTypes = {
  data: PropTypes.string,
  isIA: PropTypes.bool,
};

export default Message;
