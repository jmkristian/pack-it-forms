#!/bin/bash
# Describe add-ons for Outpost PMM.
DECLARE="$1"
VERSION="$2"
# The current working directory isn't the one that contains this script;
# it's a clone of git@github.com:jmkristian/OutpostForSCCo.git (or a fork thereof).

node ./buildHTML.js pack-it-forms

$DECLARE Los_Altos "Los Altos Forms"\
 Outpost_Forms.exe LosAltosForms_Setup-"$VERSION".exe\
 || exit $?

$DECLARE Milpitas "Milpitas Forms"\
 Milpitas_Forms.exe MilpitasForms_Setup-"$VERSION".exe\
 || exit $?

$DECLARE Report_911 "Incident Report Form (911)"\
 Report911.exe Report911_Setup-"$VERSION".exe\
 || exit $?

$DECLARE SCCoPIFO "SCCo PackItForms for Outpost (Public Edition)"\
 SCCoPIFO.exe SCCoPIFOsetup"$VERSION"pub.exe\
 || exit $?
