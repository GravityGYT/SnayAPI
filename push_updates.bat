@echo off
:: Change to the directory where the script is located
cd /d "%~dp0"

:: Define the GitHub repository URL
set REPO_URL=https://github.com/GravityGYT/SnayAPI.git

:: Pull the latest changes from the repository
echo Pulling latest changes from the repository...
git pull %REPO_URL% main --allow-unrelated-histories

:: Exclude the script file (this .bat file) from being added to the staging area
echo Excluding this script file from staging...
git update-index --assume-unchanged "%~nx0"

:: Add all other changes to the staging area
echo Adding all changes to the staging area...
git add .

:: Commit the changes with a default message
echo Committing the changes...
git commit -m "Automated commit: Updated files"

:: Push the changes to the remote repository
echo Pushing changes to the repository...
git push -u %REPO_URL% main

echo Done! Press any key to exit.
pause
