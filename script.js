//Setting up DOM elements 
const currentDayEl = document.getElementById('currentDay');
const blockInfo = document.getElementsByClassName('hour');
//Displaying the current Date
const b = dayjs().format('dddd, MMMM, D, YYYY');
currentDayEl.textContent = b;

//Jquery still confuses me, so I made it a regular function.
update();

function update() 
{
  const a = dayjs();
  var t = 9;
  
  //setting times, and classes for each time block.
  for (let i = 0; i <= 8; i++) 
  {
    const v = a.hour(t).format('h');
    const h = a.hour(t).format('h A');
    const block = document.getElementById(v);
    
    blockInfo[i].textContent = h; //display the hours on the left.

    if (v < a.get('hour')) 
    {
      $(block).removeClass('future');
      $(block).removeClass('present');
      $(block).addClass('past');
    }
    if (v > a.get('hour')) 
    {
      $(block).removeClass('past');
      $(block).removeClass('present');
      $(block).addClass('future');
    }
    else if(v === a.get('hour'))
    {
      $(block).removeClass('past');
      $(block).removeClass('future');
      $(block).addClass('present');
    }
   t++;
  }
  //Save Button
  $('.saveBtn').on('click', function() {
    var timeBlock = $(this).parent().attr('id');
    var input = $(this).siblings('.description').val();
    localStorage.setItem(timeBlock, input);
  })
  //Loading saved information.
  $('.time-block').each(function() {
    var loadTime = $(this).attr('id');
    var loadContent = localStorage.getItem(loadTime);
    $(this).children('.description').text(loadContent);
  })
};
