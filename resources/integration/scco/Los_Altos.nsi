!define INSTDIR_NAME OutpostForLAARES
!define REG_SUBKEY "Software\Microsoft\Windows\CurrentVersion\Uninstall\${INSTDIR_NAME}"
!define WINDOW_TITLE "${DisplayName}"

Function ChooseAddonFiles
  File /r /x "*~" /x .git* /x notes /x pacread /x integration.js \
    /x form-*.html /x pdf /x build.cmd /x *.nsi /x *.launch \
    pack-it-forms
  SetOutPath "$INSTDIR\pack-it-forms"
  File pack-it-forms\form-los-altos-*.html
  SetOutPath "$INSTDIR\addons"
  File /oname=${addon_name}.launch pack-it-forms\resources\integration\scco\${addon_name}.launch
  SetOutPath "$INSTDIR\pdf"
  File "pack-it-forms\pdf\LOS ALTOS*.pdf"
FunctionEnd

OutFile "${INSTDIR_NAME}_Setup-${VersionMajor}.${VersionMinor}.exe"
