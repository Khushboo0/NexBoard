import { createContext,useContext,useState,useEffect } from "react";

const ThemeContext = createContext();

export const useTheme =()=> useContext(ThemeContext);
export const ThemeProvider = ({children})=>{
    const [darkMode,setDarkMode] = useState(()=>{
        const savedMode = localStorage.getItem('darkMode');
        return savedMode ? JSON.parse(savedMode) : 
        window.matchMedia('(prefers-color-scheme: dark)').matches;
    });
    useEffect(()=>{
        localStorage.setItem('darkMode',JSON.stringify(darkMode));
        if(darkMode){
            document.documentElement.classList.add('dark');
        }else{
            document.documentElement.classList.remove('dark')
        }

    },[darkMode]);

    const toggleTheme = ()=>{
        setDarkMode(prev => !prev)
    }

    return(
        <ThemeContext.Provider value={{ darkMode,toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}