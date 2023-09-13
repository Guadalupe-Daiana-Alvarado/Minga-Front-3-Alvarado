// ButtonForm.jsx
import React from 'react';

const ButtonForm = ({ label }) => {
    return (
        <button type="submit" className="btn btn-primary">
            {label}
        </button>
    );
}

export default ButtonForm;
