import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import DefaultProfileImg from '../images/default-profile-image.jpg';
import { TrashIcon } from '@primer/octicons-react'

export default ({ date, profileImageUrl, username, text, removeMessage, canRemove }) => (
    <div className='list-group-item'>
        <img 
            src={profileImageUrl || DefaultProfileImg} 
            alt={username}
            width='100'
            height='100'
            className='tl-profile-image' />
        <div className="message-area">
            <Link 
                to={'/users/' + username}
                className='user-link' >
                @{username}</Link>
            <small className="text-muted">
                {' ･ '}
                <Moment fromNow>
                    {date}
                </Moment>
            </small>
            {canRemove && (
                <button
                    className="btn-inline float-end"
                    onClick={removeMessage}>
                    <TrashIcon
                        size={16}
                        aria-label='Delete message'
                        fill='#6c757d' />
                </button>
            )}
            <p>{text}</p>
            
        </div>
    </div>
)