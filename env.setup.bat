@echo off
REM Environment Setup Script for Playwright API Testing

echo ==========================================
echo Setting up Playwright API Testing Environment
echo ==========================================
echo.

REM Step 1: Install npm dependencies
echo [1/4] Installing npm dependencies...
call npm install
if errorlevel 1 (
    echo ERROR: npm install failed
    exit /b 1
)
echo ✓ npm install completed
echo.

REM Step 2: Install Allure Playwright
echo [2/4] Installing Allure Playwright as dev dependency...
call npm install -D allure-playwright
if errorlevel 1 (
    echo ERROR: npm install -D allure-playwright failed
    exit /b 1
)
echo ✓ Allure Playwright installed
echo.

REM Step 3: Install Allure Command Line
echo [3/4] Installing Allure Command Line globally...
call npm install -g allure-commandline --force
if errorlevel 1 (
    echo ERROR: npm install -g allure-commandline failed
    exit /b 1
)
echo ✓ Allure Command Line installed
echo.

REM Step 4: Install Playwright browsers
echo [4/4] Installing Playwright browsers...
call npx playwright install
if errorlevel 1 (
    echo ERROR: npx playwright install failed
    exit /b 1
)
echo ✓ Playwright browsers installed
echo.

echo ==========================================
echo Environment setup completed successfully!
echo ==========================================
echo.
echo You can now run tests with: npm test
echo View HTML report with: npx playwright show-report
echo Generate Allure report with: allure generate allure-results -o allure-report
pause
