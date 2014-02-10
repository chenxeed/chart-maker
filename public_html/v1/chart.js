//Variable for All Chart
var canvasWidth = 800;
var canvasHeight = 450;
var chartId = 1;
var chartWrapper = document.getElementById('chartWrapper');
var chartCanvas;
var resizeX = canvasWidth - 150;
var resizeY = 10;

//Variable for PieChart
var chartFromX = 250;
var chartFromY = 220;
var angleFrom, angleTo;
var angleFromValue = 0;
var angleToValue = 360;
var chartA = 150;
var chartArcFlag = 0;
var chartD;
var inputChartA = document.getElementById('inputPieR');

//Variable for LineChart
var lineFromX = 50;
var lineFromY = 50;
var lineWidth = 400;
var lineHeight = 300;
var lineHighestValue = 10;
var inputHighestValue = document.getElementById('inputHighestValue');
var inputRandomColor = document.getElementById('inputRandomColor');

//Variable for Statistic
var inputChartTitle = document.getElementById('inputChartTitle');
var titleX = 30;
var titleY = 30;
var downloadX = canvasWidth - 100;
var downloadY = 10;
var deleteX = canvasWidth - 50;
var deleteY = 10;
var statisticX = 510;
var statisticY = 75;
var statLineHeight = 30;

//Variable for Chart Data
var chartData = {};
var totalData = 0;
var highestData = 0;
var lastIdData = 0;
var dataErrorMsg = "";
var dataError = document.getElementById('errorMsg');
//Icons formula from : http://iconmonstr.com/
var icons = {
	men: 'M407.448,360.474c-59.036-13.617-113.989-25.541-87.375-75.717 c81.01-152.729,21.473-234.406-64.072-234.406c-87.231,0-145.303,84.812-64.072,234.406c27.412,50.482-29.608,62.393-87.375,75.717 c-59.012,13.609-54.473,44.723-54.473,101.176h411.838C461.919,405.196,466.458,374.083,407.448,360.474z',
	women: 'M407.447,380.817c-50.919-11.622-112.919-41.622-94.652-80.682c11.732,19.236,48.084,30.361,76.4,13.736 c-81.506-20.57,40.066-161.795-66.458-240.959c-38.877-29.041-95.209-29.373-133.474,0 c-106.524,79.164,15.048,220.389-66.458,240.959c28.316,16.625,64.723,5,76.4-13.736c18.268,39.064-43.786,69.072-94.652,80.682 c-59.041,13.475-54.473,52.025-54.473,80.176h411.838C461.919,432.843,466.489,394.294,407.447,380.817z',
	christmas: 'M392.677,400.564L430.553,462H81.447l37.876-61.436H392.677z M176.286,375.613 C130.607,348.403,100,298.531,100,241.502c0-86.156,69.844-156,156-156s156,69.844,156,156c0,57.029-30.607,106.901-76.286,134.111 h56.963c33.905-34.548,54.826-81.881,54.826-134.111C447.503,135.738,361.764,50,256,50C150.235,50,64.497,135.738,64.497,241.502 c0,52.23,20.921,99.563,54.826,134.111H176.286z M313.644,171.919c2.583,0,4.678-2.095,4.678-4.679c0-2.583-2.095-4.678-4.678-4.678 c-2.585,0-4.678,2.095-4.678,4.678C308.966,169.824,311.059,171.919,313.644,171.919z M325.807,219.513 c3.442,0,6.236-2.793,6.236-6.237c0-3.445-2.794-6.237-6.236-6.237c-3.445,0-6.237,2.792-6.237,6.237 C319.569,216.72,322.361,219.513,325.807,219.513z M352.314,254.856c5.167,0,9.356-4.188,9.356-9.355s-4.189-9.355-9.356-9.355 s-9.355,4.188-9.355,9.355S347.147,254.856,352.314,254.856z M347.637,190.631c2.583,0,4.678-2.096,4.678-4.679 c0-2.582-2.095-4.678-4.678-4.678s-4.678,2.096-4.678,4.678C342.959,188.535,345.054,190.631,347.637,190.631z M186.396,181.274 c5.168,0,9.357-4.189,9.357-9.355c0-5.167-4.189-9.356-9.357-9.356c-5.166,0-9.356,4.189-9.356,9.356 C177.039,177.085,181.229,181.274,186.396,181.274z M242.792,158.702l13.14-7.028l13.14,7.028l-2.623-14.669l10.743-10.326 l-14.761-2.039l-6.499-13.408l-6.501,13.408l-14.761,2.039l10.744,10.326L242.792,158.702z M299.572,280.737l32.132,42.552H180.158 l32.131-42.552h-21l26.94-37.455H202.94l52.991-82.233l52.989,82.233h-15.289l26.941,37.455H299.572z M284.473,257.639 l-20.046-29.95h16.239l-24.734-38.012l-24.736,38.012h16.239l-9.068,13.549C260.297,243.234,260.312,267.229,284.473,257.639z M244.08,375.237h23.702v-41.415H244.08V375.237z M155.008,189.175c-2.583,0-4.679,2.095-4.679,4.679 c0,2.582,2.096,4.678,4.679,4.678s4.678-2.096,4.678-4.678C159.686,191.27,157.591,189.175,155.008,189.175z M189.515,218.681 c0-3.444-2.792-6.237-6.237-6.237c-3.444,0-6.238,2.793-6.238,6.237s2.794,6.237,6.238,6.237 C186.723,224.918,189.515,222.125,189.515,218.681z M164.362,243.647c-2.582,0-4.677,2.095-4.677,4.679 c0,2.583,2.095,4.678,4.677,4.678c2.584,0,4.679-2.095,4.679-4.678C169.041,245.742,166.946,243.647,164.362,243.647z',
	star: 'M298.582,290.521l10.62,59.391L256,321.458l-53.202,28.453l10.62-59.391l-43.501-41.808 l59.766-8.252L256,186.17l26.317,54.291l59.767,8.252L298.582,290.521z M357.9,309.794l25.414,142.124L256,383.828l-127.315,68.09 L154.1,309.794L50,209.749l143.022-19.748L256,60.082l62.979,129.919L462,209.749L357.9,309.794z M342.89,396.277l-17.345-96.996 l71.046-68.279l-97.609-13.478L256,128.857l-42.981,88.667l-97.61,13.478l71.047,68.279l-17.345,96.996L256,349.809L342.89,396.277z'
};
var inputForm = document.getElementById('inputForm');
var input_count = inputForm.rows.length;

