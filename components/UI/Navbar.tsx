import { useAtom } from "jotai";
import { darkModeAtom } from "../../utils/states";
import Link from "next/link";

export default function Navbar() {
  const [darkMode, setDarkMode] = useAtom(darkModeAtom);
  return (
    <nav className="navigation">
      <div className="nav-items">
        <h1 className="website-title">
          <Link href="/" style={{ textDecoration: "none", color: "unset" }}>
            Where in the World?
          </Link>
        </h1>
        <button className="theme-button" onClick={() => setDarkMode(!darkMode)}>
          Dark Mode
        </button>
      </div>
    </nav>
  );
}
