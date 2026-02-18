import React from "react"

import Heading from "components/ui/Heading"

const Title: React.FC = () => {
  return (
    <div className="">
      <Heading view="title">Products</Heading>
      <Heading view="paragraph" color="secondary">
        We display products based on the latest products we have, if you want to
        see our old products please enter the name of the item
      </Heading>
    </div>
  )
}

export default Title
