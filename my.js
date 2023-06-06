//original array
var questions_array=[];


function addAnswer() {
    
	var div=document.createElement("div");
	div.innerHTML=generateInput();
	document.getElementById("parent-div").appendChild(div);
	


}
var answers_count;
function generateInput()
{
	 answers_count=document.getElementsByClassName('answers').length;
	return "<div class='answers' id='qId-'"+ (answers_count+1) +"'><input type='text'  class='form-control form-control-md mt-3' id='ans"+ (answers_count+1) +"' ><input type ='radio' id='correct"+ (answers_count+1) +"' name=correct-ans class='radio-ans'></div>"
}


function remove()
{

	document.getElementById("qu").value = "";
	    //divs of answers
		let elements=document.getElementsByClassName("answers");
		//we are converting HTML collection to element because remove() is not defined on HTML collection
		elements = [...elements];
		
        elements.forEach(element => {
			element.remove();	
		});
}

function data()
{
	// document.getElementById("questionValue").innerHTML=document.getElementById("qu").value ;
	 let answers_count=document.getElementsByClassName('answers').length;

     //it is for temp object
	 let question={
			 text:document.getElementById("qu").value,
			 answers:[]
		 };


		 //pushing data into array of answers
	 for(let i=0;i<answers_count;i++)
	 {
		question.answers.push({
			text:document.getElementById('ans'+(i+1)).value,
			is_correct:document.getElementById('correct'+(i+1)).checked
			
		});
	 }

	 questions_array.push(question);

	 console.log(questions_array);
}




function printArrayOnInnerHTML() {
    let resultDiv = document.getElementById("result");
    let resultHTML = "";

    for (let i = 0; i < questions_array.length; i++) {
        let question = questions_array[i];

        resultHTML += "<div  id='question-" + i + "'>";
        resultHTML += "<p class='que-para'>" + question.text + "</p>";
        resultHTML += "<ol>";
        for (let j = 0; j < question.answers.length; j++) {
            let answer = question.answers[j];
            if (answer.is_correct) {
                resultHTML += "<li><strong>" + answer.text + "</strong></li>";
            } else {
                resultHTML += "<li>" + answer.text + "</li>";
            }
        }
        resultHTML += "</ol>";
        resultHTML += "<button class='btn btn-primary edit-btn' onclick='editQuestion(event)' data-mdb-toggle='modal' data-mdb-target='#exampleModaledit' >Edit</button><button class='btn btn-primary del-btn''> Delete</button>";
		resultHTML+="<hr>"
        resultHTML += "</div>";
    }

    resultDiv.innerHTML = resultHTML;

    

	
	document.querySelectorAll('.del-btn').forEach(function(button) {
		button.addEventListener('click', function() {
		  let parentDiv = this.parentElement;
		  let index = Array.from(parentDiv.parentNode.children).indexOf(parentDiv);
		  parentDiv.remove();
		  questions_array.splice(index, 1);
		});
	  });




	  


	  
	  
	
	  

}


function resdiv() {
	var x = document.getElementsByClassName("display-div")[0];
	x.style.display = 'block';
}


var count = 0;

function editQuestion(event) {
	// Find the selected question
	let selectedIndex = -1;
	let buttons = document.getElementsByClassName("edit-btn");
	for (let i = 0; i < buttons.length; i++) {
		if (buttons[i] === event.target) {
			selectedIndex = i;
			break;
		}
	}

	if (selectedIndex !== -1) {
		let question = questions_array[selectedIndex];
		document.getElementById("question-valedit").value = question.text;

		// Remove all existing input fields
		let parentDiv2 = document.getElementById("parent-div2");
		while (parentDiv2.firstChild) {
			parentDiv2.removeChild(parentDiv2.firstChild);
		}

		// Create and append new input fields for the selected question
		for (let i = 0; i < question.answers.length; i++) {
			let answer = question.answers[i];
			let answerDiv = document.createElement("div");
			answerDiv.className = "answers-edit";
			answerDiv.innerHTML = '<input type="text" class="form-control form-control-md mt-3 ans-inpt" id="ans' + (i + 1) + '" value="' + answer.text + '">' +
								  '<input type="radio" id="correct' + (i + 1) + '" name="correct-ans" class="radio-ans ans-radio"' + (answer.is_correct ? ' checked' : '') + '>';
			parentDiv2.appendChild(answerDiv);
		}

		// Set the click event handler for the save button
		document.getElementById("save-btn").onclick = function () {
			// update the question and answer values
			question.text = document.getElementById("question-valedit").value;
			for (let i = 0; i < question.answers.length; i++) {
				let answer = question.answers[i];
				answer.text = document.getElementById("ans" + (i + 1)).value;
				answer.is_correct = document.getElementById("correct" + (i + 1)).checked;
			}
			printArrayOnInnerHTML();
		};
	}
}
