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


To install forms into Outpost, see [OutpostForSCCo](https://github.com/jmkristian/OutpostForSCCo).

Using Forms
===========

To enter data in a new form, open the form in your web browser,
by clicking an item in the Outpost Forms menu.
Once loaded you will see a typical browser form.  Across the top of
the page is a header bar with some buttons, including:

* Submit to OutPost
* Show Text Message

The `Submit to OutPost` button will submit the form data to OutPost to
transmit as a packet radio message.  It is disabled until the form is
valid, with all required fields entered with acceptable values.  The
validity of the form as a whole is also indicated by the color of the
header bar.  When the entire form is valid the bar will turn from gray
to green.  Any field that is invalid either because no data has been
entered or because the entered data is not acceptable is highlighted
with a reddish glow.  Depending on the browser, hovering the cursor
over the field may give additional information about why the field is
considered invalid.

The `Show Text Message` button will open an overlay with the current
contents of the text message that would be transmitted to OutPost if
the `Submit to OutPost` button were pressed.  The underlying form is
still active and the overlay will update in real-time as data is
entered in form controls.  The overlay is read-only so you can not
type into it but you can select text and copy it using the clipboard.
Click the button again to hide the overlay.

When the form is first loaded the cursor will be positioned at the
first invalid field in form since this is typically the first field
you'll want to enter.  You can navigate between fields as usual using
the mouse pointer and standard keyboard shortcuts.

Some form fields may be disabled with contents that looks like one or
more words surrounded by curly braces.  For example `"{{date}}"`.  These
are placeholders that indicate values that will be automatically
substituted when the message is sent.

Viewing Previously Entered Forms
--------------------------------

Opening a message in OutPost
should result in a new browser window containing the filled out message form.
If you're viewing a previously sent message, the form fields are all read-only
and the button bar has a different color.
The browser tab or window can be closed when viewing of the message is complete.

Note that pack-it-forms is used to replicate the paper forms used in
the manual process and for ICS-213 derived forms the sender and
receiver forms have different data in a few fields such as the various
fields used for recording message numbers, the operate name/callsign,
and the date/time the message was sent/received.  Don't be surprised
by this.


Creating New Forms
==================

To start developing new forms, clone this repository and, in your clone,
copy pack-it-forms/resources/integration/pacread/integration.js
up one level into the pack-it-forms/resources/integration folder.
Then you can open a form-xx.html file in Internet Explorer (but not other browsers).
You might be able to use a standard HTML editor on form-xx.html files.
The code in integration.js inserts boilerplate and initializes data,
without using a web server.

The easiest way to start creating a new form is to copy an existing form.
Each form is a file named form-xx.html, containing HTML with some
restrictions to allow the form to work smoothly with the
code that implements pack-it-forms functionality.
Copy a form-xx.html file,
find the `<form>` element with `id="the-form"` and edit its contents.
The rest of the file is mostly boilerplate that you need not change.
(To learn more about it, see the _Explanation of the Form Boilerplate_ below.)

Assuming you start with all the boilerplate in place, here are the
steps you should follow in creating your form:
 
   1. Change the title
   2. Edit input elements
   3. Setup default and on-submit behavior on fields
   4. Adjust layout and styling
   5. Clean up Javascript

The next sections cover each of these in detail.


Change the Title
----------------

Change the contents of the `title` element to be the name of your new form.
Browsers will display this title, and you may refer to it elsewhere in the form.

Edit Input Elements
-------------------

Fields in your form are HTML `input`, `select`, and `textarea` elements, as usual in HTML.
However, the input elements must each have a `name` attribute formatted like this:

   * If the element maps to a number in the form that you are trying
     to replicate, like `10`, then the value should be that number
     followed by a period followed by a short description.  Example:
     `10.subject`.  This means that the number will be used as the
     reference to the information in Outpost messages.
   * Otherwise, just use a short, descriptive name like `Method`.
     Since the field name won't start with a number, this means that
     the whole field name will be used as the reference in Outpost messages.

You can give an `input` a standard style, validation pattern and placeholder
by adding one of these classes to its class attribute:

* date
* time
* phone-number
* cardinal-number
* real-number
* call-sign

You can override the standard style, pattern and/or placeholder with
HTML attributes, as usual.

The `select` element is used when the user should pick from a set of
known values. It isn't required, but is generally a good practice, to
use the same content for the `value` attribute of the child `option`
elements and the text that is used between the open and close tag of
that `option` element. This ensures that anyone viewing the raw message
text will see the value they expect.

Sometimes it is desirable to use a `select` elment for a pick list of
common values and allow other arbitrary values to be used as well.
This is supported by a pair of `select` and `input` elements of type
`text`. The `select` element must have one `option` child element with
a `value` attribute of "Other" and the text "Other:". The
corresponding `input` element for arbitrary values must have the same
`name` attribute as the `select` element with "-other" appened to it.
It should be set to disabled by default. An example of this in the
existing forms is the ICS Position field in the ics-header.html
resource file.

While you can use different methods for adding descriptions to
inputs, here are a few ways that generally work well with the default CSS:

   * If the control is a single control, it is a good idea to wrap it
     in a `label` element, with the text for the description
     preceding the actual `input` element.
   * If you are using something like a set of radio buttons that
     need to be grouped together, use the same scheme for each element
     but wrap them in a `fieldset` element with a `legend` element
     including the description for the entire set.
   * If the field is for a certain number of the form, putting a
     `<span class="field-number">` that contains the number inside the
     label will make a small superscript number appear in the label at
     its position, similar to the way that field numbers are conveyed
     in the paper version of an ICS form.

If your form fits the ICS standards, you will need a large number of
fields that contain information about the way that the form was
transmitted and who it is going to/who it is from.  *pack-it-forms*
makes this easy to do: it is possible to include fragments of HTML
from files in the resources/html directory.  If you create a `div`
element that has a `data-include-html` attribute in it, the element
will be replaced with the contents of the first `div` element in the
file resources/html/\<attribute value\>.html where \<attribute value\>
signifies the value of the `data-include-html` attribute.

One thing that you may want to do with included HTML files is set the
default values of included elements.  You can do that by putting a
JSON object that maps form field names to default values for those
fields inside the \<div\> that will be replaced with the included content.
Most default values are in the same format as HTML.
For a \<select\>, the value should match one of the option values.
For a collection of radio buttons, the value should match
the value of one of the buttons.
For a checkbox, the value should be "false" for not checked, or
anything else for checked.

If an input element represents a field that should have different
values in a receiver's copy of a form than the senders, give the field
the class `no-msg-init` which will prevent the senders field value
(which is included in the message data) from being populated into the
field for display.  Use the template system (described in the next
section) to substitute a different value for the receiver or the
transmitter.  The `ics-header.html` and `ics-footer.html` html
fragments provide good examples of this.


Setup Default and On-submit Behavior on Fields
----------------------------------------------

Some fields have a normal value which the operator rarely edits,
and some fields have a value that cannot be edited.
These default values can be specified in HTML, as usual.
Also, a `<select>` may have a `data-default-value` attribute,
whose value matches the value of the default `<option>`.
A collection of radio buttons may have a data-default-value
attribute on any one of the buttons, whose value matches
the value of the default button.
A checkbox may have a data-default-value, in which case it will
be checked by default if and only if the data-default-value is
not "false" or an empty string.

Any of these default values may be a template.
Regular text in templates is copied from the template to the resulting
string.  The difference comes when placeholder values that are
surrounded by double curly braces are encountered.  To give an
example, on January 1st, 2020, the template:

        The date is: {{date}}.

will result in the output text:

        The date is: 01/20/2020.

This is the simplest possible template value, with just the name of
the template to use.  Some template types require additional
information, in which case it can be supplied after the template name,
separated by a colon. For example,
if the form has a field named "foo" whose current value is "bar",

        That is {{field:foo}}.

will result in the output text:

        That is bar.

Finally, the output of template expansion can be further modified by
filters.  Filters are separated from the template type by a vertical
bar character "|".  Filters can also take an argument separated by a
colon.  Assuming again that the date is January 1st, 2020, an example
of a filter is:

        The month is: {{date|truncate:2}}

will result in the output text:

        The month is: 01

because "01" is the first two characters of the date string that would
be substituted without the filter.  Multiple filters can be chained
together one after another, each separated by a vertical bar.

The following template types are available:

| Name              | Argument   | Description                                     |
|-------------------|------------|-------------------------------------------------|
| date              | none       | Current date string in "mm/dd/yyyy" format      |
| time              | none       | Current local time string in hh:mm:ss format    |
| selected-fields   | css-sel    | Get list of field values returned by `css-sel`  |
| field             | field name | Value of a field in the form                    |
| msg-field         | field name | Value of a field in the received message        |
| envelope          | see below  | Information about the sender or receiver        |
| filename          | none       | Final name in URI path of the form              |
| title             | none       | Title of the HTML document                      |
| expand-while-null | templates  | Comma separated templates (\, escapes)          |
| value             | any        | Insert the argument                             |
| open-brace        | none       | Insert a single '{' character                   |
| close-brace       | none       | Insert a single '}' character                   |
| open-tmpl         | none       | Insert a template open string ('{{')            |
| close-tmpl        | none       | Insert a template close string ('}}')           |

The difference between `field` and `msg-field` is subtle but
important.  The `field` type retrieves the value of the form field
with the given name.  If the field exists in the form it will always
get the current contents of that form element in the DOM.  The
`msg-field` type retrieves the value of a form field that was sent in
a received message.  When creating a new form, all msg-field fields
will have a value that is the empty string.  This distinction is
important because some form fields have different values in the sender
and receiver version of the form.

The argument to the `envelope` template may start with either "sender_" or "receiver_",
to say whether it expands to information relating to the sender of the message
or the receiver of the message, respectively.
The rest of the argument may be any one of:

| Name                | Description                                           |
|---------------------|-------------------------------------------------------|
| message_number      | assigned message number                               |
| operator_call_sign  | Call sign of the operator (legal or tactical)         |
| operator_name       | Name of the operator (personal or tactical)           |
| date                | calendar date when the message was sent or received   |
| time                | time of day when the message was sent or received     |

For example, {{envelope:receiver_operator_name}} expands to the name
of the operator who received the message, and
{{envelope:sender_message_number}} expands to the message number that was
assigned at the sender's station.

The argument to the envelope template may also start with "viewer_",
which means it expands to information relating to the current operator's role.
So, it's equivalent to "sender_" when viewing a transmitted message, or
"receiver_" when viewing a received message.
And finally, if the argument to the envelope template is simply "viewer",
it expands to either "sender" or "receiver".

The following filters are available:

| Name       | Argument  | Description                                        |
|------------|-----------|----------------------------------------------------|
| truncate   | length    | Truncate string to max of `length` characters      |
| split      | fld delim | Split into list by `fld delim` string              |
| join       | separator | Join list with `separator` between elements        |
| remove     | value     | Remove elements matching `value` from list         |
| sort       | type      | Sort list, if `type` is 'num', numeric, else text  |
| re_search  | regexp    | Match regexp match, returning text or capture list |
| nth        | index     | Return the nth list item or character              |
| trim       | none      | Remove whitespace at start and end of string       |
| msgno2name | msgno     | Expand message number to station                   |
| expandtmpl | none      | Apply another layer of template expansion          |
| view-by    | role      | Expands to an empty string, unless arg == the operator's role (either sender or receiver) |

When the form is loaded, template expansion will be performed on
the `value` property of input elements with `type="text"`,
the `innerHTML` property of \<span\> and \<div\> elements with a `templated` class,
and any data-default-value.
However, templates in elements with the class `no-load-init` will not be expanded.
The same templates will be expanded when the form is reset.

If a form field has the class `init-on-submit`, its value is expanded as
a template immediately before submitting it to Outpost.
Such a field usually also has the class no-load-init, so the template will
be shown to the operator, to suggest that something will be filled in later.

You might also want to add some amount of validation to your custom
form fields.  *pack-it-forms* uses normal HTML5 form validation for
validating fields:  the default CSS provides a visual indication of
which fields are invalid, and the top bar changes color depending on
whether or not the form is fully valid.  Here are a few tips to get
you started with HTML5 form validation of this type:

   * If you have a field that must have some input in it, add the
     attribute `required`.
   * If the contents of the field has to be in a certain format, add a
     `pattern` attribute: the value should be a regular expression
     that will match values of the desired format.

Adjust Layout and Styling
-------------------------

Forms written using the above guidelines should be styled to look like
paper forms, and to have a fairly responsive layout that will work
with a large variety of screen sizes.

Delete any styles that you copied from another form, but aren't used in your form.
If your form requires specific styling, place it in a `style` element within the `head`.
If several forms need to share styling, place it in a .css file in resources/css.

Clean up Javascript
-------------------
Delete any Javascript that you copied from another form, but isn't used in your form.
If several forms need to share the same Javascript, place it in a .js file in resources/js.
But don't edit resources/js/pack-it-forms.js, as a rule. That file is used by every form.

Customize
---------

To link from the form to a PDF version (suitable for printing),
add the PDF file into the resources/pdf folder and
add a tag like this inside the HTML \<head\>:

    <meta name="pack-it-forms-pdf-URL" content="pdf/File_Name.pdf"/>

By default, the subject of the message submitted to Outpost is
Santa Clara County's standard for an ICS-213 message; that is
(message number)\_(handling)\_(form name)\_(subject).
For example, "XND-123P_R_ICS 213_Advice to Cities".
To customize the part following (severity)/(handling),
you can add a tag like this inside your form's HTML \<head\>:

    <meta name="pack-it-forms-subject-suffix" content="_Advice_{{field:27.city}}"/>

This content attribute may be a template.

Explanation of the Form Boilerplate
-----------------------------------

If you wish to create a form completely from scratch, this section
describes the boilerplate in the standard forms and how it interacts
with the pack-it-forms Javascript and CSS.  With this information you
can make choices about how much of this functionality you'd like to
support in your form.

To do this we'll walk through the ICS213 form file and comment on each
section.

    <!DOCTYPE html>
    <html>
      <head>
        <meta http-equiv="Content-type" content="text/html;charset=UTF-8">

Standard HTML5 document start specifying a UTF-8 encoding.

        <link rel="stylesheet" type="text/css" href="resources/css/loading.css"/>

CSS that works with the div element with id "loading" that will be
encountered shortly, to hide the rest of the form as all the form
structure and contents are loaded.

        <link rel="stylesheet" type="text/css" href="resources/css/pack-it-forms.css"/>

CSS file that contains styles for the form interaction elements and
that are likely to be useful in more than one form.  This is highly
recommended.

        <script type="text/javascript" src="resources/js/pack-it-forms.js"></script>
        <script type="text/javascript" src="resources/integration/integration.js"></script>
 
Javascript files that contain code to implement the form's behavior.
These are required to have a functioning form.

        <title>ICS213: Message Form</title>
      </head>

      <body>

Completion of the normal HTML5 head section and start of the body
section.  An appropriate title should be specified for each form.

        <div id="loading"><div>Loading<div id="spin"><div id="spin_1" class="spin"></div></div></div></div>

Nested markup required to enable the animated loading progress bar
without requiring any external graphics.

        <div id="err">
          <div>
            <h1>Something went wrong.</h1>
            The following log information may help resolve the problem.
            <div id="error-log"></div>
          </div>
        </div>

Markup required for logging errors that occur during Javascript
execution so that they can be presented to the user appropriately.

        <form id="the-form" name="the-form">
           ...
        </form>

The actual from itself replaces the ellipses here.  The Javascript
requires that the id of the form have the value "the-form".

        <div data-include-html="submit-buttons"></div>

An include reference that is replaced with the submit buttons and
related markup.  This is required for the Javascript to work
correctly.  It should come after the form.

      </body>
    </html>

Standard HTML5 body and document close.
