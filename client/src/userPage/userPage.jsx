import UserDetails from "./userDetails";
import './userPage.css'
import UserPosts from "./userPosts";
import UserPostsHeader from './userPostsHeader';
function UserPage(){

    return (
        <div className="userp_container">
            <UserDetails></UserDetails>
            <div className="userp_posts">
            <UserPostsHeader></UserPostsHeader>
            <UserPosts></UserPosts>
            </div>
        </div>
    )

}

export default UserPage;