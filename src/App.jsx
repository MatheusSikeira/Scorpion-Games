import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/layout/NavBar.jsx';
import Container from './components/layout/Container.jsx';
import Home from './components/pages/Home.jsx';
import CreateGame from './components/pages/CreateGame.jsx';
import ListGame from './components/pages/ListGame.jsx';
import TelaLogin from './components/pages/Login.jsx';
import CadastroUsuario from './components/pages/CreateUser.jsx';
import GameDetail from './components/pages/GameDetail.jsx';
import UpdateGame from './components/pages/UpdateGame';
import 'react-toastify/dist/ReactToastify.css';

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
                <Route path='/login' element={<TelaLogin/>}/>
                <Route path='/cadastro' element={<CadastroUsuario/>}/>
                <Route path='/gamedetail/:id_game' element={<GameDetail/>}/>
                <Route path="/updateGame/:id_game" element={<UpdateGame />} />

              </Route>
            </Routes>

          </Container>

        </BrowserRouter>

      </div>
    </>
  )
}

export default App
