import useQuoter from "../../../hooks/useQuoter";
import { Paragraph } from "../../UI/base";
import LogoutSvg from "./LogoutSvg";

export const UserMenu = () => {
  const { informacionPersonal, showUserMenu } = useQuoter();
  const { nombres, primer_apellido, segundo_apellido, email } =
    informacionPersonal;
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
