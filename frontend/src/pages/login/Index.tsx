// import {useState} from 'react'
import './Login.module.css'
import {Header} from "../../components/layout/Header.tsx";

export function Login() {
    // const [count, setCount] = useState(0)

    return (
        <>
            <Header title={"Login"} description={"Login page"} navLink={{}} />
            <div className="grid grid-rows-2 grid-flow-col gap-4">
                <div className="row-start-2 row-span-2">
                    <form>
                        <h3>Já tem uma conta?</h3>
                    </form>
                </div>

                <div className="row-start-2 row-span-2">
                    <h3>Novo cliente</h3>
                </div>
            </div>
        </>
    )
}
