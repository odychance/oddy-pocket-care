import React from 'react'
import s from './styles.module.scss'
import clsx from 'clsx'
import ButtonFilter from '@/components/Buttons/ButtonFilter'
import ButtonClose from '@/components/Buttons/ButtonClose'
import { months } from '@/utils/variables'

const ExpensesModal = ({ modalState, displayModalFunc, setSpentInfo, modalInfo, spents }) => {
  
  const [ filter, setFilter ] = React.useState("")
  const [ displayInfo, setDisplayInfo ] = React.useState(null)
  
  const options = [ "by date", "by amount", "payment: cash", "payment: debit", "payment: credit" ] 
  
  React.useEffect(() => {
    const newArray = spents.filter(el => Object.values(el).includes(modalInfo));
    setDisplayInfo(newArray);
  }, [modalInfo, spents])
  
  const parseDate = (dateStr) => {
    const [ day, monthText, year ] = dateStr.split(" ")
    const monthIndex = months.indexOf(monthText) + 1
    return new Date(year, monthIndex, day)
  }
  
  const newArray = spents.filter(el => Object.values(el).includes(modalInfo))
  const splitArr = filter.split(" ")
  const word = splitArr[splitArr.length - 1]
  const byDate =  [...newArray].sort((a, b) => parseDate(a.date) - parseDate(b.date))
  const parseAmount = [...newArray].sort((a, b) => b.amount - a.amount)
  const parsePayment = newArray.filter(el => Object.values(el).includes(word))

  React.useEffect(() => {
    word === "date" && setDisplayInfo(byDate);
    word === "amount" && setDisplayInfo(parseAmount);
    word === "cash" && setDisplayInfo(parsePayment);
    word === "debit" && setDisplayInfo(parsePayment);
    word === "credit" && setDisplayInfo(parsePayment);
  }, [word])

  return (
    <div className={clsx(s["modalContainer"], modalState && [s["displayModal"]])}>
      <p className={s["title"]}>{modalInfo} expenses</p>
      <div className={s["filterButtonContainer"]}>
        <ButtonFilter text={`filter by: ${word || "default"}`} options={options} className={s["button"]} setFilter={setFilter}/>
      </div>
      <div className={s["containerTargetSpents"]}>
        {displayInfo?.map((el, idx) => (
          <div className={s["containerTarget"]} key={idx}>
            <div className={s["bgDifferente"]}/>
            <p>Ammount: <span>{el.amount.toLocaleString('es-AR')}</span></p>
            <p>date: <span>{el.date}</span></p>
            <p>payment method: <span>{el.payment}</span></p>
            <p>description: <span>{el.description}</span></p>
          </div>
        ))}
      </div>
      <ButtonClose onClick={() => {displayModalFunc(), setSpentInfo({})}}/>
    </div>
  )
}

export default ExpensesModal