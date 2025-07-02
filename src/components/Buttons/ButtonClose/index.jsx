import React from 'react'
import clsx from 'clsx'
import s from './styles.module.scss'

const ButtonClose = ({ className, onClick }) => {
  return (
    <div className={clsx(s["buttonContainer"], className)} onClick={onClick}>
      <div />
      <div />
    </div>
  )
}

export default ButtonClose