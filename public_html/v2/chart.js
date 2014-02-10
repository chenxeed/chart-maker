//Variable for All Chart
var canvasWidth = 800;
var canvasHeight = 450;
var chartId = 1;
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

//Variable for LineChart
var lineFromX = 50;
var lineFromY = 50;
var lineWidth = 400;
var lineHeight = 300;
var lineHighestValue = 10;

//Variable for Statistic
var titleX = 30;
var titleY = 30;
var downloadX = canvasWidth - 100;
var downloadY = 10;
var deleteX = canvasWidth - 50;
var deleteY = 10;
var statisticX = 510;
var statisticY = 75;
var statLineHeight = 30;

//Object Data for Chart
var objChart = function(title) {
	this.chart_id;
	this.title = title;
	this.data;
	this.data_index_increment = 0;
};

//Icons formula from : http://iconmonstr.com/
var icons = {
	men: 'M407.448,360.474c-59.036-13.617-113.989-25.541-87.375-75.717 c81.01-152.729,21.473-234.406-64.072-234.406c-87.231,0-145.303,84.812-64.072,234.406c27.412,50.482-29.608,62.393-87.375,75.717 c-59.012,13.609-54.473,44.723-54.473,101.176h411.838C461.919,405.196,466.458,374.083,407.448,360.474z',
	women: 'M407.447,380.817c-50.919-11.622-112.919-41.622-94.652-80.682c11.732,19.236,48.084,30.361,76.4,13.736 c-81.506-20.57,40.066-161.795-66.458-240.959c-38.877-29.041-95.209-29.373-133.474,0 c-106.524,79.164,15.048,220.389-66.458,240.959c28.316,16.625,64.723,5,76.4-13.736c18.268,39.064-43.786,69.072-94.652,80.682 c-59.041,13.475-54.473,52.025-54.473,80.176h411.838C461.919,432.843,466.489,394.294,407.447,380.817z',
	christmas: 'M392.677,400.564L430.553,462H81.447l37.876-61.436H392.677z M176.286,375.613 C130.607,348.403,100,298.531,100,241.502c0-86.156,69.844-156,156-156s156,69.844,156,156c0,57.029-30.607,106.901-76.286,134.111 h56.963c33.905-34.548,54.826-81.881,54.826-134.111C447.503,135.738,361.764,50,256,50C150.235,50,64.497,135.738,64.497,241.502 c0,52.23,20.921,99.563,54.826,134.111H176.286z M313.644,171.919c2.583,0,4.678-2.095,4.678-4.679c0-2.583-2.095-4.678-4.678-4.678 c-2.585,0-4.678,2.095-4.678,4.678C308.966,169.824,311.059,171.919,313.644,171.919z M325.807,219.513 c3.442,0,6.236-2.793,6.236-6.237c0-3.445-2.794-6.237-6.236-6.237c-3.445,0-6.237,2.792-6.237,6.237 C319.569,216.72,322.361,219.513,325.807,219.513z M352.314,254.856c5.167,0,9.356-4.188,9.356-9.355s-4.189-9.355-9.356-9.355 s-9.355,4.188-9.355,9.355S347.147,254.856,352.314,254.856z M347.637,190.631c2.583,0,4.678-2.096,4.678-4.679 c0-2.582-2.095-4.678-4.678-4.678s-4.678,2.096-4.678,4.678C342.959,188.535,345.054,190.631,347.637,190.631z M186.396,181.274 c5.168,0,9.357-4.189,9.357-9.355c0-5.167-4.189-9.356-9.357-9.356c-5.166,0-9.356,4.189-9.356,9.356 C177.039,177.085,181.229,181.274,186.396,181.274z M242.792,158.702l13.14-7.028l13.14,7.028l-2.623-14.669l10.743-10.326 l-14.761-2.039l-6.499-13.408l-6.501,13.408l-14.761,2.039l10.744,10.326L242.792,158.702z M299.572,280.737l32.132,42.552H180.158 l32.131-42.552h-21l26.94-37.455H202.94l52.991-82.233l52.989,82.233h-15.289l26.941,37.455H299.572z M284.473,257.639 l-20.046-29.95h16.239l-24.734-38.012l-24.736,38.012h16.239l-9.068,13.549C260.297,243.234,260.312,267.229,284.473,257.639z M244.08,375.237h23.702v-41.415H244.08V375.237z M155.008,189.175c-2.583,0-4.679,2.095-4.679,4.679 c0,2.582,2.096,4.678,4.679,4.678s4.678-2.096,4.678-4.678C159.686,191.27,157.591,189.175,155.008,189.175z M189.515,218.681 c0-3.444-2.792-6.237-6.237-6.237c-3.444,0-6.238,2.793-6.238,6.237s2.794,6.237,6.238,6.237 C186.723,224.918,189.515,222.125,189.515,218.681z M164.362,243.647c-2.582,0-4.677,2.095-4.677,4.679 c0,2.583,2.095,4.678,4.677,4.678c2.584,0,4.679-2.095,4.679-4.678C169.041,245.742,166.946,243.647,164.362,243.647z',
	star: 'M298.582,290.521l10.62,59.391L256,321.458l-53.202,28.453l10.62-59.391l-43.501-41.808 l59.766-8.252L256,186.17l26.317,54.291l59.767,8.252L298.582,290.521z M357.9,309.794l25.414,142.124L256,383.828l-127.315,68.09 L154.1,309.794L50,209.749l143.022-19.748L256,60.082l62.979,129.919L462,209.749L357.9,309.794z M342.89,396.277l-17.345-96.996 l71.046-68.279l-97.609-13.478L256,128.857l-42.981,88.667l-97.61,13.478l71.047,68.279l-17.345,96.996L256,349.809L342.89,396.277z'
};
var inputForm = document.getElementById('inputForm');

