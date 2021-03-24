import UserDetails from "./userDetails/userDetails";
import './userPage.css'
import UserPosts from "./userPosts/userPosts";
import UserPostsHeader from './header/userPostsHeader';
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