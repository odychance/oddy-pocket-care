import React from 'react'
import s from './styles.module.scss'
import Image from 'next/image'
import goSvg from '/src/assets/Images/svg/goIcon.svg'
import clsx from 'clsx'

const Button = ({ text, goIcon, className, onclick, redVariant }) => {
  return (
    <div className={clsx(s["containerButton"], className)} onClick={onclick}>
      <div className={clsx(s["bgColorButton"], redVariant && s["redVariant"])} />
      <div className={s["wrapperText"]}>
        <span className={s["textButton"]}>{text}</span>
      </div>
      { goIcon && <div className={s["goIcon"]}><Image src={goSvg} className={s["icon"]} alt="icon" fill/></div> }
    </div>
  )
}

export default Button