import React, { useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'


function MyDatePicker() {

  const [startDate, setStartDate] = useState(null);
  const CurrDate = () =>
  {const today = new Date()
  const month = today.getMonth()+1;
  const year = today.getFullYear();
  const date = today. getDate();
  return (month + "/" + date + "/" + year);
}
  return (
    <>
    <div className="date-picker">
      <h2> Date Picker</h2>
    {/* <DatePicker
     selected={startDate}
     onChange={ date=> setStartDate(date)}
     dateFormat='yyyy/MM/dd'
     showYearDropdown
     scrollableYearDropdown
     placeholderText='YYYY/MM/DD'
     className='date' 
    /> */}
    <div className='date_now'><CurrDate /></div>
    
    


    </div>
   
    
    
    
    </>
  )
}

export default MyDatePicker
