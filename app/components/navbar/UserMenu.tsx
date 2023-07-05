'use client';

import {AiOutlineMenu} from 'react-icons/ai'
import Avatar from '../Avatar';
import { useCallback, useState } from 'react';
import MenuItem from './MenuItem';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import { signOut } from 'next-auth/react';
import { SafeUser } from '@/app/types';
import useRentModal from '@/app/hooks/useRentModal';
import { useRouter } from 'next/navigation';


interface UserMenuProps{
    currentUser?: SafeUser | null
}
const UserMenu: React.FC<UserMenuProps> = ({
    currentUser
}) => {
    const router = useRouter();
    const registerModal = useRegisterModal();
    const loginModel = useLoginModal();
    const rentModel = useRentModal();
    const [isOpen, setIsOpen] = useState(false)

    const toggleOpen = useCallback(()=>{
        setIsOpen((value)=> !value);
    },[])

    const onRent = useCallback(()=>{
        if(!currentUser){
            return loginModel.onOpen();
        }
        //open run modal
        rentModel.onOpen();
    },[currentUser,loginModel, rentModel])

    return (
        <div className="relative text-secondary">
            <div className="flex flex-row items-center gap-3">
                <div 
                    onClick={onRent}className="hidden md:block text-sm font-semibold py-2
                    px-2 bg-primary text-secondary rounded-full hover:bg-neutral-200 transition cursor-pointer">
                Tripsen your home
                </div>
                <div 
                    onClick={toggleOpen}
                    className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 
                    flex flex-row items-center gap-3 rounded-full cursor-pointer 
                    hover:shadow-md transition">
                    <AiOutlineMenu/>
                    <div className='hidden md:block'>
                        <Avatar src={currentUser?.image}/>
                    </div>
                </div>
            </div>
            {isOpen &&(
                <div className='absolute rounded-xl shadow-md w-[40vw] md:w-3/4 
                    bg-white overflow-hidden right-0 top-12 text-sm'>
                    <div className='flex flex-col cursor-pointer'>
                        {currentUser ? (
                            <>
                            <MenuItem 
                                onClick={()=> router.push('/trips')}
                                label='My trips'
                            />

                            <MenuItem 
                                onClick={()=>router.push('/favorites')}
                                label='My favorites'
                            />

                            <MenuItem 
                                onClick={()=>router.push('/reservations')}
                                label='My reservations'
                            />
                            <MenuItem 
                                onClick={()=>router.push('/properties')}
                                label='My properties'
                            />
                            <MenuItem 
                                onClick={rentModel.onOpen}
                                label='Tripsen my home'
                            />
                            <hr/>
                            <MenuItem 
                                onClick={()=> signOut()}
                                label='Logout'
                            />
                            </>

                        ):(
                            <>
                            <MenuItem 
                                onClick={loginModel.onOpen}
                                label='Connexion'
                            />

                            <MenuItem 
                                onClick={registerModal.onOpen}
                                label="S'inscrire"
                            />
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserMenu