import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Main = function() {
    return (
        <section className="main">
            <h1 className="results">Found x results</h1>
            <div className="api"></div>
        </section>
    );
}

export default Main;