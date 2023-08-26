import {Routes, Route} from 'react-router-dom';
import {Login} from '../pages/login/Index.tsx';
import {Home} from '../pages/home/Index.tsx';
import {Dashboard} from "../pages/dashboard/Index.tsx";

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/dashboard" element={<Dashboard/>} />
            {/*<Route path="/signup" element={<login />} />*/}
        </Routes>
    );
}