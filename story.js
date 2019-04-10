// story.js
// Change this to match ID in your AirTable.
const OPENING_SCENE_ID = 'recBB666OcccN7Eet';
// Replace with your own AirTable API key.
const key = 'keyCTEV1rBtpMeDDa';
// Alter this to match your own AirTable base.
const base_url = 'appb32htKfdksUMzU'; 
  
function getScene(record_id) {
  // this requires a record ID when called from setup function
  const url = `https://api.airtable.com/v0/${base_url}/scenes/${record_id}?api_key=${key}`;
  // Make ajax GET request to AirTable base using the url.
  $.ajax({ url: url, type: 'GET' }) 
  // this is jQuery (a JavaScript library - note the $)
  // https://www.w3schools.com/jquery/ajax_ajax.asp
  // Wait for data to be returned. 
  .done(function (data) {
      // Once AJAX request returns data, we destructure it and store it in variables.
      let choices = [];
      let {title, story} = data.fields; // these are JSON fields
      // Don't bother if the scene doesn't have any choices.
      if (data.fields.choices) {
        // Collect AirTable queries for every choice in scene into an array.
        for (let idx = 0; idx < data.fields.choices.length; idx++) {
          choices.push($.ajax({
            url: `https://api.airtable.com/v0/${base_url}/choices/${data.fields.choices[idx]}?api_key=${key}`,
            type: 'GET'
          }));
        }
        // Use Promise.all() to wait until every query in the array has been returned before proceeding.
        Promise.all(choices)
          .then(function (data) {
            let targetArray = [];
            for (let idx = 0; idx < data.length; idx++) {
              // Destructure the necessary fields and push them into targetArray
              let { choice, targets } = data[idx].fields;
			  // look at our scenes data 
			  console.log("Choices after promise"+JSON.stringify(choices));
              targetArray.push({ choice: choice, target: targets[0] });
            }
            displayStory(story);
			 // look at our choices data
			console.log("targetArray"+JSON.stringify(targetArray));
			setOptions(targetArray);
          })
          .catch(function (err) {
            console.log(err);
          });
      } else {
		// No options available.
        displayStory(story);
        setOptions({});
      }
    })
    .fail(function (err) {
      console.log(err);
    });
}
