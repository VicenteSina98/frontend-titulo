import useQuoter from "../../../hooks/useQuoter";
import { Paragraph } from "../../UI/base";
import LogoutSvg from "./LogoutSvg";
import { logout } from "../../../helpers/auth";
import {
  EMPTY_MEDICAL_DATA,
  EMPTY_PERSONAL_DATA,
  QUESTIONS_ARRAY,
} from "../../../helpers/constants";
import { useNavigate } from "react-router-dom";

export const UserMenu = () => {
  const {
    informacionPersonal,
    showUserMenu,
    setInformacionPersonal,
    setAntecedentesMedicos,
    setShowSidebar,
    setShowUserMenu,
    setChatStarted,
    setFinish,
    setAnswers,
    setError,
    setErrorMessage,
    setPrediction,
    setOk,
    setAnswer,
    setQuestions,
    setIndex,
  } = useQuoter();
  const { nombres, primer_apellido, segundo_apellido, email } =
    informacionPersonal;
  const cleanStates = async () => {
    setInformacionPersonal(EMPTY_PERSONAL_DATA);
    setAntecedentesMedicos(EMPTY_MEDICAL_DATA);
    setShowSidebar(false);
    setShowUserMenu(false);
    setChatStarted(false);
    setFinish(false);
    setAnswers([]);
    setError(false);
    setErrorMessage("");
    setPrediction([]);
    setOk(false);
    setAnswer("");
    setQuestions([QUESTIONS_ARRAY[0]]);
    setIndex(0);
  };
  const navigate = useNavigate();
  const handleLogout = async () => {
    await cleanStates();
    logout();
    navigate("/");
  };
  const fullname = [nombres, primer_apellido, segundo_apellido].join(" ");
  return (
    <div
      className={`absolute right-0 top-0 z-50 m-0 -translate-x-0 translate-y-14 divide-neutral-200 bg-white ${
        !showUserMenu ? "hidden" : ""
      } list-none divide-y rounded-md text-base shadow dark:divide-neutral-600 dark:bg-neutral-800`}
      id="dropdown-user"
      data-popper-placement="bottom"
    >
      <div className="px-4 py-2" role="none">
        <Paragraph
          content={fullname}
          textWeight="font-bold"
          textAlign="text-left"
        />
        <Paragraph content={email} textAlign="text-left" />
      </div>
      <ul className="p-2" role="none">
        <li>
          <button
            className="group flex w-full items-center gap-3 rounded px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-200 dark:text-neutral-100 dark:hover:bg-neutral-600"
            role="menuitem"
            onClick={() => handleLogout()}
          >
            <LogoutSvg />
            <span>Cerrar sesión</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;
