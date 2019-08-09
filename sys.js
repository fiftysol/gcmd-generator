function checkPattern(e){
	e.value = e.value.replace(/^[^A-Za-z]/g, '').replace(/[^\w\-]/g, '');
	results();
}

function normalizeText(e){
	return e.replace(/\\/g, "\\\\");
}

function ignoreEmptyString(str){
	return str != '' ? str : null;
}

function results(){
	var locale = document.getElementById("locale").value;
	var auth = document.getElementById("auth").value;

	var cmd = ignoreEmptyString(document.getElementById("cmd").value.trim());
	var value = ignoreEmptyString(document.getElementById("value").value.trim());
	var title = ignoreEmptyString(document.getElementById("title").value.trim());
	var description = ignoreEmptyString(document.getElementById("description").value.trim());

	var code = ignoreEmptyString(editor.getValue().trim());
	var result = document.getElementById("result");

	document.getElementById("copy").innerHTML = "Copy to clipboard";
	var failed = !(cmd && cmd.length > 1);

	if (!failed)
	{
		result.value = "!gcmd " + locale + " " + auth + " " + cmd;
		var len = result.value.length;
	
		if (code && code.length > 3)
			result.value += " script`" + code + "`";
		if (value)
			result.value += " value[[" + normalizeText(value) + "]]";
		if (title)
			result.value += " title[[" + normalizeText(title) + "]]";
	
		if (result.value.length == len)
			failed = true;
		else
		{
			if (description)
				result.value += " description[[" + normalizeText(description) + "]]";
		}
	}

	if (failed)
		result.value = "";
	else
	{
		var size = (2000 - result.value.length);
		document.getElementById("size").innerHTML = (size < 0 ? "<font color=\"#FC4646\">" : '') + size + " characters."
	}
}

function copy(){
	let result = document.getElementById("result");
	if (result.value == "") return;

	result.select();
	document.execCommand("copy");
	document.getElementById("copy").innerHTML = "Copied";
}