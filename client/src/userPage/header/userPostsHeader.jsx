import Select from '../../Global_UI/select/select';
import Button from '../../Global_UI/button/button';
import './userPostsHeader.css';
import { useHistory } from 'react-router';


export default function UserPostsHeader(){

    const history = useHistory();
    return (
        <div className="userp_header_wrapper">
            <h1>Posts</h1>
            <div className="userp_header_select">
                <Select options={[]}></Select>
            </div>
            <div className="userp_header_button">
            <Button
            label={'Add a post'}
            className={'userp_header_btn'}
            onClick={()=>history.push('/Add-post')}
            >
            </Button>
            </div>
        </div>
    )
}