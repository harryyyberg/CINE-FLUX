import React from 'react'

function Pagination({handleprev , handlenxt , pageNo}) {
  return (
    <div className=' bg-gray-400 p-4 m-8 flex justify-center '>
        <div onClick= {handleprev} className='px-8 hover:cursor-pointer'>
            <i class="fa-solid fa-arrow-left"></i>
        </div>
        <div className='font-bold'>{pageNo}</div>
        <div onClick={handlenxt}  className='px-8 hover:cursor-pointer'>
            <i class="fa-solid fa-arrow-right"></i>
        </div>
        
    </div>
  )
}

export default Pagination