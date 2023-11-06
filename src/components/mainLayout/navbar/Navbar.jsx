import OpenSidebarButton from "./OpenSidebarButton";
import NavbarLogo from "./NavbarLogo";
import OpenUserMenuButton from "./OpenUserMenuButton";
import UserMenu from "./UserMenu";

const Navbar = () => {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-neutral-200 bg-cyan-700 dark:border-neutral-600">
      <div className="relative w-full px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start gap-2">
            <OpenSidebarButton />
            <NavbarLogo />
          </div>
          <div className="flex items-center">
            <div className="flex items-center">
              <OpenUserMenuButton />
            </div>
          </div>
        </div>
        <UserMenu />
      </div>
    </nav>
  );
};

export default Navbar;
