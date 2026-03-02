import './PostCard.css';
import { useState } from 'react';


function PostCard({ id, title, excerpt, body, author, date, category, featured, onSelect }) {


    const [expanded, setExpanded] = useState(false);
    const [selected, setSelected] = useState(false);
    function expand() {
        if (expanded) {
            setExpanded(!true);
        }
        else {
            setExpanded(true);
        }
    }

    function smoothScrollToTop(duration = 600) {
        const start = window.scrollY;
        const startTime = performance.now();

        function scrollStep(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const ease = 1 - Math.pow(1 - progress, 3);

            window.scrollTo(0, start * (1 - ease));

            if (progress < 1) {
                requestAnimationFrame(scrollStep);
            }
        }

        requestAnimationFrame(scrollStep);
    }
    function HandleonSelect() {
        setSelected(true);

        onSelect();

        smoothScrollToTop();
    }


    return (
        <>

            <div className='container' style={{ animationDelay: `${id * 1000}ms` }}>
                <header>
                    <div className='top'><h3>{title}</h3>
                        <p className='category'>({category})</p>
                    </div>

                    <p className='excerpt'>{excerpt}</p>
                </header>

                <div className='card-body'>

                    {expanded && <p className='full-text'>{body}</p>}
                </div>
                <footer>
                    <span className='card-author'>By {author}         </span>
                    <time dateTime={date} className="card-date">
                        {new Date(date).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </time>
                </footer>
                <button className='expand' onClick={HandleonSelect}>Read more</button>
            </div>


        </>


    )
}

export default PostCard;







