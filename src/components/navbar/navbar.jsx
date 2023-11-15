import React, { useState, Fragment, useContext } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import logo from "../../assets/img/logoText.png";
import Link from "next/link";
import Image from "next/image";
import { ContextUser } from "../../context/context";

import {RxHamburgerMenu} from "react-icons/rx"
import {BiPieChartAlt, BiSolidFlorist, BiBasket, } from "react-icons/bi"
import {GrClose} from "react-icons/gr"
import {BsChevronDown, BsFillTelephoneFill, BsFlower1, BsGift} from "react-icons/bs"
import { MdShoppingCart } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import {IoIosRose} from "react-icons/io";

const products = [
  {
    name: "Mixtos",
    description: "Combina tus flores preferidas",
    href: "/category",
    icon: BiSolidFlorist,
  },
  {
    name: "Canasta",
    description: "Otra forma de presentación",
    href: "/category",
    icon: BiBasket,
  },
  {
    name: "Girasoles",
    description: "Simbolizan alegría, admiración y lealtad",
    href: "/category",
    icon: BsFlower1,
  },
  {
    name: "Detalles",
    description: "Sorprende a esa persona especial",
    href: "/category",
    icon: BsGift,
  },
  {
    name: "Rosas",
    description: "Simbolo de amor, amistad y pasión",
    href: "/category",
    icon: IoIosRose,
  },
];


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {user} = useContext(ContextUser);

  return (
    <header>
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Haru</span>
            <Image className="h-12 w-auto" src={logo} alt=""></Image>
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}>
            <span className="sr-only">Open main menu</span>
            <RxHamburgerMenu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <Link
            href={"/"}
            className="text-lg font-semibold leading-6 text-primary">
            Inicio
          </Link>
          <Link
            href={"/services"}
            className="text-lg font-semibold leading-6 text-primary">
            Servicios
          </Link>
          <Link
            href={"/gallery"}
            className="text-lg font-semibold leading-6 text-primary">
            Galería
          </Link>
          <Link
            href={"/quote"}
            className="text-lg font-semibold leading-6 text-primary">
            Cotizaciones
          </Link>
          <Popover className="relative">
            <Popover.Button className="flex items-center gap-x-1 text-lg font-semibold leading-6 text-primary">
              Categorias
              <BsChevronDown
                className="h-5 w-5 flex-none text-primary"
                aria-hidden="true"
              />
            </Popover.Button>

            <Transition
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1">
              <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  {products.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
                      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <item.icon
                          className="h-6 w-6 text-gray-600 group-hover:text-secondary"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="flex-auto">
                        <a
                          href={item.href}
                          className="block font-semibold text-gray-900">
                          {item.name}
                          <span className="absolute inset-0" />
                        </a>
                        <p className="mt-1 text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

              </Popover.Panel>
            </Transition>
          </Popover>
          <Link
            href={"/about-us"}
            className="text-lg font-semibold leading-6 text-primary">
            Sobre Haru
          </Link>
        </Popover.Group>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-[10px]">
          <Link
            href="/cart"
            className="text-lg font-semibold leading-6 text-gray-900">
            <MdShoppingCart className="text-primary" size={35}></MdShoppingCart>
          </Link>
          {
            (user != null || user != undefined) ? <FaUserCircle size={30} className="text-primary"></FaUserCircle> :  <Link
            className="bg-primary py-[5px] px-[15px] text-white rounded-lg"
            href={"/login"}>
            Inicia Sesión
          </Link> 
          }
          
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Haru</span>
              <Image className="h-12 w-auto" src={logo} alt=""></Image>
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}>
              <span className="sr-only">Close menu</span>
              <GrClose className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                        Categorias
                        <BsChevronDown
                          className={classNames(
                            open ? "rotate-180" : "",
                            "h-5 w-5 flex-none"
                          )}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 space-y-2">
                        {[...products, ...callsToAction].map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <Link
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                  Features
                </Link>
                <Link
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                  Servicios
                </Link>
                <Link
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                  Company
                </Link>
              </div>
              <div className="py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-primary hover:bg-gray-50">
                  Log in
                </a>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
      <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
    </header>
  );
}
