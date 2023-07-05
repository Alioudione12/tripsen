'use client';
import axios from "axios";
import {FcGoogle} from 'react-icons/fc';
import { useState, useCallback } from "react";
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form';
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../Inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../Button";
import { signIn } from "next-auth/react";
import useLoginModal from "@/app/hooks/useLoginModal";

const RegisterModel = () => {
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
            name:'',
            email:'',
            password:''
        }
    });

    const onSubmit:SubmitHandler<FieldValues> = (data)=>{
        setIsLoading(true)

        axios.post('/api/register', data)
            .then(()=>{
                toast.success('Success!')
                registerModel.onClose();
                loginModel.onOpen();
            })
            .catch((error)=>{
                toast.error('Something went wrong')
            })
            .finally(()=>{
                setIsLoading(false);
            })
    }
    const toggle = useCallback(()=>{
        registerModel.onClose();
        loginModel.onOpen();
    }, [loginModel, registerModel])

    const bodyContent=(
        <div className="flex flex-col gap-4">
            <Heading
                title="Bienvenue à Tripsen "
                subtitle="Créer un compte "
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
                id="name"
                label="Name"
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
                    Vous avez déjà un compte?
                    </div>
                    <div 
                        onClick={toggle}
                        className="text-secondary font-bold cursor-pointer hover:underline">
                        Connexion
                    </div>
                </div>
            </div>
        </div>
    )


  return (
    <Modal
        disabled={isLoading}
        isOpen={registerModel.isOpen}
        title="Créer un compte"
        actionLable="Continue"
        onClose={registerModel.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
    />
  )
}

export default RegisterModel