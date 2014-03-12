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

		var ifmatches = tmpl.match(/\[{2}#if(.[^\]]+)\]\](.*)\[{2}\/if\]{2}/gmi);

		if(ifmatches){

			for(var i = 0; i <  ifmatches.length; i++){

				var parts = tmpl.match(/\[{2}#if(.[^\]]+)\]\](.*)\[{2}\/if\]{2}/mi);

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
		}

		var tags = tmpl.match(/\[{2}\s?(.[^\[]+)\s?\]{2}/gmi);

		for(key in tags){

			tag = tags[key].replace(/[\[\]]/gm,'');

			for(var symbol in obj){
				if(tag == symbol){
					console.log(tag + " = " + obj[symbol]);
					tmpl = tmpl.replace(tags[key], obj[symbol]);
				}
			}
		}

		return tmpl;

	}
}());