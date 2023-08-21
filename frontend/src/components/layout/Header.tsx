// import {useState} from 'react'

export function Header(props: { title: string, description: string, navLink: object}) {
    return (
        <>
            <header className="app-header">
                <section className="app-title">
                    <h1>{props.title}</h1>
                    <small>{props.description}</small>
                </section>
                <span className="fill-space"/>
                {/*<section className="app-links">*/}
                {/*    {links &&*/}
                {/*        links.map((link: NavLink) => (*/}
                {/*            <AppHeaderNavLink*/}
                {/*                label={link.label}*/}
                {/*                route={link.route}*/}
                {/*                key={link.label}*/}
                {/*            />*/}
                {/*        ))}*/}
                {/*</section>*/}
            </header>
        </>
    )
}