// librerias
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
// componentes
import { Subtitle } from "../UI/base";
import OjoImg from "../../img/ojo.png";
import { PrimaryButton } from "../UI/buttons";

const PredictionCard = ({ id, name }) => {
  const navigate = useNavigate();
  const goTo = (navTo) => {
    navigate(navTo);
  };
  return (
    <div className="flex w-full flex-col items-center justify-between gap-6 rounded-xl bg-slate-200 px-4 py-4 shadow-md dark:bg-neutral-700 dark:shadow-lg">
      <Subtitle content={name} />
      <div className="flex flex-row gap-6">
        <PrimaryButton
          valueButton="Ver chat"
          src={OjoImg}
          alt="Icono Ojo"
          display="flex items-center justify-center gap-3"
          onClickFn={goTo}
          onClickParams={[`/home/prediction?pred=${id}`]}
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
