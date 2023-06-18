import React from "react";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/App.css';

const Welcome = () => {
    return (
        <section className="welcome">
            <h1 className="welcome-header">Welcome to the wonderful world of literature!</h1>
            <p className="welcome-text">
                <img src="../img/small-book.png"/>
                Using our app, you can easily find information about your favorite books and purchase them on Google.
            </p>
        </section>
    )
}

export default Welcome;