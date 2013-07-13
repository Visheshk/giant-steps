//aims of stretchy 2:
// refine M and G appearance

//new intermediate aim
// invert day 1 and day 2 (top-down)
// implement arrowhead stuff

//next iteration
// enable selection of nodes, and make for deletion
// remove onmousemove entirely, make it work well on tablets

var segment, path, green = 0;

var controls = new Layer(); 

var hitOptions = {
    segments: false,
    stroke: false,
    fill: true,
    tolerance: 15
};

//universal locations and sizes
var metersize = 50;
var GSsize = null;
var circSize = 15;
var height = 400;
//

//Buttons: For red, green, Layer 1, and Layer 2
controls.activate();

var cornerSize = new Size(20, 20);

// Giant steps / meters
var tlGSMx = 50;
var tlGSMy = 50;

var rectangle2 = new Rectangle(new Point(tlGSMx, tlGSMy), new Point(tlGSMx + 100, tlGSMy + 50));
var rec2 = new Path.RoundRectangle(rectangle2, cornerSize);
rec2.name = 'red';
rec2.fillColor = 'red';
var text = new PointText(new Point(tlGSMx + 15, tlGSMy + 30));
text.name = 'tred';
text.fillColor = 'white';
text.content = 'Giant Steps';

var rectangle = new Rectangle(new Point(tlGSMx, tlGSMy + 50), new Point(tlGSMx + 100, tlGSMy + 100));
var rec1 = new Path.RoundRectangle(rectangle, cornerSize);
rec1.name = 'green';
rec1.fillColor = 'green';
var text = new PointText(new Point(tlGSMx + 20, tlGSMy + 80));
text.name = 'tgreen';
text.fillColor = 'white';
text.content = 'Meters';
//

//Days 1 and 2
var tlDaysx = 175, tlDaysy = 50;

var l1 = new Rectangle(new Point(tlDaysx, tlDaysy), new Point(tlDaysx + 100, tlDaysy + 50));
var lay1 = new Path.RoundRectangle(l1, cornerSize);
lay1.name = 'lay1';
lay1.fillColor = '#cccccc';
var text = new PointText(new Point(tlDaysx + 20, tlDaysy + 30));
text.name = 'tlay1';
text.fillColor = 'black';
text.content = 'Day 1';

var l2 = new Rectangle(new Point(tlDaysx, tlDaysy + 50), new Point(tlDaysx + 100, tlDaysy + 100));
var lay2 = new Path.RoundRectangle(l2, cornerSize);
lay2.name = 'lay2';
lay2.fillColor = '#aaaaaa';
var text = new PointText(new Point(tlDaysx + 20, tlDaysy + 80));
text.name = 'tlay2';
text.fillColor = 'black';
text.content = 'Day 2';
//

//Undo and clear
var tlEdx = 300, tlEdy = 50;

var un = new Rectangle(new Point(tlEdx, tlEdy), new Point(tlEdx + 100, tlEdy + 50));
var undo = new Path.RoundRectangle(un, cornerSize);
undo.name = 'undo';
undo.fillColor = '#aabbcc';
var text = new PointText(new Point(tlEdx + 20, tlEdy + 30));
text.name = 'tundo';
text.fillColor = 'black';
text.content = 'Remove';

var cl = new Rectangle(new Point(tlEdx, tlEdy + 50), new Point(tlEdx + 100, tlEdy + 100));
var clr = new Path.RoundRectangle(cl, cornerSize);
clr.name = 'clr';
clr.fillColor = '#ccbbaa';
var text = new PointText(new Point(tlEdx + 20, tlEdy + 80));
text.name = 'tclr';
text.fillColor = 'black';
text.content = 'Clear';
//


var start = new Point(300, height);
var circ = new Path.Circle(start, circSize);
circ.strokeColor = 'black';
circ.fillColor = 'grey';
circ.name = 'start';
var flag = new Raster('flag');
var flsize = new Point(23, -50);
flag.position = start + flsize;

var end = new Point(70, 250);
var flag2 = new Raster('flag');
var flsize = new Point(23, -50);
flag2.position = end + flsize;

var endC = new Path.Circle(end, circSize);
endC.fillColor = 'grey';
endC.strokeColor = 'black';

