import MessageItem from "./MessageItem";
import { ReactComponent as Logo } from '../images/sabia-logo.svg'

const MessageList = ({ username, messages, userId, removeMessage }) => {
    let messageList = messages.map(m => (
        <MessageItem 
            key={m._id}
            date={m.createdAt}
            text={m.text}
            username={m.user.username || username}
            profileImageUrl={m.user.profileImageUrl}
            removeMessage={() => removeMessage(m.user.username, m._id)}
            canRemove={userId === m.user._id} />
    ))

    return (
        <div className="col-12 mb-5">
            <ul className="list-group mb-3" id="messages">
                {messageList}
            </ul>
            <div className='d-flex'>
                <Logo style={{
                    width: '30px',
                    margin: '0 auto'
                }} />
            </div>
        </div>
    )
}

export default MessageList;