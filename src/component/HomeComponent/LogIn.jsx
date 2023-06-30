import React, { useState } from 'react';
import { login } from '../../api/authApi';
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { IconButton } from '@chakra-ui/react'
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { saveLocalStorage } from '../../store/slices/userSlice';


const LogIn = () => {
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const toast = useToast();
    const [show, setShow] = useState(false);
    const handleInputChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    }
    const submitHandler = async () => {
        if (!loginData.email || !loginData.password) {
            toast({
                title: 'Field Missing',
                description: "Pls fill all the mandatory fields",
                status: 'warning',
                position: 'top-right',
                duration: 5000,
                isClosable: true,
            })
            return;
        }

        try {

            const { data } = await login({ email: loginData.email, password: loginData.password });
            toast({
                title: 'Login Successfull',
                status: 'success',
                duration: 4000,
                isClosable: true,
                position: 'top-right'
            })
            dispatch(saveLocalStorage(data));
            navigate('/chat')

        } catch (err) {
            console.log(err);
            toast({
                title: 'Internal Error',
                description: 'Please Contact Admin',
                status: 'error',
                duration: 4000,
                isClosable: true,
                position: 'top-right'
            })
        }
    }
    const picLoading = () => { }
    return (

        <VStack spacing="8px">
            <FormControl id="email" isRequired>
                <FormLabel>Email Address</FormLabel>
                <Input
                    name="email"
                    type="email"
                    placeholder="Enter Your Email Address"
                    onChange={(e) => handleInputChange(e)}
                />
            </FormControl>
            <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup size="md">
                    <Input
                        name='password'
                        type={show ? "text" : "password"}
                        placeholder="Enter Password"
                        onChange={(e) => handleInputChange(e)}
                    />
                    <InputRightElement width="4.5rem">
                        <IconButton variant="ghost" aria-label='Show-hide' icon={show ? <ViewOffIcon /> : <ViewIcon />} onClick={() => setShow(!show)} />
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <Button
                colorScheme="blue"
                width="100%"
                style={{ marginTop: 40 }}
                onClick={submitHandler}
                isLoading={false}
            >
                Log In
            </Button>
            <Button
                variant="solid"
                colorScheme="red"
                width="100%"
                style={{ marginTop: 20 }}
                onClick={() => { setLoginData({ email: 'guest@example.com', password: '123456' }) }}
            >
                Get Demo
            </Button>
        </VStack>
    )
}

export default LogIn;