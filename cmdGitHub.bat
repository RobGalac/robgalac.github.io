@echo off
cd C:\Users\rober\OneDrive\Documents\GitHub\robgalac.github.io

:: 1. Prepara los archivos
git add .

:: 2. Abre una ventana emergente para pedir el mensaje del commit
for /f "delims=" %%I in ('powershell -Command "[void][System.Reflection.Assembly]::LoadWithPartialName('Microsoft.VisualBasic'); [Microsoft.VisualBasic.Interaction]::InputBox('Escribe la descripcion del commit:', 'Git Commit')"') do set "mensaje=%%I"

:: 3. Si cancelas o lo dejas en blanco, pone un mensaje por defecto
if "%mensaje%"=="" set "mensaje=Actualizacion de portafolio"

:: 4. Ejecuta los comandos de Git
git commit -m "%mensaje%"
git pull
git push

cd ..\..