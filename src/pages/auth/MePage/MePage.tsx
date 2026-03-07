import React, { useEffect } from "react"
import { useNavigate } from "react-router"

import { ROUTES } from "constants/routes"
import { useAuthStore } from "hooks/globalStores"
import { Calendar, CheckCircle, Mail } from "lucide-react"
import { observer } from "mobx-react-lite"

import Heading from "components/ui/Heading"
import ProfileSkeleton from "components/ui/skeletons/ProfileSkeleton"

import { confirmLogout } from "utils/confirmLogout"
import { formatDate } from "utils/formatDate"

import s from "./MePage.module.scss"
import LeftBlock from "./components/LeftBlock"
import RightBlock from "./components/RightBlock"

const MePage: React.FC = observer(() => {
  const authStore = useAuthStore()
  const navigate = useNavigate()

  const handleLogoutClick = () => {
    confirmLogout(() => {
      authStore.logout()
      navigate(ROUTES.products.create())
    })
  }

  useEffect(() => {
    if (!authStore.jwt) {
      navigate(ROUTES.login.create())
    }
  }, [authStore.jwt, navigate])

  if (authStore.isLoading) {
    return (
      <main className={s.profile__center}>
        <ProfileSkeleton />
      </main>
    )
  }

  if (!authStore.user) {
    return null
  }

  return (
    <main className={s.profile__center}>
      <section className={s.profile}>
        <header className={s.profile__header}>
          <img
            src="/defaultAvatar.jpg"
            alt="Аватар пользователя"
            width={140}
            height={140}
            className={s.profile__avatar}
          />

          <div className={s.profile__userInfo}>
            <Heading view="paragraph" className={s.userInfo__item}>
              <Mail className={s.emailIcon} />
              <span>{authStore.user.email}</span>
            </Heading>

            <Heading
              view="paragraph"
              className={s.userInfo__item}
              color="secondary"
            >
              <Calendar className={s.calendarIcon} />
              <span>
                On the platform from {formatDate(authStore.user.createdAt)}
              </span>
            </Heading>
          </div>

          <div className={s.profile__isActive}>
            <CheckCircle className={s.statusIcon} size={16} />
            <span>{authStore.user.confirmed ? "Activated" : "Inactive"}</span>
          </div>
        </header>

        <div className={s.profile__main}>
          <LeftBlock user={authStore.user} />

          <RightBlock handlerLogout={handleLogoutClick} />
        </div>
      </section>
    </main>
  )
})

export default MePage
