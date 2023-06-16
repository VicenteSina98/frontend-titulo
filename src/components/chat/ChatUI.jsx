import Spinner from "../Spinner";
import Message from "./Message";
import useQuoter from "../../hooks/useQuoter";
import { useEffect } from "react";

const ChatUI = () => {
  const {
    spinner,
    questions,
    answers,
    setAnswer,
    setQuestions,
    questionsArray,
  } = useQuoter();
  useEffect(() => {
    if (
      answers.length > 0 &&
      !questions.includes(questionsArray[questions.length])
    ) {
      setAnswer("");
      setQuestions([...questions, questionsArray[questions.length]]);
    }
  }, [answers]);
  return !spinner ? (
    questions.map((question, index) => {
      return (
        <div key={index}>
          <Message data={question} isIA={true} />
          {index < answers.length ? (
            <Message data={answers[index]} isIA={false} />
          ) : null}
        </div>
      );
    })
  ) : (
    <Spinner />
  );
};

export default ChatUI;
