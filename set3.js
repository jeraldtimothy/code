/**
 * Set 3
 *
 * This assignment will develop your ability to manipulate data.
 * You should be ready for JS tutorials on more advanced topics after this.
 *
 * Please refer to the `module4/sample-data/set3-sample-data.js` file for examples of:
 * - the `socialGraph` parameter for `relationshipStatus`
 * - the `board` parameter for `ticTacToe`
 * - the `routeMap` parameter for `eta`
 */

/**
 * Relationship status
 *
 * Let's pretend that you are building a new app with social media functionality.
 * Users can have relationships with other users.
 *
 * The two guidelines for describing relationships are:
 * 1. Any user can follow any other user.
 * 2. If two users follow each other, they are considered friends.
 *
 * This function describes the relationship that two users have with each other.
 *
 * Please see the sample data for examples of `socialGraph`.
 *
 * @param {string} fromMember The subject member
 * @param {string} toMember The object member
 * @param {object} socialGraph The relationship data
 * @returns {string} "follower" if fromMember follows toMember;
 * "followed by" if fromMember is followed by toMember;
 * "friends" if fromMember and toMember follow each other;
 * "no relationship" otherwise.
 */
function relationshipStatus(fromMember, toMember, socialGraph) {
    const follower = socialGraph[fromMember]["following"].includes(toMember);
    const followedBy = socialGraph[toMember]["following"].includes(fromMember);
    
    if (follower && followedBy) {
        return 'friends';
    } else if (follower) {
        return 'follower';
    } else if (followedBy) {
        return 'followed by';
    } else {
        return 'no relationship';
    }
}

/**
 * Tic tac toe
 *
 * Tic Tac Toe is a common paper-and-pencil game.
 * Players must attempt to draw a line of their symbol across a grid.
 * The player that does this first is considered the winner.
 *
 * This function evaluates a Tic Tac Toe game board and returns the winner.
 *
 * Please see the sample data for examples of `board`.
 *
 * @param {Array} board The representation of the Tic Tac Toe board as a square array of arrays. The size of the array will range between 3x3 to 6x6.
 * The board will never have more than 1 winner.
 * There will only ever be 2 unique symbols at the same time.
 * @returns {string} the symbol of the winner, or "NO WINNER" if there is no winner.
 */
function ticTacToe(board) {
    function winningLine(line) {
        const unique = new Set(line);
        if (unique.size === 1 && line[0]) {
            return line[0];
        }
    }

    for (const row of board) {
        const winner = winningLine(row);
        if (winner) {
            return winner;
        }
    }

    for (let col = 0; col < board.length; col++) {
        const column = board.map(row => row[col]);
        const winner = winningLine(column);
        if (winner) {
            return winner;
        }
    }

    const topLeftDiagonal = board.map((row, index) => row[index]);
    let winner = winningLine(topLeftDiagonal);
    if (winner) {
        return winner;
    }

    const bottomLeftDiagonal = board.map((row, index) => row[board.length - 1 - index]);
    winner = winningLine(bottomLeftDiagonal);
    if (winner) {
        return winner;
    }

    return "NO WINNER";
}

/**
 * ETA
 *
 * A shuttle van service is tasked to travel one way along a predefined circular route.
 * The route is divided into several legs between stops.
 * The route is fully connected to itself.
 *
 * This function returns how long it will take the shuttle to arrive at a stop after leaving anothe rstop.
 *
 * Please see the sample data for examples of `routeMap`.
 *
 * @param {string} firstStop the stop that the shuttle will leave
 * @param {string} secondStop the stop that the shuttle will arrive at
 * @param {object} routeMap the data describing the routes
 * @returns {Number} the time that it will take the shuttle to travel from firstStop to secondStop
 */
function eta(firstStop, secondStop, routeMap) {
    let currentStop = firstStop;
    let totalTravelTime = 0;
    
    while (currentStop !== secondStop) {
        let nextStop = null;
        for (const [leg, details] of Object.entries(routeMap)) {
            const [start, end] = leg.split(',');
            if (start === currentStop) {
                nextStop = end;
                totalTravelTime += details.travel_time_mins;
                break;
            }
        }
        
        currentStop = nextStop;
    }
    
    return totalTravelTime;
}
