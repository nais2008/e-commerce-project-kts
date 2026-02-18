import { Link } from "react-router"

import classNames from "classnames"
import { ROUTES } from "constants/routes"

import Heading from "components/ui/Heading"

import styles from "./Logo.module.scss"

interface LogoProps {
  withTitle?: boolean
  className?: string
}

const Logo: React.FC<LogoProps> = ({
  withTitle = false,
  className,
}: LogoProps) => {
  return (
    <Link
      to={ROUTES.main.create()}
      className={classNames(styles.logo, className)}
    >
      <img
        src="/big-logo.png"
        width={42}
        height={42}
        alt="logo"
        className={styles.logo__img}
      />
      {withTitle && (
        <Heading view="subtitle" weight="medium">
          Lalasia
        </Heading>
      )}
    </Link>
  )
}

export default Logo
