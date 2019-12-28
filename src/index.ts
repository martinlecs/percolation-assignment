import readline from 'readline';
import { Percolation } from './Percolation';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
});

const lines: string[] = [];

rl.on('line', line => {
    lines.push(line);
});

rl.on('close', () => {
    console.time('Percolation');
    const pc = new Percolation(parseInt(lines[0], 10));
    for (let i = 1; i < lines.length; i++) {
        const [p, q] = lines[i].split(' ');
        pc.open(parseInt(p, 10), parseInt(q, 10));
    }
    console.timeEnd('Percolation');
    console.log(`Porcolates: ${pc.percolates()}`);
    console.log(`Sites opened: ${pc.numberOfOpenSites()}`);
});
