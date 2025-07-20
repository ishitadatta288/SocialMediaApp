//import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button';
import { LogOutIcon } from 'lucide-react';
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutations';
import { useEffect } from 'react';
import { useUserContext } from '@/context/AuthContext';

const Topbar = () => {
    const { mutate: signOut, isSuccess } = useSignOutAccount();
    const navigate = useNavigate();
    const { user } = useUserContext();

    useEffect(() => {
        if (isSuccess) navigate(0);
    }, [isSuccess])

    return (
        <section className='text-white'>
            <div className=' flex justify-between py-4 px-5 md:invisible'>
                <Link to="/" className=' flex gap-2 items-center text-2xl font-serif font-bold'>
                    <img src="/assets/images/logo.png" alt="logo"
                        width={30}
                        height={32} />SnapTalk
                </Link>

                <div className=' flex md:gap-2'>
                    <Button variant="ghost" className=' shadow-transparent' onClick={() => signOut()}>
                        <LogOutIcon />
                    </Button>
                    <Link to={`/profile/${user.id}`} className=' flex justify-center items-center gap-3'>
                        <img src={user.imageUrl || '/assets/icons/profile-placeholder.svg'} alt="profile"
                            className=' h-8 w-8 rounded-full' />
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Topbar