//Necessary Variable
var list_chart = [];
var new_chart_count = 0;

//Event Listener
var elmListChart = document.getElementById('listChart');
elmListChart.onchange = function(data) {
	var chart_id = data.target.value;
	showCanvas(chart_id);
};

function showCanvas(chart_id) {
	//Hide another Canvas
	var elmAllCanvas = document.querySelectorAll('.chart-canvas');
	var chart_id_count = chart_id.substr(6);
	if (elmAllCanvas.length > 0) {
		for (i = 0; i < elmAllCanvas.length; i++)
			elmAllCanvas[i].setAttribute('style', 'display: none;');
	}
	//Show Add Chart Data Button
	var elmBtnAddData = document.getElementById('addChartData');
	elmBtnAddData.setAttribute('style', 'display: block');
	elmBtnAddData.setAttribute('onclick', 'buttonAddData("' + chart_id + '")');
	//Show selected canvas
	var elmCanvas = document.getElementById(chart_id);
	//Change Canvas data control name
	document.getElementById('chartTitle').innerHTML = list_chart[chart_id_count].title;
	elmCanvas.setAttribute('style', 'display: block;');
	//Clear the input form and Show Data to Chart Control match with selected chart
	var elmTrChild = document.querySelectorAll('#inputForm tr');
	for(i=0;i<elmTrChild.length;i++){
		document.getElementById('inputForm').removeChild(elmTrChild[i]);
	}
	
	showData(list_chart[chart_id_count]);
}

function showData(chart_object) {
	var key, a = chart_object.data;
	for (key in a) {
		if (arrayHasOwnIndex(a, key)) {
			addData(key, chart_object);
		}
	}
	/*
	for(i=0;i<chart_object.data.length; i++){
		addData(i, chart_object);
	}*/
}

//Function To Initialize New Chart
function addNew() {
	new_chart_count++;
	var chart_id = 'chart-' + new_chart_count;
	var chart_name = 'Chart ' + new_chart_count;

	list_chart[new_chart_count] = new objChart(chart_name);
	//Write the chart ID
	list_chart[new_chart_count].chart_id = chart_id;
	//Add random data
	list_chart[new_chart_count].data = [
		{
			title : 'Data1',
			name : 'data-1',
			color : getRandomColor(),
			value : Math.round(Math.random() * 9) + 1,
			icon : 'men'
		},
		{
			title : 'Data2',
			name : 'data-2',
			color : getRandomColor(),
			value : Math.round(Math.random() * 9) + 1,
			icon : 'women'
		}
	];
	list_chart[new_chart_count].data_index_increment = 2;

	//Add The Chart to Dropdown List Chart
	var elmNewOption = document.createElement('option');
	elmNewOption.id = 'option-'+chart_id;
	elmNewOption.setAttribute('value', chart_id);
	elmNewOption.setAttribute('selected');
	elmNewOption.innerHTML = chart_name;
	elmListChart.appendChild(elmNewOption);

	//Create Necessary Elements For Chart Canvas
	var elmChartWrapper = document.getElementById('chartWrapper');
	var elmCanvasWrapper = document.createElement('div');
	var elmDeleteCanvas = document.createElement('button');

	elmCanvasWrapper.id = chart_id;
	elmCanvasWrapper.innerHTML = list_chart[new_chart_count].title;
	elmCanvasWrapper.setAttribute('class', 'chart-canvas');

	elmDeleteCanvas.innerHTML = "[X]";
	elmDeleteCanvas.setAttribute('onclick', 'deleteChart(this)');
	elmCanvasWrapper.appendChild(elmDeleteCanvas);

	elmChartWrapper.appendChild(elmCanvasWrapper);

	//Display the generated canvas
	showCanvas(chart_id);
}

