import React from 'react'
import s from './styles.module.scss'

const AvailableAmount = ({ formatRemaining }) => {
  return (
    <div className={s["containerComponent"]}>
      <div className={s["containerDisplayer"]}>
        <h2>AVAILABLE</h2>
        <p>{formatRemaining}AR$</p>
      </div>

      <div className={s["underlineContainer"]} />
      <div className={s["bgx"]}>
        <div className={s["fline"]}/>
        <div className={s["sline"]}/>
      </div>
    </div>
  )
}

export default AvailableAmount