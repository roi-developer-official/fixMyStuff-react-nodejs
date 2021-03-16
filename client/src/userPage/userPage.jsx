import UserDetails from "./userDetails/userDetails";
import './userPage.css'
import UserPosts from "./userPosts/userPosts";
import UserPostsHeader from './header/userPostsHeader';
import AddPostPage from "./addPostPage/addPostPage";
function UserPage(){

    return (
        <div className="userp_container">
            <UserDetails></UserDetails>
            <UserPostsHeader></UserPostsHeader>
            <UserPosts></UserPosts>
        </div>
    )

}

export default UserPage;