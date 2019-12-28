import { Percolation } from '../src/Percolation';
import { IllegalArgumentException } from '../src/errors';

test('invalid constructor argument', () => {
    expect(new Percolation(-1)).toThrow(IllegalArgumentException);
});

//TODO: get rid of this in favour of just testing public methods
describe('2d coordinate to 1d conversion', () => {
    let pc;

    beforeAll(() => {
        pc = new Percolation(4);
    });

    test('convert (3, 1) to 9', () => {
        expect(pc.xyTo1D(3, 1)).toBe(9);
    });

    test('convert (1, 1) to 1', () => {
        expect(pc.xyTo1D(1, 1)).toBe(1);
    });

    test('convert (4, 4) to 9', () => {
        expect(pc.xyTo1D(4, 4)).toBe(16);
    });
});

describe('basic percolation test', () => {
    let pc;

    beforeAll(() => {
        pc = new Percolation(4);
    });

    test('open (1, 1)', () => {
        pc.open(1, 1);
        expect(pc.percolates()).toBeFalsy();
        expect(pc.isFull(1, 1)).toBeTruthy();
    });

    test('open (3, 1)', () => {
        pc.open(3, 1);
        expect(pc.percolates()).toBeFalsy();
        expect(pc.isFull(3, 1)).toBeFalsy();
    });

    test('open (2, 1)', () => {
        pc.open(2, 1);
        expect(pc.percolates()).toBeFalsy();
        expect(pc.isFull(2, 1)).toBeTruthy();
    });

    test('open (4, 1)', () => {
        pc.open(4, 1);
        expect(pc.percolates()).toBeTruthy();
        expect(pc.isFull(4, 1)).toBeTruthy();
    });
});