Object.size = function(obj) {
	var size = 0, key;
	for (key in obj) {
		if (obj.hasOwnProperty(key))
			size++;
	}
	return size;
};

/* INITIALIZE ON LOAD */
window.onload = function() {

	// Initialize option
	initializeLineChartOption();
	initializePieChartOption();

	// Add 4 input form at beginning
	addData();
	addData();
	addData();
	addData();

	//Event listener for error message
	dataError.addEventListener('click', function() {
		this.setAttribute('style', 'display:none');
	});
};

/* LIST OF FUNCTIONS FOR MANIPULATE DATA INPUT */

//Add more Input Form
function addData() {
	lastIdData++;
	var input_count = lastIdData;
	var new_row = document.createElement('tr');
	var new_col_title = document.createElement('td');
	var new_col_name = document.createElement('td');
	var new_col_color = document.createElement('td');
	var new_col_icon = document.createElement('td');
	var new_col_value = document.createElement('td');

	//Set row id
	new_row.id = 'inputData' + input_count;

	//Set Title and Delete Button
	var input_delete = document.createElement('button');
	input_delete.setAttribute('onclick', 'deleteData(this)');
	input_delete.innerHTML = "[X]";
	new_col_title.appendChild(input_delete);
	var input_title = document.createTextNode('Data' + input_count);
	new_col_title.appendChild(input_title);

	//Set input name
	new_col_name.appendChild(document.createTextNode('Name :'));
	var input_name = document.createElement('input');
	input_name.setAttribute('type', 'text');
	input_name.setAttribute('size', 10);
	input_name.setAttribute('maxlength', 10);
	input_name.id = 'inputName' + input_count;
	input_name.value = "Data " + input_count;
	new_col_name.appendChild(input_name);

	//Set input icon
	new_col_icon.appendChild(document.createTextNode('Icon :'));
	var input_icon = document.createElement('select');
	var opt_icon, icon;
	for (icon in icons) {
		opt_icon = document.createElement('option');
		opt_icon.value = icon;
		opt_icon.innerHTML = icon;
		input_icon.appendChild(opt_icon);
	}
	input_icon.id = 'inputIcon' + input_count;
	new_col_icon.appendChild(input_icon);

	//Set input color with preview
	var input_color_div = document.createElement('div');
	input_color_div.setAttribute('class', 'wrap');
	input_color_div.appendChild(document.createTextNode('Color :'));
	var input_color = document.createElement('input');
	input_color.setAttribute('type', 'text');
	input_color.id = 'inputColor' + input_count;
	input_color.value = getRandomColor();
	input_color.setAttribute('onchange', 'previewColor(this);');
	var input_color_preview = document.createElement('div');
	input_color_preview.id = 'inputColorPreview' + input_count;
	input_color_preview.setAttribute('class', 'color-preview');
	input_color_preview.setAttribute('style', "background:" + input_color.value);
	var input_color_random = document.createElement('button');
	input_color_random.id = 'inputColorPreview' + input_count;
	input_color_random.innerHTML = 'Pick Random';
	input_color_random.setAttribute('class', 'color-random');
	input_color_random.setAttribute('onclick', 'generateRandomColor(' + input_count + ');');
	input_color_div.appendChild(input_color_preview);
	input_color_div.appendChild(input_color_random);
	input_color_div.appendChild(input_color);
	new_col_color.appendChild(input_color_div);

	//Set input value
	new_col_value.appendChild(document.createTextNode('Value :'));
	var input_value = document.createElement('input');
	input_value.setAttribute('type', 'text');
	input_value.setAttribute('on', 'return validateNumber(this);');
	input_value.id = 'inputValue' + input_count;
	input_value.value = Math.round(Math.random() * 9) + 1;
	new_col_value.appendChild(input_value);

	//Append the input to row
	new_row.appendChild(new_col_title);
	new_row.appendChild(new_col_name);
	new_row.appendChild(new_col_icon);
	new_row.appendChild(new_col_color);
	new_row.appendChild(new_col_value);
	inputForm.appendChild(new_row);
}

