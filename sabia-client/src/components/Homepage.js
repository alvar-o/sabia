import { Fragment, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import MessageTimeline from "../containers/MessageTimeline";
import { ReactComponent as Logo } from '../images/sabia-logo.svg'

export const Hero = () => {
    useEffect(() => {
        document.body.classList.remove(...document.body.classList);
        document.body.classList.add('not-logged-in')
    })
    return (
        <Fragment>
            <Logo />
            <h1>Stay in the loop</h1>
            <Link
                to='/signup'
                className="btn btn-outline-primary">
                Sign up now
            </Link>
            <Link
                to='/signin'
                className="btn btn-outline-primary">
                Log back in
            </Link>

        </Fragment>
    )
}

export const Homepage = ({ currentUser }) => {
    if (!currentUser.isAuthenticated) {
        return (
            <div className="home-container">
                <div className="hero">
                    <Outlet />
                </div>
            </div>
        )
    }
    return (
        <MessageTimeline currentUser={currentUser} />
    )
}

