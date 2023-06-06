import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = function() {
  return (
    <section class="header">
      <div class="navbar navbar-dark bg-dark">
        <div class="navbar_text">
          <h1 class="greeting">
            Search for books
          </h1>
        </div>
        <form action="#" id="navbar-search" class="navbar_search" novalidate="novalidate">
          <input type="search" name="search" class="input navbar_input" placeholder="Enter your book name here..." />
        </form>
      </div>
    </section>
  );
}

export default App;
