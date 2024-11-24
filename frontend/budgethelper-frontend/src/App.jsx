import './App.css'
import HeaderComponent from './components/HeaderComponent'
import FooterComponent from './components/FooterComponent'
import ListExpensesComponent from './components/ListExpensesComponent'
import {BrowserRouter, Routes, Route, Link, HashRouter} from 'react-router-dom'
import AddExpenseComponent from './components/AddExpenseComponent'
import ExpenseTrackerComponent from './components/ExpenseTrackerComponent'
import ViewExpensesComponent from './components/ViewExpensesComponent'
import ExpensesSummaryComponent from './components/ExpensesSummaryComponent'
import {PROD} from './App'

function App() {

  return (
    <>
      <HashRouter>
        <HeaderComponent/>
          <Routes>
            {/* <Link to="/add-expenses"></Link>
            <Link to="/expenses"></Link>
            <Link to="/view-expenses"></Link>
            <Link to="/summary"></Link> */}

            {/* // http:localhost:3000 */}
            <Route path='/' element = { <ExpenseTrackerComponent prod={PROD}/> }></Route>
            {/* // http:localhost:3000/add-expenses */}
            <Route path='/add-expenses' element = { <AddExpenseComponent prod={PROD}/> }></Route>
            {/* // http:localhost:3000/expenses */}
            {/* <Route path='/expenses' element = { <ListExpensesComponent prod={PROD}/> }></Route> */}
            {/* // http:localhost:3000/view-expenses */}
            <Route path='/view-expenses' element = { <ViewExpensesComponent prod={PROD}/> }></Route>
            {/* // http:localhost:3000/overview */}
            <Route path='/summary' element = { <ExpensesSummaryComponent prod={PROD}/> }></Route>
          </Routes>
        {/* <FooterComponent/> */}
      </HashRouter>
    </>
  )
}

export default App
