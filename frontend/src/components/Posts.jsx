import React from 'react'
import Post from './Post'

export const Posts = () => {
  return (
    <div>
        {
            [1,2,3,4].map((items,index)=><Post key ={index}/>)
        }
    </div>
  )
}
export default Posts