function buttonAddData(chart_id){
	chart_id_count = chart_id.substr(6);
	addData(list_chart[chart_id_count].data_index_increment, list_chart[chart_id_count]);
}

//Delete the row selected
function buttonDeleteData(e, chart_id, data_index) {
	var id = e.parentNode.parentNode.id;
	inputForm.removeChild(document.getElementById(id));
	
	chart_object = list_chart[chart_id.substr(6)];
	chart_object.data.splice(data_index, 1);
	
	console.log(chart_object.data);
}


//Add more Input Form
function addData(input_count, chart_object) {
	
	var current_index = input_count;
	
	var chart_data = chart_object.data[input_count];
	
	var new_row = document.createElement('tr');
	var new_col_title = document.createElement('td');
	var new_col_name = document.createElement('td');
	var new_col_color = document.createElement('td');
	var new_col_icon = document.createElement('td');
	var new_col_value = document.createElement('td');
	
	var title_value = 'Data' + (input_count+1);
	var name_value = "data-" + (input_count+1);
	var color_value = getRandomColor();
	var icon_value = "";
	var value_value = Math.round(Math.random() * 9) + 1;
	
	//Set the column value
	if(chart_data!==undefined){
		title_value = chart_data['title'];
		name_value = chart_data['name'];
		color_value = chart_data['color'];
		icon_value = chart_data['icon'];
		value_value = chart_data['value'];
	}else{
		chart_object.data.push({
			title : title_value,
			name : name_value,
			color : color_value,
			value : value_value,
			icon : icon_value
		});
		
		input_count++;
		chart_object.data_index_increment = input_count;
	}

	//Set row id
	new_row.id = 'inputData' + input_count;

	//Set Title and Delete Button
	var input_delete = document.createElement('button');
	input_delete.setAttribute('onclick', 'buttonDeleteData(this,"'+chart_object.chart_id+'",'+current_index+')');
	input_delete.innerHTML = "[X]";
	new_col_title.appendChild(input_delete);
	var input_title = document.createTextNode(title_value);
	new_col_title.appendChild(input_title);

	//Set input name
	new_col_name.appendChild(document.createTextNode('Name :'));
	var input_name = document.createElement('input');
	input_name.setAttribute('type', 'text');
	input_name.setAttribute('size', 10);
	input_name.setAttribute('maxlength', 10);
	input_name.id = 'inputName' + input_count;
	input_name.value = name_value;
	new_col_name.appendChild(input_name);

	//Set input icon
	new_col_icon.appendChild(document.createTextNode('Icon :'));
	var input_icon = document.createElement('select');
	var opt_icon, icon;
	for (icon in icons) {
		opt_icon = document.createElement('option');
		opt_icon.value = icon;
		opt_icon.innerHTML = icon;
		if(icon===icon_value)
			opt_icon.setAttribute('selected');
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
	input_color.value = color_value;
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
	input_value.value = value_value;
	new_col_value.appendChild(input_value);

	//Append the input to row
	new_row.appendChild(new_col_title);
	new_row.appendChild(new_col_name);
	new_row.appendChild(new_col_icon);
	new_row.appendChild(new_col_color);
	new_row.appendChild(new_col_value);
	inputForm.appendChild(new_row);
}

function deleteChart(e) {
	var deleted_key = e.parentNode.id.substr(6);
	var elmDeleteOption = document.getElementById('option-chart-'+deleted_key);
	delete list_chart[deleted_key];
	e.parentNode.parentNode.removeChild(e.parentNode);
	elmDeleteOption.parentNode.removeChild(elmDeleteOption);
	
	var elmOption = document.querySelectorAll('#listChart option');
	showCanvas(elmOption[0].id.substr(7));
}



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

function arrayHasOwnIndex(array, prop) {
    return array.hasOwnProperty(prop) && /^0$|^[1-9]\d*$/.test(prop) && prop <= 4294967294; // 2^32 - 2
}
/* END OF FUNCTIONS FOR HELPER */
