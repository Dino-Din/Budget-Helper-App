import React, { useEffect, useState} from 'react'
import DataTable from 'react-data-table-component'
import '../App.css'


const ListExpensesComponent = (props) => {

    let yearMonth = props.yearMonth
    let expenses = props.expenses
    // console.log(props.yearMonth, yearMonth)
    
    // const [expenses, setExpenses] = useState([])

    // useEffect(() => {
    //     listExpensesYearMonth(yearMonth).then((response) => {
    //         setExpenses(response.data);
    //     }).catch(error => {
    //         console.error(error);
    //     })
    // }, [yearMonth])

    const columns = [
        {
            // id: 'id',
            name: 'Date ',
            selector: row => row.date,
            sortable: true
        },
        {
            // id: 'id',
            name: 'Amount ',
            selector: row =>  '$' + (row.amount).toFixed(2),
            sortable: true
        },
        {
            // id: 'id',
            name: 'Description ',
            selector: row => row.description
        }
    ]

    const tableCustomStyles = {
        headRow: {
          style: {
            color:'black',
            // backgroundColor: 'black'
          },
        },
        rows: {
          style: {
            color: 'black',
            backgroundColor: '#F6FBFC'
          },
          stripedStyle: {
            color: 'black',
            backgroundColor: 'white'
          }
        }
      }

  
  return (
    <div className='container list-expenses-table-container'>
        <h2 className='text-center'>Expenses for {yearMonth}</h2>
        <br />
        <DataTable className='rdt_TableCol rdt_TableRow'
            columns={columns}
            data={expenses}
            fixedHeader
            noDataComponent="No Expenses For This Month"
            fixedHeaderScrollHeight='250px'
            striped
            customStyles={tableCustomStyles}
        ></DataTable>

    </div>
    
  )
}

export default ListExpensesComponent
