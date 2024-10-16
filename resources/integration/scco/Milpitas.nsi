!define INSTDIR_NAME "PackItForms\Outpost\Milpitas"
!define REG_SUBKEY "Software\Microsoft\Windows\CurrentVersion\Uninstall\MilpitasPIFO"
!define WINDOW_TITLE "${DisplayName}"

Function ChooseAddonFiles
  SetOutPath "$INSTDIR\pack-it-forms"
  File built\pack-it-forms\form-milpitas-*.html
  SetOutPath "$INSTDIR\pdf"
  File "pack-it-forms\pdf\MLP_*.pdf"
FunctionEnd
