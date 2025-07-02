import React from 'react'
import s from './styles.module.scss'
import ButtonClose from '@/components/Buttons/ButtonClose';
import Button from '@/components/Buttons/Button';
import clsx from 'clsx';

const AddMoney = ({ showAddMoneyFunc, addMoneyStatus, setNewAmountBase, newBaseAmount }) => {
  const [ newAmount, setNewAmount ] = React.useState("")

  const dateFunc = (e, num) => {
    const target = e.target;
    if (target.value.length > 2) {
      target.value = target.value.slice(0, 2);
    }

    const value = parseInt(target.value, 10);
    if (value > num) {
      target.value = num;
    }
    if (value < 1 && target.value !== '') {
      target.value = '1';
    }
  }

  const allFunctions = () => {
    const numericAmount = Number(newAmount)

    if(newBaseAmount === 0) {
      setNewAmountBase(numericAmount)
      localStorage.setItem("baseAmount", numericAmount);
    } else {
      const remaining = Number(newBaseAmount) + numericAmount
      setNewAmountBase(remaining)
      localStorage.setItem("baseAmount", newBaseAmount);
    }
    setNewAmount("")
    showAddMoneyFunc()
  }

  return (
    <div className={clsx(s["containerPanel"], addMoneyStatus && s["panelActived"])}>
      <div className={s["wrapperPanel"]}>
        <p>Please type <span>an amount to add</span></p>
        <div className={s["datePanel"]}>
          <input
            type='number'
            min={0}
            value={newAmount}
            onChange={(e) => setNewAmount(e.target.value)}
          />
          <span>AR$</span>
        </div>
      <Button text="Save" className={s["button"]} onclick={allFunctions}/>
      </div>
      <ButtonClose onClick={showAddMoneyFunc}/>
    </div>
  )
}

export default AddMoney