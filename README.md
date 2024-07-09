## Folder Structure
```
bed-ca1-shoelesshoe             
├─ src                       
│  ├─ configs                
│  │  └─ initTables.js      
│  ├─ controllers            
│  │  ├─ inventoryController.js
│  │  ├─ leaderboardController.js
│  │  ├─ plantTypeController.js
│  │  ├─ recommendedTaskController.js
│  │  ├─ starredTaskController.js
│  │  └─ storeController.js
│  │  └─ streakController.js
│  │  └─ taskController.js
│  │  └─ taskProgressController.js
│  │  └─ userController.js
│  ├─ models                 
│  │  ├─ inventoryModel.js
│  │  ├─ leaderboardModel.js
│  │  ├─ plantTypeModel.js
│  │  ├─ recommendedTaskModel.js
│  │  ├─ starredTaskModel.js
│  │  └─ storeModel.js
│  │  └─ streakModel.js
│  │  └─ taskModel.js
│  │  └─ taskProgressModel.js
│  │  └─ userModel.js
│  ├─ routes                 
│  │  ├─ inventoryRoutes.js
│  │  ├─ leaderboardRoutes.js
│  │  └─ mainRoutes.js
│  │  ├─ plantTypeRoutes.js
│  │  ├─ recommendedTaskRoutes.js
│  │  ├─ starredTaskRoutes.js
│  │  └─ storeRoutes.js
│  │  └─ streakRoutes.js
│  │  └─ taskRoutes.js
│  │  └─ taskProgressRoutes.js
│  │  └─ userRoutes.js   
│  ├─ services               
│  │  └─ db.js               
│  └─ app.js   
├─ .gitignore                 
├─ index.js                  
├─ package.json       
├─ package-lock.json       
└─ README.md  
```

## Prerequisites

Before running the tests, ensure that the following dependencies are installed:

- Node.js
- npm (Node Package Manager)

## Clone the Repository

1. Open Visual Studio Code (VSCode) on your local machine.

2. Click on the "Source Control" icon in the left sidebar (the icon looks like a branch).

3. Click on the "Clone Repository" button.

4. In the repository URL input field, enter `https://github.com/ST0503-BED/bed-ca1-shoelesshoe.git`.

5. Choose a local directory where you want to clone the repository.

6. Click on the "Clone" button to start the cloning process.

## Set Up the Environment

1. In the project root directory, create a new file named `.env`.

2. Open the `.env` file in a text editor.

3. Copy the following example environment variables into the `.env` file:

    ```plaintext
    DB_HOST=<your_database_host>
    DB_USER=<your_database_user>
    DB_PASSWORD=<your_database_password>
    DB_DATABASE=<your_database_name>
    ```

    For example:

    ```plaintext
    DB_HOST="localhost"
    DB_USER="root"
    DB_PASSWORD="1234"
    DB_DATABASE="ca1"
    ```

   Update the values of the environment variables according to your MySQL database configuration.

## Install Dependencies

1. Open the terminal in VSCode by going to `View` > `Terminal` or using the shortcut `Ctrl + ``.

2. Navigate to the project root directory.

3. Install the required dependencies using npm:

   ```
   npm install
   ```

## Database Initialization

1. Make sure you have a MySQL database available for the mock test. Update the database configuration details in the `.env` file.

2. To initialize the database tables and populate them with sample data, open the terminal in VSCode and run the following command:

   ```
   npm run init_tables
   ```

## Endpoints

- /starred_tasks
    - POST /starred_tasks/{user_id}/{task_id}
        - description:
            - stars a task
        - response:
            - 201 Created
        - error handling:
            - if task_id or user_id is missing, return 400 bad request
            - if task_id does not exist, return 404 not found
            - if user_id does not exist, return 404 not found
    - GET /starred_tasks/{user_id}
        - description:
            - get all user's starred tasks
        - response:
            - 200 OK
        - error handling:
            - if user_id is missing, return 400 bad request
            - if result is empty, return 404 not found
    - GET /starred_tasks/{user_id}/{task_id}
        - description:
            - get a specific user's starred task
        - response:
            - 200 OK
        - error handling:
            - if user_id or task_id is missing, return 400 bad request
            - if result is empty, return 404 not found
    - DELETE /starred_tasks/{user_id}/{task_id}
        - description:
            - unstars a user's starred task
        - response:
            - 204 no response
        - error handling:
            - if user_id or task_id is missing, return 400 bad request
            - if user_id or task_id does not exist, return 404 not found
- /recommended_tasks December 28th, 2023 
    - GET /recommended_tasks
        - description:
            - randomly select 3 tasks to recommend user to do
        - response:
            - 200 OK
- /streak
    - GET /streak/{user_id}
        - description:
            - displays the user's streak
        - response:
            - 200 OK
        - error handling:
            - if user_id is missing, return 400 bad request
            - if user_id is not found, return 404 not found
- /plants
    - GET /plants
        - description:
            - display all the different types of plants and their stats
            - rarities are common rare and legendary
        - response:
            - 200 OK
- /leaderboard
    - GET /leaderboard/streak
        - description:
            - displays highest number of streaks
        - response:
            - 200 OK
    - GET /leaderboard/complete_tasks
        - description:
            - displays highest number of complete tasks
        - response:
            - 200 OK
    - GET /leaderboard/points
        - description:
            - displays highest number of points earned from all the completed tasks (not net points)
        - response:
            - 200 OK
    - GET /leaderboard/plant_level
        - description:
            - displays highest plant_level owned by user
        - response:
            - 200 OK
- /store
    - GET /store
        - description:
            - displays a freeze streak
            - displays a seedpacket
                - 75% common
                - 20% rare
                - 5% legendary
        - response:
            - 200 OK
    - GET /store/points/{user_id}
        - description:
            - calculate net total points
        - response:
            - 200 OK
        - error handling:
            - if user_id is missing, return 400 bad request
            - if user_id does not exist, return 404 not found
    - POST /store/{user_id}/{store_item_id}
        - description:
            - purchase a store_item
        - response:
            - 201 created
        - error handling:
            - if user_id or store_item_id is missing, return 400 bad request
            - if store_item_id is invalid, return 400 bad request
            - if user_id does not exist, return 404 not found
            - if user does have enough points, return 403 forbidden
- /inventory
    - GET /inventory/{user_id}
        - description:
            - display all boosts
            - display all owned plants
        - response:
            - 200 OK
        - error handling:
            - if user_id is missing, return 400 bad request
            - if user_id does not exist, return 404 not found
    - DELETE /inventory/items/{user_id}/{item_id}
        - description:
            - delete specified item
        - response:
            - 204 no response
        - error handling:
            - if user_id or item_id is missing, return 400 bad request
            - if user_id does not exist, return 404 not found
            - if item_id does not exist, return 404 not found
    - DELETE /inventory/plants/{user_id}/{item_id}
        - description:
            - delete specified plant
        - response:
            - 204 no repsonse
        - error handling:
            - if user_id or item_id is missing, return 400 bad request
            - if user_id does not exist, return 404 not found
            - if plant_id does not exist, return 404 not found