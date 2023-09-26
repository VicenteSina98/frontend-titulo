import PropTypes from "prop-types";
import Logo from "../../img/logo.png";

const Prediction = ({ data }) => {
  return (
    <div className="mb-1 flex max-w-max flex-col gap-2 break-words rounded-md bg-slate-200 px-4 py-2 shadow-md dark:bg-neutral-700 dark:shadow-lg">
      <div className="flex items-center gap-2">
        <img src={Logo} alt="logo" className="w-8 rounded-full" />
        <p className="text-left text-sm dark:text-white sm:text-base">
          Basándome en los antecedentes médicos y los síntomas presentados, las
          cinco patologías con mayor probabilidad de que pueda padecer son:
        </p>
      </div>
      <div className="ml-10 flex flex-col gap-2">
        {data.map((enfermedad, index) => (
          <p
            className="text-left text-sm dark:text-white sm:text-base"
            key={index}
          >
            {enfermedad}
          </p>
        ))}
      </div>
    </div>
  );
};

Prediction.propTypes = {
  data: PropTypes.object,
};

export default Prediction;
