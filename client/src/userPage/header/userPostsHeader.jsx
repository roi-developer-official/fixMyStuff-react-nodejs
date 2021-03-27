import {Button,Input} from '../../Global_UI';

import './userPostsHeader.css';
import { useHistory } from 'react-router';


export default function UserPostsHeader(){

    const history = useHistory();
    return (
        <div className="userp_header_wrapper">
            <h1>Posts</h1>
            <div className="userp_header_select">
                <Input inputType="select" options={[]}/>
            </div>
            <div className="userp_header_button">
            <Button
            label={'Create new post'}
            className={'userp_header_btn'}
            onClick={()=>history.push('/Create-post')}
            >
            </Button>
            </div>
        </div>
    )
}