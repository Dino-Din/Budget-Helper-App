import React, { useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import ListExpensesComponent from './ListExpensesComponent'
import { format } from "date-fns";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { getBudgets, updateBudget, getBudget } from '../services/BudgetService';
import { Form, Formik, Field } from 'formik';
import * as Yup from 'yup';
import { HttpStatusCode } from 'axios';
import { listExpensesYearMonth } from '../services/ExpenseService'
import '../styles/Buttons.css'
import '../styles/Text.css'
import { calculateTotal } from '../functions/ExpenseTrackerFunctions'
import { viewExpensesToLS } from '../localstorageServices/LSExpenseService';
import * as LSBudgetService from '../localstorageServices/LSBudgetService';


const ViewExpensesComponent = (props) => {

  const date = format(new Date(), "yyyy-MM");

  const [yearMonth, setYearMonth] = useState(date)

  const [budgetDatesList, setBudgetDatesList] = useState([])
  const [currMonthBudget, setCurrMonthBudget] = useState(0)

  const [expenses, setExpenses] = useState([])
  const [monthlyTotal, setMonthlyTotal] = useState(0)
  const [leftOver, setLeftOver] = useState(0)

  useEffect(() => {
    props.prod ? fetchBudgetListFromLS() : fetchBudgetListData();
  }, []);


  useEffect(() => {
    props.prod ? fetchBudgetDataFromLS() : fetchBudgetData();
    props.prod ? fetchExpensesYearMonthDataFromLS() : fetchExpensesYearMonthData();
  }, [yearMonth]);

  //  useEffect(() => {
  //       listExpensesYearMonth(yearMonth).then((response) => {
  //           setExpenses(response.data);
  //       }).catch(error => {
  //           console.error(error);
  //       })
  //   }, [yearMonth])

  useEffect(() => {
    const t = calculateTotal(expenses)
    console.log(expenses, t)
    setMonthlyTotal(t.toFixed(2))

  }, [expenses])

  useEffect(() => {
    const left = currMonthBudget.budget - monthlyTotal
    setLeftOver(left ? left.toFixed(2) : "")
    
  }, [monthlyTotal, currMonthBudget])




  const fetchBudgetListData = async () => {
    try {
      
      // get budgets list
      const getBudgetsResponse = await getBudgets();
      const getBudgetsResult = await getBudgetsResponse.data;
      setBudgetDatesList(getBudgetsResult);

    } catch (error) {
      console.error('Error fetching budget list:', error);
    }
  };

  const fetchBudgetListFromLS = () => {
    setBudgetDatesList(LSBudgetService.getBudgetListLS);
  };

  const fetchBudgetData = async () => {
    try {
      
      // get current month's budget
      const getCurrBudgetResponse = await getBudget(yearMonth);
      const getCurrBudgetResult = await getCurrBudgetResponse.data;
      setCurrMonthBudget(getCurrBudgetResult);
      // console.log(currMonthBudget)

    } catch (error) {
      console.error('Error fetching current month budget:', error);
    }
  };

  const fetchBudgetDataFromLS = () => {
    setCurrMonthBudget(LSBudgetService.getBudgetLS(yearMonth));
  };

  const fetchExpensesYearMonthData = async () => {
    try {
      
      const getExpensesYearMonthDataResponse = await listExpensesYearMonth(yearMonth);
      const getExpensesYearMonthDataResult = await getExpensesYearMonthDataResponse.data;
      setExpenses(getExpensesYearMonthDataResult);
      
    } catch (error) {
      console.error('Error fetching expenses for : ' + {yearMonth}, error);
    }
  };

  const fetchExpensesYearMonthDataFromLS = () => {
    setExpenses(viewExpensesToLS(yearMonth));
  };
  

  // const calculateTotal = () => {
  //   let t = 0
  //   for (const x of expenses) { t+= x.amount; }
  //   setMonthlyTotal(t.toFixed(2))
    
  // }
  
  
  const initialValues = {
    yearMonth: yearMonth,
    budgetInput: ''
  }

  
  const onSubmit = (newBudget, {resetForm}) => {

    console.log(newBudget)

    const budgetDto = {
      yearMonth: yearMonth,
      budget: newBudget.budgetInput
    }

    props.prod ? updateBudgetDataLS(budgetDto) : updateBudgetData(budgetDto);
    
    //clear form
    resetForm()
  }

  const updateBudgetData = async (budgetDto) => {
    try {
      
      // get current month's budget
      const updateBudgetResponse = await updateBudget(budgetDto);
      if (updateBudgetResponse.status === HttpStatusCode.Ok) {
          const updateBudgetResult = await updateBudgetResponse.data;
          setCurrMonthBudget(updateBudgetResult);
      }
     
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const updateBudgetDataLS = (budgetDto) => {
      setCurrMonthBudget(LSBudgetService.addBudgetToLS(budgetDto));
    }

  const validationSchema = Yup.object ({
    budgetInput: Yup.number().required("Enter a value to update budget").positive("Please enter a valid number").typeError("Please enter a valid number")
  })

  const navigator = useNavigate()

  function back() {
    navigator('/');
  }

  return (
    <div className='container'>
      <br /> <br /> 
      <div className='row'>
        <div className='col-sm-6'>
        
          <DropdownButton className="dropdown-basic-button" title={yearMonth}>
              {budgetDatesList.map(b => (
                <Dropdown.Item key={b.yearMonth} onClick={() => setYearMonth(b.yearMonth)}>{b.yearMonth}</Dropdown.Item>
              ))}
          </DropdownButton>
        </div>
        
        {/* <div className='col-sm-3 justify-content-right'> 
            <label className="sr-only">Budget: ${yearMonth}</label>
        </div> */}
       
        <div className='d-flex col-sm-6'> 
          
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
              {() => (
                <Form>
                  <div className="input-group w-auto">
                      <div className="input-group-prepend">
                        <div className="input-group-text">$</div>
                      </div>
                    <Field name="budgetInput" id="userInputNewBudget" type="text" className="form-control"/>
                    <button className="btn btn-success" type="submit">Update Budget</button>
                    <div className='sr-only col px-md-5 text-end'> Budget: ${currMonthBudget.budget}</div>
                  </div>
                </Form>
              )}
            </Formik>
            
        </div>
        
      </div>
      <br /> <br />
      <ListExpensesComponent expenses= {expenses} yearMonth={yearMonth}/>

      <br />
      <div className='row'>
        <div className='col-sm-6'>
          <h3 className='text'>Total: ${monthlyTotal}</h3>
        </div>
        <div className='col-sm-6'>
          <h3 className={leftOver < 0 ? 'text-end over-budget' : 'text-end'}>
            Left over: ${leftOver}
            </h3>
        </div>
      </div>
  
      <div >
        <br /><br />
        <button className='btn btn-outline-primary btn-md' onClick={back}>Back</button>
      </div>
      <br />
    </div>
    
    

  )
}

export default ViewExpensesComponent