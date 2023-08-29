import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix
} from "@material-tailwind/react";
import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    PowerIcon,
} from "@heroicons/react/24/solid";

import {useNavigate} from "react-router-dom";

export function Sidebar() {
    const navigate = useNavigate();

    const navigateToUsers = () => {
        navigate('/users', {replace: true});
    };

    return (
        <Card className="flex flex-col h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
            <div className="mb-2 p-4">
                <Typography variant="h5" color="blue-gray">
                    Sidebar
                </Typography>
            </div>
            <List>
                <ListItem onClick={navigateToUsers}>
                    <ListItemPrefix>
                        <PresentationChartBarIcon className="h-5 w-5 mr-2"/>
                    </ListItemPrefix>
                    Users
                </ListItem>
                <ListItem>
                    <ListItemPrefix>
                        <ShoppingBagIcon className="h-5 w-5 mr-2"/>
                    </ListItemPrefix>
                    Products
                </ListItem>
                <ListItem>
                    <ListItemPrefix>
                        <PowerIcon className="h-5 w-5 mr-2"/>
                    </ListItemPrefix>
                    Log Out
                </ListItem>
            </List>
        </Card>
    );
}
