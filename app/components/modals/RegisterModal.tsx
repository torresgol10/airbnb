'use client'

import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import useRegisterModal from "@/app/hooks/useRegisterModal";
import { useState } from "react";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import Button from "../Button";

export default function RegisterModal() {
    const registerModal = useRegisterModal()
    const [isLoading, setIsLoading] = useState(false)

    const { register, handleSubmit, formState: {
        errors
    } } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true)
        try {
            const response = await fetch('/api/register', {
                method: 'post',
                body: JSON.stringify(data)
            })

            if (!response.ok) toast.error('Somethung Went Wrong')

            registerModal.onClose()
        } catch (error) {
            toast.error('Somethung Went Wrong')
        }
        setIsLoading(false)
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title="Welcome to Airbnb" subtitle="Create an account!" />
            <Input id="email" label="Email" type="email" disabled={isLoading} register={register} errors={errors} required />
            <Input id="name" label="Name" disabled={isLoading} register={register} errors={errors} required />
            <Input id="password" label="Password" type="password" disabled={isLoading} register={register} errors={errors} required />
        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button outline label="Continue with Google" icon={FcGoogle} onClick={() => { }}></Button>
            <Button outline label="Continue with Github" icon={AiFillGithub} onClick={() => { }}></Button>

            <div className="text-neutral-500 text-center mt-4 font-light">
                <div className="justify-center flex flex-row items-center gap-2">
                    <div>Already  have an account?</div>
                    <div onClick={registerModal.onClose} className="text-neutral-800 cursor-pointer hover:underline">Log in</div>
                </div>
            </div>
        </div>
    )


    return (
        <Modal disabled={isLoading} isOpen={registerModal.isOpen} title='Register' actionLabel='Submit' onClose={registerModal.onClose} onSubmit={handleSubmit(onSubmit)} body={bodyContent} footer={footerContent} />
    )
}