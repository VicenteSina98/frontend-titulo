import PropTypes from "prop-types";
import Logo from "../../img/logo.png";

const Prediction = ({ data }) => (
  <div className="flex items-start gap-2 border-b-2 border-b-neutral-600 p-2">
    <img src={Logo} alt="logo" className="w-8 rounded-full" />
    <div className="flex flex-col gap-4">
      {/* enfermedades */}
      <div className="flex flex-col gap-2">
        <p className="text-left text-sm dark:text-white font-bold">
          5 enfermedades que, probablemente, puedes tener:
        </p>
        {data.posibles_enfermedades?.map((enfermedad, index) => (
          <p className="text-left text-sm dark:text-white" key={index}>
            {enfermedad}
          </p>
        ))}
      </div>
      {/* profesionales */}
      <div className="flex flex-col gap-2">
        <p className="text-left text-sm dark:text-white font-bold">
          Además, puedes recurrir a los siguientes profesionales:
        </p>
        {data.posibles_profesionales?.map((profesional, index) => (
          <p className="text-left text-sm dark:text-white" key={index}>
            {profesional}
          </p>
        ))}
      </div>
    </div>
  </div>
);

Prediction.propTypes = {
  data: PropTypes.object,
};

export default Prediction;
