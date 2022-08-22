
export enum Command {
    PLACE = 'PLACE',
    MOVE = 'MOVE',
    LEFT = 'LEFT',
    RIGHT = 'RIGHT',
    REPORT = 'REPORT'
}

export enum Facing {
    NORTH = 'NORTH',
    EAST = 'EAST',
    SOUTH = 'SOUTH',
    WEST = 'WEST'
}

export interface Position {
    x: number,
    y: number,
    facing: Facing
}

export default class Robot {
    public position: Position;
    private readonly maxX = 5;
    private readonly maxY = 5;
    private readonly minX = 0;
    private readonly minY = 0;

    constructor() {}

    public execute(command: string) {
        const [action, args] = command.split(' ');

        if (!this.isValidCommand(command)) {
            return;
        }

        switch (action) {
            case Command.PLACE:
                const [x, y, f] = args.split(',');
                this.place({x: +x, y: +y, facing: f as Facing});
                break;
            case Command.MOVE:
                this.move();
                break;
            case Command.LEFT:
                this.rotateLeft();
                break;
            case Command.RIGHT:
                this.rotateRight();
                break;
            case Command.REPORT:
                console.log(`Output: ${this.position.x},${this.position.y},${this.position.facing}`);
                break;
            default:
                // ignore no action
        }
    }

    private place(position: Position) {
        if (!this.outOfBounds(position)) {
            this.position = position;
        }
    }

    private move() {
        if (!this.position) {
            return;
        }

        const newPosition = Object.assign({}, this.position);

        switch(newPosition.facing) {
            case Facing.NORTH:
                newPosition.y++;
                break;
            case Facing.SOUTH:
                newPosition.y--;
                break;
            case Facing.EAST:
                newPosition.x++;
                break;
            case Facing.WEST:
                newPosition.x--;
                break;
            default:
                // no action;
        }

        this.position = !this.outOfBounds(newPosition) ? newPosition : this.position;
    }

    private rotateLeft() {
        if (!this.position) {
            return;
        }

        switch (this.position.facing) {
            case Facing.NORTH:
                this.position.facing = Facing.WEST;
                break;
            case Facing.SOUTH:
                this.position.facing = Facing.EAST;
                break;
            case Facing.EAST:
                this.position.facing = Facing.NORTH;
                break;
            case Facing.WEST:
                this.position.facing = Facing.SOUTH;
                break;
            default:
                // no action;
        }
    }

    private rotateRight() {
        if (!this.position) {
            return;
        }

        switch (this.position.facing) {
            case Facing.NORTH:
                this.position.facing = Facing.EAST;
                break;
            case Facing.SOUTH:
                this.position.facing = Facing.WEST;
                break;
            case Facing.EAST:
                this.position.facing = Facing.SOUTH;
                break;
            case Facing.WEST:
                this.position.facing =Facing.NORTH;
                break;
            default:
                // no action;
        }
    }

    private outOfBounds(position: Position) {
        return !(position.x >= this.minX && position.x <= this.maxX) ||
            !(position.y >= this.minY && position.y <= this.maxY); 
    }

    private isValidCommand(command: string) {
        const validFacings = Object.values(Facing);
        const validCommands = Object.values(Command);
        const placeCommandRegex = new RegExp(`^PLACE [${this.minX}-${this.maxX}],[${this.minY}-${this.maxY}],(${validFacings.join('|')})$`);
        const otherCommandRegex = new RegExp(`^(${validCommands.join('|')})$`);

        if (command.startsWith(Command.PLACE)) {
            return placeCommandRegex.test(command);
        } else {
            return otherCommandRegex.test(command);
        }
    }
}