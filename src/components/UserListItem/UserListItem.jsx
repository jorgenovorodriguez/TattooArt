import PropTypes from 'prop-types';
import defaultAvatar from '../../assets/images/defaultAvatar.jpg';

const UserListItem = ({ user }) => {
    return (
        <li>
            <img
                src={
                    user.avatar
                        ? `http://localhost:8000/${user.avatar}`
                        : defaultAvatar
                }
                alt={`${user.username} avatar`}
            />
            <div>
                <h2>@{user.username}</h2>
                <p>{user.role}</p>
            </div>
        </li>
    );
};

UserListItem.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        username: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired,
        avatar: PropTypes.string,
    }),
};

export default UserListItem;
