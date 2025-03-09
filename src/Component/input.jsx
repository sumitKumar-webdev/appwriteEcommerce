import React from 'react'
import { forwardRef, useId } from 'react'


export const Input =forwardRef(({
    label,
    type = 'text',
    classname='',
    ...props
}, ref) => {
    const id = useId()
  return(
    <div className='w-full'>
        {label && <label className='inline-block mb-1 pl-1' 
        htmlFor={id}>{label}
        </label>
        }
        <input type={type} 
        className={`px-3 py-2 ${classname}`}
        {...props} 
        id={id}
        ref={ref}/>
    </div>
   )
  })
