import React from "react"

import { Handbag, UserRound } from "lucide-react"

import Logo from "components/ui/Logo"
import Menu from "components/ui/Menu"
import ThemeSwitcher from "components/ui/ThemeSwitcher"

import s from "./Header.module.scss"
import { HEADER_ITEMS } from "./header.data"

const Header: React.FC = () => {
  return (
    <header className={s.header}>
      <div className={s.header__container}>
        <Logo withTitle className={s.header__logo} />
        <Menu className={s.header__navigation} items={HEADER_ITEMS} />
        <div className={s.header__right}>
          <ThemeSwitcher />
          <div className={s.header__icons}>
            <Handbag size={30} />
            <UserRound size={30} />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
