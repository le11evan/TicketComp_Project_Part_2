const eventsCardTemplate = document.querySelector("[data-events-template]")
const eventsCardContainer = document.querySelector("[data-events-cards-container]")
const searchInput = document.querySelector("[data-search]")
 
searchInput.addEventListener("input", e => {
   const value = e.target.value
   $.ajax({
      type:"GET",
      url:"https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=pWwiSAnfPrfAQCVnB9ul68zUWMcpfK6J",
      data: {
         keyword: value
      },
      async:true,
      dataType: "json",
      success: function(json) {
                  for (let i = 0; i < json._embedded.events.length; i++){
                     const eventName=json._embedded.events[i].name
                     const eventDate=json._embedded.events[i].dates.start.localDate
                     const card = eventsCardTemplate.content.cloneNode(true).children[0]
                     const header = card.querySelector("[data-header]")
                     const body = card.querySelector("[data-body]")

                     const isVisible = eventName.toLowerCase().includes(value) || eventDate.toLowerCase().includes(value)

                     //Hides results but idk what to put before toggle to hide everything
                     //eventName.card.classList.toggle("hide", !isVisible) 
                     

                     header.textContent = eventName
                     body.textContent = eventDate
                     eventsCardContainer.append(card)

                     //This works to display minimum price but putting it as a const variable does not work for some reason.
                     //console.log(json._embedded.events[i].priceRanges[0].min);             this works
                     //const eventMinimumPrice=json._embedded.events[i].priceRanges[0].min   this does not work
                  }
                  
                  
               },
      error: function(xhr, status, err) {
                  // This time, we do not end up here!
               }
      });  
   
   
})


