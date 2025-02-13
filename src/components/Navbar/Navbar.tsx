import React, { useState } from "react";
import Menu from "../../../public/menu2.png";
import Image from "next/image";
import Logo from "../../../public/airLogo.png";
import AboutModal from "./AboutModal";
import UpdatesModal from "./UpdatesModal";


interface NavBarProps {
  //types
}

const Navbar: React.FC<NavBarProps> = () => {
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);

  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="bg-transparent absolute w-full z-30 shadow-[rgba(0, 0, 0, 0.4)_0px_1px_10px]">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 z-10 relative">
          <a href="#" className="flex items-center">
            <Image
              src={Logo}
              width={30}
              height={30}
              className="h-10 mr-3 w-10"
              alt="logo"
            />
            <span className="hidden md:block self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              AIR JORDAN
            </span>
          </a>
          <button
            onClick={handleMenuToggle}
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open Main Menu</span>
            <Image src={Menu} width={30} alt="Burger Menu Icon" />
          </button>
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } w-full md:block md:w-auto 2xl:flex 2xl:p-2`}
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border md:flex-row md:space-x-8 md:mt-0 md:border-0 mr-20">
              <li>
                <p className="text-white">
                  <a
                    href="https://github.com/mutaremalcolm/air_jordan"
                  >
                    Project Code
                  </a>
                </p>
              </li>
              <li>
                <AboutModal />
              </li>
              <li>
                <UpdatesModal />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
