import React from "react"

import Heading from "components/ui/Heading"

import styles from "./ErrorMessage.module.scss"

interface ErrorProps {
  errorMess: string | undefined
}

const ErrorMessage: React.FC<ErrorProps> = ({ errorMess }) => {
  if (!errorMess) return null

  return (
    <Heading tag="p" weight="bold" className={styles.error}>
      {errorMess}
    </Heading>
  )
}

export default React.memo(ErrorMessage)
