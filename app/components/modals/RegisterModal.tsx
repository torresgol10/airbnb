'use client'

import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import useRegisterModal from "@/app/hooks/useRegisterModal";
import { useState } from "react";
import Modal from "./Modal";
import Heading from "../Heading";
//import Modal from "./Modal";

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
            await fetch('/api/register', {
                method: 'post',
                body: data
            })
            registerModal.onClose()
        } catch (error) {
            console.log(error)
        }
        setIsLoading(false)
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title="Welcome to Airbnb" subtitle="Create an account!" />
        </div>
    )

    return (
        <Modal disabled={isLoading} isOpen={registerModal.isOpen} title='Register' actionLabel='Submit' onClose={registerModal.onClose} onSubmit={handleSubmit(onSubmit)} body={bodyContent} />
    )
}