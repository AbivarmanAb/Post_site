import Headers from "./Headers";
import Nav from "./Nav";
import Home from "./Home"
import About from "./About";
import PostPage from "./PostPage";
import NewPost from "./NewPost";
import Sign from "./Sign ";
import Missing from "./Missing";
import Footer from "./Footer";
import Post from "./Post";
import {   Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {format} from "date-fns";
import api from "./api/posts";
import Edit from "./Edit";



function App() {
  const [posts, setPosts]=useState([])
  const [ search, setSearch]= useState('')
  const [postTitle,setPostTitle]=useState('')
  const [postBody,setPostBody]=useState('')
  const [editTitle,setEditTitle]=useState('')
  const [editBody,setEditBody]=useState('')
  const [searchResult,setSearchResult]=useState([])
  const navigate =useNavigate()
  useEffect(() =>{
    const fetchPosts = async ()=>{
      try{
      const response = await api.get('/posts');
      setPosts(response.data);
      }catch(err){
        if(err.response){
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else{
          console.log(`Error:${err.message}`);
        }
        }
      }
    
    fetchPosts();
},[])

useEffect (()=>{ 
 const filterResult = posts.filter((post)=>
((post.body).toLowerCase()).includes(search.toLowerCase())
|| ((post.title).toLowerCase()).includes(search.toLowerCase()))

setSearchResult(filterResult.reverse());

},[posts,search])


  const handleSubmit =async(e)=>{
    e.preventDefault();
    const id = posts.length? posts[posts.length -1].id+1:1;
    const datetime = format(new Date(), 'MMMM dd,yyyy pp' )
    const newPost ={id, title: postTitle, datetime, body: postBody};
    try {
      const response = await api.post('/posts',newPost)
    const allposts = [...posts,response.data];
    setPosts(allposts);
    setPostTitle('');
    setPostBody('');
    navigate('/');
  }catch(err){
console.log(`Error:${err.message}`)
  }
}
const handleEdit =async (id)=>{
  const datetime = format (new Date(), 'MMMM dd, yyyy pp');
  const updatePost ={id, title:editTitle,datetime,body:editBody};
  try {
    const response = await api.put(`/posts/${id}`,updatePost)
    setPosts(posts.map(post => post.id===id?{...response.data}:post));
    setEditTitle('')
    setEditBody('')
    navigate('/')
  } catch (err) {
    console.log(`Error: ${err.message}`)
  }
}

  const handleDelete =async(id)=>{
    try{
      await api.delete(`/posts/${id}`)
    
    const postsList = posts.filter(post=>post.id !== id);
    setPosts(postsList);
    navigate('/');
    }
    catch(err){
      console.log(`Error:${err.message}`)
    }
    }
  return (
    <div className="App">
   <Headers title="Super Up"/>
   <Nav
   search={search}
   setSearch={setSearch}
   />
   <Routes>
       <Route path="/" element ={<Home posts ={searchResult}/>}/>
   
   <Route path="post"> 
   <Route index element={<NewPost
   handleSubmit={handleSubmit}
   postTitle={postTitle}
   postBody={postBody}
   setPostBody={setPostBody}
   setPostTitle={setPostTitle}
   
   />}/>
   <Route path=":id" element={<PostPage posts ={posts} 
     handleDelete={handleDelete}  
   />}/>
   </Route>
   <Route path="/edit/:id" element={<Edit
   posts={posts}
   handleEdit={handleEdit}
   editBody={editBody}
   setEditBody={setEditBody}
   editTitle={editTitle}
   setEditTitle={setEditTitle}/>}/>
   <Route path="*" element={<Missing/>}/>
   <Route path="sign"element={<Sign/>}/>
   <Route path="about" element ={<About/>}/>
   </Routes>
   <Footer/>
  
    </div>
  );
}

export default App;
