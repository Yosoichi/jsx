var doc = app.activeDocument;
var sel = doc.selection[0].rows[0].cells;
alert(sel.contents);