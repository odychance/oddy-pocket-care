import React from 'react'
import s from './styles.module.scss'
import Button from '@/components/Buttons/Button'

const ExpensesDetails = ({ displayModalFunc, setSpentInfo, spents, setModalInfo }) => {
  const categories = [...new Set(spents.map(item => item.parent))]

  const handleCategorySelect = (selectCategory) => {
    const filtered = spents.filter(item => item.parent === selectCategory)
    console.log(filtered)
  }

  console.log(spents)
  return (
    <div className={s["containerDetails"]}>
      <h2 className={s["title"]}>Expenses Details</h2>
      <p className={s["bgText"]}>Pocket care</p>
      <div className={s["targetDetails"]}>
        {categories.map((el, idx) => (
          <div className={s["containerBtn"]} key={idx} onClick={() => {displayModalFunc(), setSpentInfo(el)}}>
            <Button text={el} goIcon onclick={() => setModalInfo(el)}/>
            {/* <Button text={el.parent} goIcon onclick={() => setModalInfo(el.parent)}/> */}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ExpensesDetails