//Delete the row selected
function deleteData(e) {
	var id = e.parentNode.parentNode.id;
	inputForm.removeChild(document.getElementById(id));
}

//Fetch all data of form
function fetchData() {
	var listdata = inputForm.rows;
	var is_error = false;
	var data_id = 0;

	//reset chartData
	chartData = {};
	//reset errorMessage
	resetErrorMsg();

	for (var i = 0; i < listdata.length; i++) {
		data_id = listdata[i].id.substring(9);
		chartData[i] = {
			name: document.getElementById('inputName' + data_id).value,
			value: document.getElementById('inputValue' + data_id).value,
			icon: document.getElementById('inputIcon' + data_id).value,
			color: document.getElementById('inputColor' + data_id).value
		};
		if (validateIsNumber(document.getElementById('inputValue' + data_id).value) === false) {
			is_error = true;
			addErrorMsg('Value of Data ' + data_id + ' must be numeric.');
		}
	}
	if (is_error === false) {
		hideErrorMsg();
		return true;
	} else {
		showErrorMsg();
		return false;
	}
}

function resetErrorMsg() {
	dataErrorMsg = "";
	dataError.innerHTML = "";
}
function addErrorMsg(msg) {
	var line = document.createElement('div');
	line.innerHTML = msg;
	dataError.appendChild(line);
}
function showErrorMsg() {
	dataError.setAttribute('style', 'display:block');
}
function hideErrorMsg() {
	dataError.setAttribute('style', 'display:none');
}

//Calculate Data total and percentage
function calculateData() {
	var percentage = 0;
	totalData = 0;
	highestData = 0;
	//Calculate Total of Chart Value
	for (var i = 0; i < Object.size(chartData); i++) {
		totalData += parseInt(chartData[i]['value']);
		if (highestData < parseInt(chartData[i]['value']))
			highestData = parseInt(chartData[i]['value']);
	}
	//Calculate Percentage of Chart Value
	for (var i = 0; i < Object.size(chartData); i++) {
		percentage = (chartData[i]['value'] / totalData) * 100;
		chartData[i]['percentage'] = percentage.toFixed(2);
	}
}

