import { Link } from 'react-router-dom';

export function NavBar() {
  return (
    <header className="bg-white bg-opacity-5 text-black shadow-lg hidden md:block">
      <div className="container mx-auto flex items-center h-24">
        <a href="#" className="flex items-center justify-center">
          <img
            className="h-16"
            src="https://i.ibb.co/6Yxs70d/2021-10-26-23h27-03.png"
            alt="Logo"
          />
          <span className="ml-4 uppercase font-black leading-tight">
            educar
            <br />
            tecnologia
          </span>
        </a>

        <nav className="contents font-semibold text-base lg:text-lg">
          <ul className="mx-auto flex items-center">
            <li className="p-5 xl:p-8">
              <Link to="/home" className="hover:text-blue-400 transition-colors">
                Home
              </Link>
            </li>
            <li className="p-5 xl:p-8">
              <Link to="/about" className="hover:text-blue-400 transition-colors">
                About
              </Link>
            </li>
            <li className="p-5 xl:p-8">
              <Link to="/suport" className="hover:text-blue-400 transition-colors">
                Support
              </Link>
            </li>
            <li className="p-5 xl:p-8">
              <Link to="/products" className="hover:text-blue-400 transition-colors">
                Services
              </Link>
            </li>
            <li className="p-5 xl:p-8">
              <Link to="/blog" className="hover:text-blue-400 transition-colors">
                Blog
              </Link>
            </li>
          </ul>
        </nav>

        <button className="rounded-full font-bold px-8 py-2 hover:bg-red-700 hover:text-white transition">
          Logout
        </button>
      </div>
    </header>
  );
}
