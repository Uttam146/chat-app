import React, { useState } from 'react';
import {
    Container, Box, Text, Stack, Image,
    Tabs, TabList, Tab, TabPanels, TabPanel
} from '@chakra-ui/react';
import LogIn from './LogIn';
import SignUp from './SignUp';
import { useSelector } from 'react-redux';
import HomeImage from '../../assets/homeimage.png'

const Home = () => {
    return (
        <Container maxW="4xl" justifyContent="center">

            <Box
                display='flex'
                justifyContent="center"
                p={3}
                w="100%"
                m="40px 0 15px 0"
            >
                <Text fontSize="5xl" fontFamily="Work sans">Chat-App</Text>
            </Box>
            <Box
                display="flex"
                w="100%"
            >

                <Box
                    display="flex"
                    bg="white"
                    p={4}
                    color="black"
                    w="50%"
                    borderWidth="1px"
                >
                    <Tabs variant='soft-rounded' colorScheme='blue' width="100%" defaultIndex={0}>
                        <TabList>
                            <Tab width="50%">Sign Up</Tab>
                            <Tab width="50%">Log In</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <SignUp />
                            </TabPanel>
                            <TabPanel >
                                <LogIn />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>

                <Box
                    bg="white"
                    color="black"
                    w="50%"
                    justifyContent="center"
                >
                    <Box boxSize='full'>
                        <Image src={HomeImage} height="100%" width="100%" alt='Image' />
                    </Box>
                </Box>
            </Box>

        </Container>
    )
}

export default Home;