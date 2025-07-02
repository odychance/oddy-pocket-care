import React from 'react'
import s from './styles.module.scss'
import clsx from 'clsx'
import Image from 'next/image'
import arrowLeft from '/src/assets/Images/svg/arrowLeft.svg'

const PanelActivacion = ({onclick, newExpensePanel}) => {
  return (
    <div className={clsx(s["containerPanel"], newExpensePanel && s["panelActived"])} onClick={onclick}>
      <div className={s["wrapperText"]}>
        <div className={s["hover"]} />
        <p className={clsx(s["panelText"], newExpensePanel && s["wrapperTextActived"])}>see all expenses <br/><span>add a new expense</span></p>
      </div>
      <Image src={arrowLeft} alt="goSvg" className={clsx(s["arrow"], !newExpensePanel && s["arrowSpin"])} />
    </div>
  )
}

export default PanelActivacion