/* LIST OF FUNCTIONS FOR INITIALIZE CHART */
var oriCanvasWidth = canvasWidth, oriCanvasHeight = canvasHeight;
function generateChart(type) {
	var is_error = false;

	//Fetch and check the data input
	if (fetchData() === false)
		return false;

	//check input options
	if (type === 'Pie') {
		if (validateIsNumber(inputChartA.value) === false) {
			is_error = true;
			addErrorMsg('Value of Circle Size must be numeric.');
		} else if (inputChartA.value < 100 || inputChartA.value > 180) {
			is_error = true;
			addErrorMsg('Value of Circle Size must be between 100 and 180.');
		}
	} else if (type === 'Line') {
		if (validateIsNumber(inputHighestValue.value) === false) {
			is_error = true;
			addErrorMsg('Value of Max Line Chart must be numeric.');
		}
	}

	if (is_error === false) {
		hideErrorMsg();
	} else {
		showErrorMsg();
		return false;
	}

	//Create canvas of chart
	chartCanvas = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
	chartCanvas.id = 'chartCanvas' + chartId;
	chartCanvas.setAttribute('class', 'chart-canvas');
	chartWrapper.insertBefore(chartCanvas, chartWrapper.firstChild);
	chartCanvas = document.getElementById('chartCanvas' + chartId);

	//Save the original width and height of canvas
	canvasWidth = oriCanvasWidth;
	canvasHeight = oriCanvasHeight;
	editCanvas();

	//Calculate data total and percentage
	calculateData();
	//Set the chart type to generate
	if (type === 'Pie') {
		generatePieChart();
	} else if (type === 'Line') {
		generateLineChart();
	}

	//Generate title and statistic of chart
	generateStatistic();

	chartId++;
}

//Set width and height of chart
function editCanvas() {
	chartCanvas.setAttribute('width', canvasWidth);
	chartCanvas.setAttribute('height', canvasHeight);
}

/*Download Chart not working well yet :(
 function downloadChart(e) {
 var canvas = e.parentNode;
 var serializer = new XMLSerializer();
 var data = "data:image/svg+xml;base64," + btoa(serializer.serializeToString(canvas));
 window.open(data);
 }
 */

//Delete chart selected
function deleteChart(e) {
	var canvas = e.parentNode;
	canvas.parentNode.removeChild(canvas);
}

var chartTrTrX = {}, chartTrTrY = {}, chartTrScale = {};
function transformChart(groupObject) {
	console.log(groupObject.id);
	return 'translate(' + chartTrTrX[groupObject.id] + ',' + chartTrTrY[groupObject.id] + '),scale(' + chartTrScale[groupObject.id] + ')';
}

//Set event listener of chart to be draggable
function dragChart(groupObject) {
	var x = 0, y = 0, x2 = 0, y2 = 0;

	groupObject.addEventListener('mousedown', function(start) {
		x = start.x;
		y = start.y;
		this.onmousemove = function(move) {
			chartTrTrX[groupObject.id] = (x2 + (move.x - x));
			chartTrTrY[groupObject.id] = (y2 + (move.y - y));
			this.setAttribute('transform', transformChart(groupObject));
		};
	});
	groupObject.addEventListener('mouseup', function(end) {
		x2 = x2 + end.x - x;
		y2 = y2 + end.y - y;
		this.onmousemove = null;
	});
	groupObject.addEventListener('mouseout', function() {
		this.onmousemove = null;
	});
}

//Create button for resizing and set event listener
function resizeChart(groupObject) {
	var x = 0, y=0, range = 0, currentScale = 1;
	var resize = document.createElementNS("http://www.w3.org/2000/svg", 'image');
	resize.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '../icon/resize.svg');
	resize.setAttribute('width', 100);
	resize.setAttribute('height', 30);
	resize.setAttribute('stroke', 'black');
	resize.setAttribute('stroke-width', 2);
	resize.setAttribute('x', resizeX);
	resize.setAttribute('y', resizeY);

	resize.addEventListener('mousedown', function(start) {
		x = start.x;
		this.onmousemove = function(move) {
			range = currentScale + ((move.x - start.x) / 1000);
			chartTrScale[groupObject.id] = range;
			groupObject.setAttribute('transform', transformChart(groupObject));
			currentScale = range;
		};
	});
	resize.addEventListener('mouseup', function(end) {
		x2 = x2 + end.x - x;
		y2 = y2 + end.y - y;
		this.onmousemove = null;
	});

	groupObject.parentNode.appendChild(resize);
}

/* END OF FUNCTIONS FOR INITIALIZE CHART */

/* LIST OF FUNCTIONS FOR GENERATE LINE CHART */

//Set option value of line chart
function initializeLineChartOption() {
	inputHighestValue.value = lineHighestValue;
}

