# Team-06
Term Project Repository for Team 6 for CS 5500: Foundations of Software Engineering

Installation Instructions for CopyCat: 

1. Setting up Node.js for Mac/Linux using HomeBrew
    1. Homebrew makes the process of installation of Node a one-step process. By using Homebrew, we do not need to manually add the path of node executable.
    2. From the terminal execute the command: $ brew install node
    3. Node is installed on your system now.
    4. Test the installed packages (Restart your computer)
    5. Test Node: open command prompt and type node -v. You should see the downloaded version of node as “v7.3.0”
    6. Test NPM: In command prompt, type npm -v. You should see the downloaded version of npm as “3.10.10”
    
2. Setting up Node.js for Windows 
    1. Download the windows installer for Node.js from the Node.js website
    2. Run the installer (the .msi file downloaded in Step 1)
    3. Accept the license agreement and all defaults and click install.
    4. Test the installed packages (Restart your computer)
    5. Test Node: open command prompt and type node -v . You should see the downloaded version of node as “v7.3.0” 
       (the version you just downloaded in the previous step).
    6. Test NPM: In command prompt, type npm -v. You should see the downloaded version of npm as “3.10.10” 
       (the version you just downloaded in the previous step).
       
3. Setting up MySQL Workbench
    1. Begin by installing MySQL Workbench on your local computer.
    2. Start MySQL Workbench
    3. Click the + button near MySQL connections
    4. Click the ‘Local instance MySQL’ button 
    5. Click connect to begin the configuration process
    6. Perform a mysqldump to recreate the login database in the same state as it was at the time of 
       the dump by the team .../.../Team-06/Dump For CopyCat.sql
       
4. Project Installation
    1. Clone the team project repository from Github
    2. Navigate to .../.../Team-06/phaseC/CopyCat/server in the project repository on your local computer
    3. Open the index.ts
    4. Find the mysql.createConnection instance (Line 24)
    5. Change the password to your mySQL workbench password for local host
    6. Run 'npm install' for both the client and server directories.
    7. Navigate to Team-06/phaseC/CopyCat/server/dist/uploads/student1 and delete all present in this folder if any.
    8. Navigate to Team-06/phaseC/CopyCat/server/dist/uploads/student2 and delete all present in this folder if any.
    9. Navigate to Team-06/phaseC/CopyCat/server and run npm start in the terminal
    10. Simultaneously, navigate to Team-06/phaseC/CopyCat/client and run npm start in the terminal
    11. The application client will launch on http://localhost:3000
    12. The application server will start running on http://localhost:3001  
    
    
Troubleshooting:  If you have any challenges connecting the server to the database, you must run the following 
SQL query within the login system database on MySQL Workbench:  

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY ‘userlocalhostpassword'; 
flush privileges;

Group Members: 

archit13 - Archit Manek <manek.a@northeastern.edu>

shebna - Shebna Mathew <mathew.she@northeastern.edu>

raithathad - Devina Raithatha <raithatha.d@northeastern.edu>

nikhitasingh08 - Nikhita Singh <singh.nikhi@northeastern.edu>
