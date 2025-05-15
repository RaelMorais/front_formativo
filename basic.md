# Basic commands React 

>    npm create vite@latest <name> --> Create vite project 
    > cd <name> 
    > npm install 
    > npm run dev 

# Create a react dom 

>   npm install react-router-dom --> Install react dom project 

# Tailwind

> npm i tailwindcss@3 postcss autoprefixer -> Install tailwind 
    >  npx tailwindcss init -p -> Create file tailwind 

        ````js
                /** @type {import('tailwindcss').Config} */
                export default {
                content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
                theme: {
                    extend: {},
                },
                plugins: [],
                };

        ````