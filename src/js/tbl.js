function loadFromStorage(){
    chrome.storage.sync.get(['listOfTxt'], function(res){
        if(res.listOfTxt != ""){
            let listOfTxt = res.listOfTxt         
            const l = listOfTxt.length
            for(let i = 0; i < l; i++)
                $("#tbl").append(
                    addRow(listOfTxt[i].text,
                    getImg(listOfTxt[i].sensList[0][1], listOfTxt[i].topicList[0]),
                    "row"+i)
                    )
                //$("#tbl").append(addRow(listOfTxt[i].text,"img/knoxly32.png","row"+i))
            let btnListNeg = document.getElementsByClassName("btn_style_feedback_neg")
    		let lNeg = btnListNeg.length
    		for(let i = 0; i<l; i++){
            	btnListNeg[i].addEventListener('click', sendFeedbackNeg);
            }
            
            let btnListPos = document.getElementsByClassName("btn_style_feedback_pos")
    		let lPos = btnListNeg.length
    		for(let i = 0; i<lPos; i++){
            	btnListPos[i].addEventListener('click', sendFeedbackPos);
            }
            
            let show = document.getElementsByClassName("crop")
    		let lSM = show.length
    		for(let i = 0; i<lSM; i++){
            	show[i].addEventListener('click', showMore('row'+i));
            }
            $("#tblfoot").css("visibility", "visible")
        }
    })
    return true
}

function addRow(txt, img, id){
    return`<tr id=`+id+`>
            <td scope="row" style='width: 120px'><div style='width: 120px;' id='text_crop_`+id+`' class='crop'>`+txt+`</div></th>
            <td style='text-align: center;'><img src="`+img+`" style='height: 70px; width: 70px'></td>
            <td style="text-align: center;"><button type="button" class="btn_style_feedback_pos">Good Job!</button><br><br><button type="button" class="btn_style_feedback_neg">Ignore</button></td>
            </tr>`
}

function sendFeedbackNeg(){
    let btnList = document.getElementsByClassName("btn_style_feedback_neg")
    let l = btnList.length
    for(let i = 0; i < l; i++){
        btnList[i].onclick = function (){
                chrome.runtime.sendMessage({type:"rmvitem", opt: {toRemove: i}, message: 'neg'}, function(){})
                $("#row"+i).remove()
                if(btnList.length == 0)$("#tblfoot").css("visibility", "hidden")
                /**
                 * TODO aggiugere invio feedback
                 */
    }
}
return true
}

function sendFeedbackPos(){
    let btnList = document.getElementsByClassName("btn_style_feedback_pos")
    let l = btnList.length
    for(let i = 0; i < l; i++){
        btnList[i].onclick = function (){
                chrome.runtime.sendMessage({type:"rmvitem", opt: {toRemove: i}, message: 'pos'}, function(){})
                $("#row"+i).remove()
                if(btnList.length == 0)$("#tblfoot").css("visibility", "hidden")
                /**
                 * TODO aggiugere invio feedback
                 */
    }
}
return true
}

function clearTbl(){
    $("#clearTbl").click(function(){
        chrome.runtime.sendMessage({type:"rmvAll", opt: {}}, function(){})
        $("#tbl").remove()
        $("#tblfoot").css("visibility", "hidden")
    })
}

function showMore(id){
   $('#text_crop_'+id).click(function() {
     $('#text_crop_'+id).toggleClass('crop');
   });
}


function getImg(sens, topic){
    let path = "img/bollini/"
    switch(topic){
        case 0: path = chooseImg(sens, path+"p"); break;
        case 1: path = chooseImg(sens, path+"h"); break;
        case 2: path = chooseImg(sens, path+"j"); break;
        case 3: path = chooseImg(sens, path+"t"); break;
        case 4: path = chooseImg(sens, path+"g"); break;
        case 5: path = chooseImg(sens, path+'rac'); break;
        case 6: path = chooseImg(sens, path+'rel'); break;
        case 7: path = chooseImg(sens, path+'so'); break;
    }
    return path
}

function chooseImg(sens, path){
    if (sens>=0.36 && sens <= 0.65) path+="-yellow.png"
    else if (sens > 0.65 && sens <= 1) path+="-red.png"
    /*if(sens >= 0 && sens <= 0.25) path+="-green.png"
    else if(sens >= 0.26 && sens <= 0.50) path+="-yellow.png"
    else if(sens >= 0.51 && sens <= 0.75) path+="-orange.png"
    else if(sens >= 0.76 && sens <= 1) path+="-red.png"
    return path*/
    return path
}

loadFromStorage()
clearTbl()
