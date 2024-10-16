import express from 'express';

import { BalancedBinarySearchTree } from "./balancedBinarySearchTree";
import { profileInsert, profileDelete, profileSearch } from './profiler';
import { generateTestData, handleProfileRequest, parseQueryLength } from "./utils";

const app = express();
const port = 8080;

/**
 * Route to profile the insertion operation of the BalancedBinarySearchTree Tree.
 */
app.get('/profile/insert', (req, res) => {
    const queryLength = parseQueryLength(req.query.length as string);

    const avlTree = new BalancedBinarySearchTree();
    const testData = generateTestData(queryLength);

    handleProfileRequest(res, () => profileInsert(avlTree, testData));
});

/**
 * Route to profile the deletion operation of the BalancedBinarySearchTree Tree.
 */
app.get('/profile/delete', (req, res) => {
    const queryLength = parseQueryLength(req.query.length as string);

    const avlTree = new BalancedBinarySearchTree();
    const testData = generateTestData(queryLength);

    // Insert first to set up the tree
    testData.forEach(value => { avlTree.root = avlTree.insert(avlTree.root, value); });

    handleProfileRequest(res, () => profileDelete(avlTree, testData));
});

/**
 * Route to profile the search operation of the BalancedBinarySearchTree Tree.
 */
app.get('/profile/search', (req, res) => {
    const queryLength = parseQueryLength(req.query.length as string);

    const avlTree = new BalancedBinarySearchTree();
    const testData = generateTestData(queryLength);

    // Insert first to set up the tree
    testData.forEach(value => { avlTree.root = avlTree.insert(avlTree.root, value); });

    handleProfileRequest(res, () => profileSearch(avlTree, testData));
});

/**
 * Start the Express server.
 */
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${ port }`);
});
