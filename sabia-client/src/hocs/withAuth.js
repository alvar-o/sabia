import { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router";

export default (Component) => {
    // create the Authenticate component
    const Authenticate = props => {
        // on every update, check if user is authenticated
        // if not, redirect to signin
        const navigate = useNavigate();
        useEffect(() => {
            if (!props.isAuthenticated) {
                navigate('/signin')
            }
        })

        // return the received Component
        return (
            <Component { ...props } />
        )
    }

    const mapStateToProps = state => ({
        isAuthenticated: state.currentUser.isAuthenticated
    })

    const Wrapped = connect(mapStateToProps)(Authenticate)
    return <Wrapped />
}