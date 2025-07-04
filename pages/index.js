import Head from 'next/head'
import Hero from '@/components/Hero'
import NewExpense from '@/components/NewExpense'
import React from 'react'

export default function Home() {
  const [ newExpensePanel, setNewExpensePanel ] = React.useState(false)
  const [ newBaseAmount, setNewAmountBase ] = React.useState(0)
  const [ newAmountSpent, setNewAmountSpent ] = React.useState(0)
  const [ spents, setSpents ] = React.useState([])
  const [ newSpent, setNewSpent ] = React.useState({})

  React.useEffect(() => {
    const getStoredSpents = () => {
      try {
        const storageSpents = JSON.parse(localStorage.getItem("spents"))
        return Array.isArray(storageSpents) ? storageSpents : []
      } catch (err) {
        console.error("Error reading localStorage", err); return []
      }
    }
    const storageSpentsArr = getStoredSpents()
    setSpents(storageSpentsArr)
  }, [newSpent])

  React.useEffect(() => {
    const amountSpentArr = spents.map(el => el.amount)
    const sumOfExpenses = amountSpentArr.reduce((acumulator, current) => acumulator + current, 0)
    setNewAmountSpent(sumOfExpenses)
  }, [spents])

  React.useEffect(() =>  {
    const initialAmountLS = localStorage.getItem("baseAmount")
    const parsed = Number(initialAmountLS)
    if(!isNaN(parsed)) {
      setNewAmountBase(parsed)
    }
  }, [])

  React.useEffect(() => {
    localStorage.setItem("baseAmount", newBaseAmount);
  }, [newBaseAmount])

  function switchPanel() {
    setNewExpensePanel(!newExpensePanel)
  }

  return (
    <div>
      <Head>
        <title>POCKET CARE</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/coin.png" />
      </Head>
      <main>
        <Hero newBaseAmount={newBaseAmount} setNewAmountBase={setNewAmountBase} spents={spents} newAmountSpent={newAmountSpent} setNewAmountSpent={setNewAmountSpent} setSpents={setSpents}/>
        <NewExpense newExpensePanel={newExpensePanel} switchPanel={switchPanel} newSpent={newSpent} setNewSpent={setNewSpent}/>
      </main>
    </div>
  )
}
