document.addEventListener("DOMContentLoaded", function(){

    const searchButton = document.getElementById("search-btn")
    const usernameInput = document.getElementById("user-input")
    const statsContainer = document.querySelector(".stats-container")
    const easyProgressCircle = document.querySelector(".easy-progress")
    const mediumProgressCircle = document.querySelector(".medium-progress")
    const hardProgressCircle = document.querySelector(".hard-progress")

    const easyLabel = document.getElementById("easy-label")
    const mediumLabel = document.getElementById("medium-label")
    const hardLabel = document.getElementById("hard-label")
    const cardStatsContainer = document.querySelector(".stats-cards")

    console.log(easyProgressCircle);

    function validateUsername(username){
        if (username.trim() === ""){
            alert ('Username should not be empty');
            return false;
        }
        const regex = /^[a-zA-Z][a-zA-Z0-9_]{3,14}$/;
        const isMatchhing = regex.test(username)
        if(!isMatchhing){
            alert ("Invalid Username")
        }
        return isMatchhing;
      
    }
    

    // async function fetchUserDetails(username) {
    //     const url = `https://leetcode-stats-api.herokuapp.com/${username}`
    //     try{
    //         searchButton.textContent = "Searching...";
    //         searchButton.disabled = true;

    //         const response = await fetch(url);
    //         if(!response.ok){
    //             throw new Error ("Unable to fetch user details");

    //         }

    //         const responseText = await response.text();
    //         // console.log("Raw response:", responseText);
    //         const parsedData = JSON.parse(responseText);

    //         // const parsedData = await response.json();
    //         // console.log("Logging data", parsedData)


    //         // displayUserData(parsedData);


    //     }
    //     catch(error){
    //         statsContainer.innerHTML = `<p>No data found</p>`
    //     }
    //     finally{
    //         searchButton.textContent ="Search"
    //         searchButton.disabled = false 
    //     }
    // }
    async function fetchUserDetails(username) {
        const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
        try {
            searchButton.textContent = "Searching...";
            searchButton.disabled = true;
    
            const response = await fetch(url);
            console.log("Response Status:", response.status);  // Log status code
    
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
    
            const parsedData = await response.json();
            console.log("API Data:", parsedData);
            displayUserData(parsedData);
        } catch (error) {
            console.error("Fetch Error:", error);
            statsContainer.innerHTML = `<p>N${error.message}</p>`;
        } finally {
            searchButton.textContent = "Search";
            searchButton.disabled = false;
        }
    }
    

    function updateProgress(solved, total, label, circle) {
        console.log("Updating progress for:", label.id);
        console.log("Solved:", solved, "Total:", total);
    
        if (total === 0) {
            console.warn("Total cannot be 0 to avoid division by zero.");
            return;
        }
    
        const progressDegree = (solved / total) * 360;
        console.log("Calculated progress degree:", progressDegree);
    
        circle.style.setProperty("--progress-degree", `${progressDegree}deg`);
        label.textContent = `${solved}/${total}`;
    }
    
    // function updateProgress(solved, total, label, circle){
    //     const progressDegree = (solved/total)*100
    //     console.log(circle.style.getPropertyValue("--progress-degree"));

    //     circle.style.setProperty("--progress-degree",`${progressDegree}%`)
    //     label.textContent= `${solved}/${total}`;
    // }

    function displayUserData(parsedData){

            console.log(parsedData)
            const totalQuestion = parsedData.totalQuestions;
            const totalEasyQuestion = parsedData.totalEasy;
            const totalMediumQuestion = parsedData.totalMedium;
            const totalHardQuestion = parsedData.totalHard;

            const totalSolvedQuestion = parsedData.totalSolved;
            const totalEasySolved = parsedData.easySolved;
            const totalMediumSolved = parsedData.mediumSolved;
            const totalHardSolved = parsedData.hardSolved;
           
            updateProgress(totalEasySolved, totalEasyQuestion, easyLabel, easyProgressCircle);
            updateProgress(totalMediumSolved, totalMediumQuestion, mediumLabel, mediumProgressCircle);
            updateProgress(totalHardSolved, totalHardQuestion, hardLabel, hardProgressCircle);
    

    const cardsData = [
        {label: "Acceptance Rate", value:parsedData.acceptanceRate },
        {label: "Ranking", value:parsedData.ranking}
        
    ];

    console.log("card ka data: " , cardsData);

    cardStatsContainer.innerHTML = cardsData.map(
        data => 
                `<div class="card">
                <h4>${data.label}</h4>
                <p>${data.value}</p>
                </div>`
    ).join("")


    }

    searchButton.addEventListener('click', function(){
        const username = usernameInput.value;
        if(validateUsername(username)){
            fetchUserDetails(username);
        }
    })
})