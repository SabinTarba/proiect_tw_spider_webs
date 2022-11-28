import { useState } from 'react'
import { useEffect } from 'react';
import { getLoggedUser } from '../utils/auth.js';
import { Routes, useNavigate, Route } from 'react-router-dom';
import PROFESSOR_SERVICE from '../services/PROFESSOR_SERVICE.js';
import NavBar from './NavBar.jsx';
import StudentsList from './StudentsList.jsx';
import AddStudent from './AddStudent.jsx';


const Dashboard = () => {


    const [students, setStudents] = useState([]);

    const navigate = useNavigate();
    const loggedUser = getLoggedUser();



    useEffect(() => {
        if (!loggedUser)
            navigate("/")
        else {

            PROFESSOR_SERVICE.getAllStudents(loggedUser.id).then((res) => {
                if (res.status === 200) {
                    setStudents(res.data.students);
                }
            })
        }

    }, [loggedUser, navigate])

    return (

        <>
            <NavBar />
            <Routes>
                <Route path='/students-list' element={<StudentsList students={students} />} />
                <Route path='/add-student' element={<AddStudent />} />
            </Routes>
        </>
    );
}


export default Dashboard