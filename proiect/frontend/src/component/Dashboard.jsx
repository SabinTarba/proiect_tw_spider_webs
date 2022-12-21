import { useEffect } from 'react';
import { getLoggedUser } from '../utils/auth.js';
import { Routes, useNavigate, Route } from 'react-router-dom';
import NavBar from './NavBar.jsx';
import StudentsList from './StudentsList.jsx';
import AddStudent from './AddStudent.jsx';


const Dashboard = () => {


    const navigate = useNavigate();
    const loggedUser = getLoggedUser();



    useEffect(() => {
        if (!loggedUser)
            navigate("/")

    }, [loggedUser, navigate])

    return (

        <>
            <NavBar />
            <Routes>
                <Route path='/students-list' element={<StudentsList />} />
                <Route path='/add-student' element={<AddStudent />} />
            </Routes>
        </>
    );
}


export default Dashboard