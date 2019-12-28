import { WeightedQuickUnion } from '../unionFind';
import { IllegalArgumentException } from '../errors';
export class Percolation {
    private size: number;
    private fullSize: number;
    private openSites: boolean[];
    private uf: WeightedQuickUnion;
    private topVirtual: number;
    private bottomVirtual: number;
    private numOpen: number;

    public constructor(n: number) {
        if (n <= 0) throw new IllegalArgumentException('size must be greater than 0');
        this.size = n;
        this.fullSize = n * n;
        this.topVirtual = this.fullSize + 1;
        this.bottomVirtual = this.fullSize + 2;

        this.openSites = new Array<boolean>(this.fullSize).fill(false);
        this.numOpen = 0;

        // use union find instead and call union on virtual sites
        this.uf = new WeightedQuickUnion(this.fullSize + 3);
        // set top and bottom row to virtual sites
        for (let k = 1; k < this.size + 1; k++) {
            this.uf.union(this.topVirtual, k);
        }
        for (let l = this.fullSize; l > this.fullSize - this.size; l--) {
            this.uf.union(this.bottomVirtual, l);
        }
    }

    get getConnections(): number[] {
        return this.uf.connections;
    }

    get sites(): boolean[] {
        return this.openSites;
    }

    private checkRowColArgs(row: number, col: number): void {
        if (row < 1 || row > this.size) throw new IllegalArgumentException('row is an invalid number');
        if (col < 1 || col > this.size) throw new IllegalArgumentException('col is an invalid number');
    }

    public xyTo1D(row: number, col: number): number {
        this.checkRowColArgs(row, col);
        row -= 1;
        return this.size * row + col;
    }

    public open(row: number, col: number): void {
        this.checkRowColArgs(row, col);
        const site = this.xyTo1D(row, col);
        if (!this.isOpen(row, col)) {
            this.openSites[site] = true;
            this.numOpen++;
            if (row > 1 && this.isOpen(row - 1, col)) {
                const up = this.xyTo1D(row - 1, col);
                this.uf.union(site, up);
            }
            if (row < this.size && this.isOpen(row + 1, col)) {
                const down = this.xyTo1D(row + 1, col);
                this.uf.union(site, down);
            }
            if (col > 1 && this.isOpen(row, col - 1)) {
                const left = this.xyTo1D(row, col - 1);
                this.uf.union(site, left);
            }
            if (col < this.size && this.isOpen(row, col + 1)) {
                const right = this.xyTo1D(row, col + 1);
                this.uf.union(site, right);
            }
        }
    }

    public isOpen(row: number, col: number): boolean {
        this.checkRowColArgs(row, col);
        return this.openSites[this.xyTo1D(row, col)];
    }

    public isFull(row: number, col: number): boolean {
        this.checkRowColArgs(row, col);
        return this.uf.connected(this.xyTo1D(row, col), this.topVirtual);
    }

    public numberOfOpenSites(): number {
        return this.numOpen;
    }

    public percolates(): boolean {
        return this.uf.connected(this.topVirtual, this.bottomVirtual);
    }
}
