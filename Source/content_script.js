walk(document.body);

function walk(node) 
{
	// I stole this function from here:
	// http://is.gd/mwZp7E
	
	var child, next;
	var classListChecker = function() { return -1; };
	if (node.classList && node.classList.indexOf) {
		classListChecker = function(classList, val) {
			return classList.indexOf.call(classList, val);
		};
	} else if (node.classList && node.classList.contains) {
		classListChecker = function(classList, val) {
			if (!classList.contains.call(classList, val)) {
				return -1;
			} else {
				return 0;
			}
		};
	}

	if (node.tagName && node.classList) {
		if (node.tagName.toLowerCase() == 'input' || node.tagName.toLowerCase() == 'textarea'
	    	|| classListChecker(node.classList, 'ace_editor') > -1) {
			return;
		}
	}

	switch ( node.nodeType )  
	{
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
			child = node.firstChild;
			while ( child ) 
			{
				next = child.nextSibling;
				walk(child);
				child = next;
			}
			break;

		case 3: // Text node
			handleText(node);
			break;
	}
}

function handleText(textNode) 
{
	var v = textNode.nodeValue;

	v = v.replace(/\bGod\b/g, "Ed");
	v = v.replace(/\bgod\b/g, "ed");
	
	textNode.nodeValue = v;
}
