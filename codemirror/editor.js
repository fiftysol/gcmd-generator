var textarea = document.getElementById("code");
var editor = CodeMirror.fromTextArea(textarea, {
	lineNumbers: true,
	mode: "lua",
	theme: "discord",
	id: "script"
})
editor.getDoc().setValue(textarea.value);
editor.setSize(null, 430);
editor.on("change", results);