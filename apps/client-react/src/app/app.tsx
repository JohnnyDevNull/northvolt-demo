// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';

import { Route, Routes, NavLink } from 'react-router-dom';
import ServerHello from './pages/server-hello/server-hello';
import Todo from './pages/todo/todo';

const handleLinkActiveClassName = ({isActive}: { isActive: boolean }): string => isActive ? 'active' : '';

export default function App() {
  return (
    <div>
      <div className="menu-container" role="navigation">
        <ul className="main-menu">
          <li>
            <NavLink to="/server-hello" className={handleLinkActiveClassName}>Server-Hello</NavLink>
          </li>
          <li>
            <NavLink to="/todo" className={handleLinkActiveClassName}>Todo</NavLink>
          </li>
        </ul>
      </div>
      <Routes>
        <Route path="/" element={<ServerHello />} />
        <Route path="/server-hello" element={<ServerHello />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </div>
  );
}
