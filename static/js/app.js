// read in data.json
d3.json("static/js/data.json").then((data) => {
    var alldata = data.DisasterDeclarationsSummaries;
    //console.log(alldata);

    // keep Flood, Hurricane, Fire, Earthquake, Tornado, Volcano, Drought
    var incidentType = alldata.map(object => object.incidentType);
    var declarationDate = alldata.map(object => object.declarationDate);
    var disasterNumber = alldata.map(object => object.disasterNumber);
    var state = alldata.map(object => object.state);
    var declarationTitle = alldata.map(object => object.DeclarationTitle);
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
              'declarationTitle': declarationTitle[j],
              'id': id[j],
              'disasterNumber': disasterNumber[j],
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
    
    // created clean list
    console.log(cleanlist);
});