//Generate line chart
function generateLineChart() {
	var line, icon, iconX, value, width, nextY = lineFromY, maxValue, maxY;

	//Create line group
	var newLineGroup = document.createElementNS("http://www.w3.org/2000/svg", 'g');
	newLineGroup.id = "chartGroup" + chartId;

	//Repetition of data to generate line
	for (var i = 0; i < Object.size(chartData); i++) {
		//Set line break
		nextY += 50;

		//Set max value
		if (inputHighestValue.value < highestData)
			maxValue = highestData;
		else
			maxValue = inputHighestValue.value;


		//If maxvalue below 10, we show the line chart with icons
		if (maxValue <= 10) {
			iconX = lineFromX + 1;
			//Do the repetition of generating icons by data value
			for (var o = 1; o <= chartData[i]['value']; o++) {
				line = document.createElementNS("http://www.w3.org/2000/svg", 'path');
				line.setAttribute('d', icons[chartData[i]['icon']] + " M" + (iconX) + "," + nextY);
				//Check if the icon want to be shown with random color or not
				if (inputRandomColor.checked)
					line.setAttribute('fill', validateColor('random'));
				else
					line.setAttribute('fill', chartData[i]['color']);
				line.setAttribute('transform', 'translate(' + (iconX) + ',' + (nextY) + '),scale(0.05)');
				newLineGroup.appendChild(line);
				iconX += 42;
			}
		}
		//Else, we show the line chart with rectangle
		else {
			//Get line width
			width = chartData[i]['value'] * (lineWidth / maxValue);
			//Create line chart
			line = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
			line.setAttribute('x', lineFromX + 1);
			line.setAttribute('y', nextY);
			line.setAttribute('width', width);
			line.setAttribute('height', 30);
			line.setAttribute('fill', chartData[i]['color']);
			newLineGroup.appendChild(line);

			//Create icon beside of chart
			icon = document.createElementNS("http://www.w3.org/2000/svg", 'path');
			icon.setAttribute('d', icons[chartData[i]['icon']] + " M" + (lineFromX + width) + "," + nextY);
			icon.setAttribute('fill', chartData[i]['color']);
			icon.setAttribute('transform', 'translate(' + (lineFromX + width) + ',' + (nextY) + '),scale(0.05)');
			newLineGroup.appendChild(icon);
		}

		//Put the data value beside line
		value = document.createElementNS("http://www.w3.org/2000/svg", 'text');
		value.textContent = chartData[i]['value'];
		value.setAttribute('x', lineFromX - 30);
		value.setAttribute('y', nextY + 15);
		value.setAttribute('fill', 'black');
		newLineGroup.appendChild(value);
	}

	//If the height of data is more than vertical line, then extend the line
	if ((nextY + 50) > (lineFromY + lineHeight)) {
		maxY = lineFromY + nextY;
	} else {
		maxY = lineFromY + lineHeight;
	}

	//If the height of data is more than canvas height, extend the canvas height
	if ((maxY) > canvasHeight) {
		canvasHeight = maxY;
		editCanvas();
	}

	//Prepare horizontal line of chart
	var lineX = document.createElementNS("http://www.w3.org/2000/svg", 'line');
	lineX.setAttribute('x1', lineFromX);
	lineX.setAttribute('x2', lineFromX + lineWidth);
	lineX.setAttribute('y1', maxY);
	lineX.setAttribute('y2', maxY);
	lineX.setAttribute('stroke', 'black');
	lineX.setAttribute('stroke-width', 3);
	newLineGroup.appendChild(lineX);
	//Prepare vertical line of chart
	var lineY = document.createElementNS("http://www.w3.org/2000/svg", 'line');
	lineY.setAttribute('x1', lineFromX);
	lineY.setAttribute('x2', lineFromX);
	lineY.setAttribute('y1', lineFromY);
	lineY.setAttribute('y2', maxY);
	lineY.setAttribute('stroke', 'black');
	lineY.setAttribute('stroke-width', 3);
	newLineGroup.appendChild(lineY);
	//Prepare horizontal line value of chart
	var firstValueY = document.createElementNS("http://www.w3.org/2000/svg", 'text');
	firstValueY.textContent = 0;
	firstValueY.setAttribute('x', lineFromX);
	firstValueY.setAttribute('y', maxY + 20);
	newLineGroup.appendChild(firstValueY);
	var midValueY = document.createElementNS("http://www.w3.org/2000/svg", 'text');
	midValueY.textContent = Math.round(maxValue / 2);
	midValueY.setAttribute('x', (lineFromX + lineWidth) / 2);
	midValueY.setAttribute('y', maxY + 20);
	newLineGroup.appendChild(midValueY);
	var maxValueY = document.createElementNS("http://www.w3.org/2000/svg", 'text');
	maxValueY.textContent = maxValue;
	maxValueY.setAttribute('x', lineFromX + lineWidth);
	maxValueY.setAttribute('y', maxY + 20);
	newLineGroup.appendChild(maxValueY);

	//Append to canvas
	chartCanvas.appendChild(newLineGroup);

	chartTrTrX[newLineGroup.id] = 0;
	chartTrTrY[newLineGroup.id] = 0;
	chartTrScale[newLineGroup.id] = 1;
	//Enable chart to be draggable
	dragChart(newLineGroup);
	//Enable chart to be resizable
	resizeChart(newLineGroup);
}
/* END OF FUNCTIONS FOR GENERATE LINE CHART */

