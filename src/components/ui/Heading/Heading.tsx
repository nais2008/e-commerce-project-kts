import React from "react"

import classNames from "classnames"

import s from "./Heading.module.scss"

type HeadingProps = {
  className?: string
  view?: "title" | "button" | "subtitle" | "desc" | "paragraph"
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div" | "p" | "span"
  weight?: "normal" | "medium" | "bold"
  children: React.ReactNode
  color?: "primary" | "secondary" | "accent"
  maxLines?: number
} & React.HTMLAttributes<HTMLHeadingElement>

const Heading: React.FC<HeadingProps> = ({
  className,
  view,
  tag = "p",
  weight,
  children,
  color,
  maxLines,
  ...props
}: HeadingProps) => {
  const Component = tag

  const classList: string[] = [s.root]

  if (className) classList.push(className)

  if (view && s[`view_${view}`]) classList.push(s[`view_${view}`])

  if (weight && s[`weight_${weight}`]) classList.push(s[`weight_${weight}`])

  if (color && s[`color_${color}`]) classList.push(s[`color_${color}`])

  if (maxLines) classList.push(s.ellipsis)

  const style = maxLines
    ? ({
        "--max-lines": maxLines,
        WebkitLineClamp: maxLines,
      } as React.CSSProperties)
    : {}

  return (
    <Component
      className={classNames(
        s.heading,
        className,
        view && s[`view_${view}`],
        weight && s[`weight_${weight}`],
        color && s[`color_${color}`],
        maxLines && s.ellipsis
      )}
      style={style}
      {...props}
    >
      {children}
    </Component>
  )
}

export default Heading
