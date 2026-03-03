import React from "react"
import { Controller, type SubmitHandler, useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router"
import { toast } from "react-toastify"

import { ROUTES } from "constants/routes"
import { observer } from "mobx-react-lite"
import { useAuthStore } from "providers/AuthProvider"

import ErrorMessage from "components/layout/ErrorMessage"
import Form from "components/layout/Form"
import Button from "components/ui/Button"
import Heading from "components/ui/Heading"
import Input from "components/ui/Input"

import s from "./RegisterPage.module.scss"

interface IRegisterForm {
  username: string
  email: string
  password: string
  passwordAgain: string
}

const RegisterPage: React.FC = observer(() => {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<IRegisterForm>({
    mode: "onSubmit",
  })

  const navigate = useNavigate()
  const authStore = useAuthStore()

  const onSubmit: SubmitHandler<IRegisterForm> = async (data) => {
    await authStore.register({
      username: data.username,
      email: data.email,
      password: data.password,
    })
  }

  React.useEffect(() => {
    if (authStore.isAuthenticated) {
      toast.success("Account created successfully!")
      navigate(ROUTES.products.create())
    }
  }, [authStore.isAuthenticated, navigate])

  return (
    <main className={s.registerForm__center}>
      <Form className={s.registerForm} onSubmit={handleSubmit(onSubmit)}>
        <Heading tag="h2" view="title">
          Register
        </Heading>

        {authStore.error && (
          <ErrorMessage errorMess={authStore.error.message} />
        )}

        <div className={s.registerForm__field}>
          <Controller
            control={control}
            name="username"
            rules={{
              required: "Username is required",
              minLength: {
                value: 3,
                message: "Minimum 3 characters",
              },
            }}
            render={({ field }) => (
              <>
                <label htmlFor="username">
                  <Heading color="secondary" weight="medium">
                    Username
                  </Heading>
                </label>
                <Input id="username" type="text" {...field} />
              </>
            )}
          />
          <ErrorMessage errorMess={errors.username?.message} />
        </div>

        <div className={s.registerForm__field}>
          <Controller
            control={control}
            name="email"
            rules={{
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email",
              },
            }}
            render={({ field }) => (
              <>
                <label htmlFor="email">
                  <Heading color="secondary" weight="medium">
                    Email
                  </Heading>
                </label>
                <Input id="email" type="email" {...field} />
              </>
            )}
          />
          <ErrorMessage errorMess={errors.email?.message} />
        </div>

        <div className={s.registerForm__field}>
          <Controller
            control={control}
            name="password"
            rules={{
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Minimum 6 characters",
              },
            }}
            render={({ field }) => (
              <>
                <label htmlFor="password">
                  <Heading color="secondary" weight="medium">
                    Password
                  </Heading>
                </label>
                <Input id="password" type="password" {...field} />
              </>
            )}
          />
          <ErrorMessage errorMess={errors.password?.message} />
        </div>

        <div className={s.registerForm__field}>
          <Controller
            control={control}
            name="passwordAgain"
            rules={{
              required: "Please confirm password",
              validate: (value) =>
                value === getValues("password") || "Passwords do not match",
            }}
            render={({ field }) => (
              <>
                <label htmlFor="passwordAgain">
                  <Heading color="secondary" weight="medium">
                    Confirm Password
                  </Heading>
                </label>
                <Input id="passwordAgain" type="password" {...field} />
              </>
            )}
          />
          <ErrorMessage errorMess={errors.passwordAgain?.message} />
        </div>

        <div className={s.registerForm__field_link}>
          <Link to={ROUTES.login.create()}>Already have an account?</Link>
        </div>

        <div className={s.registerForm__field}>
          <Button
            className={s.registerForm__btn}
            loading={authStore.isLoadingRegister}
          >
            {authStore.isLoadingRegister ? "Loading..." : "Register"}
          </Button>
        </div>
      </Form>
    </main>
  )
})

export default RegisterPage
