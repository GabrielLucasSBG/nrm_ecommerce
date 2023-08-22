// import {useState} from 'react'
import './App.css'
import {Router} from "./routes/Routes.tsx";
import {Header} from "./components/layout/Header.tsx";

function App() {
    // const [count, setCount] = useState(0)

    return (
        <>
            <Header/>
            <Router/>
        </>
    )
}

export default App
