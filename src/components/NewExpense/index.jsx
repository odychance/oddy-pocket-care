import React, { useEffect } from 'react'
import s from './styles.module.scss'
import { options } from '@/utils/variables'
import Button from '../Buttons/Button'
import PanelActivacion from './PanelActivation'
import AddExpense from './AddExpense'
import clsx from 'clsx'

const NewExpense = ({ newExpensePanel, switchPanel, newSpent, setNewSpent }) => {
  const [ openNewSpentForm, setOpenNewSpentForm ] = React.useState(false)
  const [ optionSelected, setOptionSelected ] = React.useState({})
  const [ parentOption, setParentOption ] = React.useState("")
  const [ childrenOption, setChildrenOption ] = React.useState("")

  const openCloseForm = (item, parent) => {setOpenNewSpentForm(!openNewSpentForm), setOptionSelected({item, parent})}

  useEffect(() => {
    if(optionSelected.parent) {

      setParentOption(optionSelected?.parent?.spentName)
      setChildrenOption(optionSelected?.item)
    }
  }, [optionSelected])

  return (
    <div className={clsx(s["containerNewExpense"], !newExpensePanel && s["switchPanel"])}>
      <div className={s["wrapperComponent"]}>
        <h2>select a new expense</h2>
        <div className={s["optionsWrapper"]}>
          {options.map((el, idx) => (
            <div className={s["optionsPanel"]} key={idx}>
              <p>{el.spentName}</p>
              <div className={s["optionsContainer"]}>
                {el.option.map((item, ind) => (
                  <Button text={item} key={ind} className={s["buttonOption"]} onclick={() => openCloseForm(item, el)}/>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <PanelActivacion onclick={switchPanel} newExpensePanel={newExpensePanel}/>
      <AddExpense openNewSpentForm={openNewSpentForm} openCloseForm={openCloseForm} switchPanel={switchPanel} childrenOption={childrenOption} parentOption={parentOption} newSpent={newSpent} setNewSpent={setNewSpent}/>
    </div>
  )
}

export default NewExpense