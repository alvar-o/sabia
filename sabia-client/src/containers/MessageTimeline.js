import { useEffect, useLayoutEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { connect } from "react-redux";
import { fetchMessages, removeMessage } from "../store/actions/messages";
import MessageForm from "./MessageForm";
import MessageList from "../components/MessageList"
import UserAside from "../components/UserAside";
import ErrorMessage from '../components/ErrorMessage';

const MessageTimeline = ({ 
    currentUser,
    messages,
    userProfileImage,
    errorMessage,
    fetchMessages,
    removeMessage }) => {
    const username = useParams().username;
    const navigate = useNavigate();
    const location = useLocation();
    
    useLayoutEffect(() => {
        if (!currentUser.isAuthenticated) navigate('/');
        document.body.classList.remove(...document.body.classList);
        document.body.classList.add('logged-in')
    }, [currentUser.isAuthenticated, navigate])

    useEffect(() => {
        fetchMessages(username);
        document.title = 'Sabiá' + (username ? ` | @${username}` : '');
        document.body.classList.add('logged-in');
    }, [fetchMessages, username, location]);

    return (
        <div className="row justify-content-center" style={{maxWidth: '760px', margin: '0 auto'}}>
            {!!username && (
                <UserAside
                    username={username}
                    profileImageUrl={userProfileImage} />
            )
            }
            <div className="row col-sm-9 justify-content-center">
                {errorMessage && (
                    <ErrorMessage message={errorMessage} />
                )}
                {(!username || (username === currentUser.user.username))  && (
                    <MessageForm />
                )}
                <MessageList 
                    username={username}
                    messages={messages}
                    userId={currentUser.user.id}
                    removeMessage={removeMessage} />
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    currentUser: state.currentUser,
    messages: state.messages,
    userProfileImage: state.userProfileImage,
    errorMessage: state.errors.message
})

export default connect(mapStateToProps, { fetchMessages, removeMessage })(MessageTimeline);