import { exec, spawn } from 'child_process';

// macOS throws ASL error if we don't pull image first
const pullDockerImage = () => {
    const dockerCmd = 'docker';
    const dockerArgs = ['pull', 'significantgravitas/auto-gpt'];

    return new Promise(async (resolve, reject) => {
        const childProcess = exec(`${dockerCmd} ${dockerArgs.join(' ')}`);
        childProcess.on('close', (code) => {
            if (code === 0) {
                console.log('Docker image pulled successfully');
                resolve();
            } else {
                console.error('Failed to pull Docker image');
                reject(new Error('Failed to pull Docker image'));
            }
        });
        childProcess.on('error', (error) => {
            console.error('Error pulling Docker image:', error);
            reject(error);
        });
    });
};

const startAutoGPT = async () => {
    try {
        await pullDockerImage();

        process.chdir('../Auto-GPT');

        const dockerCmd = 'docker-compose';
        const dockerArgs = ['-f', 'docker-compose.yml', 'run', '--rm', 'auto-gpt'];

        const childProcess = spawn(dockerCmd, dockerArgs);

        // return to this directory after starting docker
        process.chdir('../server');

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
    } catch (error) {
        console.error('Error starting AutoGPT:', error);
    }
};

export default startAutoGPT;