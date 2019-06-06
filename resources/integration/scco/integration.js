// Customize pack-it-forms for use in SCCoPIFO <https://github.com/jmkristian/OutpostForSCCo>

(function SCCoPIFO() {
    var environment = integrationEnvironment;
    var message = integrationMessage;
    var status = environment.message_status;
    envelope.viewer = (status == 'read' || status == 'unread') ? 'receiver' : 'sender';
    envelope.readOnly = (environment.mode == 'readonly');
    if (environment.MSG_NUMBER == '-1') { // a sentinel value
        delete environment.MSG_NUMBER;
    }
    if (environment.MSG_LOCAL_ID == '-1') { // a sentinel value
        delete environment.MSG_LOCAL_ID;
    }
    if (/^\?*$/.test(environment.MSG_DATETIME_HEADER)) { // a sentinel value
        delete environment.MSG_DATETIME_HEADER;
    }

    var asDate = function asDate(n) {
        return ((n.length == 1) ? '0' : '') + n;
    }
    var asYear = function asYear(n) {
        return ((n.length == 2) ? (new Date().getFullYear() / 100) : '') + n;
    }
    var setDateTime = function setDateTime(into, from) {
        var found = from && /(\S+)\s*(.*)/.exec(from);
        if (found) {
            into.date = found[1];
            into.time = found[2];
            found = /(\d+)\/(\d+)\/(\d+)/.exec(into.date);
            if (found) {
                into.date = asDate(found[1]) + '/' + asDate(found[2]) + '/' + asYear(found[3]);
            }
            found = /(\d+):(\d+)(:\d+)?([^\d]*)/.exec(into.time);
            if (found) {
                // convert to 24 hour time
                var hour = parseInt(found[1], 10);
                var min = found[2];
                var sec = found[3];
                var PM  = found[4].trim().toLowerCase() == 'pm';
                if (hour == 12) {
                    if (!PM) {
                        hour = 0;
                    }
                } else if (PM) {
                    hour += 12;
                } else if (hour < 10) {
                    hour = '0' + hour;
                }
                into.time = hour + ':' + min;
            }
        }
    };

    var getOldMessage = function getOldMessage(next) {
        msgfields = get_message_fields(unwrap_message(message));
        var MsgNo = msg_field('MsgNo');
        var OpCall = msg_field('OpCall');
        var OpName = msg_field('OpName');
        if (envelope.viewer == 'receiver') {
            envelope.sender.message_number = MsgNo;
            envelope.sender.operator_call_sign = OpCall;
            envelope.sender.operator_name = OpName;
            envelope.receiver.message_number = environment.MSG_LOCAL_ID || '';
            envelope.receiver.operator_call_sign = environment.operator_call_sign || '';
            envelope.receiver.operator_name = environment.operator_name || '';
            setDateTime(envelope.receiver, environment.MSG_DATETIME_OP_RCVD);
            setDateTime(envelope.sender,
                        environment.MSG_DATETIME_HEADER || environment.MSG_DATETIME_OP_SENT);
            if (msgfields.OpRelaySent) {
                msgfields.OpRelayRcvd =
                    envelope.sender.operator_call_sign
                    + ' ' + envelope.sender.date
                    + ' ' + envelope.sender.time;
            } else {
                delete msgfields.OpRelayRcvd;
            }
            delete msgfields.OpRelaySent;
        } else if (envelope.readOnly) { // The message has been sent already.
            envelope.sender.message_number = MsgNo;
            envelope.sender.operator_call_sign = OpCall;
            envelope.sender.operator_name = OpName;
            envelope.sender.date = msg_field('OpDate');
            envelope.sender.time = msg_field('OpTime');
            // TODO: set envelope.receiver.message_number
        } else {
            envelope.sender.message_number = environment.MSG_NUMBER || MsgNo;
            envelope.sender.operator_call_sign = environment.operator_call_sign || OpCall;
            envelope.sender.operator_name = environment.operator_name || OpName;
        }

        // Change the message header from PACF format to ADDON format:
        newMessage.header = function() {
            return '!' + environment.addon_name + '!'
                + EOL + '#T: ' + environment.ADDON_MSG_TYPE
                + EOL + '#V: ' + environment.addon_version + '-' + form_version()
                + EOL;
        };
        newMessage.footer = '!/ADDON!\r\n';
        newMessage.subjectPrefix = function() {
            return field_value("MsgNo")
                + "_" + (field_value("5.handling") || "R").substring(0, 1);
        };

        if (environment.pingURL) {
            // Ping the server periodically, to retain the form while this page is open.
            var ping_sequence = 0;
            setInterval(function() {
                var img = new Image();
                // To discourage caching, use a new query string for each ping.
                img.src = environment.pingURL + '?i=' + (ping_sequence++);
                img = undefined;
            }, 30000); // call ping every 30 seconds
        }
        next();
    };

    var customizeForm = function customizeForm(next) {
        var setButtonHeader = function(html) {
            var element = document.getElementById('button-header');
            while (element && element.tagName != 'TD') {
                element = element.children[0];
            }
            if (element) {
                element.innerHTML = html;
            }
        };
        if (environment.submitURL) {
            document.querySelector('#form-data-form').action = environment.submitURL;
        }
        if (environment.saveURL) {
            // Save the message to the server after it changes and when this page closes.
            var shouldSaveMessage = false;
            var saveMessage = function saveMessage() {
                if (shouldSaveMessage) {
                    shouldSaveMessage = false;
                    var request = new XMLHttpRequest();
                    request.open('POST', environment.saveURL, true);
                    request.setRequestHeader("Content-Type", "text/plain;charset=utf-8");
                    request.send(newMessage.text());
                }
            }
            window.addEventListener('beforeunload', saveMessage);
            setInterval(saveMessage, 10000);
            var standardOnInput = integration.on_form_input;
            integration.on_form_input = function onFormInput(next) {
                shouldSaveMessage = true;
                standardOnInput(next);
            };
        }
        if (status == 'manual') {
            var submitButton = document.getElementById('opdirect-submit');
            if (submitButton) {
                submitButton.value = 'Create Message';
            }
        }
        if (environment.emailing) {
            // Submit the message to the operator's email program:
            document.location = "mailto:?to="
                + "&Content-Type=text/plain"
                + "&Subject=" + encodeURIComponent(environment.subject)
                + "&body=" + encodeURIComponent(message);
            if (!(status == 'new' || status == 'manual')) {
                // Discourage the operator from sending it via Outpost:
                setButtonHeader(
                    '<img src="icon-warning.png" alt="Warning" style="width:2em;height:2em;vertical-align:middle;">'
                        + '&nbsp;&nbsp;After you send the message via email, be sure to delete it from Outpost'
                        + ' (to prevent sending it twice).');
            }
            status = 'sent';
        }
        if ((status == 'new' || status == 'draft') && envelope.readOnly) {
            // This message was just submitted to Outpost. Let the operator know:
            setButtonHeader(
                '<img src="icon-check.png" alt="OK" style="width:2em;height:2em;vertical-align:middle;">'
                    + '&nbsp;&nbsp;The message has been submitted to Outpost. You can close this page.');
        }
        array_for_each(document.querySelector("#the-form").elements, function(input) {
            if (input.disabled && input.required && !input.value) {
                if (status == 'manual' && !environment.readOnly) {
                    input.disabled = false;
                } else {
                    input.required = false;
                }
            }
        });
        var text = environment.subject;
        if (text) {
            // Set the page title = the subject of the message, so that when saving
            // the page to a file, the default file name will be the subject.
            // Replace characters that aren't permitted in a file name:
            text = text.replace(/[<>:"/\\|?*]/g, function(found) {
                return "~";
            });
            var title = document.querySelector("head>title");
            if (title) {
                title.innerText = text;
            }
        }
        next();
    };

    integration.email_message = function(body) {
        var formDataForm = document.querySelector('#form-data-form')
        formDataForm.action = environment.emailURL;
        formDataForm.submit();
    };
    integration.get_old_message = getOldMessage;
    integration.late_startup = customizeForm;
})();