var tlCornX = 500; var tlCornY = 50;

	//rectangle
	var metNum = 0;
	var met = new Rectangle(new Point(tlCornX, tlCornY), new Point(tlCornX + 100, tlCornY + 50));
	var meter = new Path.RoundRectangle(met, cornerSize - new Point(15,15));
	meter.name = 'meter';
	meter.fillColor = '#00ee00';

	//text
	var mtext = new PointText(new Point(tlCornX + 40, tlCornY + 30));
	mtext.name = 'meter';
	mtext.fillColor = 'black';
	mtext.content = 'M';
	
	//triangles
	var center = new Point(tlCornX + 35, tlCornY + 80);
	var sides = 3;
	var radius = 30;
	var triangle = new Path.RegularPolygon(center, sides, radius);
	triangle.fillColor = 'white';
	triangle.strokeColor = 'black';
	triangle.rotate(30);
	triangle.name = 'metMinus';
	var tri2 = triangle.clone();
	tri2.name = 'metPlus';
	tri2.rotate(60);
	tri2.translate(new Point(40, -7));
	

	var metControls = new Group();	
	metControls.addChild(triangle);
	metControls.addChild(tri2);
	

	//+ and - symbol on the triangles
	var text = new PointText(new Point(tlCornX + 26, tlCornY + 82));
	text.name = 'minues';
	text.fillColor = 'black';
	text.content = '-';

	var text = new PointText(new Point(tlCornX + 62, tlCornY + 82));
	text.name = 'plus';
	text.fillColor = 'black';
	text.content = '+';



//



//Interaction controls over



var pt1 = new Point(200,150), pt2 = new Point(300,50), pt3 = new Point(400, 150), move = new Point(0, 200);

var lstyle = {
	strokeColor: 'blue',
	strokeWidth: 5,
	strokeCap: 'round'
}

var gstyle = {
	strokeColor: 'green',
	strokeWidth: 6,
	strokeCap: 'round'
}
var rstyle = {
	strokeColor: 'red',
	strokeWidth: 10,
	strokeCap: 'round'
}

var layer1 = new Layer(), layer2 = new Layer();
project.l1 = layer1;
project.l2 = layer2;

//Layer 1 stuff
	layer1.activate();
	var lines1 = new Group();
	var curves1 = new Group();
	var circles1 = new Group();


	curves1.dashArray = [10,4];

	layer1.curves = curves1;
	layer1.circles = circles1;
	layer1.lines = lines1;

//Layer 1 stuff over

//Layer 2 stuff
	layer2.activate();
	var lines2 = new Group();
	var curves2 = new Group();
	var circles2 = new Group();
	
	layer2.curves = curves2;
	layer2.circles = circles2;
	layer2.lines = lines2;
//Layer 2 stuff over



var ind = 0, ind2 = 0, mover = 0, color = 'red', lp1 = null, lp2 = null;
var day = 1; dirn = 0;

controls.children['green'].opacity = 0.2;
controls.children['tgreen'].fillColor = 'grey';
controls.children['lay2'].opacity = 0.2;
controls.children['tlay2'].fillColor = 'grey';

layer2.opacity = 0.4;
layer1.activate();

layer1.lp = lp1;
layer2.lp = lp2;

controls.selected = false;

$('#scale').change(function(evt) { 
        view.zoom = evt.target.valueAsNumber; 
        rounded =  Math.round(view.zoom * 100)/ 100;
        document.getElementById('zoomVal').innerHTML = rounded;
}); 

function Setup(lay){
	lay.activate();
	if(lay == layer1)
		day = 1;
	else if (lay == layer2)
		day = 2;
	//setting up initialized last point
	var circ1  = new Path.Circle(controls.children['start'].position, circSize);
	circ1.fillColor = 'grey';
	circ1.strokeColor = 'black';
	lay.circles.addChild(circ1);
	lay.lp = controls.children['start'].position;
	GSsize = null;
	metersize = 50;
}

Setup(layer1);
Setup(layer2);

layer1.activate();
day = 1;

function zom(dir){
	view.zoom += (dir * 0.1);
}

