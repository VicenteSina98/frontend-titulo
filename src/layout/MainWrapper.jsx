import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { setUser } from "../helpers/auth";

const MainWrapper = ({ children }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const handler = async () => {
      setLoading(true);
      await setUser();
      setLoading(false);
    };
    handler();
  }, []);

  return <>{loading ? null : children}</>;
};

MainWrapper.propTypes = {
  children: PropTypes.any,
};

export default MainWrapper;
