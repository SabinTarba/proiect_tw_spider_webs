import React from 'react'


const Alert = ({ message, bgColor }) => {

    return (
        <div style={{
            backgroundColor: bgColor,
            marginTop: "20px",
            padding: "15px",
            borderRadius: "10px",
            color: "white",
            boxShadow: "2px 2px 2px 2px " + bgColor,
            textAlign: "center"
        }}>{message}</div>
    )
}

export default Alert