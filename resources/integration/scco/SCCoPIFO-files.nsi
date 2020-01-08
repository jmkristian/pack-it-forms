!define INSTDIR_NAME "PackItForms\Outpost\SCCo"
!define REG_SUBKEY "Software\Microsoft\Windows\CurrentVersion\Uninstall\SCCoPackItForms"
!define WINDOW_TITLE "${DisplayName}"
OutFile "SCCoPIFOsetup${VersionMajor}.${VersionMinor}${OutFileSuffix}.exe"

Function ChooseAddonFiles
  File /r /x "*~" /x .git* /x notes /x pacread /x integration.js \
    /x form-*.html /x pdf /x http-request.html /x build.cmd /x *.nsi /x *.launch \
    pack-it-forms

  SetOutPath "$INSTDIR\pack-it-forms"
  File pack-it-forms\form-ics213*.html
  File pack-it-forms\form-oa-muni-status*.html
  File pack-it-forms\form-oa-shelter-status*.html
  File pack-it-forms\form-scco-eoc-213rr*.html
  File pack-it-forms\form-allied-health-facility-status*.html

  SetOutPath "$INSTDIR\pdf"
  File pack-it-forms\pdf\ICS-213_*.pdf
  File pack-it-forms\pdf\XSC_EOC-213RR_*.pdf
  File pack-it-forms\pdf\XSC_MuniStat_*.pdf
  File pack-it-forms\pdf\XSC_RACES_Routing_Slip_*.pdf
  File pack-it-forms\pdf\XSC_SheltStat_*.pdf
  File pack-it-forms\pdf\Allied_Health_Facility_Status_*.pdf
