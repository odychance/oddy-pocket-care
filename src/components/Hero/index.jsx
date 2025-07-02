import React from 'react'
import s from './styles.module.scss'
import AvailableAmount from './AvailableAmount'
import ExpensesDetails from './ExpensesDetails'
import FilterPanel from './FilterPanel'
import Button from '../Buttons/Button'
import ExpensesModal from './ExpensesModal'
import AddMoney from './AddMoney'
import DeleteInfo from './DeleteInfo'
import Loader from '../Loader'

const Hero = ({ newBaseAmount, setNewAmountBase, newAmountSpent, setNewAmountSpent, spents, setSpents }) => {

  const [ modalState, setModalState ] = React.useState(false) 
  const [ spentInfo, setSpentInfo ] = React.useState({})
  const [ addMoneyStatus, setAddMoneyStatus ] = React.useState(false)
  const [ deleteStatus, setDeleteStatus ] = React.useState(false)
  const [ modalInfo, setModalInfo ] = React.useState("")

  const totalRemaining = newBaseAmount - newAmountSpent
  
  const formatterInitial = newBaseAmount.toLocaleString('es-AR')
  const formatedSpent = newAmountSpent.toLocaleString('es-AR')
  const formatRemaining = totalRemaining.toLocaleString('es-AR')

  const displayModalFunc = () =>  setModalState(!modalState)
  const showAddMoneyFunc = () => setAddMoneyStatus(!addMoneyStatus)
  const showDeleteFunc = () => setDeleteStatus(!deleteStatus)

  return (
    <div className={s["containerHero"]}>
      <h2 className={s["title"]}>Pocket care</h2>
      <AvailableAmount formatRemaining={formatRemaining}/>
      <ExpensesDetails displayModalFunc={displayModalFunc} setSpentInfo={setSpentInfo} spents={spents} setModalInfo={setModalInfo} />
      <FilterPanel newBaseAmount={newBaseAmount} spents={spents} />

      <div className={s["infoContainer"]}>
        <div className={s["currentInfo"]}>
          <p>initial amount <span>= {formatterInitial} AR$</span></p>
          <p>amount spent <span>= {formatedSpent} AR$</span></p>
          <p>total remaining <span> = {formatRemaining} AR$</span></p>
        </div>
        <div className={s["containerButtons"]}>
          <Button className={s["button"]} text="add money" onclick={showAddMoneyFunc}/>
          <Button className={s["button"]} text="Delete all info" onclick={showDeleteFunc}/>
        </div>
      </div>

      <ExpensesModal modalState={modalState} displayModalFunc={displayModalFunc} spentInfo={spentInfo} setSpentInfo={setSpentInfo} modalInfo={modalInfo} spents={spents}/>
      <AddMoney showAddMoneyFunc={showAddMoneyFunc} addMoneyStatus={addMoneyStatus} setNewAmountBase={setNewAmountBase} newBaseAmount={newBaseAmount}/>
      <DeleteInfo showDeleteFunc={showDeleteFunc} deleteStatus={deleteStatus} setNewAmountSpent={setNewAmountSpent} setNewAmountBase={setNewAmountBase} setSpents={setSpents}/>
      <Loader />
    </div>
  )
}

export default Hero