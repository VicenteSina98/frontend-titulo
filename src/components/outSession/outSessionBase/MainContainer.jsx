import PropTypes from "prop-types";

const MainContainer = ({ children }) => {
  const classes = [
    'bg-white',
    'h-full',
    'p-0',
    'overflow-hidden',
    'flex',
    'flex-col',
    'items-center',
    'justify-start',
    'gap-4',
    'dark:bg-neutral-800',
    'sm:rounded-xl sm:shadow-lg xl:flex-row xl:justify-center'
  ].join(' ')
  return (
    <div className={classes}>
      {children}
    </div>
  );
}

MainContainer.propTypes = {
  children: PropTypes.any,
};

export default MainContainer;
