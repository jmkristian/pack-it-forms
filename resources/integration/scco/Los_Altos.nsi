!define INSTDIR_NAME OutpostForLAARES
!define REG_SUBKEY "Software\Microsoft\Windows\CurrentVersion\Uninstall\${INSTDIR_NAME}"
!define WINDOW_TITLE "${DisplayName}"

Function ChooseAddonFiles
  SetOutPath "$INSTDIR\pack-it-forms"
  File built\pack-it-forms\form-los-altos-*.html
  SetOutPath "$INSTDIR\pdf"
  File "pack-it-forms\pdf\LOS ALTOS*.pdf"
FunctionEnd
