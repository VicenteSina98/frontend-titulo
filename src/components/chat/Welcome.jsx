import { Paragraph } from "../UI/base";
import { PrimaryButton } from "../UI/buttons";
import { BlockNotification } from "../UI/notifications";
import useQuoter from "../../hooks/useQuoter";

const Welcome = () => {
  const { setChatStarted, chatStarted } = useQuoter();
  const containerClasses = "flex h-full w-full flex-col justify-between";
  return (
    <div className={containerClasses + " " + (chatStarted ? "hidden" : "")}>
      <BlockNotification
        content="Recuerde que esto
    es solo una predicción utilizando inteligencia artificial, lo que no
    reemplaza el diagnóstico de un profesional de la salud."
        typeNotification="error"
        hidden=""
      />
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-2">
          <Paragraph
            content="Realice, mediante el uso de la Inteligencia Artificial, una predicción de
        posibles enfermedades que pueda tener según sus antecedentes médicos,
        síntomas y otros criterios."
          />
        </div>
        <PrimaryButton
          valueButton="Comenzar chat"
          onClickFn={setChatStarted}
          onClickParams={[!chatStarted]}
        />
      </div>
    </div>
  );
};

export default Welcome;
