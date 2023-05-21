!define INSTDIR_NAME "PackItForms\Outpost\Report911"
!define REG_SUBKEY "Software\Microsoft\Windows\CurrentVersion\Uninstall\Report911PIFO"
!define WINDOW_TITLE "${DisplayName}"

Function ChooseAddonFiles
  File /r /x "*~" /x .git* /x notes /x pacread /x integration.js \
    /x form-*.html /x pdf /x build.cmd /x *.nsi /x *.launch \
    pack-it-forms
  SetOutPath "$INSTDIR\pack-it-forms"
  File pack-it-forms\form-report-911.html
  SetOutPath "$INSTDIR\addons"
  File /oname=${addon_name}.launch pack-it-forms\resources\integration\scco\${addon_name}.launch
  SetOutPath "$INSTDIR\pdf"
  File "pack-it-forms\pdf\IncidentReportingFormWithInstructions.pdf"
FunctionEnd
