import React from 'react'
import { months } from '@/utils/variables'
import s from './styles.module.scss'
import Button from '@/components/Buttons/Button'
import { paymentOptions } from '@/utils/variables'
import clsx from 'clsx'
import ButtonClose from '@/components/Buttons/ButtonClose'

const AddExpense = ({ openNewSpentForm, openCloseForm, switchPanel, childrenOption, parentOption, newSpent, setNewSpent }) => {
  const isFirst = React.useRef(true);

  const [ showPaymentOptions, setShowPaymentOptions ] = React.useState(false)
  const [ amountExpensed, setAmountExpensed ] = React.useState("")
  const [ dayExpensed, setDayExpensed ] = React.useState("")
  const [ monthExpensed, setMonthExpensed ] = React.useState("")
  const [ yearExpensed, setYearExpensed ] = React.useState("")
  const [ dateExpensed, setDateExpensed ] = React.useState("")
  const [ paymentMethod, setPaymentMethod ] = React.useState("Select a method")
  const [ descriptionExpensed, setDescriptionExpensed] = React.useState("")

  const dateFunc = (e, max) => {
    let { value } = e.target;
    if (value.length > 2) {
      e.target.value = value.slice(0, 2);
    }
    if (value === "") {
      e.target.value = ""
      return
    }
    const numberValue = Number(value)
    if(isNaN(numberValue)) return
    if (numberValue < 0) {
      e.target.value = "01";
    } else if (numberValue > max) {
      value = String(max).padStart(2, "0")
    } else {
      value = String(numberValue).padStart(2, "0")
    }
    e.target.value = value
  }
  
  const monthIndex = Number(monthExpensed) - 1
  const month = months[monthIndex] || "";

  React.useEffect(() => {
    let prefix = ""
    if (yearExpensed < 10) {
      prefix = "200";
    } else if (yearExpensed < 26) {
      prefix = "20";
    } else {
      prefix = "19";
    }
    setDateExpensed(`${dayExpensed} ${month} ${prefix}${yearExpensed}`)
  }, [yearExpensed || monthExpensed || dayExpensed])

  const displayPaymentOptions = () => setShowPaymentOptions(!showPaymentOptions)
  const saveForm = () => {
    setNewSpent({
      parent: parentOption,
      detail: childrenOption,
      amount: amountExpensed,
      date: dateExpensed,
      payment: paymentMethod,
      description: descriptionExpensed,
      id: (Date.now().toString(36) + Math.random().toString(36).slice(2)).toUpperCase()
    })
    openCloseForm()
    switchPanel()

    setTimeout(() => {
      setAmountExpensed("")
      setDayExpensed("")
      setMonthExpensed("")
      setYearExpensed("")
      setDescriptionExpensed("")
      setPaymentMethod("Select a method")
    }, 500);
  }

  React.useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    const list = JSON.parse(localStorage.getItem("spents")) || [];
    localStorage.setItem("spents", JSON.stringify([...list, newSpent]));
  }, [newSpent])

  const handleClickPayment = (e) => {
    setShowPaymentOptions(!showPaymentOptions)
    setPaymentMethod(e)
  }

  return (
    <div className={clsx(s["containerPanel"], openNewSpentForm && s["panelActived"])}>
      <div className={s["wrapperPanel"]}>
        <div className={s["targetPanel"]}>
          <h2>{parentOption} &gt; {childrenOption}</h2>
          <div className={s["form"]}>
            <div className={s["amountArea"]}>
              <p>Amount</p>
              <input 
                placeholder='amount expensed'
                className={s["inputArea"]}
                type='number'
                value={amountExpensed}
                onInput={(e) => setAmountExpensed(Number(e.target.value))}
              />
            </div>
            <div className={s["dateArea"]}>
              <p>Date</p>
              <div className={s["inputDateArea"]}>
                <input
                  className={s["inputDay"]}
                  placeholder='DD'
                  type='number'
                  onInput={(e) => dateFunc( e, 31 )}
                  onChange={(e) => setDayExpensed(Number(e.target.value))}
                  value={dayExpensed}
                />
                <input
                  className={s["inputMonth"]}
                  placeholder='MM'
                  min={0}
                  max={2}
                  type='number'
                  onInput={(e) => dateFunc( e, 12 )}
                  onChange={(e) => setMonthExpensed(Number(e.target.value))}
                  value={monthExpensed}
                />
                <input
                  className={s["inputYear"]}
                  placeholder='YY'
                  type='number'
                  onInput={(e) => dateFunc( e, 99 )}
                  onChange={(e) => setYearExpensed(Number(e.target.value))}
                  value={yearExpensed}
                />
              </div>
            </div>
            <div className={s["paymentArea"]}>
              <p>payment Method</p>
              <div className={s["paymentOptions"]} onClick={displayPaymentOptions}>
                <p>{paymentMethod}</p>
                <div className={clsx(s["options"], showPaymentOptions && s["optionsActived"])}>
                  {paymentOptions.map((el, idx) => (
                    <p onClick={() => handleClickPayment(el)} key={idx}>{el}</p>
                  ))}
                </div>
              </div>
            </div>
            <div className={s["descriptionArea"]}>
              <p>Description<br/>(optional)</p>
              <textarea
                className={s["textarea"]}
                value={descriptionExpensed}
                onChange={(e) => setDescriptionExpensed(e.target.value)}
              />
            </div>
          </div>
          <Button text="save pent" className={s["buttonSubmit"]} onclick={saveForm}/>
        </div>
      </div>
      <ButtonClose onClick={openCloseForm}/>
    </div>
  )
}

export default AddExpense