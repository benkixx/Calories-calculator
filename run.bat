@echo off
cd /d "%~dp0"

if not exist node_modules (
    echo Installing dependencies, first run only...
    call npm install
)

echo Starting Calories Calculator...
start "" http://localhost:5173/
call npm run dev

pause
