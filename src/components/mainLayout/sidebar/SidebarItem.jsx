import PropTypes from "prop-types";
import ChatSvg from "./ChatSvg";
import HistorialSvg from "./HistorialSvg";
import { Paragraph } from "../../UI/base";

const SidebarItem = ({ pathTo, content }) => {
  return (
    <li>
      <a
        href={pathTo}
        className="group flex items-center gap-3 rounded-lg px-4 py-2 transition hover:bg-slate-200 dark:hover:bg-neutral-600"
      >
        {content === "Chat" ? <ChatSvg /> : null}
        {content === "Historial" ? <HistorialSvg /> : null}
        <Paragraph
          content={content}
          textColor="text-slate-700"
          textAlign="text-left"
          dark="dark:text-neutral-100"
        />
      </a>
    </li>
  );
};

SidebarItem.propTypes = {
  pathTo: PropTypes.string,
  content: PropTypes.string,
};

export default SidebarItem;
