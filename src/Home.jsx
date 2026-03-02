
import PostCard from "./PostCard";
import Navbar from "./Navbar";
import './Home.css'
import { useState, useEffect } from 'react';

const Home = () => {

    const [selectedPost, setSelectedPost] = useState(null);

    const [posts, setPosts] = useState([]);
    const [currentPage, setPage] = useState(1);
    const [totalPosts, setTotalPosts] = useState(0);


    useEffect(() => {
        fetch(`http://localhost:3000/showPosts?page=${currentPage}&limit=6`)
            .then(response => response.json())
            .then(data => { setPosts(data.posts); setTotalPosts(data.total) })
            .catch(error => console.error('Error fetching posts:', error));
    }, [currentPage])

    const totalPages = Math.ceil(totalPosts / 3)
    return (

        <>
            <Navbar />
            <div className="max">


                <div className={`finalExpandWrapper ${selectedPost ? "show" : "hide"}`}>

                    <div className="expanded-post-wrapper">
                        {selectedPost && (
                            <div className={`expanded-post ${selectedPost.featured ? "featured" : ""}`}>

                                <div className="expanded-header">
                                    <div className="expanded-title">
                                        <h1>{selectedPost.title}</h1>
                                        <br></br>
                                        <br></br>
                                        <span className="expanded-category">{selectedPost.category}</span><br></br>
                                        <br></br>
                                    </div>

                                    <button
                                        className="close-btn"
                                        onClick={() => { setSelectedPost(null) }}
                                    >
                                        ✕
                                    </button>
                                </div>

                                <div className="expanded-meta">
                                    <span className="expanded-author">By {selectedPost.author}</span>
                                    <time>
                                        {new Date(selectedPost.date).toLocaleDateString(undefined, {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </time>
                                </div>

                                <p className="expanded-excerpt">
                                    {selectedPost.excerpt}
                                </p>

                                <div className="expanded-body">
                                    {selectedPost.body}
                                </div>

                            </div>
                        )}
                    </div>
                </div>
            </div>



            <div className={`card-wrapper ${selectedPost ? "down" : "up"}`}>
                <div className="cards">
                    {posts.map(post => (
                        <PostCard
                            key={post.id}
                            id={post.id}
                            title={post.title}
                            excerpt={post.excerpt}
                            body={post.body}
                            author={post.author}
                            date={post.date}
                            category={post.category}
                            featured={post.featured}
                            onSelect={() => { setSelectedPost(post) }}
                        />
                    ))}</div>


            </div>

            <div className="end-buttons">
                <div className="pagination">

                    <button onClick={() => {
                        if (currentPage > 1) {
                            setPage(currentPage - 1)
                        }
                    }}> ← Prev</button>
                    <button>{currentPage}</button>


                    <button onClick={() => {
                        if (currentPage < totalPages)
                            setPage(currentPage + 1)
                    }}>Next →
                    </button>
                </div>
            </div>

        </>
    )


}

export default Home;