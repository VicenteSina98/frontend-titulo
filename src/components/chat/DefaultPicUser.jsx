import PropTypes from "prop-types";
import useQuoter from "../../hooks/useQuoter";

const DefaultPicUser = ({ stroke = "" }) => {
  const { isDark } = useQuoter();
  const classes = "icon icon-tabler icon-tabler-user-circle w-8";
  return stroke ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke={stroke}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
      <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={classes}
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
  );
};

DefaultPicUser.propTypes = {
  stroke: PropTypes.string,
};

export default DefaultPicUser;
