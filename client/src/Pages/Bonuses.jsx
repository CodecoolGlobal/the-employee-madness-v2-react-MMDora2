import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Bonuses = () => {
  const { employeeId } = useParams();
  const [bonusValue, setBonusValue] = useState('');
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    fetch(`/api/employees/${employeeId}`)
      .then((response) => response.json())
      .then((data) => setEmployee(data))
      .catch((error) => console.error('Error:', error));
  }, [employeeId]);

  const handleBonusChange = (event) => {
    setBonusValue(event.target.value);
  };

  const handleSaveBonus = () => {
    fetch(`/api/bonus/${employeeId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ value: bonusValue }),
    })
      .then((response) => response.json())
      .then((data) => {
        setEmployee(data);
        setBonusValue('');
      })
      .catch((error) => console.error('Error saving bonus:', error));
  };

  return (
    <div>
      {employee && (
        <>
          <h2>{employee.name}</h2>
          <p>Position: {employee.position}</p>
          <div>
            <label htmlFor="bonusInput">Bonus: </label>
            <input
              type="number"
              id="bonusInput"
              value={bonusValue}
              onChange={handleBonusChange}
            />
            <button onClick={handleSaveBonus}>Save Bonus</button>
          </div>
          <h3>Bonuses:</h3>
          <ul>
            {employee.bonuses.map((bonus, index) => (
              <li key={index}>{bonus.value}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Bonuses;