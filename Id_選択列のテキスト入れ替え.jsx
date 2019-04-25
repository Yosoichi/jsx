var doc = app.activeDocument;
var sel = doc.selection[0];
var col1=sel.columns[0];
var col2=sel.columns[1];
var col1C=col1.contents;
var col2C=col2.contents;

//列の文字を入れ替え
col1.contents=col2C;
col2.contents=col1C;
