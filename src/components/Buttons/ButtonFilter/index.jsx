import React from 'react'
import clsx from 'clsx'
import s from './styles.module.scss'
import Image from 'next/image'
import ArrowDown from '/src/assets/Images/svg/arrowDown.svg'

const ButtonFilter = ({ text = "Filter" , className, options, setFilter }) => {
  const [ displayFilterOptions, setDisplayFilterOptions ] = React.useState(false)

  function showOptions() {
    setDisplayFilterOptions(!displayFilterOptions)
  }

  function selectOption(el) {
    setDisplayFilterOptions(!displayFilterOptions)
    setFilter(el)
  }

  return (
    <div className={clsx(s["optionsBar"], displayFilterOptions && [s["displayPanel"]], className)}>
      <div className={s["currentFilter"]} onClick={() => showOptions()}>
        <p>{text}</p>
        <Image src={ArrowDown} alt="arrow" className={s["arrowDown"]} />
      </div>
      <div className={clsx(s["options"], displayFilterOptions && [s["displayOptions"]] )} >
        {options.map((el, idx) => 
          <div key={idx} onClick={() => selectOption(el)}>
            <p>{el}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ButtonFilter