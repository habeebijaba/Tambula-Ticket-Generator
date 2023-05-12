
function generateTicket(numberOfTicket) {
    var cols, finalTicket, flag = true, colPlaceholder = [];
    var tickets = [];

    while (tickets.length < numberOfTicket) {
        cols = Array(9).fill(2);
        finalTicket = Array(3);
        finalTicket[0] = Array(9).fill(0);
        finalTicket[1] = Array(9).fill(0);
        finalTicket[2] = Array(9).fill(0);

        var r = getUniqueRandomNumber(0, 8, 3);
        for (i = 0; i < r.length; i++) {
            cols[r[i]] = 1;
        }

        colPlaceholder = [];
        for (i = 0; i < cols.length; i++) {
            colPlaceholder.push(getUniqueRandomNumber(0, 2, cols[i]));
        }

        for (i = 0; i < colPlaceholder.length; i++) {
            nums = getUniqueRandomNumber(((i * 10) + 1), (i * 10) + 10, colPlaceholder[i].length)
            for (j = 0; j < colPlaceholder[i].length; j++) {
                finalTicket[colPlaceholder[i][j]][i] = nums[j];
            }
        }

        if (!testFinalTicket(finalTicket)) {
            tickets.push(finalTicket);
        }
    }

    return tickets;
}


function testFinalTicket(ticket) {

    for (i = 0; i < 3; i++) {
        var arr = ticket[i];
        count = 0;
        for (j = 0; j < arr.length; j++) {
            if (arr[j] === 0)
                count++;
        }
        if (count != 4)
            return true;
    }
    return false;
}

function sortNumbersinArray(a, b) {
    return a > b ? 1 : b > a ? -1 : 0;
}
function getUniqueRandomNumber(min, max, count, sort = true) {
    var random = [];
    for (var i = 0; i < count; i++) {
        flag = true;
        while (flag) {
            r = randomNumber(min, max)
            if (random.indexOf(r) === -1) {
                random.push(r);
                flag = false;
            }
        }
    }
    if (sort)
        random.sort(sortNumbersinArray)
    return random;
}
function randomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
    generateTicket,
}