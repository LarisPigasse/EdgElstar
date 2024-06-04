import React from 'react'

function index() {
  return (
    <div className='min-w-[320px] md:min-w-[480px] lg:min-w-[800px] mx-auto p-4 h-full'>
        <div className=' mb-8 flex justify-center'>
            <img  src='public/logoEdg.png' alt={`Express Delivery Group`} />
        </div>
        <div className="mb-6 text-center">
            <h3 className="mb-1 text-red-600">Cerca Spedizione / Find shipping</h3>

        </div>                
    </div>
  )
}

export default index