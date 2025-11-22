// src/pages/Home.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { increment } from './redux/counterSlice';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    // Access the count from the Redux store
    const count = useSelector((state) => state.counter.count);
    const dispatch = useDispatch();

    return (
        <div>
            <Helmet>
                <title>iPhone - Apple (IN)</title>
                <meta name="Description" content="Designed for Apple Intelligence. Discover iPhone 17 Pro, iPhone Air and iPhone 17, along with iPhone 16 and iPhone 16e."></meta>
                <meta property="og:image" content="https://www.apple.com/in/iphone/home/images/meta/iphone__cud4q04omsuq_og.png?202511052229"></meta>
            </Helmet>
            <h1>Home Page (SSR Working!)</h1>
            <p>This content is rendered on the server and hydrated on the client.</p>

            <hr />

            <h2>Redux Counter Example</h2>
            <p>Current Count: **{count}**</p>
            <button type='button' onClick={() => dispatch(increment())}>
                Increment
            </button>

            <hr />

            <nav>
                <p><Link to="/about">Go to About Page</Link></p>
                <p><Link to="/posts">Go to Posts Page</Link></p>
            </nav>
        </div>
    );
};

export default Home;
