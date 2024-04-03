import React from 'react';
import { NavLink } from 'react-router-dom';


interface NavItem {
    id: number;
    name: string;
    path: string;
  }

interface Props{
  query: string | null;
}

export const NavSearch = (props: Props) => {
    const activeNavLink = ({ isActive }: { isActive: boolean }) =>
    isActive ? "active" : "NavLink";
    const navBar: NavItem[] = [
        {
          id: 1,
          name: "Songs",
          path: "/songs/search?q=" + props.query,
        },
        {
          id: 2,
          name: "Albums",
          path: "/albums/search?q=" + props.query,
        },
        {
          id: 3,
          name: "Artists",
          path: "/artists/search?q=" + props.query,
        }
      ];
  return (
    <>
        <div className="nav-search">
            <ul className="flex font-semibold text-xl ">
              <li className='mx-5 py-8'>Result: {props.query} |</li>
              {navBar.map((list, i) => (
                <li className={`mx-5 py-8 ${activeNavLink}`} key={i}>
                  <NavLink to={list.path}>{list.name}</NavLink>
                </li>
              ))}
            </ul>
        </div>
    </>
  )
}
