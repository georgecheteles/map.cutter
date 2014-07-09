function rearange(){
	$('#wrapper').css('width',Math.max($('#widthp').val(),900)+'px');
	$('#map_base').css('width',$('#widthp').val()+'px');
	$('#map_base').css('height',$('#heightp').val()+'px');
	$('#map_base').css('background-position-x',$('#leftp').val()+'px');
	$('#map_base').css('background-position-y',$('#topp').val()+'px');
}

function createLine(x1, y1, x2, y2){
	if (x2 < x1)
	{
		var temp = x1;
		x1 = x2;
		x2 = temp;
		temp = y1;
		y1 = y2;
		y2 = temp;
	}
	var line = document.createElement("div");
	line.className = "line";
	var length = Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
	line.style.width = length + "px";
	{
		var angle = Math.atan((y2-y1)/(x2-x1));
		line.style.top = y1 + 0.5*length*Math.sin(angle) + "px";
		line.style.left = x1 - 0.5*length*(1 - Math.cos(angle)) + "px";
		line.style.MozTransform = line.style.WebkitTransform = line.style.OTransform= "rotate(" + angle + "rad)";
		line.style.transform = line.style.msTransform = line.style.MozTransform = line.style.WebkitTransform = line.style.OTransform= "rotate(" + angle + "rad)";
	}
	return line;
}

function reset_all(){
	$('.line,.dot').remove();
	$('#coords').val("");
}

function import_html(x){
	if ($(x).html()=="Import")
	{
		$(x).html("Done");
		$('#coords').removeAttr('readonly');
	}
	else
	{
		$(x).html("Import");
		$('.dot').remove();
		$('.line').remove();
		$('#coords').attr('readonly','readonly');
		var arr=$('#coords').val().split(", ");
		if (arr.length==1)
		{
			var f=arr[0].split(',');
			$('#map_base').html($('#map_base').html()+'<div class="dot" style="position:absolute;top:'+(parseInt(f[1])-1)+'px;left:'+(parseInt(f[0])-1)+'px"></div>');
		}
		if (arr.length>1)
		{
			for (i=0;i<arr.length-1;i++)	
			{
				var f=arr[i].split(',');
				var l=arr[i+1].split(',');
				$('#map_base').html($('#map_base').html()+'<div class="dot" style="position:absolute;top:'+(parseInt(f[1])-1)+'px;left:'+(parseInt(f[0])-1)+'px"></div>');
				$('#map_base').append(createLine(parseInt(f[0]), parseInt(f[1]), parseInt(l[0]), parseInt(l[1])));
			}
			$('#map_base').html($('#map_base').html()+'<div class="dot" style="position:absolute;top:'+(parseInt(l[1])-1)+'px;left:'+(parseInt(l[0])-1)+'px"></div>');
		}

	}
}
	
jQuery(document).ready(function(){
	
	$('#coords').val("");
		
	$(document).keypress(function(event) {
		if ( event.which == 26  || event.which == 122){
			$('.dot').last().remove();
			$('.line').last().remove();
			var arr=$('#coords').val().split(", ");
			arr.pop();
			$('#coords').val(arr.join(", "));
		}
	});
		
	$(".custom_input").keydown(function(event) {
		if (event.keyCode==38){
			$(this).val(parseInt($(this).val())+1);
			rearange();
			$(this).val(parseInt($(this).val()));
			return false;					  
		}
		if (event.keyCode==40){
			$(this).val(parseInt($(this).val())-1);
			rearange();
			$(this).val(parseInt($(this).val()));
			return false;					  
		}
		
	});
	
	$('.settingsBtn').click(function(){
		$('.settings').slideToggle();
		return false;
	});

	$('.custom_input').blur(function(){
		rearange();
		return false;
	});

	$('.resetBtn').click(function(){
		reset_all();
		return false;
	});

	$('.importBtn').click(function(){
		import_html(this);
		return false;
	});
		
	$('#map_base').mousemove(function(e){
		X = e.pageX - this.offsetLeft;
		Y = e.pageY - this.offsetTop;
		$('#status').html('X:'+X +' ,Y:'+ Y);
	}); 
	$('#map_base').click(function(e){
		if ($('#coords').val()!="") 
			$('#coords').val($('#coords').val()+", "+X+','+Y);
		else
			$('#coords').val(X +','+ Y);
		$('#map_base').html($('#map_base').html()+'<div class="dot" style="position:absolute;top:'+(Y-1)+'px;left:'+(X-1)+'px"></div>');
		var arr=$('#coords').val().split(", ");
		if (arr.length>1){
			var f=arr[arr.length-2].split(',');
			var l=arr[arr.length-1].split(',');
			$('#map_base').append(createLine(parseInt(f[0]), parseInt(f[1]), parseInt(l[0]), parseInt(l[1])));
		}
	});
})