function drawArc(event){
	//arc should be made if click is not on active layer, layer 3, or on anything
	
	//make the arc
		
	var curves = project.activeLayer.curves;
	var circles = project.activeLayer.circles;
	var lines = project.activeLayer.lines;
	
	if(circles.hasChildren()){
		project.activeLayer.lp = new Point(circles.lastChild.position);
		console.log(project.activeLayer.lp);
	}
	

	//find direction first
	//go to draw meter if the color is green
	//else draw giant step appropriately
	var dir = 1;
	var lastPoint = project.activeLayer.lp;
	dir = ((event.point.x < lastPoint.x) ? -1 : 1);
	
	if(color == 'green') //shifting to meter drawing
			drawMeter(dir);
	else{
		if (project.activeLayer.lp){
			
			// todo --
			// some accounting needs to be done, so that if a click is on the right of a circle, aand the GSsize is negative, the new step comes to the right, rather than back which is left

			//to keep track of backwards and day 1 or day 2, we will make up a bizarre numerical system.
			// day = 1 or 2. dirn = 0 or 2. Their sum tells me uniquely what is up.
			if (GSsize == null)
				GSsize = event.point.x - lastPoint.x;
			var axisPoint = new Point(lastPoint.x + (dir * GSsize), height); //point on axis, lcoated ahead or back, at giant step gap.
			
			
			/*
			if(project.activeLayer == layer1)
				day = 1;
			else if (project.activeLayer == layer2)
				day = 2;
			*/
			
			var gap = axisPoint - lastPoint;
			if (axisPoint < lastPoint){
				gap *= -1;
			}
			
			if (project.activeLayer == layer2){
				gap *= -1;
			}
			gap.angle -= 90;
			
			gap /= 2;
			var midp = new Point((lastPoint + axisPoint)/2);
			var ncurve = new Path.Arc(lastPoint, midp + gap, axisPoint);
			
			ncurve.style = rstyle;
	
			curves.addChild(ncurve);
			
		}
		else{
			//project.activeLayer.lp = new Point(axisPoint);
			Setup(project.activeLayer);
		}
	
		//make the circle
		circle = new Path.Circle(axisPoint, circSize);
		circle.strokeColor = 'black';
		circle.fillColor = 'grey';
		circle.name = (dir == -1)?'rback' : 'rfw';
		
		circles.addChild(circle);
	
		var line = new Path.Line(circles.lastChild.previousSibling.position, circles.lastChild.position);
		line.style = lstyle;
		lines.addChild(line);
	
		path = circles.lastChild;
		ind = circles.lastChild.index;
		path.selected = true;
	}
}

function updateLine(index, position){
	var lines = project.activeLayer.lines;
	lines.children[index].removeSegments(1);
	lines.children[index].addSegment(position);
}

function changeMeter(obj){
	//if the right triangle, add one value to metNum, and update the text in mtext.content
	if(obj.name == 'metPlus'){
		metNum += 1;
		mtext.content = metNum + ' M';
	}
	else if (obj.name == 'metMinus'){
		metNum -= 1;
		mtext.content = metNum + ' M';
	}		
}

function drawMeters(){
		//using metNum, loop the drawing instructions, and change mtext.content back to M
		var num = metNum;
		if (metNum < 0){
			while (metNum < 0){
				drawMeter(-1);
				metNum += 1;
			}
		}
		else if (metNum > 0){
			while (metNum > 0){
				drawMeter(1);
				metNum -= 1;
			}
		}
		metNum = num;
		mtext.content = metNum + ' M';
	}

function drawMeter(dir){
		var curves = project.activeLayer.curves;
		var circles = project.activeLayer.circles;
		var lines = project.activeLayer.lines;
	
		if(circles.hasChildren()){
			project.activeLayer.lp = new Point(circles.lastChild.position);
		}	
			
		if (project.activeLayer.lp){
				var lastPoint = project.activeLayer.lp;
	
			//eventpoint is to simulate click at calculated point

			var back = new Point(dir * metersize,0);
			
			eventpoint = lastPoint + back;
			
			var gap = eventpoint - lastPoint;
			if (eventpoint.x < lastPoint.x){
				gap *= -1;
			}
			
			if (project.activeLayer == layer2){
				gap *= -1;
			}
			//else
			//	var gap = lastPoint - event.point;
			console.log(eventpoint);
			gap.angle -= 90;
			gap /= 2;
			var midp = new Point((lastPoint + eventpoint)/2);
			var ncurve = new Path.Arc(lastPoint, midp + gap, eventpoint);
			
			ncurve.style = gstyle;
			ncurve.strokeColor = 'green';
			curves.addChild(ncurve);
		}
		else{
			project.activeLayer.lp = new Point(eventpoint);
		}
	//update lastPoint
	//lastPoint = event.point;
	
	//make the circle
	circle = new Path.Circle(eventpoint, circSize);
	circle.strokeColor = 'black';
	circle.fillColor = 'grey';
	//circle.name = 'green';
	if (dir == -1){
		circle.name = 'greenl';
	}
	else if (dir == 1) {
		circle.name = 'greenr';
	}
	circles.addChild(circle);
	
	line = new Path.Line(circles.lastChild.previousSibling.position, circles.lastChild.position);
	line.style = lstyle;
	lines.addChild(line);

	path = circles.lastChild;
	ind = circles.lastChild.index;
	path.selected = true;
}

