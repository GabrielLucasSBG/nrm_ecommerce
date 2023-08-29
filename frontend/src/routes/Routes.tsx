import {Routes, Route} from 'react-router-dom';
import {Login} from '../pages/login/Index.tsx';
import {Home} from '../pages/home/Index.tsx';
import {Dashboard} from "../pages/dashboard/Index.tsx";
import {Users} from "../pages/users/Users.tsx";

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/users" element={<Users/>}/>
            {/*<Route path="/signup" element={<login />} />*/}
        </Routes>
    );
}