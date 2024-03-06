import React from 'react';

const GetterButton = ( { text,  onClick, type} ) => {
  return (
    <div style={{padding: '0.1rem', paddingLeft: '0.2rem', marginRight: '0.5rem', marginTop:'0.2rem'}}>
        <button
        className=" h-auto  bg-blue-500 hover:bg-white text-white font-semibold hover:text-blue-500 py-2 px-4 border border-blue-500 hover:border-blue-500 rounded"
            type={type}
            onClick={onClick}
        >{text}</button>
</div>
  )
}

export default GetterButton