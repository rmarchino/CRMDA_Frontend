import { HiOutlineBell, HiOutlineChatAlt } from "react-icons/hi";
import { Menu, Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import classNames from "classnames";
import Avatar from "../../assets/avatar.png";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white h-16 px-4 shadow-lg flex justify-between items-center border-b border-gray-200 flex-wrap">
      <div className="relative">
        <h2 className="text-gray-700 text-lg uppercase">
          Coorporación DatAnalytics sac
        </h2>
      </div>
      <div className=" flex items-center gap-2 mr-2 cursor-pointer">
        {/** Messages **/}
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                className={classNames(
                  open && "bg-gray-100",
                  "p-1.5 rounded-sm inline-flex items-center text-orange-300 hover:text-opacity-100 focus:outline-none active:bg-gray-100"
                )}
              >
                <HiOutlineChatAlt fontSize={24} />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute right-0 z-0 mt-4 w-80">
                  <div className="bg-white rounded-sm shadow-md right-1 ring-black ring-opacity-5 px-2 py-2.5">
                    <strong className="text-gray-700 font-medium">
                      Mensajes
                    </strong>
                    <div className="mt-2 py-1 text-sm">
                      Este es mensaje del panel
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>

        {/** Notificactions **/}
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                className={classNames(
                  open && "bg-gray-100",
                  "p-1.5 rounded-sm inline-flex items-center text-orange-300 hover:text-opacity-100 focus:outline-none active:bg-gray-100"
                )}
              >
                <HiOutlineBell fontSize={24} />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute right-0 z-0 mt-4 w-80">
                  <div className="bg-white rounded-sm shadow-md right-1 ring-black ring-opacity-5 px-2 py-2.5">
                    <strong className="text-gray-700 font-medium">
                      Notificaciones
                    </strong>
                    <div className="mt-2 py-1 text-sm">
                      Este la notificación del panel
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
        {/** User menu */}
        <Menu as="div" className="relative">
          <div className="inline-flex">
            <Menu.Button className="ml-2 inline-flex rounded-full focus:outline-none focus:right-2 focus:ring-neutral-400">
              <span className="sr-only">Open user menu</span>
              <div className="h-10 w-10 rounded-full bg-sky-500 bg-cover bg-no-repeat bg-center">
                <img src={Avatar} alt="user" className="w-10 h-10" />
                <span className="sr-only">Rbober M.</span>
              </div>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="origin-top-right z-10 absolute right-0 mt-3 w-48 rounded-sm shadow-md p-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <div
                    className={classNames(
                      active && "bg-gray-100",
                      "text-gray-700 focus:bg-gray-200 cursor-pointer rounded-sm px-4 py-2"
                    )}
                    onClick={() => navigate("/profile")}
                  >
                    Perfil
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div
                    className={classNames(
                      active && "bg-gray-100",
                      "text-gray-700 focus:bg-gray-200 cursor-pointer rounded-sm px-4 py-2"
                    )}
                    onClick={() => navigate("/settings")}
                  >
                    Configuración
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div
                    className={classNames(
                      active && "bg-gray-100",
                      "text-gray-700 focus:bg-gray-200 cursor-pointer rounded-sm px-4 py-2"
                    )}
                    onClick={() => navigate("/layout")}
                  >
                    Layout
                  </div>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
};

export default Header;
