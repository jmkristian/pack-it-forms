!include pack-it-forms\resources\integration\scco\SCCoPIFO-files.nsi

  SetOutPath "$INSTDIR\addons"
  File /oname=${addon_name}.launch "pack-it-forms\resources\integration\scco\${addon_name}.launch"
FunctionEnd
