const eventsCardTemplate = document.querySelector("[data-events-template]")
const eventsCardContainer = document.querySelector("[data-events-cards-container]")
const searchInput = document.querySelector("[data-search]")
 
searchInput.addEventListener("input", e => {
   const value = e.target.value

   if (value != ""){
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
                        const eventMinimumPrice=json._embedded.events[i].priceRanges[0].min   
                        const card = eventsCardTemplate.content.cloneNode(true).children[0]
                        const header = card.querySelector("[data-header]")
                        const body = card.querySelector("[data-body]")
                        const body2 = card.querySelector("[data-body2]")
                        
                        const isVisible = eventName.toLowerCase().includes(value)
                        //Hides results but idk what to put before toggle to hide everything
                        //eventName.card.classList.toggle("hide", !isVisible) 
                        
                        header.textContent = eventName
                        body.textContent = eventMinimumPrice
                        body2.textContent = eventDate
                        
                       // $(eventsCardContainer).children().last().remove() this works to hide old fill in search data too
                        $(eventsCardContainer).html('')
                        $(eventsCardContainer).append(card)
                        
                     }
                     
                  },
         error: function(xhr, status, err) {
                     
                  }
         });  
   }
   else{
      $(eventsCardContainer).children().last().remove()
   }
})
