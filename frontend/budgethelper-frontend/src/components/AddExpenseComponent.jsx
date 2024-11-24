import React, { useState, setFormValues } from 'react'
import { useNavigate } from 'react-router-dom'
import { addExpense } from '../services/ExpenseService'
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { parse, isDate, format, isValid } from "date-fns";
import { addDefaultBudget } from '../services/BudgetService';
import { DEFAULT_BUDGET } from '../types/Budget';
import '../styles/Buttons.css'
import '../styles/Text.css'
import { addExpenseToLS } from '../localstorageServices/LSExpenseService';
import { addDefaultBudgetToLS } from '../localstorageServices/LSBudgetService';



const AddExpenseComponent = (props) => {

  const initialValues = {
      date: '',
      amount: '',
      description: ''
    }

  const onSubmit = (expense, {resetForm}) => {
    
      console.log(expense)
      
      saveExpense(expense);

      //clear form
      resetForm()

    }

    const validationSchema = Yup.object ({
      date: Yup.date().required("Date is required").transform(parseDateString),
      amount: Yup.number().required("Amount is required").positive("Please enter a valid amount").typeError("Please enter a valid amount"),
      description: Yup.string().required("Description is required")
      
    })

  // const formik = useFormik({
  //   initialValues: {
  //     date: '',
  //     amount: '',
  //     transaction: ''
  //   },
  //   onSubmit: (values) => {
  //     saveExpense(values);
  //   },
  // });

  // const [date, setDate] = useState('')
  // const [amount, setAmount] = useState('')
  // const [transaction, setTransaction] = useState('')

  // const [errors, setErrors] = useState({
  //   date: '',
  //   amount: '',
  //   transaction: ''
  // })


  function saveExpense(expense){
    // e.preventDefault();

    const ym = (expense.date).slice(0, -3);
    
    const expenseDto = {
      date: expense.date, 
      amount: parseFloat(expense.amount), 
      description: expense.description, 
      yearMonth: ym
    };

    console.log(expenseDto);

    props.prod ? addExpenseToLS(expenseDto, ym) : addExpense(expenseDto);

    // if (props.prod) {
    //   addExpenseToLS(expenseDto, ym);
    // } else {
    //   addExpense(expenseDto).then((response) => {
    //     console.log(response.data);
    //   });

    // }

    addNewBudget(ym);

  }

  function addNewBudget(ym){
    const budgetDto = {
      yearMonth: ym,
      budget: DEFAULT_BUDGET
    };
    props.prod ? addDefaultBudgetToLS(budgetDto) : addDefaultBudget(budgetDto);
  }

  
  function parseDateString(value, originalValue) {
    const parsedDate = isDate(originalValue)
      ? originalValue
      : parse(originalValue, "yyyy-MM-dd", new Date());

    return parsedDate;
  }

  // function validateForm() {
  //   let valid = true;

  //   const errorsCopy = {... errors} // ... => spread operator

  //   if(date.trim()){
  //     errorsCopy.date = '';
  //   } else {
  //     errorsCopy.date = 'Date is required';
  //     valid = false;
  //   }
  // }

  const navigator = useNavigate()

  function back() {
    navigator('/');
  }
  

  return (
    <div className='container'>
      <br /> <br /> 
      <div className='row'>
        <div className='card col-md-6 offset-md-3 offset-md-3'>
          <h2 className='text-center'>Add Expense</h2>
          <div className='card-body'>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
              {({ errors, touched }) => (
                <Form>
                  <div className='form-group-mb-2'>
                    <label className='form-label'>Date</label>
                    <Field className= {errors.date && touched.date ? 'form-control is-invalid': 'form-control'} name='date' type='date' placeholder='yyyy-mm-dd'/>
                    <div className='error error-text'> 
                    {/* TODO: make red and look like error */}
                      <ErrorMessage name='date' component='span' />
                    </div>
                    
                  </div>
    
                 
                    <label className="sr-only">Amount</label>
                    <div className="input-group mb-2 mr-sm-2">
                      <div className="input-group-prepend">
                        <div className="input-group-text">$</div>
                      </div>
                      <Field className= {errors.amount && touched.amount ? 'form-control is-invalid': 'form-control'} name='amount'/>
                    </div>
                    
                    <div className='error error-text'>
                      <ErrorMessage name='amount' component='span'/>
                    </div>
      
                  <div className='form-group-mb-2'>
                    <label className='form-label'>Description</label>
                    <Field className= {errors.description && touched.description ? 'form-control is-invalid': 'form-control'} name='description' placeholder='abc abc'/>
                    <div className='error error-text'>
                      <ErrorMessage name='description' component='span'/>
                    </div>
                    
                  </div>
                  <br/>
                  <div className='row'>
                    <div className='col-sm-6'>
                      <button className='btn btn-reset' type='reset'>Clear</button>
                    </div>
                    
                    <div className='col-sm-6' align='right'>
                      <button className='btn btn-success' type='submit'>Add</button>
                    </div>
                    
                  </div>
                                
                {/* <button className='btn btn-success' onClick={saveExpense}>Add</button> */}
  
              </Form>
              )}
            </Formik>
            
          </div>
        </div>

      </div>

      <div >
        <br /><br />
        <button className='btn btn-outline-primary btn-md' onClick={back}>Back</button>
      </div>

    </div>
  )
}

export default AddExpenseComponent