/* LIST OF FUNCTIONS FOR GENERATE PIE CHART */

//Set option value of pie chart
function initializePieChartOption() {
	inputChartA.value = chartA;
}

//Generate pie chart
function generatePieChart() {

	var start = 0;
	var finish = 0;
	var newPieGroup = document.createElementNS("http://www.w3.org/2000/svg", 'g');
	newPieGroup.id = "chartGroup" + chartId;

	//Generate pie chart by doing repetition of data
	for (var i = 0; i < Object.size(chartData); i++) {

		//Set the finish degree of current data to be used by next data
		finish = ((chartData[i]['value'] / totalData) * 360) + start;
		//Create the pie!
		newPieGroup.appendChild(createPieChart(start, finish, i, chartData[i]));
		//Set start degree of next data
		start = finish;
	}

	//Append to canvas
	chartCanvas.appendChild(newPieGroup);
	
	chartTrTrX[newPieGroup.id] = 0;
	chartTrTrY[newPieGroup.id] = 0;
	chartTrScale[newPieGroup.id] = 1;
	//Enable chart to be draggable
	dragChart(newPieGroup);
	//Enable chart to be draggable
	resizeChart(newPieGroup);

}

//Create pie chart by parameter sent
function createPieChart(angleFrom, angleTo, uniqueID, data) {

	//Get Value from option
	chartA = inputChartA.value;

	//Get different angle for pie size
	var angleDiff = Math.abs(angleFrom - angleTo);
	var from = chartA / 180 * angleFrom;
	var to = chartA / 180 * angleTo;

	//If the different is bigger than 180deg, the chart arc must set to 1
	if (angleDiff <= 180)
		chartArcFlag = 0;
	else
		chartArcFlag = 1;

	//If the different is 360, create full circle of pie
	if (angleDiff === 360)
	{
		chartD = "M" + (chartFromX + chartA) + "," + chartFromY + " A" + chartA + "," + chartA + " 0 1,0 " + (chartFromX - chartA) + "," + chartFromY + " A" + chartA + "," + chartA + " 0 1,0 " + (chartFromX + chartA) + "," + chartFromY;
	}
	//Else
	else {
		//Set the coordinates and path d
		//Formula inspired from : http://jbkflex.wordpress.com/2011/07/28/creating-a-svg-pie-chart-html5/
		x1 = chartFromX + chartA * Math.cos(Math.PI * from / chartA);
		y1 = chartFromY + chartA * Math.sin(Math.PI * from / chartA);
		x2 = chartFromX + chartA * Math.cos(Math.PI * to / chartA);
		y2 = chartFromY + chartA * Math.sin(Math.PI * to / chartA);
		chartD = "M" + chartFromX + "," + chartFromY + " L" + x1 + "," + y1 + " A" + chartA + "," + chartA + " 0 " + chartArcFlag + ",1 " + x2 + "," + y2 + " z";
	}

	//Create the pie with generated d
	var newPieChart = document.createElementNS("http://www.w3.org/2000/svg", 'path'); //Create a path in SVG's namespace
	newPieChart.setAttribute("d", chartD); //Set path's data
	newPieChart.style.stroke = "#000"; //Set stroke colour
	newPieChart.style.strokeWidth = "0px"; //Set stroke width
	newPieChart.style.fill = data['color'];
	newPieChart.id = "pieChart" + uniqueID;

	return newPieChart;
}
/* END OF FUNCTIONS FOR GENERATE PIE CHART */

/* LIST OF FUNCTIONS FOR GENERATE STATISTIC */

