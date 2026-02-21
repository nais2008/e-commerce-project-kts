import React, { useRef, useState } from "react"

import classNames from "classnames"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { IImage } from "shared/interface/image.interface"
import type { Swiper as SwiperType } from "swiper"
import "swiper/css"
import "swiper/css/navigation"
import { Navigation } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import styles from "./ImageSlider.module.scss"

interface Props {
  images: IImage[]
}

const ImageSlider: React.FC<Props> = ({ images }) => {
  const swiperRef = useRef<SwiperType | null>(null)

  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)

  const getImageUrl = (image: IImage) =>
    image.formats.large.url ||
    image.formats.medium.url ||
    image.formats.small.url ||
    image.url

  const handleSlideChange = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning)
    setIsEnd(swiper.isEnd)
  }

  return (
    <Swiper
      modules={[Navigation]}
      slidesPerView={1}
      loop={false}
      navigation={{
        prevEl: `.${styles.slider__btn_prev}`,
        nextEl: `.${styles.slider__btn_next}`,
      }}
      onSlideChange={handleSlideChange}
      onSwiper={(swiper: SwiperType) => {
        swiperRef.current = swiper
      }}
      className={styles.slider}
    >
      {images.map((image) => (
        <SwiperSlide key={image.id}>
          <img
            src={getImageUrl(image)}
            alt={image.alternativeText || ""}
            className={styles.slider__image}
          />
        </SwiperSlide>
      ))}
      <button
        className={classNames(styles.slider__btn, styles.slider__btn_prev)}
        disabled={isBeginning}
      >
        <ChevronLeft size={30} />
      </button>

      <button
        className={classNames(styles.slider__btn, styles.slider__btn_next)}
        disabled={isEnd}
      >
        <ChevronRight size={30} />
      </button>
    </Swiper>

  )
}

export default ImageSlider
