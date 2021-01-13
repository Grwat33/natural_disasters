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

    var incidentType = cleanlist.map(object => object.incidentType);
    var declarationDate = cleanlist.map(object => object.declarationDate);
    var disasterNumber = cleanlist.map(object => object.disasterNumber);
    var state = cleanlist.map(object => object.state);
    var designatedArea = cleanlist.map(object => object.designatedArea);
    var id = cleanlist.map(object => object.id);
    var incidentBeginDate = cleanlist.map(object => object.incidentBeginDate);
    var incidentEndDate = cleanlist.map(object => object.incidentEndDate);
    var fipsCountyCode = cleanlist.map(object => object.fipsCountyCode);
    var fipsStateCode = cleanlist.map(object => object.fipsStateCode);
    var fyDeclared = cleanlist.map(object => object.fyDeclared);
    console.log(cleanlist);

    var countObj = [];

    var countFunc = keys => {
    countObj[keys] = ++countObj[keys] || 1;
    }

    state.forEach(countFunc);
    countObj = [42,51,41,8,83,314,88,17,7,12,127,5,48,2,43,35,40,27,18,31,38,67,23,19,20,3,21,42,31,1,43,75,50,37,32,19,23,78,86,44,26,140,114,37,32,9,26,44,35,330,42,42,24,20,151,28,40,31];
    
    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
      }
    var unique = state.filter(onlyUnique); 
    var unique = unique.sort();   

    var data = [{
        type: "choroplethmapbox", locations: unique, z: countObj,
        geojson: "https://raw.githubusercontent.com/python-visualization/folium/master/examples/data/us-states.json"
      }];
      
    var layout = {mapbox: {center:{lon: -115, lat: 52}, zoom: 2.25, style:"dark"}, title: "Declarations per State"};
      
    var config = {mapboxAccessToken: "pk.eyJ1IjoiZ3J3YXQzMyIsImEiOiJja2lzMmV4cGUxc3M2MndvODR6YWs2cnl4In0.MrGype25gR61KiJcqHVyvw"};
      
    Plotly.newPlot('map', data, layout, config);

    var yearcountObj = [];

    var countFunc = keys => {
    yearcountObj[keys] = ++yearcountObj[keys] || 1;
    }

    fyDeclared.forEach(countFunc);

    var yearunique = fyDeclared.filter(onlyUnique); 
    var yearunique = yearunique.sort();
    var yearcountObj = [10,13,19,13,17,6,7,9,11,16,18,16,30,11,9,17,28,16,19,38,48,49,39,38,44,30,51,26,12,26,15,37,25,30,26,17,26,24,27,37,36,28,14,111,23,82,70,76,48,95,47,74,87,101,59,77,61,38,170,65,75,47,47,57,106,108,68,122,20]

    var trace1 = {
        x: yearunique,
        y: yearcountObj,
        type: 'scatter'
    };
    var yearlayout = {
        title: 'Declarations per Year',
        xaxis: {
          title: {
            text: 'Year'
          }
        },
        yaxis: {
          title: {
            text: 'Number of Declarations'
          }
        }
      };
      
      var yeardata = [trace1];
      
      Plotly.newPlot('line', yeardata, yearlayout);


    var stormcountObj = [];

    var countFunc = keys => {
    stormcountObj[keys] = ++stormcountObj[keys] || 1;
    }

    incidentType.forEach(countFunc);
    console.log(stormcountObj);

    var stormunique = incidentType.filter(onlyUnique); 
    var stormunique = stormunique.sort();
    stormcountObj = [46,35,1467,837,401,170,6];

    var data = [
        {
          x: stormunique,
          y: stormcountObj,
          type: 'bar'
        }
      ];
      
      var stormlayout = {
        title: 'Declarations per Incident Type',
        xaxis: {
          title: {
            text: 'Declaration Type'
          }
        },
        yaxis: {
          title: {
            text: 'Number of Declarations'
          }
        }
      };
      
      Plotly.newPlot('bar', data, stormlayout);
    }

);
