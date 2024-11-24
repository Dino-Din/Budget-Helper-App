import React, { useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { format } from "date-fns";
import '../styles/Buttons.css'
import { getTotalExpensesYearMonth } from '../services/ExpenseService';
import * as LSExpenseService from '../localstorageServices/LSExpenseService';

const ExpenseTrackerComponent = (props) => {

    const currDate = format(new Date(), "yyyy-MM");
    const [total, setTotal] = useState(0)

    useEffect(() => {
      props.prod ? fetchTotalExpensesYearMonthLS() : fetchTotalExpensesYearMonth();
    }, [currDate]);

    const fetchTotalExpensesYearMonth = async () => {
      try {
        
        const getTotalResponse = await getTotalExpensesYearMonth(currDate);
        const getTotalResult = await getTotalResponse.data;
        setTotal(getTotalResult.toFixed(2));
        
      } catch (error) {
        console.error('Error fetching total expenses for : ' + {currDate}, error);
      }
    };

    const fetchTotalExpensesYearMonthLS = () => {
      setTotal(LSExpenseService.totalExpensesLS(currDate));
    };

    const navigator = useNavigate();

    function addNewExpenses() {
        navigator('/add-expenses');
      }

      function viewExpenses() {
        navigator('/view-expenses');
      }

      function summary() {
        navigator('/summary');
      }


  return (
     <div className='container'>
      <br/><br/>
        <h2 className='text-center'>Current Month's Spending:</h2>
        <div>
          <br/>
          <div className="text-center large-text">
            <p>${total}</p>
          </div>
        </div>
        <br/>
      <div className='row'>
          <div className='col-sm-4'>
            <button className='btn btn-outline-primary btn-lg' onClick={addNewExpenses}>Add Expenses</button>
          </div>
          <div className='col-sm-4' align='center'>
            <button className='btn btn-outline-primary btn-lg' onClick={viewExpenses}>View Expenses</button>
          </div>
          <div className='col-sm-4' align='right'>
            <button className='btn btn-outline-primary btn-lg' onClick={summary}>Summary</button>
          </div>
          
          
          
        </div>
    </div>
    
  )
}

export default ExpenseTrackerComponent