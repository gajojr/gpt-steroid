const os = require('os');
const { spawn } = require('child_process');

const startAutoGPT = () => {
    process.chdir('../Auto-GPT');

    const dockerCmd = 'docker';
    let dockerArgs = ['run', '--rm', 'my-docker-image', 'sh', '/app/run.sh'];

    if (os.platform() === 'win32') {
        dockerArgs = ['run', '--rm', 'my-docker-image', 'cmd', '/c', '.\\run.bat'];
    }

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

module.exports = startAutoGPT;