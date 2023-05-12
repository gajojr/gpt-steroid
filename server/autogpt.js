import { spawn } from 'child_process';

const startAutoGPT = () => {
    process.chdir('../Auto-GPT');

    const dockerCmd = 'docker-compose';
    const dockerArgs = ['-f', 'docker-compose.yml', 'run', '--rm', 'auto-gpt'];

    // return to this directory after starting docker
    process.chdir('../server');

    const childProcess = spawn(dockerCmd, dockerArgs);

    childProcess.stdout.on('data', (data) => {
        console.log(`AutoGPT stdout: ${data}`);
        // Send data back to client
    });

    childProcess.stderr.on('data', (data) => {
        console.error(`AutoGPT stderr: ${data}`);
        // Send error back to client
    });

    childProcess.on('close', (code) => {
        console.log(`AutoGPT process exited with code ${code}`);
    });

    return childProcess;
}

export default startAutoGPT;