import useQuoter from "../../../hooks/useQuoter";
import DefaultPicUser from "../../chat/DefaultPicUser";

const OpenUserMenuButton = () => {
  const { setShowUserMenu, showUserMenu } = useQuoter();
  return (
    <div>
      <button
        type="button"
        className="flex rounded-full bg-transparent text-sm"
        aria-expanded="false"
        data-dropdown-toggle="dropdown-user"
        onClick={() => setShowUserMenu(!showUserMenu)}
      >
        <span className="sr-only">Abrir Menú de Usuario</span>
        <DefaultPicUser stroke="#fff" />
      </button>
    </div>
  );
};

export default OpenUserMenuButton;
