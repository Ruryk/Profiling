/**
 * Class representing a node in an BalancedBinarySearch tree.
 */
class Node {
    value: number;
    left: Node | null;
    right: Node | null;
    height: number;

    constructor(value: number) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.height = 1; // New nodes are added as leaf nodes
    }
}

/**
 * Class representing an BalancedBinarySearch Tree.
 * BalancedBinarySearch Tree is a self-balancing binary search tree where the difference between heights
 * of left and right subtrees cannot be more than one for all nodes.
 */
export class BalancedBinarySearchTree {
    root: Node | null = null;

    /**
     * Get the height of a node.
     * @param {Node | null} node - The node whose height is to be returned.
     * @returns {number} The height of the node.
     */
    private getHeight(node: Node | null): number {
        return node ? node.height : 0;
    }

    /**
     * Get the balance factor of a node.
     * Balance factor is the difference between heights of left and right subtrees.
     * @param {Node | null} node - The node whose balance factor is to be returned.
     * @returns {number} The balance factor of the node.
     */
    private getBalance(node: Node | null): number {
        return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
    }

    /**
     * Update the height of a node based on its children.
     * @param {Node} node - The node whose height is to be updated.
     */
    private updateHeight(node: Node): void {
        node.height = Math.max(this.getHeight(node.left), this.getHeight(node.right)) + 1;
    }

    /**
     * Perform a right rotation on a subtree rooted with y.
     * @param {Node} y - The root of the subtree to be rotated.
     * @returns {Node} The new root of the rotated subtree.
     */
    private rightRotate(y: Node): Node {
        const x = y.left!;
        const T2 = x.right;

        x.right = y;
        y.left = T2;

        this.updateHeight(y);
        this.updateHeight(x);

        return x;
    }

    /**
     * Perform a left rotation on a subtree rooted with x.
     * @param {Node} x - The root of the subtree to be rotated.
     * @returns {Node} The new root of the rotated subtree.
     */
    private leftRotate(x: Node): Node {
        const y = x.right!;
        const T2 = y.left;

        y.left = x;
        x.right = T2;

        this.updateHeight(x);
        this.updateHeight(y);

        return y;
    }

    /**
     * Balance the tree after insertion or deletion.
     * @param {Node} node - The node that may need rebalancing.
     * @param {number} value - The value used to determine the type of imbalance.
     * @returns {Node} The balanced node.
     */
    private balanceTree(node: Node, value: number): Node {
        const balance = this.getBalance(node);

        // Left heavy
        if (balance > 1) {
            if (value < node.left!.value) {
                return this.rightRotate(node); // Left-Left case
            } else {
                node.left = this.leftRotate(node.left!); // Left-Right case
                return this.rightRotate(node);
            }
        }

        // Right heavy
        if (balance < -1) {
            if (value > node.right!.value) {
                return this.leftRotate(node); // Right-Right case
            } else {
                node.right = this.rightRotate(node.right!); // Right-Left case
                return this.leftRotate(node);
            }
        }

        return node; // No balancing needed
    }

    /**
     * Insert a new value into the BalancedBinarySearch tree and maintain balance.
     * @param {Node | null} node - The current node.
     * @param {number} value - The value to be inserted.
     * @returns {Node} The updated node after insertion.
     */
    insert(node: Node | null, value: number): Node {
        if (!node) return new Node(value); // Base case: new node created

        if (value < node.value) {
            node.left = this.insert(node.left, value); // Insert into left subtree
        } else if (value > node.value) {
            node.right = this.insert(node.right, value); // Insert into right subtree
        } else {
            return node; // Duplicate values are not allowed
        }

        this.updateHeight(node);

        return this.balanceTree(node, value); // Rebalance the tree
    }

    /**
     * Balance the tree after deletion.
     * @param {Node} node - The node that may need rebalancing.
     * @returns {Node} The balanced node.
     */
    private balanceAfterDeletion(node: Node): Node {
        const balance = this.getBalance(node);

        // Left heavy
        if (balance > 1) {
            if (this.getBalance(node.left!) >= 0) {
                return this.rightRotate(node); // Left-Left case
            } else {
                node.left = this.leftRotate(node.left!); // Left-Right case
                return this.rightRotate(node);
            }
        }

        // Right heavy
        if (balance < -1) {
            if (this.getBalance(node.right!) <= 0) {
                return this.leftRotate(node); // Right-Right case
            } else {
                node.right = this.rightRotate(node.right!); // Right-Left case
                return this.leftRotate(node);
            }
        }

        return node; // No balancing needed
    }

    /**
     * Delete a node with a given value and maintain balance.
     * @param {Node | null} node - The root of the subtree.
     * @param {number} value - The value to be deleted.
     * @returns {Node | null} The updated root after deletion.
     */
    deleteNode(node: Node | null, value: number): Node | null {
        if (!node) return null;

        if (value < node.value) {
            node.left = this.deleteNode(node.left, value);
        } else if (value > node.value) {
            node.right = this.deleteNode(node.right, value);
        } else {
            // Node to be deleted is found
            if (!node.left || !node.right) {
                node = node.left ? node.left : node.right; // One child or no child case
            } else {
                const temp = this.getMinValueNode(node.right!);
                node.value = temp.value;
                node.right = this.deleteNode(node.right, temp.value);
            }
        }

        if (!node) return null; // If the tree had only one node

        this.updateHeight(node);

        return this.balanceAfterDeletion(node); // Balance the tree after deletion
    }

    /**
     * Search for a node with a given value.
     * @param {Node | null} node - The current node.
     * @param {number} value - The value to search for.
     * @returns {Node | null} The node containing the value, or null if not found.
     */
    search(node: Node | null, value: number): Node | null {
        if (!node || node.value === value) return node;

        if (value < node.value) return this.search(node.left, value);
        return this.search(node.right, value);
    }

    /**
     * Get the node with the smallest value in a subtree.
     * @param {Node} node - The root of the subtree.
     * @returns {Node} The node with the smallest value.
     */
    private getMinValueNode(node: Node): Node {
        let current = node;
        while (current.left) current = current.left;
        return current;
    }
}
