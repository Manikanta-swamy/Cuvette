// src/components/sidebar/Sidebar.js
import { AiFillHome } from "react-icons/ai";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-16 p-6 border-r">
      <ul className="flex flex-col space-y-4">
        <li>
          <Link to="/dashboard" className="flex items-center">
            <AiFillHome size={30}/>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
