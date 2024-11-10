import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Feed from "./pages/Feed"
import Scroll from "./pages/Scroll"

function App() {


  return (

    <BrowserRouter>
      <Routes>
        <Route path='/scroll' element={<Scroll />} />
        <Route path='/' element={<Login />} />
        <Route path='/feed' element={<Feed />} />
      </Routes>
    </BrowserRouter>


  )
}

export default App
