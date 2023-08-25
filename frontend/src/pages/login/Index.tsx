import {useState, ChangeEvent, FormEvent} from 'react';
import './Login.module.css';
import Input from "../../components/login/Input.tsx";
import FormExtra from "../../components/login/FormExtra.tsx";
import FormAction from "../../components/login/FormAction.tsx";
import axios from 'axios';
import {loginFields} from "../../constants/formFields.ts";

const fields = loginFields;
let fieldsState: any = {};
fields.forEach(field => fieldsState[field.id] = '');

export function Login() {
    const [loginState, setLoginState] = useState(fieldsState);

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

            return data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log('error message: ', error.message);
                return error.message;
            } else {
                console.log('unexpected error: ', error);
                return 'An unexpected error occurred';
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
                        </div>

                        <FormExtra/>
                        <FormAction text={"Login"}/>
                    </form>
                </div>
            </div>
        </>
    )
}
