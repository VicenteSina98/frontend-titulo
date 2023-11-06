import Logo from "../../../img/logo.png";
import { Link } from "react-router-dom";
import { Img, Title } from "../../UI/base";

const NavbarLogo = () => (
  <Link to="/" className="flex gap-2">
    <Img srcImg={Logo} altImg="HeatlhDiagAI Logo" height="h-8" width="w-auto" />
    <Title content="HealthDiagAI" textColor="text-white" />
  </Link>
);

export default NavbarLogo;
