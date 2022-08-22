import { createInterface } from 'readline';
import { stdin as input, stdout as output } from 'process';
import Robot, { Facing, Position } from './robot';

async function main() {
    const toyRobot: Robot = new Robot();

    console.log('Hello Welcome To Toy Robot Simulator');
    console.log('Please input commands (PLACE, MOVE, LEFT, RIGHT, REPORT). Type END to end the simulation');

    do {
        const command = await ask('> ');

        if (command !== 'END') {
            toyRobot.execute(command);
        } else {
            break;
        }   
    } while(true);
}

async function ask(question: string): Promise<string> {
    const rl = createInterface({ input, output });

    return new Promise((resolve, reject) => {
        rl.question(question, (answer) => {
            rl.close();
            resolve(answer);
        });
    });
}

main();