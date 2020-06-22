let dayofWeek = {
    "8 AM": "",
    "9 AM": "",
    "10 AM": "",
    "11 AM": "",
    "12 PM": "",
    "1 PM": "",
    "2 PM": "",
    "3 PM": "",
    "4 PM": "",
    "5 PM": "",
  };
  
  $(document).ready(function(){
    if(!localStorage.getItem('dayofWeek')) {
      calendarChange(dayofWeek);
    } else {
      calendarChange(JSON.parse(localStorage.getItem('dayofWeek')));
    }
  })
  
  $('#date h2').text(moment().format('dddd') + ", " + moment().format('MMMM Do YYYY, h:mm:ss a'));
  
  let counts = 1;
  for(const property in dayofWeek) {
    let txtentry = "#text-entry" + counts;
    $(txtentry).text(dayofWeek[property]);
    let timeId = "#time" + counts;
    let phour = moment().hour();
    let tString = $(timeId).text();
    let tnum = hourNumberFromhours(tString);  
    if(tnum < phour) {
      $(txtentry).addClass("past-hour");
    } else if (tnum > phour) {
      $(txtentry).addClass("future-hour");
    } else {
      $(txtentry).addClass("present-hour");
    }
    counts ++;
  }
  
  $("button").click(function() {
    value = $(this).siblings("textarea").val();
    hours = $(this).siblings("div").text();
    
    saveSchedule(hours, value);
  });
  
  function hourNumberFromhours(hours) {
    switch(hours) {
      case "8 AM": return 8;
      case "9 AM": return 9;
      case "10 AM": return 10;
      case "11 AM": return 11;
      case "12 PM": return 12;
      case "1 PM": return 13;
      case "2 PM": return 14;
      case "3 PM": return 15;
      case "4 PM": return 16;
      case "5 PM": return 17;
    }
  }
  
  function loadCorrectDataset() {
    result = localStorage.getItem('dayofWeek')
    return (result ? result : dayofWeek);
  }
  
  function initializeLocalStorage() {
    localStorage.setItem('dayofWeek', JSON.stringify(dayofWeek));
  };
  
  function saveToLocalStorage(objDays) {
    localStorage.setItem('dayofWeek', JSON.stringify(objDays));
  }
  
  function saveSchedule(hours, val) {
    if(!localStorage.getItem('dayofWeek')) {
      initializeLocalStorage();
    }
  
    let workHours = JSON.parse(localStorage.getItem('dayofWeek'));
    workHours[hours] = val
  
    saveToLocalStorage(workHours);
  }
  
  function calendarChange(section) {
    $(".calendar-row").each(function(index) {
      let reset = $(this).children("div");
      $(this).children("textarea").text(section[reset.text()]);
    })
  }