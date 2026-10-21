@echo off
cd /d "%~dp0"
py -m pip install --quiet --upgrade edge-tts 2>nul || python -m pip install --quiet --upgrade edge-tts
py make_audio.py 2>nul || python make_audio.py
echo.
pause