function Undo(){
	//project.activeLayer.curves.removeChildren(project.activeLayer.curves.children.length - 1);
	
	if(!project.activeLayer.curves.lastChild.remove()){
		//project.activeLayer.curves.lastChild.removeSegments();
		project.activeLayer.curves.children[project.activeLayer.curves.children.length - 1].remove();
	} 
	
	console.log(project.activeLayer.curves.children.length);
	
	if(project.activeLayer.circles.lastChild != null){
		project.activeLayer.circles.lastChild.removeSegments();
		project.activeLayer.circles.lastChild.remove();
	}
	
	if(project.activeLayer.lines){
		project.activeLayer.lines.lastChild.remove();
	}
	//project.activeLayer.circles.removeChildren(project.activeLayer.circles.children.length - 1);
	
	if (project.activeLayer.circles.lastChild == null){
		console.log('Circles nulled');
		//project.activeLayer.lp = null;
		Setup(project.activeLayer);
	}
	console.log(project.activeLayer.lp);
}

function Clear(){
	/*project.activeLayer.curves.removeChildren(0);
	project.activeLayer.circles.removeChildren(0);
	project.activeLayer.lp = null;
	Setup(project.activeLayer);*/
	if(layer2 == project.activeLayer){
		layer1.curves.removeChildren(0);
		layer1.circles.removeChildren(0);
		layer1.lines.removeChildren(0);
		layer1.lp = null;
		Setup(layer1);
		layer2.curves.removeChildren(0);
		layer2.circles.removeChildren(0);
		layer2.lines.removeChildren(0);
		layer2.lp = null;
		Setup(layer2);
	}
	if(layer1 == project.activeLayer){
		layer2.curves.removeChildren(0);
		layer2.circles.removeChildren(0);
		layer2.lines.removeChildren(0);
		layer2.lp = null;
		Setup(layer2);
		layer1.curves.removeChildren(0);
		layer1.circles.removeChildren(0);
		layer1.lines.removeChildren(0);
		layer1.lp = null;
		Setup(layer1);
	}
	
}

globals.Clear = Clear;

function onMouseUp(event) {
	controls.selected = false;
	layer1.selected = false;
	layer2.selected = false;
	
}

function onMouseMove(event) {
	var hitResult = project.hitTest(event.point, hitOptions);
	project.activeLayer.selected = false;
	controls.selected = false;
	layer2.selected = false;
	document.body.style.cursor = 'auto';
	if (hitResult && hitResult.item && (hitResult.item.layer == project.activeLayer || hitResult.item.layer == controls)){
    	if(hitResult.item != flag && hitResult.item != shore){
	    	hitResult.item.selected = true;
	    	if(hitResult.item == endC)
	    		document.body.style.cursor = 'move';
    	}
    		
   		if (hitResult.item.layer != controls)
   			document.body.style.cursor = 'move';
	}
}


