import { connect } from "react-redux";
import { Routes, Route, useNavigate, useLocation } from "react-router";
import AuthForm from "../components/AuthForm";
import { Homepage, Hero } from "../components/Homepage";
import { authUser } from "../store/actions/auth";
import { removeError } from "../store/actions/errors";
import MessageTimeline from "./MessageTimeline";
import NoMatch from "../components/NoMatch";

const Main = ({currentUser, errors, ...authProps}) => {
    const router = {
        navigate: useNavigate(),
        location: useLocation()
    }

    // if (errors?.message) {
    //     return <Errors errors={errors} />
    // }

    return (
        <Routes>
            <Route path='/' element={ <Homepage currentUser={currentUser} /> }>
                <Route index element={<Hero/>} />
                <Route
                    path='signin'
                    element={
                        <AuthForm
                            {...authProps}
                            errors={errors}
                            router={router}
                            buttonText='Log in'
                            heading='Welcome back.'
                        />
                    }
                />
                <Route
                    path='signup'
                    element={
                        <AuthForm
                            {...authProps}
                            errors={errors}
                            router={router}
                            buttonText='Create an account'
                            heading='Welcome to Sabiá.'
                            signup
                        />
                    }
                />
                <Route
                    path='users/:username'
                    element={
                        <MessageTimeline currentUser={currentUser} />
                    }
                />
            </Route>

            <Route 
                path='*'
                element={<NoMatch />} />
        </Routes>
    )
}

const mapStateToProps = state => ({
    currentUser: state.currentUser,
    errors: state.errors
})

export default connect(mapStateToProps, { authUser, removeError })(Main)