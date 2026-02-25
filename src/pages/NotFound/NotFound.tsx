import React from "react"
import { Link } from "react-router"

import { ROUTES } from "constants/routes"
import { ArrowLeft } from "lucide-react"

import Layout from "components/layout/Layout"
import Heading from "components/ui/Heading"

import s from "./NotFound.module.scss"

const NotFound: React.FC = () => {
  return (
    <Layout>
      <div className={s.notFound}>
        <Heading tag="h1" view="title" className={s.notFound__title}>
          404 :(
        </Heading>
        <Heading view="subtitle">
          This page doesn`t exist. Or maybe it moved.
        </Heading>
        <Link to={ROUTES.main.create()} className={s.notFound__link}>
          <ArrowLeft size={20} /> Back to home
        </Link>
      </div>
    </Layout>
  )
}

export default NotFound
