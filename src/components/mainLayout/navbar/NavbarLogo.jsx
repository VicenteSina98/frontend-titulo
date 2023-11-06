import Logo from "../../../img/logo.png";
import { Img, Title } from "../../UI/base";

const NavbarLogo = () => (
  <a href="/" className="flex gap-2">
    <Img srcImg={Logo} altImg="HeatlhDiagAI Logo" height="h-8" width="w-auto" />
    <Title content="HealthDiagAI" textColor="text-white" />
  </a>
);

export default NavbarLogo;
