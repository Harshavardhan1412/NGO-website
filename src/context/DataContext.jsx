import { createContext, useContext, useState } from 'react';
import { staffList, elderlyList, medicineList, rationList, donorList, volunteerList } from '../data/mockData';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [staff, setStaff] = useState(staffList);
  const [residents, setResidents] = useState(elderlyList);
  const [medicines, setMedicines] = useState(medicineList);
  const [rations, setRations] = useState(rationList);
  const [donations, setDonations] = useState(donorList);
  const [volunteers, setVolunteers] = useState(volunteerList);

  const value = {
    staff, setStaff,
    residents, setResidents,
    medicines, setMedicines,
    rations, setRations,
    donations, setDonations,
    volunteers, setVolunteers
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export const useData = () => useContext(DataContext);
