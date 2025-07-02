import React from 'react'
import s from './styles.module.scss'
import ButtonFilter from '@/components/Buttons/ButtonFilter'
import { months } from '@/utils/variables'

const FilterPanel = ({ newBaseAmount, spents }) => {
  const [ filter, setFilter ] = React.useState("")
  const [ newArray, setNewArray ] = React.useState(null)

  React.useEffect(() => {
    const newSpents = spents.map(el => ({
      ...el,
      percentage: ((el.amount / newBaseAmount) * 100).toFixed(1)
    }))
    setNewArray(newSpents);
  }, [filter, spents])

  const optionsFilter = ["amount", "date", "percentage"]

  const newSpents = spents.map(el => ({
    ...el,
    percentage: ((el.amount / newBaseAmount) * 100).toFixed(1)
  }))

  const parseDate = (dateStr) => {
    const [ day, monthText, year ] = dateStr.split(" ")
    const monthIndex = months.indexOf(monthText) + 1
    return new Date(year, monthIndex, day)
  }

  const byDate =  [...newSpents].sort((a, b) => parseDate(a.date) - parseDate(b.date))
  const parseAmount = [...newSpents].sort((a, b) => b.amount - a.amount)
  const parsePercentage = [...newSpents].sort((a, b) => b.amount - a.amount)


  React.useEffect(() => {
    filter === "date" && setNewArray(byDate);
    filter === "amount" && setNewArray(parseAmount);
    filter === "percentage" && setNewArray(parsePercentage);
  }, [filter])

  return (
    <div className={s["containerFilter"]}>
      <ButtonFilter options={optionsFilter} setFilter={setFilter} text={filter || "Filter"}/>
      <div className={s["spentsDetails"]}>
        {
          newArray?.map((el, idx) => (
            <p key={idx}>{el.parent} - {((el.amount / newBaseAmount) * 100 ).toFixed(1)} % <span>= {el.amount.toLocaleString('es-AR')} AR$</span></p>
          ))
        }
      </div>
    </div>
  )
}

export default FilterPanel