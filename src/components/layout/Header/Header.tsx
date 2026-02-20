import React from "react"

import { Handbag, UserRound } from "lucide-react"

import Logo from "components/ui/Logo"
import Menu from "components/ui/Menu"

import styles from "./Header.module.scss"
import { HEADER_ITEMS } from "./header.data"

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <Logo withTitle className={styles.header__logo} />
        <Menu className={styles.header__navigation} items={HEADER_ITEMS} />
        <div className={styles.header__icons}>
          <Handbag size={30} />
          <UserRound size={30} />
        </div>
      </div>
    </header>
  )
}

export default Header
