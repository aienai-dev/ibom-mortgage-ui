import React from 'react'
import Footer from '../components/footer'
import InterestForm from '../components/interestForm'
import Navbar from '../components/navbar'

const ExpressInterest = () => {
    // const navItems = [
    //     { name: "Back to dashboard" },
    //   ];
  return (
    <div className='w-full flex flex-col'>
        <Navbar isEmpty={true} />
        <InterestForm />
        <Footer />
    </div>
  )
}

export default ExpressInterest