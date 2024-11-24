import React from 'react'
import '../App.css'

const HeaderComponent = () => {
  return (
    <div>
        <header>
            <nav className='navbar header'>
            <a className="navbar-brand header-text" href="/"> Expense Tracker and Budget Helper</a>
            </nav>
        </header>
    </div>
  )
}

export default HeaderComponent