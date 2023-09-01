import {useState, ChangeEvent, FormEvent} from 'react';
import './Login.module.css';
import Input from "../../components/login/Input.tsx";
import FormExtra from "../../components/login/FormExtra.tsx";
import FormAction from "../../components/login/FormAction.tsx";
import axios from 'axios';
import {loginFields} from "../../constants/formFields.ts";
import Cookies from "universal-cookie";
import {useNavigate} from 'react-router-dom';


const cookies = new Cookies();

const fields = loginFields;
let fieldsState: any = {};
fields.forEach(field => fieldsState[field.id] = '');

export function Login() {
    const navigate = useNavigate();

    const [loginState, setLoginState] = useState(fieldsState);

    const [error, setError] = useState<string>();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLoginState({...loginState, [e.target.id]: e.target.value});
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        authenticateUser();
    }

    async function authenticateUser() {
        try {
            const {data} = await axios.post(
                'http://localhost:3000/api/auth/login',
                JSON.stringify(loginState),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    }
                }
            );

            cookies.set("token", data.accessToken, {
                path: "/",
            });

            if (data.isAdmin) {
                cookies.set("is_admin", data.isAdmin, {
                    path: "/",
                });

                navigate("/dashboard");
            } else {
                navigate("/");
            }

        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data);
            } else {
                setError('An unexpected error occurred');
            }
        }
    }

    return (
        <>
            <div className="flex flex-wrap justify-center items-center">
                <div className="w-5/12">
                    <h3>Fazer login</h3>
                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                        <div className="-space-y-px">
                            {
                                fields.map(field =>
                                    <Input
                                        key={field.id}
                                        handleChange={handleChange}
                                        value={loginState[field.id]}
                                        labelText={field.labelText}
                                        labelFor={field.labelFor}
                                        id={field.id}
                                        name={field.name}
                                        type={field.type}
                                        isRequired={field.isRequired}
                                        placeholder={field.placeholder}
                                    />
                                )
                            }
                            <label className="text-red-500">{error}</label>
                        </div>

                        <FormExtra/>
                        <FormAction text={"Login"}/>

                    </form>
                </div>
            </div>
        </>
    )
}
