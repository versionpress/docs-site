::
:: Run this to init the working copy. (Can be run safely at any time, even after initialization.)
::

@echo off


:: Check required binaries are available
WHERE git >nul 2>nul
IF %ERRORLEVEL% NEQ 0 ECHO Please install Git & exit /b %ERRORLEVEL%

WHERE npm >nul 2>nul
IF %ERRORLEVEL% NEQ 0 ECHO Please install Node.js / npm & exit /b %ERRORLEVEL%

WHERE gulp >nul 2>nul
IF %ERRORLEVEL% NEQ 0 ECHO Please install Gulp - 'npm install -g gulp' & exit /b %ERRORLEVEL%



echo 1) Some basic Git config

git config core.ignorecase false
echo core.ignorecase set to false


echo.
echo 2) NPM install
cmd /C "npm install"


echo.
echo [OK] All done

:: Pause when run via double-click, see http://stackoverflow.com/a/3552659/21728
for %%x in (%cmdcmdline%) do if /i "%%~x"=="/c" set DOUBLECLICKED=1
if defined DOUBLECLICKED pause