import React from "react"

import cn from "classnames"

import Heading from "../Heading"
import Loader from "../Loader"
import styles from "./Button.module.scss"

export type ButtonProps = {
  children: React.ReactNode
  isPrimary?: boolean
  loading?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  isPrimary,
  loading,
  ...props
}: ButtonProps) => {
  const isDisabled = loading || props.disabled

  return (
    <button
      className={cn(styles.btn, { [styles.btn_primary]: isPrimary }, className)}
      {...props}
      disabled={isDisabled}
    >
      {loading && <Loader size="s" />}
      <Heading view="button">{children}</Heading>
    </button>
  )
}

export default Button
