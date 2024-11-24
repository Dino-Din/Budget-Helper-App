import React from 'react';
import DataTable from 'react-data-table-component'


const ListExpensesSummaryComponent = (props) => {

    let summary = props.summary;

    const columns = [
        {
            name: 'Month ',
            selector: row => row.yearMonth,
            sortable: true
        },
        {
            name: 'Budget',
            selector: row => '$' + (row.budget).toFixed(2),
            sortable: true
        },
        {
            name: 'Total',
            selector: row => '$' + ((row.total).toFixed(2))
        },
        {
          name: 'Difference ',
          selector: row => '$' + (row.difference).toFixed(2),
          conditionalCellStyles: [{
				when: row  => row.difference < 0,
				style: {
					color: 'red',
				},
			}]
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
            <br />
            <h2 className='text-center'>Summary of Expenses</h2>
            <br />
            <DataTable className='rdt_TableCol rdt_TableRow'
                columns={columns}
                data={summary}
                fixedHeader
                noDataComponent="Summary Unavailable"
                fixedHeaderScrollHeight='250px'
                striped
                customStyles={tableCustomStyles}
            ></DataTable>
    </div>
    )
}

export default ListExpensesSummaryComponent