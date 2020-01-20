import React from "react";
import { NavLink}  from "react-router-dom";
import style from './header.module.scss';
import {MdCreate , MdFormatListBulleted} from 'react-icons/md';

export default function App() {
  return (
    <nav className={style.headerNav}>
            <NavLink to="/"><MdFormatListBulleted/> Forms list</NavLink >
            <NavLink to="/createForm"><MdCreate/> Create Form</NavLink >
    </nav>
  );
}
