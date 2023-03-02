import { useAtom } from "jotai";
import { darkModeAtom } from "../../utils/states";

export default function Navbar() {
  const [darkMode, setDarkMode] = useAtom(darkModeAtom);
  return (
    <nav className="navigation">
      <div className="nav-items">
        <h1 className="website-title">Where in the World?</h1>
        <button className="theme-button" onClick={() => setDarkMode(!darkMode)}>
          Dark Mode
        </button>
      </div>
    </nav>
  );
}
