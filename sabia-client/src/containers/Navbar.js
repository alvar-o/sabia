import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { ReactComponent as Logo } from '../images/sabia-logo.svg'
import { logout } from "../store/actions/auth";

const Navbar = ({ currentUser, logout }) => (
    <nav className="navbar navbar-expand">
        <div className="container-fluid">
        <div className="d-flex align-items-center">
            <Link className="navbar-brand" to="/">
                <Logo />
            </Link>
            {currentUser.isAuthenticated && (
                <Link className="navbar-username" to={`/users/${currentUser.user.username}`}>
                    @{currentUser.user.username}
                </Link>
            )}
        </div>
            {currentUser.isAuthenticated  ? (
                <ul className="nav navbar-nav navbar-right">
                    <li>
                        <button onClick={ logout }>Log out</button>
                    </li>
                </ul>
            ) : (
                <ul className="nav navbar-nav navbar-right">
                    <li>
                        <Link to="/signup">Sign up</Link>
                    </li>
                    <li>
                        <Link to="/signin">Log in</Link>
                    </li>
                </ul>
            )}
        </div>
    </nav>
)

const maStateToProps = state => ({
    currentUser: state.currentUser
})

export default connect(maStateToProps, { logout } )(Navbar);