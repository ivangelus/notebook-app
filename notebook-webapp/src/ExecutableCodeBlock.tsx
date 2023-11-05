import * as React from "react"
import {
    HStack,
    Textarea,
    Button,
    VStack,
    Box,
} from "@chakra-ui/react"

export const ExectuableCodeBlock = () => {
    let [value, setValue] = React.useState('')
    let [evaluatedValue, setEvaluatedValue] = React.useState('')

    let handleInputChange = (e: any) => {
        let inputValue = e.target.value
        setValue(inputValue);
    }

    let handleOnClick = (_e: any) => {
        let inputToEvaluate = '';
        try {
            if (value.includes("{")) {
                const formattedString = value.replace(/(['"])?([a-zA-Z_]\w*)\1?\s*:/g, '"$2":');
                const parsedInput = JSON.parse(formattedString);
                inputToEvaluate = parsedInput
            } else {
                inputToEvaluate = value;
            }
        } catch (_e) {
            inputToEvaluate = value;
        }
        try {
            const evaluatedCode = eval(inputToEvaluate);
            setEvaluatedValue(String(evaluatedCode));
        } catch (error) {
            setEvaluatedValue(String(error));
        }
    }
    return (
        <VStack>
            <HStack spacing={8}>
                <Textarea
                    value={value}
                    onChange={handleInputChange}
                    size='xl'
                    borderRadius={10}
                />
                <Button colorScheme='teal' onClick={handleOnClick}>
                    Run
                </Button>
            </HStack>
            <Box bg='grey' w='100%' p={4} color='black'>
                {evaluatedValue}
            </Box>
        </VStack>
    )
}
