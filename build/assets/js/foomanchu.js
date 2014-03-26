/**
 *  [[ FooManChu.js ]]
 *        ____
 *       |    |
 *
 * A very light and completely workflow agnostic template engine
 *
 * @author Micah Blu
 * @version 0.0.1
 * @license MIT Style license
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

		var ifmatches = tmpl.match(/\[{2}#(.+)\s([^\]]+)\]{2}\n\t?(.+)\n\t?.+\[{2}\/\1\]{2}/gmi);
		
		console.log(ifmatches);

		if(ifmatches){
			/*
			for(var i = 0; i <  ifmatches.length; i++){

				var parts = tmpl.match(/\[{2}[^\[]#if(.[^\]]+)\]\](.*)\[{2}\/if\]{2}[^\]]/mi);

				var condition = parts[1];
				var contents = parts[2];

				var match = false;
				for(var key in obj){
					if(key == $.trim(condition)){
						match = true;
					}
				}
				if(!match){
					tmpl = tmpl.replace(parts[0], '');
				}else{
					tmpl = tmpl.replace(parts[0], contents);
				}
			}
			*/
		}

		var tags = tmpl.match(/\[{2}\s?(.[^\[]+)\s?\]{2}/gmi);
		var escape = ''; // placeholder for escaped tags

		for(key in tags){
			// Strip escaped tags & wrap in script tags, to be replaced later on
			if(tags[key].match(/\[{3}\s?(.[^\[]+)\s?\]{3}/)){
				escape = tags[key].replace(/[\[\]]/gm,'');
				tmpl = tmpl.replace(tags[key], "<script type='text/x-foomanchu'>" + escape + "</script>");
				//console.log(escape);
			}
			tag = tags[key].replace(/[\[\]]/gm,'');
			//sconsole.log(tag);
			for(var symbol in obj){
				if(tag == symbol){
					//console.log(tag + " = " + obj[symbol]);
					tmpl = tmpl.replace(tags[key], obj[symbol]);
				}
			}	
		}

		// Replace script tags from escaped template tags
		var escaped = tmpl.match(/<script\stype=\'text\/x\-foomanchu\'>(.+)<\/script>/gmi);
		var tag = '';
		for(key in escaped){
			//console.log(escaped[tag]);
			//console.log(escaped[key]);
			tag = escaped[key].replace(/<script\stype=\'text\/x\-foomanchu\'>/, '[[');
			tag = tag.replace(/<\/script>/, ']]');
			//console.log(tag);

			tmpl = tmpl.replace(escaped[key], tag);
		}

		return tmpl;

	}
}());