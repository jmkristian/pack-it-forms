!define INSTDIR_NAME "PackItForms\Outpost\Report911"
!define REG_SUBKEY "Software\Microsoft\Windows\CurrentVersion\Uninstall\Report911PIFO"
!define WINDOW_TITLE "${DisplayName}"

Function ChooseAddonFiles
  SetOutPath "$INSTDIR\pack-it-forms"
  File built\pack-it-forms\form-report-911.html
  SetOutPath "$INSTDIR\pdf"
  File "pack-it-forms\pdf\IncidentReportingForm*.pdf"
FunctionEnd