function onMouseDown(event) {
	/*curve.removeSegment(2);
	curve.insert(2, 375,150);
	circles1.children[1].remove();*/
	path = null;
	var hitResult = project.hitTest(event.point, hitOptions);
	if(hitResult){
		console.log(hitResult.item.name);
		if (hitResult.item.layer == project.activeLayer){
			path = hitResult.item;
			console.log(hitResult.type);
			ind = path.index;
			console.log(ind);
			path.selected = true;
		}

		else if(hitResult.item.layer == controls){
		
			if (hitResult.item.name == 'green'){
				color = 'green';
				controls.children['red'].opacity = 0.2;
				controls.children['tred'].fillColor = 'grey';
				controls.children['green'].opacity = 1;
				controls.children['tgreen'].fillColor = 'white';
				
			}
			else if (hitResult.item.name == 'red'){
				color = 'red';
				controls.children['red'].opacity = 1;
				controls.children['tred'].fillColor = 'white';
				controls.children['green'].opacity = 0.2;
				controls.children['tgreen'].fillColor = 'grey';
			}
			else if (hitResult.item.name == 'lay1' && project.activeLayer != layer1){
				layer1.activate();
				layer1.moveAbove(layer2);
				
				color = 'red';
				controls.children['red'].opacity = 1;
				controls.children['tred'].fillColor = 'white';
				controls.children['green'].opacity = 0.2;
				controls.children['tgreen'].fillColor = 'grey';
				
				layer1.opacity = 1;
				layer2.opacity = 0.4;
				controls.children['lay1'].opacity = 1;
				controls.children['tlay1'].fillColor = 'black';
				controls.children['lay2'].opacity = 0.2;
				controls.children['tlay2'].fillColor = 'grey';
				
			}
			else if (hitResult.item.name == 'lay2' && project.activeLayer != layer2){
				layer2.activate();
				console.log('Layer 2 activated');
				layer2.moveAbove(layer1);
				
				color = 'red';
				controls.children['red'].opacity = 1;
				controls.children['tred'].fillColor = 'white';
				controls.children['green'].opacity = 0.2;
				controls.children['tgreen'].fillColor = 'grey';
				
				layer2.opacity = 1;
				layer1.opacity = 0.4;
				
				controls.children['lay2'].opacity = 1;
				controls.children['tlay2'].fillColor = 'black';
				controls.children['lay1'].opacity = 0.2;
				controls.children['tlay1'].fillColor = 'grey';
			}
			else if (hitResult.item.name == 'undo'){
				Undo();
			}
			else if (hitResult.item.name == 'clr'){
				Clear();
			}

			else if (hitResult.item == endC){
				path = hitResult.item;
			}
			
			else if (hitResult.item.name == 'meterleft'){
				drawMeter(-1);
			}
			
			else if(hitResult.item.name == 'meterright'){
				drawMeter(1);
			}
			
			else if (hitResult.item.name == 'start'){
				//console.log('Start');
				//path = hitResult.item;
				
			}
			else if (hitResult.item.name == 'zoomin'){
				zom(1);
			}
			else if (hitResult.item.name == 'zoomout'){
				zom(-1);
			}
			else if (hitResult.item.isParent(metControls)){
				changeMeter(hitResult.item);
			}
			else if(hitResult.item.name == 'meter'){
				drawMeters();
			}
			
		}
		
		else
			//if(event.event.detail > 1)
				drawArc(event);
		
	}
	else
		//if(event.event.detail > 1)
			drawArc(event);
}

