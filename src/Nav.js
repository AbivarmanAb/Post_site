import React from 'react'
import { Link } from 'react-router-dom'

const Nav = ({search,setSearch}) => {
  return (
    <nav className='nav'>
        <form className='form'onSubmit={(e)=>e.defaultPrevented()}>
        <label htmlFor='search'>Search Posts</label>
        <input
        id="search"
        type='text'
        placeholder='search Posts'
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
/>
        </form>
    <ul>
    <li><Link to="/">Home</Link></li>
    <li><Link to="post">Post</Link></li>
    <li><Link to="about">About</Link></li>
    <li><Link to="sign">Sign</Link></li>


    </ul>
    
    
    </nav>
  )
}

export default Nav