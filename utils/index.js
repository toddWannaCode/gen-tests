const readline = require('readline');

module.exports = (source, dest, fn) => {
    const rl = readline.createInterface({
        input: source
    });

    rl.on('line', (line) => {
        const data = fn(line);
        if(data.length)
            dest.write(`${data}\n`)
    });
};
