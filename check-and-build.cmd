@echo off
setlocal

rem Always run from the repository root where this script is stored.
pushd "%~dp0"

echo ============================================================
echo Astro site: format, validate, and build
echo Working directory: %CD%
echo ============================================================

where node >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Node.js was not found in PATH.
  echo Install or enable Node.js 24, then run this script again.
  goto :failed
)

where npm.cmd >nul 2>nul
if errorlevel 1 (
  echo [ERROR] npm.cmd was not found in PATH.
  goto :failed
)

echo.
echo [1/5] Formatting maintained project files...
call npm.cmd run format
if errorlevel 1 goto :failed

echo.
echo [2/5] Checking Prettier formatting...
call npm.cmd run format:check
if errorlevel 1 goto :failed

echo.
echo [3/5] Running ESLint...
call npm.cmd run lint
if errorlevel 1 goto :failed

echo.
echo [4/5] Validating Astro content and types...
call npm.cmd run check
if errorlevel 1 goto :failed

echo.
echo [5/5] Building the production site...
call npm.cmd run build
if errorlevel 1 goto :failed

echo.
echo ============================================================
echo [SUCCESS] All checks passed and the production build finished.
echo You can now review the changes, commit, and push to GitHub.
echo ============================================================
if /I not "%~1"=="--no-pause" pause
popd
exit /b 0

:failed
echo.
echo ============================================================
echo [FAILED] The process stopped because one command failed.
echo Review the error above before committing or pushing.
echo ============================================================
if /I not "%~1"=="--no-pause" pause
popd
exit /b 1
