const pool = require('../services/db');

const SQLSTATEMENT = `
DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS Task;
DROP TABLE IF EXISTS TaskProgress;
DROP TABLE IF EXISTS StarredTask;
DROP TABLE IF EXISTS PlantType;
DROP TABLE IF EXISTS Plant;
DROP TABLE IF EXISTS PointsSpent;
DROP TABLE IF EXISTS Item;
DROP TABLE IF EXISTS ItemType;
DROP TABLE IF EXISTS StoreItem;
DROP TABLE IF EXISTS Streak;

CREATE TABLE User (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username TEXT,
    email TEXT
);

CREATE TABLE Task (
    task_id INT PRIMARY KEY AUTO_INCREMENT,
    title TEXT,
    description TEXT,
    points INT
);

CREATE TABLE TaskProgress (
    progress_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    task_id INT NOT NULL,
    completion_date TIMESTAMP,
    notes TEXT
);

CREATE TABLE StarredTask (
    starred_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    task_id INT NOT NULL
);

CREATE TABLE PlantType (
    type_id INT PRIMARY KEY AUTO_INCREMENT,
    name TEXT,
    rarity TEXT
);
  
CREATE TABLE Plant (
    plant_id INT PRIMARY KEY AUTO_INCREMENT,
    owner_id INT NOT NULL,
    plant_type_id INT NOT NULL,
    planted_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    level INT
);

CREATE TABLE PointsSpent (
    user_id INT UNIQUE NOT NULL,
    points_spent INT
);
  
CREATE TABLE Item (
    item_id INT PRIMARY KEY AUTO_INCREMENT,
    owner_id INT NOT NULL,
    item_type_id INT NOT NULL,
    acquired_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    used_on TIMESTAMP
);

CREATE TABLE ItemType (
    type_id INT PRIMARY KEY AUTO_INCREMENT,
    name TEXT,
    ability TEXT
);

CREATE TABLE StoreItem (
    storeitem_id INT PRIMARY KEY AUTO_INCREMENT,
    name TEXT,
    details TEXT,
    cost TEXT
);

CREATE TABLE Streak (
    user_id INT UNIQUE NOT NULL,
    streak INT
);  

INSERT INTO Task (title, description, points) VALUES
('Plant a Tree', 'Plant a tree in your neighbourhood or a designated green area.', 50),
('Use Public Transportation', 'Use public transportation or carpool instead of driving alone.', 30),
('Reduce Plastic Usage', 'Commit to using reusable bags and containers.', 40),
('Energy Conservation', 'Turn off lights and appliances when not in use.', 25),
('Composting', 'Start composting kitchen scraps to create natural fertilizer.', 35);

INSERT INTO PlantType (name, rarity) VALUES
('Doom Shroom', 'Rare'),
('Sunflower', 'Common'),
('Twin Sunflower', 'Rare'),
('Venus Flytrap', 'Legendary'),
('Gattling Peashooter', 'Legendary');

INSERT INTO ItemType (name, ability) VALUES
('Streak Freezer', 'Freeze your streak for 1 day');

INSERT INTO StoreItem (name, details, cost) VALUES
('Streak Freezer', 'Freeze your streak for 1 day', '100 points'),
('Seedpacket', 'Obtain a random plant whereby there is a 80% chance of getting a common plant, 15% chance of getting a rare plant and 5% chance of getting a legendary plant', '200 points');
`;

pool.query(SQLSTATEMENT, (error, results, fields) => {
    if (error) {
        console.error("Error creating tables:", error);
    } else {
        console.log("Tables created successfully");
    }
    process.exit();
});
