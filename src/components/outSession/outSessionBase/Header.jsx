// librerias
import PropTypes from "prop-types";
// componentes
import Img from "../../UI/base/Img";
import Title from "../../UI/base/Title";
import Subtitle from "../../UI/base/Subtitle";
import Logo from "../../../img/Logo.png";

const Header = ({ content }) => {
  const headerClasses = [
    "bg-cyan-700",
    "shadow",
    "w-full",
    "px-4 py-2",
    "rounded-b-xl",
    "flex",
    "flex-col",
    "gap-4",
    "dark:bg-cyan-900",
    "xl:rounded-b-none xl:rounded-r-xl xl:items-center xl:justify-center xl:h-full xl:w-1/2",
  ].join(" ");
  return (
    <header className={headerClasses}>
      <div className="flex items-center justify-center gap-4">
        <Img srcImg={Logo} altImg="logo" />
        <Title content="HealthDiagAI" textColor="text-white" />
      </div>
      <Subtitle content={content} textColor="text-white" />
    </header>
  );
};

Header.propTypes = {
  content: PropTypes.string,
};

export default Header;
