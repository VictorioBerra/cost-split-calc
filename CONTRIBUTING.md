# How to get the code up and running easily:

## Set up your environment
- Install GIT https://git-scm.com/downloads
  - Make sure to add bash and all that to your context menu
  - Why? GIT will let you clone projects, make commits, revert changes etc.
- Install NodeJS (current) https://nodejs.org/en/
  - Why? Node is what the project is written in. We will use it to run the project, get dependencies, etc.
- Install Visual Studio Code https://code.visualstudio.com/
  - Why? VSC is currently the best text editor/IDE hybrid for projects like these.
  
## Get the project
- Fork this project.
  - Go here and click "Fork" in the upper right corner https://github.com/VictorioBerra/cost-split-calc
- Clone your new fork
  - Go to https://github.com/YOURUSERNAME/cost-split-calc and click the green "Clone or download" copy the clone URL
  - Navigate to 'My Documents', right click the whitespace, open bash and paste in the clone URL and hit enter. Leave bash OPEN.
    - NOTE: You can clone and run these commands in any command window (CMD, PowerShell, GIT Bash, etc.) you want.
- Install NPM deps
  - In your open bash window, type `cd cost-split-calc` to change directory to the newly cloned project folder
  - type `npm install` to download all the node depenedencies needed by the project
- Open the project in VSCode. The fun part!
  - Open VSCode, File -> Open Folder -> Open the folder My Documents/cost-split-calc
- Run it! You can open a terminal in VSCode, or in your bash window. Just run: `npm run ionic:serve`
