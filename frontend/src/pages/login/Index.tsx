// import {useState} from 'react'
import './Login.module.css'

export function Login() {
    // const [count, setCount] = useState(0)

    return (
        <>
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
