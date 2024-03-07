// librerias
import PropTypes from "prop-types";
// componentes
import { Img, Title, Subtitle } from "../../UI/base";
import Logo from "../../../img/logo.png";

export const Header = ({ content }) => {
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
