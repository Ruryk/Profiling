# Profiling

## Operation Tree Profiling

- Implement Balanced Binary Search Tree class and operations of insert/delete/search.
- Profile space usage ( Confirm that you see O (n) )
- Profile time consumption ( Confirm that you see O (log n))

A **Balanced Binary Search Tree (BBST)** is a type of binary search tree (BST) that automatically maintains its balance
to
ensure efficient operations. In a standard BST, the height of the tree can grow up to O(n) in the worst case (when
elements are inserted sequentially), leading to degraded performance for operations like insertion, search, and
deletion.

In contrast, a BBST ensures that the height difference between the left and right subtrees of any node is kept small (
usually no more than 1), which keeps the height of the tree bounded to O(log n). This guarantees that the core
operations remain efficient:

- Insert: O(log n)
- Delete: O(log n)
- Search: O(log n)

Examples of BBSTs include AVL trees and Red-Black trees. In your implementation, an AVL tree is used, where balance is
maintained by performing rotations after each insert or delete operation to restore balance if it is disrupted.

## Requirements

- **Node.js** (version 14 or above)
- **npm** (for dependency management)
- Optionally, **Docker** for containerized running (if Docker is preferred).

## Run the Project

````bash
docker-compose up --build
````

or

````bash
npm install
npm start
````

or

````bash
npm install
npm build
npm run start:js
````

## API Endpoints

### Insert

- URL: /profile/insert
- Method: GET
- Query Parameter: length (optional) – Defines the number of operations to perform. Defaults to 100000.
- Description: Profiles the insertion of nodes into the Balanced Binary Search Tree and returns the memory and time
  usage in the console.

Example

````bash
http://localhost:8080/profile/insert?length=50000
````

or

````bash
curl "http://localhost:8080/profile/insert?length=50000"
````

### Delete

- URL: /profile/delete
- Method: GET
- Query Parameter: length (optional) – Defines the number of operations to perform. Defaults to 100000.
- Description: Profiles the deletion of nodes from the Balanced Binary Search Tree after inserting them.

Example

````bash
http://localhost:8080/profile/delete?length=50000
````

or

````bash
curl "http://localhost:8080/profile/delete?length=50000"
````

### Search

- URL: /profile/search
- Method: GET
- Query Parameter: length (optional) – Defines the number of operations to perform. Defaults to 100000.
- Description: Profiles the search operation on nodes in the Balanced Binary Search Tree after inserting them.

Example

````bash
http://localhost:8080/profile/search?length=50000
````

or

````bash
curl "http://localhost:8080/profile/search?length=50000"
````

## Profiling

When you hit the profiling endpoints, the results (time taken and memory used) will be printed to the console. Each
operation is run on the specified number of elements, and the following data is displayed:

- Time Taken: The time taken for the operation (in milliseconds).
- Memory Used: The memory difference before and after the operation (in MB).

Example output:

````bash
Insert Memory used: 14.836540222167969 MB
Insert Time taken: 324.7290000000027 ms
````