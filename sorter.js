function startSorter() 
{
    try {
        console.log("------ Internshala-Sorter Started ------")
        var internshipContainer = document.getElementById("internship_list_container");
        var stipendArray = getStipendArray(internshipContainer);
        if (stipendArray!==null) {
            const finalArr = sortByStipend(stipendArray);
            applyChangesToDOM(internshipContainer, finalArr);
            console.log("------ Sort Successful ------");
            chrome.runtime.sendMessage({success: true }, () => {});
        }
        else {
            throw "stipendArray is null.";
        }
    } 
    catch (err) {
        console.error("------ Sort Failed ------");
        console.error(err);
        chrome.runtime.sendMessage({success: false }, () => {});
    }
}

function applyChangesToDOM(internshipContainer, finalArr)
{
    var newDiv = document.createElement('div');
    newDiv.style = "background-color: #1295C9; color: white; font-size: 15px; padding: 10px; margin: 10px;";
    newDiv.innerText = "[+] IS-Sorter: The internship listings have been sorted in the descending order of their stipend."
    internshipContainer.innerHTML="";
    internshipContainer.appendChild(newDiv);
    finalArr.forEach(item => {
        internshipContainer.appendChild(item.element);
    });
}

function sortByStipend(arr) 
{
      var noStipends = new Array()
      var lumpSumStipends = new Array()
      var normalStipends = new Array()
      
      arr.forEach((el) => {
          if (el.stipend==="Unpaid" || el.stipend==="Performance Based" || el.stipend==="Not provided") {
              noStipends.push(el)
          }
          else if (el.stipend.includes("/Month")) {
              const stipendStr = el.stipend.split("/")[0];
              if (stipendStr.includes("-")) {
                  const s = parseInt(stipendStr.split("-")[1])
                  normalStipends.push({"stipend": s, "element": el.element});
              }
              else {
                  const s = parseInt(stipendStr)
                  normalStipends.push({"stipend": s, "element": el.element});
              }
          }
          else if (el.stipend.includes("Lump-Sum")) {
              lumpSumStipends.push(el);
          }
      });
      normalStipends.sort((a, b) => b.stipend - a.stipend );
      const finalArray = normalStipends.concat(lumpSumStipends).concat(noStipends);
      return finalArray;
}

function getStipendArray(internshipContainer) 
{
    try {
        var stipendArray = new Array();
        var internships = internshipContainer.getElementsByClassName("individual_internship");
        var internshipsArray = Array.from(internships).slice(0,internships.length-2);
        internshipsArray.forEach(internship => {
            var s = internship
                    .getElementsByClassName("internship_meta")[0]
                    .getElementsByClassName("individual_internship_details")[0]
                    .children[1]
                    .children[0].tBodies[0].children[0]
                    .getElementsByClassName("stipend_container_table_cell")[0]
                    .innerText;
            stipendArray.push({"stipend": s, "element": internship});
        });
        return stipendArray;
    }
    catch(err) {
        throw err;
    }
}

startSorter();