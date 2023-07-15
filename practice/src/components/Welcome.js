import React from "react";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/App.css';
import { useLocation, useNavigate } from 'react-router-dom';

const Welcome = () => {

    const navigate = useNavigate();

    const navigation = () => {
        navigate('/main');
    }

    return (
        <section className="welcome">
            <h1 className="welcome-header">Welcome to the wonderful world of literature!</h1>
            <p className="welcome-text">
                <img src="../img/small-book.png"/>
                Using our app, you can easily find information about your favorite books and purchase them on Google.
            </p>
            <button className="navigation-button"  onClick={navigation}>Start!</button>
        </section>
    )
}

export default Welcome;