// Customize pack-it-forms for use in SCCoPIFO <https://github.com/jmkristian/OutpostForSCCo>

(function SCCoPIFO() {
    var environment = {{environment}};
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

    var setDateTime = function setDateTime(into, from) {
        var found = from && /(\S+)\s*(.*)/.exec(from);
        if (found) {
            into.date = found[1];
            into.time = found[2];
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
    setDateTime(envelope.sender, environment.MSG_DATETIME_OP_SENT || environment.MSG_DATETIME_HEADER);
    setDateTime(envelope.receiver, environment.MSG_DATETIME_OP_RCVD);

    var getOldMessage = function getOldMessage(next) {
        var message = {{message}};
        msgfields = get_message_fields(unwrap_message(message));
        var MsgNo = msg_field('MsgNo');
        var OpCall = msg_field('OpCall');
        var OpName = msg_field('OpName');
        if (!OpCall && environment.MSG_FROM_LOCAL) {
            OpCall = environment.MSG_FROM_LOCAL;
            OpName = '';
        }
        if (envelope.viewer == 'receiver') {
            envelope.sender.message_number = MsgNo;
            envelope.sender.operator_call_sign = OpCall;
            envelope.sender.operator_name = OpName;
            envelope.receiver.message_number = environment.MSG_LOCAL_ID || '';
            envelope.receiver.operator_call_sign = environment.SETUP_ID_ACTIVE_CALL || '';
            envelope.receiver.operator_name = environment.SETUP_ID_ACTIVE_NAME || '';
        } else if (envelope.readOnly) { // The message has been sent already.
            envelope.sender.message_number = MsgNo;
            envelope.sender.operator_call_sign = OpCall;
            envelope.sender.operator_name = OpName;
            // TODO: set envelope.receiver.message_number
        } else {
            envelope.sender.message_number = environment.MSG_NUMBER || MsgNo;
            envelope.sender.operator_call_sign = environment.SETUP_ID_ACTIVE_CALL || OpCall;
            envelope.sender.operator_name = environment.SETUP_ID_ACTIVE_NAME || OpName;
        }

        // Change the message header from PACF format to ADDON format:
        newMessage.header = function() {
            return '!' + environment.addon_name + '!'
                + EOL + '#Subject: ' + new_message_subject()
                + EOL + '#T: ' + environment.ADDON_MSG_TYPE
                + EOL + '#V: ' + environment.addon_version + '-' + form_version()
                + EOL;
        };
        newMessage.footer = '!/ADDON!\r\n';
        newMessage.subjectPrefix = function() {
            return field_value("MsgNo")
                + "_" + (field_value("5.handling") || "R").substring(0, 1);
        };

        if (environment.pingURL && !envelope.readOnly) {
            // Ping the server periodically, to keep it alive while the form is open.
            // But not for a read-only message.
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
        if (environment.submitURL) {
            document.querySelector('#form-data-form').action = environment.submitURL;
        }
        if (status == 'manual') {
            var submitButton = document.getElementById('opdirect-submit');
            if (submitButton) {
                submitButton.value = 'Create Message';
            }
        }
        if ((status == 'new' || status == 'draft') && envelope.readOnly) {
            // This message was just submitted to Outpost. Let the operator know:
            var element = document.getElementById('button-header');
            while (element.tagName != "TD") {
                element = element.children[0];
            }
            element.innerHTML =
                '<img src="icon-check.png" alt="OK" style="width:2em;height:2em;vertical-align:middle;">' +
                '&nbsp;&nbsp;The message has been submitted to Outpost. You can close this page.';
        }
        if (status == 'emailed') {
            // This message was just submitted to the operator's email program.
            // Discourage the operator from sending it via Outpost:
            var element = document.getElementById('button-header');
            while (element.tagName != "TD") {
                element = element.children[0];
            }
            element.innerHTML =
                '<img src="icon-warning.png" alt="Warning" style="width:2em;height:2em;vertical-align:middle;">' +
                '&nbsp;&nbsp;After you send the message via email, be sure to delete it from Outpost' +
                ' (to prevent sending it twice).';
        }
        next();
    };

    var basicEmailMessage = integration.email_message;
    integration.email_message = function(body) {
        basicEmailMessage(body);
        if (status != 'new') {
            setTimeout(function() {
                document.location.replace(document.location.pathname + "?message_status=emailed&mode=readonly");
            }, 2000);
        }
    }
    integration.get_old_message = getOldMessage;
    integration.late_startup = customizeForm;
})();
