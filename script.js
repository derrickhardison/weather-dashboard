$(document).ready(function () {



    function searchForACity (e){
        e.preventDefault();
        console.log("test");
    }
    

    // Event listeners

    //adds event listener to city search button
    $(document).on("click", ".btn", searchForACity)
    
    });