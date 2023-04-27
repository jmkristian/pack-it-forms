#!/bin/bash
# Describe add-ons for Outpost PMM.
DECLARE="$1"
VERSION="$2"
# The current working directory isn't the one that contains this script;
# it's a clone of git@github.com:jmkristian/OutpostForSCCo.git (or a fork thereof).

$DECLARE Report_911 "Incident Reporting Form (911)"\
 Outpost_Forms.exe Report911_Setup-"$VERSION".exe\
 || exit $?
