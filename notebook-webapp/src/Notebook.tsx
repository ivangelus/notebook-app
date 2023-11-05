import * as React from "react"
import {
    Box,
    VStack,
    Grid,
    Button,
} from "@chakra-ui/react"
import { ExectuableCodeBlock } from "./ExecutableCodeBlock"
import { useState } from "react";

export const Notebook = () => {
    const [codeBlocks, setCodeBlocks] = useState<number[]>([]);

    const addCodeBlock = () => {
        const newKey = codeBlocks.length + 1;
        setCodeBlocks([...codeBlocks, newKey]);
    };

    return (
        <Box textAlign="center" fontSize="xl">
            <Grid minH="100vh" p={3}>
                <VStack spacing={8}>
                    <ul>
                        {codeBlocks.map((_, index) => (
                            <ExectuableCodeBlock key={index} />
                        ))}
                    </ul>
                    <Button colorScheme='teal' variant='solid' onClick={addCodeBlock}>
                        Add more blocks
                    </Button>
                </VStack>
            </Grid>
        </Box>
    )
}
