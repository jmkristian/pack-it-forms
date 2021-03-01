@REM This can't be a Bash script, because quoting /DDisplayName doesn't work right.

@rmdir /Q /S built\addons
@mkdir built\addons
@copy "%~dp0Milpitas.nsi" built\addon.nsi
@node bin/Outpost_Forms.js build %VersionMajor%.%VersionMinor% ^
  Milpitas bin\Milpitas_Forms.exe "Milpitas Forms"
@if %errorlevel% neq 0 exit /b %errorlevel%
@"C:\Program Files (x86)\NSIS\makensis.exe" ^
  /DVersionMajor=%VersionMajor% ^
 /DVersionMinor=%VersionMinor% ^
  /Daddon_name=Milpitas ^
  /DDisplayName="Milpitas Forms" ^
  /DPROGRAM_PATH=bin\Milpitas_Forms.exe ^
  setup.nsi
@if %errorlevel% neq 0 exit /b %errorlevel%

@rmdir /Q /S built\addons
@mkdir built\addons
@copy "%~dp0Los_Altos.nsi" built\addon.nsi
@node bin/Outpost_Forms.js build %VersionMajor%.%VersionMinor% ^
  Los_Altos bin\Outpost_Forms.exe "Outpost for LAARES"
@if %errorlevel% neq 0 exit /b %errorlevel%
@"C:\Program Files (x86)\NSIS\makensis.exe" ^
  /DVersionMajor=%VersionMajor% ^
  /DVersionMinor=%VersionMinor% ^
  /Daddon_name=Los_Altos ^
  /DDisplayName="Outpost for LAARES" ^
  /DPROGRAM_PATH=bin\Outpost_Forms.exe ^
  setup.nsi
@if %errorlevel% neq 0 exit /b %errorlevel%

@rmdir /Q /S built\addons
@mkdir built\addons
@copy "%~dp0SCCoPIFO.nsi" built\addon.nsi
@node bin/Outpost_Forms.js build %VersionMajor%.%VersionMinor% ^
  SCCoPIFO bin\SCCoPIFO.exe "SCCo Pack-It-Forms for Outpost"
@if %errorlevel% neq 0 exit /b %errorlevel%
@"C:/Program Files (x86)/NSIS/makensis.exe" ^
  /DVersionMajor=%VersionMajor% ^
  /DVersionMinor=%VersionMinor% ^
  /DDisplayName="SCCo Pack-It-Forms for Outpost (Public Edition)" ^
  /Daddon_name=SCCoPIFO ^
  /DOutFileSuffix=pub ^
  /DPROGRAM_PATH=bin\SCCoPIFO.exe ^
  setup.nsi
@if %errorlevel% neq 0 exit /b %errorlevel%
