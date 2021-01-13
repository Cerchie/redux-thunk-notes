import React, {useEffect} from 'react';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import axios from 'axios';
import {fetchProfile} from './actionCreators'

const API_URL = 'https://api.github.com/users/elie';
// import {fetchProfile} from './actionCreators';
function ProfileViewer({username='elie'}) {
    const profile = useSelector(st => st.profile, shallowEqual);
    const error = useSelector(st => st.error);
    const dispatch = useDispatch();

    useEffect(()=> {
        async function getProfile(){
           const {res} = await axios.get(API_URL);
           dispatch(fetchProfile(res))
        }
        getProfile();
    }, [dispatch, username])

    if (error) {
        return <h1>Something BAD happened.</h1>
    }

    return (
        <div>
            <h1> Hello {profile.name}</h1>
            <img src={profile['avatar_url']}/>
            <pre>{JSON.stringify(profile, null, 2)}</pre>
        </div>
    )
}

export default ProfileViewer;