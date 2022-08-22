import {expect} from 'chai';
import Robot, { Facing } from './robot';

describe('robot test', () => {
    it('Should output 0,1,NORTH', () => {
        const toyRobot = new Robot();

        toyRobot.execute('PLACE 0,0,NORTH');
        toyRobot.execute('MOVE');

        expect(toyRobot.position).to.deep.equal({x: 0, y: 1, facing: Facing.NORTH});
    });

    it('Should output 0,0,WEST', () => {
        const toyRobot = new Robot();
        
        toyRobot.execute('PLACE 0,0,NORTH');
        toyRobot.execute('LEFT');

        expect(toyRobot.position).to.deep.equal({x: 0, y: 0, facing: Facing.WEST});
    });

    it('Should output 3,3,NORTH', () => {
        const toyRobot = new Robot();

        toyRobot.execute('PLACE 1,2,EAST');
        toyRobot.execute('MOVE');
        toyRobot.execute('MOVE');
        toyRobot.execute('LEFT');
        toyRobot.execute('MOVE');

        expect(toyRobot.position).to.deep.equal({x: 3, y: 3, facing: Facing.NORTH});
    });

    it('Should ignore commands until PLACE is not issued', () => {
        const toyRobot = new Robot();

        toyRobot.execute('MOVE');
        toyRobot.execute('MOVE');
        toyRobot.execute('LEFT');
        toyRobot.execute('MOVE');

        expect(toyRobot.position).to.equal(undefined);
    });
    
    it('Should ignore PLACE command if it is out of bounds', () => {
        const toyRobot = new Robot();

        toyRobot.execute('PLACE 5,6,EAST');

        expect(toyRobot.position).to.equal(undefined);
    });

    it('Should ignore PLACE command if it has invalid x', () => {
        const toyRobot = new Robot();

        toyRobot.execute('PLACE Hello,1,EAST');

        expect(toyRobot.position).to.equal(undefined);
    });

    it('Should ignore PLACE command if it has invalid y', () => {
        const toyRobot = new Robot();

        toyRobot.execute('PLACE 1,Hello,EAST');

        expect(toyRobot.position).to.equal(undefined);
    });
    it('Should ignore PLACE command if it has invalid Facing', () => {
        const toyRobot = new Robot();

        toyRobot.execute('PLACE 1,0,EASTWEST');

        expect(toyRobot.position).to.equal(undefined);
    });
    it('Should ignore MOVE command if it has arguments', () => {
        const toyRobot = new Robot();

        toyRobot.execute('PLACE 1,0,EAST');
        toyRobot.execute('MOVE 1,0,EASTWEST');

        expect(toyRobot.position).to.deep.equal({x: 1, y: 0, facing: Facing.EAST});
    });
    it('Should ignore LEFT command if it has arguments', () => {
        const toyRobot = new Robot();

        toyRobot.execute('PLACE 1,0,EAST');
        toyRobot.execute('LEFT 1,0,EASTWEST');

        expect(toyRobot.position).to.deep.equal({x: 1, y: 0, facing: Facing.EAST});
    });

    it('Should ignore RIGHT command if it has arguments', () => {
        const toyRobot = new Robot();

        toyRobot.execute('PLACE 1,0,EAST');
        toyRobot.execute('RIGHT 1,0,EASTWEST');

        expect(toyRobot.position).to.deep.equal({x: 1, y: 0, facing: Facing.EAST});
    });

    it('Should ignore REPORT command if it has arguments', () => {
        const toyRobot = new Robot();

        toyRobot.execute('PLACE 1,0,EAST');
        toyRobot.execute('REPORT 1,0,EASTWEST');

        expect(toyRobot.position).to.deep.equal({x: 1, y: 0, facing: Facing.EAST});
    });

    it('Should ignore invalid command', () => {
        const toyRobot = new Robot();

        toyRobot.execute('PLACES 1,0,EAST');

        expect(toyRobot.position).to.equal(undefined);
    });
})