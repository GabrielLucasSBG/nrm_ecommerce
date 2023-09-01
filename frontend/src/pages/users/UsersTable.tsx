import {PencilIcon} from "@heroicons/react/24/solid";
import {
    ArrowDownTrayIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
    IconButton,
    Tooltip
} from "@material-tailwind/react";
import axios from "axios";

import Cookies from "universal-cookie";
import {useState, useEffect} from "react";

const cookies = new Cookies();

interface User {
    id: number,
    name: string,
    email: string,
    is_admin: number
}

export function UsersTable() {
    const [usersState, setusersState] = useState<User[]>([]);

    useEffect(() => {
        users();
    }, []);

    async function users() {
        try {
            const {data} = await axios.get<User[]>(
                'http://localhost:3000/api/users/all', {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        authorization: cookies.get('token')
                    }
                }
            );


            setusersState(data);
        } catch (error) {
            // if (axios.isAxiosError(error)) {
            //     setError(error.response?.data);
            // } else {
            //     setError('An unexpected error occurred');
            // }
        }
    }

    const TABLE_HEAD = ["ID", "Name", "Email", "Admin", ""];

    return (
        <>
            <Card className="h-full w-full">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                Users
                            </Typography>
                        </div>
                        <div className="flex w-full shrink-0 gap-2 md:w-max">
                            <div className="w-full md:w-72">
                                <label className="relative text-gray-400 focus-within:text-gray-600">
                                    <input type="text" placeholder="Buscar" className="w-full py-1 pl-6 text-gray-500 border rounded-md
                                        outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"/>

                                    <button>
                                        <MagnifyingGlassIcon
                                            className="w-5 h-5 absolute top-1/2 transform -translate-y-1/2 right-1"/>
                                    </button>
                                </label>
                            </div>
                            <Button className="flex items-center gap-3" size="sm">
                                <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4"/> Download
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="overflow-scroll px-0">
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th
                                    key={head}
                                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                >
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {usersState.map(
                            (
                                {
                                    id,
                                    name,
                                    email,
                                    is_admin,
                                },
                                index,
                            ) => {
                                const isLast = index === usersState.length - 1;
                                const classes = isLast
                                    ? "p-4"
                                    : "p-4 border-b border-blue-gray-50";

                                return (
                                    <tr key={name}>
                                        <td className={classes}>
                                            <div className="flex items-center gap-3">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-bold"
                                                >
                                                    {id}
                                                </Typography>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {name}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {email}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {is_admin ? "Sim" : "Não"}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Tooltip content="Edit User">
                                                <IconButton variant="text">
                                                    <PencilIcon className="h-4 w-4"/>
                                                </IconButton>
                                            </Tooltip>
                                        </td>
                                    </tr>
                                );
                            },
                        )}
                        </tbody>
                    </table>
                </CardBody>
            </Card>
        </>
    );
}