function onMouseDrag(event) {
    if (path && path.name != 'start' && path != endC){
    	var curves = project.activeLayer.curves;
    	var circles = project.activeLayer.circles;
    	var lines = project.activeLayer.lines;
    	//var gap = GSsize;
    	if (path.name == 'rback' || path.name == 'rfw'){
	        //path.position.x += event.delta.x;
	        GSsize = path.position.x - path.previousSibling.position.x + event.delta.x;
	        if(path.name == 'rback'){
	        	GSsize *= -1;
	        }
	        
	        var i = 0;
	        
	        while (i < circles.lastChild.index){
	        	if(circles.children[i + 1].name == 'rback'){
	        		GSsize *= -1;
	        	}
	        	
	        	
	        	if(circles.children[i + 1].name != 'greenl' && circles.children[i + 1].name != 'greenr'){
		        	circles.children[i + 1].position.x = circles.children[i].position.x + GSsize;

		        	curves.children[i].removeSegments(1); // edit the front two segments of the arc, after moving the point ahead
		        	var gap = circles.children[i + 1].position - circles.children[i].position;
		        	if (circles.children[i + 1].position.x < circles.children[i].position.x){
						gap *= -1;
					}
					
					if (project.activeLayer == layer2){
						gap *= -1;
					}
					
		        	gap.angle -= 90;
		        	gap /= 2;
		        	var midp = new Point((circles.children[i + 1].position + circles.children[i].position) / 2);
		        	var newp = new Point(midp + gap);
		        	curves.children[i].arcTo(newp, circles.children[i + 1].position);
		        	updateLine(i, circles.children[i + 1].position);
		        	
		        	
		        	curves.children[i].reverse(); // edit the former two segments of the arc, because the point behind moved in the previous loop step
		        	
		        	var gap2 = circles.children[i + 1].position - circles.children[i].position;
		        	if (circles.children[i + 1].position.x < circles.children[i].position.x){
						gap2 *= -1;
					}
					
					if (project.activeLayer == layer2){
						gap2 *= -1;
					}
					
		        	gap2.angle -= 90;
		        	gap2 /= 2;
		        	var midp2 = new Point((circles.children[i + 1].position + circles.children[i].position) / 2);
		        	var newp2 = new Point(midp2 + gap2);
		        	
		        	
		        	curves.children[i].removeSegments(1);
		        	
		        	curves.children[i].arcTo(newp, circles.children[i].position);
		        	curves.children[i].reverse();
		        	lines.children[i].reverse();
		        	updateLine(i, circles.children[i].position);
		        	lines.children[i].reverse();
		        	
		        	
	        	}
	        	
	        	else if (circles.children[i + 1].name == 'greenr'){
		        	circles.children[i + 1].position.x = circles.children[i].position.x + metersize;
		        	var translation = circles.children[i].position.x - curves.children[i].firstSegment.getPoint().x;
		        	curves.children[i].translate(new Point(translation, 0));
		        	lines.children[i].translate(new Point(translation, 0));
	        	}

	        	else if (circles.children[i + 1].name == 'greenl'){
		        	circles.children[i + 1].position.x = circles.children[i].position.x - metersize;
		        	var translation = circles.children[i].position.x - curves.children[i].firstSegment.getPoint().x;
		        	curves.children[i].translate(new Point(translation, 0));
		        	lines.children[i].translate(new Point(translation, 0));
	        	}
	        	
	        		        	
	        	if(circles.children[i].name == 'rback'){
	        		GSsize *= -1;
	        	}
	        	i += 1;
	        }
	        
	        i = 0;
	        
	        var layr = layer1;
	        if (project.activeLayer == layer1)
	        	layr = layer2;
	        layr.activate();
	        var circles2 = layr.circles;
	        var curves2 = layr.curves;
	        var lines2 = layr.lines;
	        while (i < circles2.lastChild.index){
	        	if(circles2.children[i + 1].name == 'rback'){
	        		GSsize *= -1;
	        	}
	        	
	        	
	        	if(circles2.children[i + 1].name != 'greenl' && circles2.children[i + 1].name != 'greenr'){
		        	circles2.children[i + 1].position.x = circles2.children[i].position.x + GSsize;

		        	curves2.children[i].removeSegments(1); // edit the front two segments of the arc, after moving the point ahead
		        	var gap = circles2.children[i + 1].position - circles2.children[i].position;
		        	if (circles2.children[i + 1].position.x < circles.children[i].position.x){
						gap *= -1;
					}
					
					if (layr == layer2){
						gap *= -1;
					}
		        	gap.angle -= 90;
		        	gap /= 2;
		        	var midp = new Point((circles2.children[i + 1].position + circles2.children[i].position) / 2);
		        	var newp = new Point(midp + gap);
		        	curves2.children[i].arcTo(newp, circles2.children[i + 1].position);
		        	updateLine(i, circles2.children[i + 1].position);
		        	
		        	
		        	curves2.children[i].reverse(); // edit the former two segments of the arc, because the point behind moved in the previous loop step
		        	
		        	var gap2 = circles2.children[i + 1].position - circles2.children[i].position;
		        	if (circles2.children[i + 1].position.x < circles2.children[i].position.x){
						gap2 *= -1;
					}
					
					if (layr == layer2){
						gap2 *= -1;
					}
		        	gap2.angle -= 90;
		        	gap2 /= 2;
		        	var midp2 = new Point((circles2.children[i + 1].position + circles2.children[i].position) / 2);
		        	var newp2 = new Point(midp2 + gap2);
		        	
		        	
		        	curves2.children[i].removeSegments(1);
		        	
		        	curves2.children[i].arcTo(newp, circles2.children[i].position);
		        	curves2.children[i].reverse();
		        	lines2.children[i].reverse();
		        	updateLine(i, circles2.children[i].position);
		        	lines2.children[i].reverse();
		        	
		        	
	        	}
	        	
	        	else if (circles2.children[i + 1].name == 'greenr'){
		        	circles2.children[i + 1].position.x = circles2.children[i].position.x + metersize;
		        	var translation = circles2.children[i].position.x - curves2.children[i].firstSegment.getPoint().x;
		        	curves2.children[i].translate(new Point(translation, 0));
		        	lines2.children[i].translate(new Point(translation, 0));
	        	}

	        	else if (circles2.children[i + 1].name == 'greenl'){
		        	circles2.children[i + 1].position.x = circles2.children[i].position.x - metersize;
		        	var translation = circles2.children[i].position.x - curves2.children[i].firstSegment.getPoint().x;
		        	curves2.children[i].translate(new Point(translation, 0));
		        	lines2.children[i].translate(new Point(translation, 0));
	        	}
	        	
	        	if(circles2.children[i].name == 'rback'){
	        		GSsize *= -1;
	        	}
	        	i += 1;
	        }
	        if (layr == layer2){
	        	layer1.activate();
	        	layer1.moveAbove(layer2);
	        }
	        else if (layr == layer1){
	        	layer2.activate();
	        	layer2.moveAbove(layer1);
	        }
	    }
	    
	    //The next two check, that if the meter circles have been moved significantly, their orientation will change. 
	    
	    // > The new thing, will then, translate everything ahead accordingly, and not redraw any curves
	    
        else if(path.name == 'greenr'){
        	if(event.point.x < (path.position.x - 50)){
	        		path.position -= new Point((2 * metersize), 0);
	        		path.name = 'greenl';
	        		
	        		
	        		
			        var gap = new Point(-metersize, 0);
			        
					if (project.activeLayer == layer1){
						gap *= -1;
					}
			        
			        gap.angle -= 90;
					gap /= 2;
					var midp = new Point(path.position.x + metersize, height);
					var newp = new Point(midp + gap);
					curves.children[ind - 1].removeSegments(1);
					curves.children[ind - 1].arcTo(newp, path.position);
					updateLine(ind - 1, path.position);
	        		
		        	var checkAhead = ind;
		        	var nextCircle;
			        nextCircle = circles.children[checkAhead].nextSibling;

			        while(nextCircle && checkAhead <= circles.lastChild.index){
				        nextCircle.position.x -= (2 * metersize);
						curves.children[checkAhead].translate(new Point((-2 * metersize), 0));
						lines.children[checkAhead].translate(new Point((-2 * metersize), 0));
				        checkAhead += 1;
				        nextCircle = circles.children[checkAhead].nextSibling;
				    }
	        	
			    }
        }
        
	    else if(path.name == 'greenl'){
	    
        	if(event.point.x > path.position.x + 150){ 
        		path.position += new Point((2 * metersize), 0);
        		path.name = 'greenr';
        		//var lastPoint = new Point(curves.children[ind - 1].firstSegment.getPoint());		        
	        	//var gap = path.position - lastPoint;
		        var gap = new Point(metersize, 0);
				if (project.activeLayer == layer2){
					gap *= -1;
				}
		        
		        gap.angle -= 90;
				gap /= 2;
				var midp = new Point(path.position.x - 50, height);
				var newp = new Point(midp + gap);
				curves.children[ind - 1].removeSegments(1);
				curves.children[ind - 1].arcTo(newp, path.position);
				updateLine(ind - 1, path.position);
        		
	        	var checkAhead = ind;
	        	var nextCircle;
		        nextCircle = circles.children[checkAhead].nextSibling;

		        while(nextCircle && checkAhead <= circles.lastChild.index){
			        nextCircle.position.x += 2 * metersize;
					curves.children[checkAhead].translate(new Point((2 * metersize), 0));
					lines.children[checkAhead].translate(new Point((2 * metersize), 0));
			        checkAhead += 1;
			        nextCircle = circles.children[checkAhead].nextSibling;
			    }
			}
	    }
    }
    else if(path && path == endC){
	    path.position += event.delta;
	    flag2.position += event.delta;	    
    }
    

}
