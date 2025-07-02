import React from 'react'
import s from './styles.module.scss'
import clsx from 'clsx'
import Button from '@/components/Buttons/Button'
import ButtonClose from '@/components/Buttons/ButtonClose'

const DeleteInfo = ({ showDeleteFunc, deleteStatus, setNewAmountBase, setNewAmountSpent, setSpents}) => {
  const [ allowButton, setAllowButton ] = React.useState(false)
  const [ deleteText, setDeleteText ] = React.useState("delete")
  const [ deleteInfoValue, setDeleteInfoValue ] = React.useState("")

  const deleteFunc = () => {
    localStorage.clear()
    setDeleteText("successful deletion")
    setTimeout(() => {
      showDeleteFunc()
      setNewAmountBase(0)
      setNewAmountSpent(0)
      setSpents([])
      setTimeout(() => {
        setDeleteText("delete")
        setDeleteInfoValue("")
      }, 500);
    }, 1500);
  }

  return (
    <div className={clsx(s["containerPanel"], deleteStatus && s["displayPanel"])}>
      <div className={s["wrapperPanel"]}>
        <p>Please write down <br/><span>"i want to delete all info".</span></p>
        <input type='text' className={s["inputText"]}
          value={deleteInfoValue}
          onChange={(e) => {
            const value = e.target.value
            setDeleteInfoValue(value)
            if(value === "i want to delete all info") {
                setAllowButton(true)
            } else {
              setAllowButton(false)
            }
            }
          }
        />
        <Button text={deleteText} className={clsx(s["button"], allowButton && s["allowBtn"])} redVariant onclick={deleteFunc}/>
      </div>
      <ButtonClose onClick={showDeleteFunc} />

    </div>
  )
}

export default DeleteInfo