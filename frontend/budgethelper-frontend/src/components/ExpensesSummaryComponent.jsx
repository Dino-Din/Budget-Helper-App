import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ListExpensesSummaryComponent from './ListExpensesSummaryComponent'
import { getExpensesSummary, getSummaryAvg } from '../services/ExpenseService'
import {data, avg} from '../assets/static data/summary_data'
import Alert from 'react-bootstrap/Alert'
import '../styles/Text.css'


const ExpensesSummaryComponent = (props) => {

  const [expensesSummary, setExpensesSummary] = useState([])
  const [summaryAvg, setSummaryAvg] = useState(0)
  
  useEffect(() => {
    props.prod ? fetchExpensesSummaryProd() : fetchExpensesSummary();
    props.prod ? fetchSummaryAvgProd() : fetchSummaryAvg();
  }, []);

  const fetchExpensesSummary = async () => {
    try {
      const getSummaryResponse = await getExpensesSummary();
      const getSummaryResult = await getSummaryResponse.data;
      setExpensesSummary(getSummaryResult);
    } catch (error) {
      console.error('Error fetching expenses summary:', error);
    }
    
  }

  const fetchExpensesSummaryProd = () => {
    setExpensesSummary(data)
  }

  const fetchSummaryAvg = async () => {
    try {
      const getSummaryAvgResponse = await getSummaryAvg();
      const getSummaryAvgResult = await getSummaryAvgResponse.data;
      setSummaryAvg(getSummaryAvgResult);
    } catch (error) {
      console.error('Error fetching summary average:', error);
    }
    
  }

  const fetchSummaryAvgProd = () => {
    setSummaryAvg(avg);
  }

  const navigator = useNavigate()

  function back() {
    navigator('/');
  }

  return (
    <div className='container'>
      {/* <div>
      <br />
        {props.prod ? 
        <Alert className = 'text-center' variant='warning'>
          Static Summary Table Data Displayed For Demo Purposes
        </Alert> : {}}
      </div> */}
      <div>

        
        <ListExpensesSummaryComponent summary={expensesSummary}/>
      </div>
      <br />
      <div>
        <h3 className='text-center'> Average Monthly Spending: ${summaryAvg.toFixed(2)}</h3>
      </div>
      <div >
        <br /><br />
        <button className='btn btn-outline-primary btn-md' onClick={back}>Back</button>
      </div>
      <br />
    </div>

    
  )
}

export default ExpensesSummaryComponent