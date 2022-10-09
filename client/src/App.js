//import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min"
// import Navbaar from './components/Navbaar';
import Home from './components/home';
import Register from './components/Register';
import Details from './components/Details';
import Edit from './components/edit';

function App() {
  return (
    <Router>
      
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div
        className="navigation-menu">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/register">Registro</Link>
            </li>
          
           
          </ul>
          </div>
        </nav>

        {/* 👇️ Wrap your Route components in a Routes component */}
        <Routes>
          <Route path="/Register" element={<Register />} />
          {/* 👇️ handle dynamic path */}
          <Route path="/view/:id" element={<Details />} />
          <Route path="/" element={<Home />} />
          <Route path="/edit/:id" element={<Edit />} />
          {/* 👇️ only match this when no other routes match */}
          <Route
            path="*"
            element={
              <div>
                <h2>404 Page not found etc</h2>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  


 
  );
}

// function Home() {
//   return <h2>Home</h2>;
// }

function About() {
  return <h2>About</h2>;
}

function Users() {
  const params = useParams();

  return <h2>Users: {params.userId}</h2>;
}

export default App;
