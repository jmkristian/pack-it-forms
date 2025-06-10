pack-it-forms
=============

Inspired by Phil Henderson's elegant PacForms browser-based solution
for creating and displaying message with a compact representation for
packet radio transmission of the entered data, *pack-it-forms* is a
respectful re-implementation with a number of advantages:

*  Message encoding is derived from form markup: The field names used
   in the message text are derived from the `name` attribute of the
   input elements of the HTML form.  There is no code specific to any
   field in a form.

*  Forms are written in a declarative style: validation constraints
   and default contents are specified in the HTML description of the
   form rather than Javascript.  A template substitution system
   enables dynamic generation of default values.

*  Reuseable form behavior: The implementation of form behavior has
   been cleanly separated and made more generic so new forms can be
   easily created.  A file inclusion mechanism allows reuse of
   sub-parts of forms as well.

*  The full implementation is available to all for study and
   enhancement.


For more information, see [OutpostForSCCo](https://github.com/jmkristian/OutpostForSCCo).
