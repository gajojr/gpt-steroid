# Chat GPT Steroid

Chat GPT Steroid is an enhanced version of the Chat GPT language model built on top of OpenAI API. It allows up to 32K tokens for both input and output, which is 4 times larger than the Chat GPT 4. The data is stored locally in the browser's IndexedDB, and it allows for file uploads to fine-tune the model. The project also has a local setup, making it easy to run the application on your local machine.

## Features (built on top of chatGPT 4)

- File uploads for fine-tuning
- Create fine tune file via gui
- 32K token input and output
- Local setup
- IndexedDB data storage
- Connection to Auto GPT for automatic prompting

## Getting Started

1.  Install [Node.js](https://nodejs.org/en/)
2.  Install [Docker](https://www.docker.com/)
3.  Clone the repository from GitHub: `git clone https://github.com/gajojr/gpt-steroid.git`
4.  Navigate to the cloned repository
5.  Clone the AutoGPT repo from root: `git clone https://github.com/Significant-Gravitas/Auto-GPT.git`
6.  Create an OpenAI API key with a paid account
7.  Navigate to server directory, create a `.env` file and set `OPENAI_API_KEY=YOUR_API_KEY`, where `YOUR_API_KEY` is the value of the API key from OpenAI
8.  Navigate to frontend directory, create a `.env` file and set `REACT_APP_SERVER_URL`=http://localhost:8000
9.  Navigate to Auto-GPT directory and create `.env` file and set `OPENAI_API_KEY`=`YOUR_API_KEY`
10. Run `npm install` in root
11. Run `npm install` in frontend and server to install dependencies
12. Start docker
13. Run `npm run dev` from root to start the application

## Additional Features (in progress)

- Access to the internet

## Contributing

We welcome contributions from anyone! Please feel free to submit a pull request or open an issue on GitHub.
