import React from "react"

import classNames from "classnames"

import styles from "./Loader.module.scss"

export type LoaderProps = {
  size?: "s" | "m" | "l"
  className?: string
}

const Loader: React.FC<LoaderProps> = ({ size, className }) => {
  return (
    <div
      className={classNames(className, styles.loader, {
        [styles.loader_s]: size == "s",
        [styles.loader_m]: size == "m",
        [styles.loader_l]: size == "l",
      })}
    ></div>
  )
}

export default Loader
