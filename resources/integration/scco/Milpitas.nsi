!define INSTDIR_NAME "PackItForms\Outpost\Milpitas"
!define REG_SUBKEY "Software\Microsoft\Windows\CurrentVersion\Uninstall\MilpitasPIFO"
!define WINDOW_TITLE "${DisplayName}"

Function ChooseAddonFiles
  File /r /x "*~" /x .git* /x notes /x pacread /x integration.js \
    /x form-*.html /x parts /x pdf /x build.cmd /x *.nsi /x *.launch \
    pack-it-forms
  SetOutPath "$INSTDIR\pack-it-forms"
  File pack-it-forms\form-milpitas-*.html
  SetOutPath "$INSTDIR\pack-it-forms\parts"
  File pack-it-forms\parts\mlp-*.html
  SetOutPath "$INSTDIR\addons"
  File /oname=${addon_name}.launch pack-it-forms\resources\integration\scco\${addon_name}.launch
  SetOutPath "$INSTDIR\pdf"
  File "pack-it-forms\pdf\MLP_*.pdf"
FunctionEnd
