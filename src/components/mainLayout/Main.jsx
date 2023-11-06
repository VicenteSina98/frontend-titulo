import PropTypes from "prop-types";

const Main = ({ children }) => (
  <main className="h-screen overflow-hidden bg-white p-4 dark:bg-neutral-800 lg:ml-64">
    <div className="mt-10 h-full px-8 pb-10 pt-4">{children}</div>
  </main>
);

Main.propTypes = { children: PropTypes.object };

export default Main;
