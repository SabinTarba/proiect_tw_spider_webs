import { useState } from 'react';
import PROFESSOR_SERVICE from './PROFESSOR_SERVICE.js';


const App = () => {

  const [id, setId] = useState(null);
  const [rowsAffected, setRowsAffected] = useState(null);


  const handleClick = () => {

    PROFESSOR_SERVICE.deleteProfessorById(id).then((res) => {
      if (res.status === 200) {
        setRowsAffected(res.data.rowsAffected)
      }
    })

  }

  return (
    <div>
      <button onClick={() => handleClick()}>Delete</button>
      <input type={"text"} onChange={(e) => setId(e.target.value)} />

      {
        rowsAffected == null ? null : <p>Rows affected: {rowsAffected}</p>
      }

    </div>
  )
}


export default App
