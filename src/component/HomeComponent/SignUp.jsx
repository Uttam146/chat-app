import React, { useState } from 'react';
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { signup } from '../../api/authApi';
import { ViewIcon,ViewOffIcon } from '@chakra-ui/icons'
import { IconButton } from '@chakra-ui/react'


const SignUp = () => {
    const [signupData, setSignupData] = useState({ name: '', email: '', password: '', cpassword: '' });
    const [show, setShow] = useState(false);
    const toast = useToast();

    const handleInputChange = (e) => {
        setSignupData({ ...signupData, [e.target.name]: e.target.value });
    }

    const submitHandler = async () => {
        if (!signupData.name || !signupData.email || !signupData.password || !signupData.cpassword) {
            toast({
                title: 'Field Missing',
                description: "Pls fill all the mandatory fields",
                status: 'warning',
                position: 'top-right',
                duration: 5000,
                isClosable: true,
            })
            return;
        } else if (signupData.password !== signupData.cpassword) {
            toast({
                title: 'Password Mismatch',
                status: 'warning',
                position: 'top-right',
                duration: 4000,
                isClosable: true,
            })
            return;
        }

        try {

            const { data } = await signup({ name: signupData.name, email: signupData.email, password:signupData.password });
            toast({
                title: 'Registration Successfull',
                status: 'success',
                duration: 4000,
                isClosable: true,
                position: 'top-right'
            })
            setSignupData({ name: '', email: '', password: '', cpassword: '' });
        
        } catch (err) {
            console.log(err);
            toast({
                title: 'Internal Error',
                description:'Please Contact Admin',
                status: 'error',
                duration: 4000,
                isClosable: true,
                position: 'top-right'
            })
        }

    }

    const picLoading = () => { }
    return (
        <VStack spacing="5px">
            <FormControl id="first-name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                    name="name"
                    placeholder="Enter Your Name"
                    value={signupData.name}
                    onChange={(e) => handleInputChange(e)}
                />
            </FormControl>
            <FormControl id="email" isRequired>
                <FormLabel>Email Address</FormLabel>
                <Input
                    name="email"
                    type="email"
                    value={signupData.email}
                    placeholder="Enter Your Email Address"
                    onChange={(e) => handleInputChange(e)}
                />
            </FormControl>
            <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup size="md">
                    <Input
                        name='password'
                        value={signupData.password}
                        type={show ? "text" : "password"}
                        placeholder="Enter Password"
                        onChange={(e) => handleInputChange(e)}
                    />
                    <InputRightElement width="4.5rem">
                    <IconButton variant="ghost" aria-label='Show-hide' icon={show ? <ViewOffIcon /> : <ViewIcon />} onClick={() => setShow(!show)} />
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl id="cpassword" isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup size="md">
                    <Input
                        name="cpassword"
                        value={signupData.cpassword}
                        type={show ? "text" : "password"}
                        placeholder="Confirm password"
                        onChange={(e) => handleInputChange(e)}
                    />
                    <InputRightElement width="4.5rem" >
                        <IconButton variant="ghost" aria-label='Show-hide' icon={show ? <ViewOffIcon  /> : <ViewIcon />} onClick={() => setShow(!show)} />
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <Button
                colorScheme="blue"
                width="100%"
                style={{ marginTop: 15 }}
                onClick={submitHandler}
                isLoading={false}
            >
                Sign Up
            </Button>
        </VStack>
    )
}

export default SignUp;