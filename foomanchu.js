/**
 *  [[ FooManChu.js ]]
 *        ____
 *       |    |
 *
 * A very light template engine
 *
 * @author Micah Blu
 * @version 0.0.2
 * @license MIT License
 * @copyright Micah Blu 
 */

(function(){

	window.Foomanchu = {

		render: function(obj){

			var tmpl = document.body.innerHTML;

			document.body.innerHTML = "";
			document.body.innerHTML = renderTemplate(tmpl, obj);
		}
	}

	function renderTemplate(tmpl, obj){
		var i = 0;

		var expressions = tmpl.match(/\[{2}#(.+)\s([^\]]+)\]{2}\n\t?(.+)\n\t?.+\[{2}\/\1\]{2}/gmi);
		
		for( var i = 0; i < expressions.length; i++){

			var parts = expressions[i].match(/\[{2}#(.+)\s([^\]]+)\]{2}\n\t?(.+)\n\t?.+\[{2}\/\1\]{2}/);

			var clause    = parts[1],
					condition = parts[2],
					value     = parts[3];

			// only supporting if clause
			if(clause == "if"){
				if(condition in obj && obj[condition]){
					tmpl = tmpl.replace(parts[0], value);
				}else{
					tmpl = tmpl.replace(parts[0], '');
				}
			}
		}
	
		var tags = tmpl.match(/\[{2}\s?(.[^\[]+)\s?\]{2}/gmi);
		var escape = ''; // placeholder for escaped tags

		for(key in tags){
			// Strip escaped tags & wrap in script tags, to be replaced later on
			if(tags[key].match(/\[{3}\s?(.[^\[]+)\s?\]{3}/)){
				escape = tags[key].replace(/[\[\]]/gm,'');
				tmpl = tmpl.replace(tags[key], "<script type='text/x-foomanchu'>" + escape + "</script>");
			}
			tag = tags[key].replace(/[\[\]]/gm,'');

			for(var symbol in obj){
				if(tag == symbol){
					tmpl = tmpl.replace(tags[key], obj[symbol]);
				}
			}	
		}

		// Replace script tags from escaped template tags
		var escaped = tmpl.match(/<script\stype=\'text\/x\-foomanchu\'>(.+)<\/script>/gmi);
		var tag = '';

		for(key in escaped){
			tag = escaped[key].replace(/<script\stype=\'text\/x\-foomanchu\'>/, '[[');
			tag = tag.replace(/<\/script>/, ']]');
			tmpl = tmpl.replace(escaped[key], tag);
		}
		return tmpl;
	}
}());