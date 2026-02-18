import { Link } from "react-router"

import { ROUTES } from "constants/routes"

import Heading from "components/ui/Heading"

import styles from "./Footer.module.scss"

const Footer = () => {
  const year =
    new Date().getFullYear() === 2026
      ? "2026"
      : `2026 - ${new Date().getFullYear()}`

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <Heading view="paragraph" weight="medium" color="secondary">
          © Lalasia {year}
        </Heading>
        <nav className={styles.footer__navigate}>
          <Link to={ROUTES.products.create()}>Go to products</Link>
          <Link to={ROUTES.categories.create()}>Go to categories</Link>
          <Link
            to="https://github.com/nais2008/e-commerce-project-kts"
            target="_blank"
          >
            Check code
          </Link>
        </nav>
      </div>
    </footer>
  )
}

export default Footer
