// read in data.json
d3.json("static/js/data.json").then((data) => {
    var alldata = data.DisasterDeclarationsSummaries;
    //console.log(alldata);

    // keep Flood, Hurricane, Fire, Earthquake, Tornado, Volcano, Drought
    var incidentType = alldata.map(object => object.incidentType);
    var declarationDate = alldata.map(object => object.declarationDate);
    var disasterNumber = alldata.map(object => object.disasterNumber);
    var state = alldata.map(object => object.state);
    var designatedArea = alldata.map(object => object.designatedArea);
    var id = alldata.map(object => object.id);
    var incidentBeginDate = alldata.map(object => object.incidentBeginDate);
    var incidentEndDate = alldata.map(object => object.incidentEndDate);
    var fipsCountyCode = alldata.map(object => object.fipsCountyCode);
    var fipsStateCode = alldata.map(object => object.fipsStateCode);
    var fyDeclared = alldata.map(object => object.fyDeclared);

    // created variables we wanted to keep
    var list = [];
    for (var j = 0; j < incidentType.length; j++) 
    list.push({'incidentType': incidentType[j], 
              'declarationDate': declarationDate[j],
              'disasterNumber': disasterNumber[j], 
              'id': id[j],
              'incidentBeginDate': incidentBeginDate[j],
              'incidentEndDate': incidentEndDate[j],
              'fipsCountyCode': fipsCountyCode[j],
              'fipsStateCode': fipsStateCode[j],
              'fyDeclared': fyDeclared[j],
              'designatedArea': designatedArea[j],
              'state' : state[j]});
    
    // found indices of entries we wanted to keep 
    var tornado = incidentType.map((e, i) => e === 'Tornado' ? i : '').filter(String);
    var flood = incidentType.map((e, i) => e === 'Flood' ? i : '').filter(String);
    var hurricane = incidentType.map((e, i) => e === 'Hurricane' ? i : '').filter(String);
    var fire = incidentType.map((e, i) => e === 'Fire' ? i : '').filter(String);
    var earthquake = incidentType.map((e, i) => e === 'Earthquake' ? i : '').filter(String);
    var volcano = incidentType.map((e, i) => e === 'Volcano' ? i : '').filter(String);
    var drought = incidentType.map((e, i) => e === 'Drought' ? i : '').filter(String);
    
    var indices = tornado.concat(flood,hurricane,fire,earthquake,volcano,drought);
    indices = indices.sort((a,b) => a-b);

    // put clean data all together based on indices
    var cleanlist = [];
    for (var i = 0; i < indices.length; i++) {
        cleanlist.push(list[indices[i]]);
    }
    
    // created clean list (sorted by disaster number)
    cleanlist = cleanlist.sort((c1, c2) => c1.disasterNumber - c2.disasterNumber);
    function unique(data,key) {
        return [
            ...new Map(
                data.map(x => [key(x), x])
            ).values()
        ]
    }
    cleanlist = unique(cleanlist, it => it.disasterNumber);
    
    //console.log(cleanlist);

    var uniquedisasters = cleanlist.map(object => object.disasterNumber);
    state = cleanlist.map(object => object.state);

    // Fill in dropdown menu and update page

    var singlestates = Array.from(new Set(state));
    singlestates = singlestates.sort();

    var statedropdown = document.getElementById("byState");
        numberdropdown = document.getElementById("selDisaster");
        for (var i = 0; i < singlestates.length; ++i) {
        statedropdown[statedropdown.length] = new Option(singlestates[i], singlestates[i]);
        }

    
    // Call getData()
    d3.selectAll("#selDisaster").on("click", getData);
    document.getElementById("selDisaster").click();

    d3.selectAll("#byState").on("click", getstateData);
    document.getElementById("byState").click();
    //console.log(cleanlist)

    //the state function populates the other dropdown

    function getstateData () {
        var statedropdownMenu = d3.select("#byState");
        var chosenstate = statedropdownMenu.property("value");
        var statedata = state.map((e, i) => e === chosenstate ? i : '').filter(String);

        temp = [];
        for (i= 0; i<statedata.length; i++) {
            temp.push(cleanlist[statedata[i]])
        }
        console.log(temp);

        var statedisasternumbers = temp.map(object => object.disasterNumber);
        
        var select = document.getElementById("selDisaster");
        var length = select.options.length;
        for (i = length-1; i >= 0; i--) {
            select.options[i] = null;
        }

        numberdropdown = document.getElementById("selDisaster");
        for (var i = 0; i < statedisasternumbers.length; ++i) {
        numberdropdown[numberdropdown.length] = new Option(statedisasternumbers[i], statedisasternumbers[i]);
        }
        document.getElementById("selDisaster").click();

    }

    // Create getData()
    function getData() {

        var dropdownMenu = d3.select("#selDisaster");
        var dataset = dropdownMenu.property("value");
        dataset = parseInt(dataset, 10);
        var index = uniquedisasters.indexOf(dataset);
        var specificdata = cleanlist[index];
        var space = d3.select(".panel-body");
        space.html("");
        space.append("li").text(`Disaster Number: ${specificdata.disasterNumber}`);
        space.append("li").text(`ID: ${specificdata.id}`);
        space.append("li").text(`Storm Type: ${specificdata.incidentType}`);
        space.append("li").text(`Year Declared: ${specificdata.fyDeclared}`);
        space.append("li").text(`State: ${specificdata.state}`);
        space.append("li").text(`Area: ${specificdata.designatedArea}`);
        space.append("li").text(`State Fips Code: ${specificdata.fipsStateCode}`);
        space.append("li").text(`County Fips Code: ${specificdata.fipsCountyCode}`);
        space.append("li").text(`Declaration Date: ${specificdata.declarationDate}`);
        space.append("li").text(`Disaster Begin Date: ${specificdata.incidentBeginDate}`);
        space.append("li").text(`Disaster End Date: ${specificdata.incidentEndDate}`);
    
        var data = [{
            type: "choroplethmapbox", locations: [specificdata.state], z: [50], coloraxis: "coloraxis", hoverinfo: "none",
            geojson: "https://raw.githubusercontent.com/python-visualization/folium/master/examples/data/us-states.json"
          }];
          
        var layout = {mapbox: {center: {lon: -95, lat: 45}, zoom: 1.5}, coloraxis: {showscale: false},
                        width: 1000, height:600};
          
        var config = {mapboxAccessToken: "pk.eyJ1IjoiZ3J3YXQzMyIsImEiOiJja2lzMmV4cGUxc3M2MndvODR6YWs2cnl4In0.MrGype25gR61KiJcqHVyvw"};
          
        Plotly.newPlot('myDiv', data, layout, config);      
        }
        

    }

);
