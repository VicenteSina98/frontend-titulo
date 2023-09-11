import PropTypes from "prop-types";
import Logo from "../../img/logo.png";

const Prediction = ({ data }) => {
  console.log(data);
  return (
    <div className="flex items-start gap-2 border-b-2 border-b-neutral-600 p-2">
      <img src={Logo} alt="logo" className="w-8 rounded-full" />
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-left text-sm dark:text-white">
            Basándome en los antecedentes médicos y los síntomas presentados,
            las cinco patologías con mayor probabilidad de que pueda padecer
            son:
          </p>
          {data.posibles_enfermedades?.map((enfermedad, index) => (
            <p className="text-left text-sm dark:text-white" key={index}>
              {enfermedad}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

Prediction.propTypes = {
  data: PropTypes.object,
};

export default Prediction;
