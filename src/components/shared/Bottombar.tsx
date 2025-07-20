import { sidebarLinks } from '@/constants';
//import type { INavLink } from '@/types';
//import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Bottombar = () => {
  const { pathname } = useLocation();

  return (
    <section className="bottom-bar md:hidden">
      {sidebarLinks.map((link) => {
        const isActive = pathname === link.route;

        return (
          <Link
            to={link.route}
            key={link.label}
            className={`group flex-center flex-col gap-1 p-2 transition ${isActive ? 'bg-purple-500 rounded-[10px]' : ''
              }`}
          >
            <img
              src={link.imgURL}
              alt={link.label}
              className={`w-6 h-6 ${isActive ? 'invert-white' : ''} group-hover:invert-white`}
            />
            <p className="tiny-medium text-lime-100">{link.label}</p>
          </Link>
        );
      })}
    </section>
  );
};

export default Bottombar;
