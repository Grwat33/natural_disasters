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
    
    console.log(cleanlist);

    var uniquedisasters = cleanlist.map(object => object.disasterNumber);

    // Fill in dropdown menu and update page
    var dropdown = document.getElementById("selDisaster");
        for (var i = 0; i < uniquedisasters.length; ++i) {
        dropdown[dropdown.length] = new Option(uniquedisasters[i], uniquedisasters[i]);
        }
    
    // Call getData()
    d3.selectAll("#selDisaster").on("click", getData);
    document.getElementById("selDisaster").click();

    // Create getData()
    function getData() {
        var dropdownMenu = d3.select("#selDisaster");
        var dataset = dropdownMenu.property("value");
        dataset = parseInt(dataset, 10);
        //console.log(dataset);
        var index = uniquedisasters.indexOf(dataset);
        //console.log(index);
        var specificdata = cleanlist[index];
        //console.log(specificdata);
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
    }
});
