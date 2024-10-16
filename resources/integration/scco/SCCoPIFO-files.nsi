!define INSTDIR_NAME "PackItForms\Outpost\SCCo"
!define REG_SUBKEY "Software\Microsoft\Windows\CurrentVersion\Uninstall\SCCoPackItForms"
!define WINDOW_TITLE "${DisplayName}"

Function ChooseAddonFiles
  SetOutPath "$INSTDIR\pack-it-forms"
  File built\pack-it-forms\form-checkin-out.html
  File built\pack-it-forms\form-ics213*.html
  File built\pack-it-forms\form-oa-muni-status*.html
  File built\pack-it-forms\form-oa-shelter-status*.html
  File built\pack-it-forms\form-scco-eoc-213rr*.html
  File built\pack-it-forms\form-allied-health-facility-status*.html
  File built\pack-it-forms\form-oa-mutual-aid-request*.html

  SetOutPath "$INSTDIR\pdf"
  File pack-it-forms\pdf\ICS-213_*.pdf
  File pack-it-forms\pdf\XSC_EOC-213RR_*.pdf
  File pack-it-forms\pdf\XSC_MuniStat_*.pdf
  File pack-it-forms\pdf\XSC_RACES_Routing_Slip_*.pdf
  File pack-it-forms\pdf\XSC_SheltStat_*.pdf
  File pack-it-forms\pdf\Allied_Health_Facility_Status_*.pdf
  File pack-it-forms\pdf\XSC_RACES_MA_Req_*.pdf
