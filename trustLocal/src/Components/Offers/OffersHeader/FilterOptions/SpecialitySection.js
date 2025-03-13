import React from 'react';
import { Button } from '@mui/material';

const Speciality = ({ specialities, setSpecialities, isDarkMode }) => {
  const allSpecialities = ['Klient', 'Adwokat', 'Notariusz', 'Doradca Prawny'];

  const handleSpecialityClick = (selectedSpeciality) => {
    if (!specialities) {
      setSpecialities([selectedSpeciality]);
    } else if (specialities.includes(selectedSpeciality)) {
      setSpecialities(specialities.filter((sp) => sp !== selectedSpeciality));
    } else {
      setSpecialities([...specialities, selectedSpeciality]);
    }
  };

  return (
    <>
      <div>
        {allSpecialities.map((sp) => (
          <Button
            key={sp}
            onClick={() => handleSpecialityClick(sp)}
            className={`filter-content-button ${isDarkMode ? "dark-mode" : ""}`}
            variant={specialities && specialities.includes(sp) ? 'contained' : 'outlined'}
            sx={{
              backgroundColor: specialities && specialities.includes(sp) ? '#2196F3' : 'transparent',
              color: specialities && specialities.includes(sp) ? '#FFFFFF' : '#2196F3',
              '&:hover': {
                backgroundColor: specialities && specialities.includes(sp) ? '#1565C0' : 'transparent',
                borderWidth: '2px',
              },
              borderRadius: '24px',
              borderWidth: '2px', 
              borderColor: isDarkMode ? '#303436' : '#2196F3',
              fontWeight: 'bold', 
            }}
          >
            {sp}
          </Button>
        ))}
      </div>
    </>
  );
};

export default Speciality;
