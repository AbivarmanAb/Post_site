import React from 'react'
import { Link, Outlet } from 'react-router-dom'
export const PostLayout = () => {
  return (
    <>
     <li><Link to="/Postpage/1">Post 1</Link></li>
        <br></br>
            <li><Link to ="/Postpage/2">Post 2</Link></li>
            <br></br>
            <li><Link to ="/Postpage/3">Post 3</Link></li>
            <br></br>
            <li><Link to ="/Postpage/newpost">NewPost</Link></li>
            <Outlet/>
    </>
  )
}
