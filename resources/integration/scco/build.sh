#!/bin/bash
# Describe add-ons for Outpost PMM.
DECLARE="$1"
VERSION="$2"
# The current working directory isn't the one that contains this script;
# it's a clone of git@github.com:jmkristian/OutpostForSCCo.git (or a fork thereof).

$DECLARE Los_Altos "Outpost for LAARES"\
 Outpost_Forms.exe OutpostForLAARES_Setup-"$VERSION".exe\
 || exit $?

$DECLARE SCCoPIFO "SCCo Pack-It-Forms for Outpost (Public Edition)"\
 SCCoPIFO.exe SCCoPIFOsetup"$VERSION"pub.exe\
 || exit $?
