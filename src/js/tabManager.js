currentTab = 0//current tab are 0 for Analysis 1 for Statistic 2 for About
function loadAnalysis(){
    $("#analysisTab").click(function(){
        if(currentTab != 0){
            $("#contentepage").empty()
            $("#contentepage").html(createTbl())
            loadFromStorage()
            clearTbl()
            currentTab = 0
        }
    })
}

function loadStatistic(){
    $("#statTab").click(function(){
        if(currentTab != 1){
            $("#contentepage").empty()
            $("#contentepage").html(createStat())
            loadBarPlot()
            loadOverall()
            currentTab = 1
        }
    })
}

function loadAbout(){
    $("#aboutTab").click(function(){
        if(currentTab != 2){
            $("#contentepage").empty()
            $("#contentepage").html(createAbout())
            currentTab = 2
        }
    })
}

function createTbl(){
    return `
    <table class="tb table">
    <thead class="thead-dark">
      <tr>
        <th scope="col" style="text-align: center">Text</th>
        <th scope="col" style="text-align: center">Result</th>
        <th scope="col" style="text-align: center">Feedback</th>
      </tr>
    </thead>
    <tbody id="tbl">
    </tbody>
    
    <tfoot id="tblfoot" style="visibility: hidden;">
      <tr><td colspan="3" style="text-align: center"> <button id="clearTbl" class="btn btn-info btn-sm btn-block">Delete All</button>  </td></tr>
    </tfoot>
  </table>	
    `
}

function createStat(){
    return `
      <div id = "bp" style="height: 250px; width: 350px;"></div>
      <div id = "overall" style="height: 250px; width: 350px;"></div>
      `
}

function createAbout(){
    let topic = ["politics", "health", "job", "travel", "general", "racism", "religion", "sexual orientation"]
    const PATH = "img/bollini/"
    const R = "-red.png"
    const Y = "-yellow.png"
    let bollini = [PATH+"p"+Y, PATH+"p"+R, PATH+"h"+Y, PATH+"h"+R, PATH+"j"+Y, PATH+"j"+R, PATH+"t"+Y, PATH+"t"+R, PATH+"g"+Y, PATH+"g"+R, PATH+"rac"+Y, PATH+"rac"+R, PATH+"rel"+Y, PATH+"rel"+R, PATH+"so"+Y, PATH+"so"+R]
    const MEANLY = "This icon indicates a text mainly talking about <strong>"
    const RISK_Y = `</strong>. <p><span style="color: #e9c545"><strong>Yellow</strong></span> background indicates <span style="color: #e9c545"><strong>low</strong></span> risk for your privacy</p>`
    const RISK_R = `</strong>. <p> <span style="color: #d65845"><strong>Red</strong></span> background indicates <span style="color: #d65845"><strong>high</strong></span> risk for your privacy</p>`
    let tr = `
    <table class="table" style="font-size: 14px; width: 350px">
    <thead class="thead-dark">
    <tr>
        <th scope="col" style="text-align: center">Privacy Awareness icon</th>
        <th scope="col" style="text-align: center">Descriptions</th>
    </tr>
    </thead>
    <tbody>`

    for(let i=0; i < 16; i++){
        tr += "<tr> <td><img src = \""+bollini[i]+"\" style='height: 80px; width: 80px'></td>"
        tr += "<td>"
        if(i<=1) tr += (i%2==0)? MEANLY+topic[parseInt(i/2)]+RISK_Y:MEANLY+topic[parseInt(i/2)]+RISK_R
        else if (i<=3) tr += (i%2==0)?MEANLY+topic[parseInt(i/2)]+RISK_Y:MEANLY+topic[parseInt(i/2)]+RISK_R
        else if (i<=5) tr += (i%2==0)?MEANLY+topic[parseInt(i/2)]+RISK_Y:MEANLY+topic[parseInt(i/2)]+RISK_R
        else if (i<=7) tr += (i%2==0)?MEANLY+topic[parseInt(i/2)]+RISK_Y:MEANLY+topic[parseInt(i/2)]+RISK_R
        else if (i<=9) tr += (i%2==0)?MEANLY+topic[parseInt(i/2)]+RISK_Y:MEANLY+topic[parseInt(i/2)]+RISK_R
        else if (i<=11) tr += (i%2==0)?MEANLY+topic[parseInt(i/2)]+RISK_Y:MEANLY+topic[parseInt(i/2)]+RISK_R
        else if (i<=13) tr += (i%2==0)?MEANLY+topic[parseInt(i/2)]+RISK_Y:MEANLY+topic[parseInt(i/2)]+RISK_R
        else if (i<=15) tr += (i%2==0)?MEANLY+topic[parseInt(i/2)]+RISK_Y:MEANLY+topic[parseInt(i/2)]+RISK_R
        tr+= "</td></tr>"
    }
    tr+="</tbody>"
    tr+="</table>"
    return tr
}

loadAnalysis()
loadStatistic()
loadAbout()
