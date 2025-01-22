import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const currency = '$'

    const calculateAge = (dob)=>{
        const today = new Date()
        const birthDate = new Date(dob)

        let age = today.getFullYear()-birthDate.getFullYear()
        return age
    }

    const months = [
        " ", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];
    
      const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_');
        return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2];
      };

      const formatSlotTime = (time) => {
        if (!time) return 'N/A';
      
        const [hours, minutes] = time.split(':');
        let formattedHours = parseInt(hours, 10);
        const period = formattedHours >= 12 ? 'PM' : 'AM';
      
        if (formattedHours > 12) formattedHours -= 12;
        if (formattedHours === 0) formattedHours = 12;
      
        return `${formattedHours}:${minutes} ${period}`;
      };
      

    const value = {
        calculateAge,
        slotDateFormat,formatSlotTime,
        currency
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
