import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/layout/NavBar.jsx';
import Container from './components/layout/Container.jsx';
import Home from './components/pages/Home.jsx';
import CreateGame from './components/pages/CreateGame.jsx';
import ListGame from './components/pages/ListGame.jsx';

function App() {
  return (
    <>
      <div>

        <BrowserRouter>

          <Container>

            <Routes>
              <Route path='/' element={<NavBar/>}>

                <Route path='/' element={<Home/>}/>
                <Route path='/newGame' element={<CreateGame/>}/>
                <Route path='/listGame' element={<ListGame/>}/>

              </Route>
            </Routes>

          </Container>

        </BrowserRouter>

      </div>
    </>
  )
}

export default App
