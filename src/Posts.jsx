// src/pages/Posts.jsx (New component)
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';

const Posts = () => {
  const posts = useSelector((state) => state.dataReducer.posts);
  const status = useSelector((state) => state.dataReducer.status);
  const error = useSelector((state) => state.dataReducer.error);

  if (status === 'loading') {
    return <div>Loading posts... (Should only appear on client nav)</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Helmet>
        <title>Posts Page</title>
        <meta name="description" content="Posts Page." />
      </Helmet>
      <h1>Posts Page</h1>
      <p>Data fetched via Axios/Redux Thunk on the **server side**.</p>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <p>{post.body.substring(0, 50)}...</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
