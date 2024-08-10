forEachSelected('[data-copy-from]', function(target) {
    target.getAttribute('data-copy-from').split(',').forEach(function(sourceName) {
        forEachSelected('[name^="' + sourceName + '"]', function(source) {
            if (source.style.display != 'none') {
                switch(source.type) {
                case 'checkbox':
                    target.checked = source.checked;
                    break;
                case 'select-one':
                    target.innerText = source.options[source.selectedIndex].innerText;
                    break;
                default:
                    target.innerText = source.value;
                }
            }
        });
    });
});
document.getElementById("from-date-time").innerHTML =
    document.querySelector('input[name^="20a."]').value
    + '&nbsp;&nbsp;'
    + document.querySelector('input[name^="20b."]').value;
document.getElementById("to-date-time").innerHTML =
    document.querySelector('input[name^="20c."]').value
    + '&nbsp;&nbsp;'
    + document.querySelector('input[name^="20d."]').value;
