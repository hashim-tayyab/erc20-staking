import React from 'react'

const InputBox = ({label, placeholder, onChange, value}) => {
  return (
        <div className=''>
            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
            <input type="text" id="first_name" 
            className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
              focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
              dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            required />
        </div>
  )
}

export default InputBox