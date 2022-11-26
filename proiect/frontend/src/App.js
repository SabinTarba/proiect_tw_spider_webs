import { Routes, Route } from 'react-router-dom';
import Dashboard from './component/Dashboard';
import Login from './component/Login/Login';

const App = () => {


  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/*' element={<Login />} />

      <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
  )
}


export default App
