import React from 'react'
import { Link, useParams } from 'react-router-dom'

const PostPage = ({posts,handleDelete}) => {
  const {id}= useParams();
  const post = posts.find(post=>(post.id).toString()=== id);
  
  return (
    <main className='postpage'>
      <article className='post'>
        {post &&
<> <h2>{post.title}</h2>
<p className='postdate'>{post.datetime}</p>
<p className='postbody'>{post.body}</p>
<Link to={`/edit/${post.id}`}>
<button className='editpost'>Edit post</button></Link>
<button onClick={()=>handleDelete(post.id)}>Delete Post</button>

</>}
{!post &&
<>
<h2>post not found</h2>
<p>well, that's disappointing</p>
<p>
  <Link to='/'>visit our homepage</Link>
</p>

</>

}


      </article>
        

    </main>
  )
}

export default PostPage