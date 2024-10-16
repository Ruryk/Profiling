import { BalancedBinarySearchTree } from './balancedBinarySearchTree';

/**
 * Helper function to profile memory and time consumption of a tree operation.
 * @param {Function} operation - The operation to be profiled (insert, delete, search).
 * @param {BalancedBinarySearchTree} tree - The BalancedBinarySearch tree instance.
 * @param {number[]} values - Array of values for the operation.
 * @param {string} operationName - Name of the operation (for logging).
 */
function profileOperation(operation: (tree: BalancedBinarySearchTree, value: number) => void, tree: BalancedBinarySearchTree, values: number[], operationName: string): void {
    // If garbage collector is available, force a run
    if (global.gc) {
        global.gc();
    }

    const startMemory = process.memoryUsage().heapUsed;
    const startTime = performance.now();

    values.forEach(value => operation(tree, value));

    const endTime = performance.now();
    const endMemory = process.memoryUsage().heapUsed;

    console.log(`${operationName} Memory used: ${(endMemory - startMemory) / 1024 / 1024} MB`);
    console.log(`${operationName} Time taken: ${endTime - startTime} ms`);
}

/**
 * Insert values into the BalancedBinarySearch tree and profile the operation.
 * @param {BalancedBinarySearchTree} tree - The BalancedBinarySearch tree instance.
 * @param {number[]} values - Array of values to be inserted.
 */
export function profileInsert(tree: BalancedBinarySearchTree, values: number[]): void {
    profileOperation((tree, value) => { tree.root = tree.insert(tree.root, value); }, tree, values, 'Insert');
}

/**
 * Delete values from the BalancedBinarySearch tree and profile the operation.
 * @param {BalancedBinarySearchTree} tree - The BalancedBinarySearch tree instance.
 * @param {number[]} values - Array of values to be deleted.
 */
export function profileDelete(tree: BalancedBinarySearchTree, values: number[]): void {
    profileOperation((tree, value) => { tree.root = tree.deleteNode(tree.root, value); }, tree, values, 'Delete');
}

/**
 * Search values in the BalancedBinarySearch tree and profile the operation.
 * @param {BalancedBinarySearchTree} tree - The BalancedBinarySearch tree instance.
 * @param {number[]} values - Array of values to be searched.
 */
export function profileSearch(tree: BalancedBinarySearchTree, values: number[]): void {
    profileOperation((tree, value) => tree.search(tree.root, value), tree, values, 'Search');
}
