// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  var $description = $(".description");
  var $saveButton = $(".saveBtn");
  var $timeBlocks = $(".time-block");
  var pastTime = "past";
  var presentTime = "present";
  var futureTime = "future";

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

  // saves user's input to text area in local storage
  function storeDescription() {
    $timeBlocks.each(function () {
      var timeblockHour = $(this).attr("id");
      var descriptionText = $(this).find(".description").val();
      localStorage.setItem("hourText" + timeblockHour, descriptionText);
    });
  };

  // loads user's saved inputs from local storage even after refreshing page
  function loadDescription() {
    $timeBlocks.each(function () {
      var timeblockHour = $(this).attr("id");
      var storedDescription = localStorage.getItem("hourText" + timeblockHour);
      $(this).find($description).val(storedDescription);
    });
  };

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  
  // event listener for save button which runs store description function
  $saveButton.on("click", function (event) {
    event.preventDefault();
    storeDescription();
  });

  // calls load description function
  loadDescription();

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?  
  
  // updates styling for past, present and future time blocks based on current hour
  function updateTimeblock() {
    var currentHour = dayjs().hour();

    $timeBlocks.each(function () {
      var timeblockHour = parseInt($(this).attr("id"));
      $(this).removeClass("past present future");

      if (timeblockHour === currentHour) {
        $(this).addClass(presentTime);
      } else if (timeblockHour < currentHour) {
        $(this).addClass(pastTime);
      } else {
        $(this).addClass(futureTime);
      }
    });
  };

  // calls update time block function
  updateTimeblock();

  // TODO: Add code to display the current date in the header of the page.
  
  // displays current day and date
  var today = dayjs().format('dddd, MMMM D');
  $('#currentDay').text(today);
});