//Create the title, statistic, and close button of chart
function generateStatistic() {

	//Insert the title from input form
	var chartTitle = document.createElementNS("http://www.w3.org/2000/svg", 'text');
	chartTitle.textContent = inputChartTitle.value;
	chartTitle.setAttribute('font-size', 36);
	chartTitle.setAttribute('x', titleX);
	chartTitle.setAttribute('y', titleY);
	chartCanvas.appendChild(chartTitle);

	/* Download not working well yet :(
	 var chartDownload = document.createElementNS("http://www.w3.org/2000/svg", 'image');
	 chartDownload.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'icon/download.svg');
	 chartDownload.setAttribute('class', 'chart-button');
	 chartDownload.setAttribute('onclick', 'downloadChart(this)');
	 chartDownload.setAttribute('x', downloadX);
	 chartDownload.setAttribute('y', downloadY);
	 chartDownload.setAttribute('width', 30);
	 chartDownload.setAttribute('height', 30);
	 chartCanvas.appendChild(chartDownload);
	 */

	//Create delete button
	var chartDelete = document.createElementNS("http://www.w3.org/2000/svg", 'image');
	chartDelete.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '../icon/delete.svg');
	chartDelete.setAttribute('class', 'chart-button');
	chartDelete.setAttribute('onclick', 'deleteChart(this)');
	chartDelete.setAttribute('x', deleteX);
	chartDelete.setAttribute('y', deleteY);
	chartDelete.setAttribute('width', 30);
	chartDelete.setAttribute('height', 30);
	chartCanvas.appendChild(chartDelete);

	//Set position of data statistic
	var posX = statisticX, posY = statisticY;

	var statistic = document.createElementNS("http://www.w3.org/2000/svg", 'g');

	//Statistic title
	var statisticTitle = document.createElementNS("http://www.w3.org/2000/svg", 'text');
	statisticTitle.textContent = "Data Statistic";
	statisticTitle.setAttribute('x', statisticX);
	statisticTitle.setAttribute('y', statisticY);
	statisticTitle.setAttribute('font-size', 24);
	statistic.appendChild(statisticTitle);

	//Lower the statistic position
	posY += 20;

	//Do the repetition of data
	for (var i = 0; i < Object.size(chartData); i++) {

		//Show icon of data with selected color
		var icon = document.createElementNS("http://www.w3.org/2000/svg", 'path');
		icon.setAttribute('d', icons[chartData[i]['icon']] + " M" + posX + "," + posY);
		icon.setAttribute('fill', chartData[i]['color']);
		icon.setAttribute('transform', 'translate(' + posX + ',' + (posY - 20) + '),scale(0.05)');
		statistic.appendChild(icon);
		//Show data value
		var content = document.createElementNS("http://www.w3.org/2000/svg", 'text');
		content.textContent = chartData[i]['name'] + ' : ' + chartData[i]['value'].toLocaleString() + ' (' + chartData[i]['percentage'] + '%)';
		content.setAttribute('x', posX + 28);
		content.setAttribute('y', posY);
		content.setAttribute('fill', chartData[i]['color']);
		statistic.appendChild(content);

		//If the statistic height is bigger than canvas, extend the canvas
		if ((posY + 20) > canvasHeight) {
			canvasHeight += statLineHeight;
			editCanvas();
		}
		posY += statLineHeight;
	}


	chartCanvas.appendChild(statistic);
}
/* END OF FUNCTIONS FOR GENERATE STATISTIC */

/* LIST OF FUNCTIONS FOR HELPER */

//Validate color if random color is requested
function validateColor(val) {
	if (val === 'random') {
		return getRandomColor();
	} else {
		return val;
	}
}

//Return random hex color
function getRandomColor() {
	var letters = '0123456789ABCDEF'.split('');
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.round(Math.random() * 15)];
	}
	return color;
}

//Preview the color selected
function previewColor(e) {
	var id = e.id.substring(10, 11);
	var color_preview = document.getElementById('inputColorPreview' + id);
	color_preview.setAttribute('style', "background:" + e.value);
}

//Function to set random color value to the input
function generateRandomColor(colorId) {
	var random_color = getRandomColor();
	var color_input = document.getElementById('inputColor' + colorId);
	color_input.value = random_color;
	previewColor(color_input);
}

//Validate the value is number or not
function validateIsNumber(value) {
	if (isNaN(value) === true) {
		return false;
	}
}
/* END OF FUNCTIONS FOR HELPER */
