import DefaultProfileImg from '../images/default-profile-image.jpg';

export default ({ username, profileImageUrl }) => (
    <aside className="col-sm-3">
        <div className="panel-panel-default">
            <div className="panel-body">
                <img
                    src={profileImageUrl || DefaultProfileImg}
                    alt={username}
                    className='img-thumbnail'
                    style={{width: '100%'}} />
                <h4 className='username'>{username}</h4>
            </div>
        </div>
    </aside>
)
