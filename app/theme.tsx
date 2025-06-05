import { defineConfig, defaultBaseConfig, createSystem, defaultConfig } from "@chakra-ui/react";


const config = defineConfig({
    theme: {
        breakpoints: {
            verySmall: "300px"
        }
    }
})

export const system = createSystem(defaultConfig, config)