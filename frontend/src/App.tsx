// import {useState} from 'react'
import './App.css'
import {Router} from "./routes/Routes.tsx";
import {Header} from "./components/layout/Header.tsx";
import {BrowserRouter} from "react-router-dom";

function App() {
    // const [count, setCount] = useState(0)

    return (
        <>
            <Header/>
            <BrowserRouter>
                <Router/>
            </BrowserRouter>
        </>
    )
}

export default App
