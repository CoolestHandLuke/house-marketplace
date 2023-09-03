import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';

const Profile = () => {
    const [user, setuser] = useState(null);
    const auth = getAuth();

    useEffect(() => {
        setuser(auth.currentUser);
    }, []);

    return user ? <h1>{user.displayName}</h1> : 'Not Logged In';
};
export default Profile;
