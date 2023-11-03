import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import PredictionActionBtn from "./PredictionActionBtn";
// import Subtitle from "../UI/Subtitle";
import OjoImg from "../../img/ojo.png";
// import PapeleraImg from "../../img/papelera-xmark.png";
// import PapeleraImgDark from "../../img/papelera-xmark-dark.png";

const PredictionCard = ({ id, name }) => {
  const navigate = useNavigate();
  const goTo = (navTo) => {
    navigate(navTo);
  };
  return (
    <div className="flex w-full flex-col items-center justify-center gap-6 rounded-xl bg-gray-200 px-4 py-4 shadow-md dark:bg-neutral-700 dark:shadow-lg md:flex-row md:justify-between lg:gap-1">
      {/* <Subtitle content={name} /> */}
      <div className="flex flex-row gap-6">
        {/* <PredictionActionBtn
          bgColor="text-transparent"
          borderColor="border-red-700"
          borderColorDark="dark:border-red-500"
          imgSrc={PapeleraImg}
          imgSrcDark={PapeleraImgDark}
          imgAlt="eliminar chat"
        /> */}
        <PredictionActionBtn
          bgColor="bg-cyan-700"
          bgColorDark="dark:bg-cyan-600"
          borderColor="border-cyan-700"
          borderColorDark="dark:border-cyan-600"
          imgSrc={OjoImg}
          imgAlt="ver chat"
          onClickFn={goTo}
          onClickParams={[`/home/prediction?pred=${id}`]}
          content="Ver chat"
        />
      </div>
    </div>
  );
};

PredictionCard.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
};

export default PredictionCard;
