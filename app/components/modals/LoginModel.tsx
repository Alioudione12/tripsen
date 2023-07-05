'use client';

import {FcGoogle} from 'react-icons/fc';
import { useState, useCallback } from "react";
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form';
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import {signIn} from 'next-auth/react';

import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../Inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../Button";
import { useRouter } from "next/navigation";



const LoginModel = () => {
    const router = useRouter();
    const registerModel = useRegisterModal();
    const loginModel = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState:{
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues:{
            email:'',
            password:''
        }
    });

    const onSubmit:SubmitHandler<FieldValues> = (data)=>{
        setIsLoading(true)
        signIn('credentials',{
            ...data,
            redirect: false,
        })
        .then((callback)=>{
            setIsLoading(false);

            if(callback?.ok){
                toast.success('Logged in');
                router.refresh();
                loginModel.onClose();
            }
            if(callback?.error){
                toast.error(callback.error);
            }
        })
    }

    const toggle = useCallback(()=>{
        loginModel.onClose();
        registerModel.onOpen();
    }, [loginModel, registerModel])
    const bodyContent=(
        <div className="flex flex-col gap-4">
            <Heading
                title="Content vous revoir "
                subtitle="Connectez-vous à votre compte "
            />
            <Input
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="password"
                type="password"
                label="Password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    );

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr/>
            <Button
                outline
                label="Continue with Google"
                icon={FcGoogle}
                onClick={()=>signIn('google')}
            />
            <div className="text-neutral-500 text-center mt-2 font-light">
                <div className="flex flex-row items-center gap-2 justify-center">
                    <div>
                    Première utilisation de tripsen?
                    </div>
                    <div 
                        onClick={toggle}
                        className="text-secondary font-bold cursor-pointer hover:underline">
                        Créer un compte
                    </div>
                </div>
            </div>
        </div>
    )


  return (
    <Modal
        disabled={isLoading}
        isOpen={loginModel.isOpen}
        title="Connexion"
        actionLable="Continue"
        onClose={loginModel.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
    />
  )
}

export default LoginModel;