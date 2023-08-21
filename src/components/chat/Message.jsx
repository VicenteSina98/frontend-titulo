import PropTypes from "prop-types";
import Logo from "../../img/logo.png";
import useQuoter from "../../hooks/useQuoter";

const Message = ({ data, isIA }) => {
  const { isDark } = useQuoter();
  return isIA ? (
    <div className="flex items-start">
      <div className="flex items-center gap-2 p-2">
        <img
          src={Logo}
          alt="logo"
          className="w-6 rounded-full md:w-8 lg:w-10"
        />
        <p className="md:text-md text-left text-sm dark:text-white lg:text-lg">
          {data}
        </p>
      </div>
    </div>
  ) : (
    <div className="flex flex-row-reverse items-end">
      <div className="flex flex-row-reverse items-center gap-2 p-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-user-circle w-6 md:w-8 lg:w-10"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke={isDark ? "#fff" : "#0a0a0a"}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
          <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
          <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
        </svg>
        <p className="md:text-md text-right text-sm dark:text-white lg:text-lg">
          {data}
        </p>
      </div>
    </div>
  );
};

Message.propTypes = {
  data: PropTypes.string,
  isIA: PropTypes.bool,
};

export default Message;
