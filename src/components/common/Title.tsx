import React from 'react'

interface Props{
    title: string
}

export const Title = (props:Props) => {
  return (
    <div>
        <h1 className='text-3xl font-bold mb-5 text-green-500'>{props.title}</h1>
    </div>
  )
}
