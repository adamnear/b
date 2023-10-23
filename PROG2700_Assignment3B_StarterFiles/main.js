// IIFE
(() => {

    //Choose an array method to implement for each of the incomplete functions.
    //FOR/WHILE LOOPS OF ANY KIND ARE FORBIDDEN! You must use the available array functions to accomplish your goal.

    //Remember, you can chain together array function calls to attain your goals.
    // Ex: array.filter().map()

    //Get data for the TV Show "Friends"
    fetch('http://api.tvmaze.com/shows/431?embed[]=episodes&embed[]=cast')
        .then((response) => response.json())
        .then((json) => {

            //DO NOT MODIFY THE CODE IN HERE...check the console for your functions' output

            //1 - Create a function called getGuntherCount() which returns the total number of episodes 
            // where the character Gunther is mentioned in the episode summary.
            console.log('--------------------------------');
            console.log(`Gunther Count: ${getGuntherCount(json)}`);

            //2 - Create a function called getTotalRuntimeMinutes() that totals all runtime minutes for all episodes
            console.log('--------------------------------');
            console.log(`Total Runtime Minutes: ${getTotalRuntimeMinutes(json)}`);

            //3 - Create a function called getDateRangeEpisodeCount() that returns the number of episodes that aired in the year 2000
            console.log('--------------------------------');
            console.log(`Total episodes airing in year 2000: ${getTotalEpisodesInYear(json, "2000")}`);

            //4 - Create a function called getFemaleCastMembers() that returns an array of the names of the female cast members.
            console.log('--------------------------------');
            console.log(`Female Cast Members:`);
            console.log(getFemaleCastMembers(json));

            //5 - Create a function called getEpisodeTitles() which returns a list of episode
            //    where the argument string is found in the episode summary.
            console.log('--------------------------------');
            console.log(`Episodes that mention Ursula:`);
            console.log(getEpisodeTitles(json, 'Ursula'));

            //6 - Create a function called getCastMembersOver55() which returns a list of cast members
            //    who are currently older than 55 years of age.
            console.log('--------------------------------');
            console.log(`Cast Members over 55:`);
            console.log(getCastMembersOver55(json));

            //7 - Create a function called getTotalRuntimeMinutesExcludingSeasonSix that gets the total 
            //    runtime minutes for all episodes excluding episodes in season 6
            console.log('--------------------------------');
            console.log(`Total runtime in minutes excluding Season 6: ${getTotalRuntimeMinutesExcludingSeasonSix(json)}`);

            //8 - Create a function called getFirstFourSeasons that gets the episodes for the first four seasons 
            //    but only return an array of JSON objects containing the season number and episode name
            console.log('--------------------------------');
            console.log(`Episode JSON for first four seasons:`)
            console.log(getFirstFourSeasons(json));

            //9 - Create a function called getEpisodeTallyBySeason that returns an object containing the season name and the total episodes as key:value pairs for each season
            console.log('--------------------------------');
            console.log(`Tally of episodes by season:`);
            console.log(getEpisodeTallyBySeason(json));

            //10 - Create a funtion called capitalizeTheFriends that transforms the episode JSON data by capitalizing the words Joey, Chandler, Monica, Rachel, Phoebe, and Ross in both 
            //the name and summary of the episodes.
            console.log('--------------------------------');
            console.log('Capitalized Friends');
            console.log(capitalizeTheFriends(json));

        })

    // COMPLETE THE FOLLOWING FUNCTIONS BY IMPLEMENTING MAP, REDUCE, OR FILTER 
    // (or a combination) ON THE PROVIDED JSON DATA

    // Define the required ten functions below this line...

    const getGuntherCount = (data) => {
        //Retrieve the list of episodes from the data
        const episodes = data._embedded.episodes; //_embedded is used to access the data from the TV show API

        //Filter episodes to find when Gunther is mentioned in the summary
        const guntherEpisodes = episodes.filter((episode) => {
            return episode.summary && episode.summary.includes('Gunther');
        });
        return guntherEpisodes.length;
    }

    const getTotalRuntimeMinutes = (data) => {
        const episodes = data._embedded.episodes;
        //Use reduce method to add up the total runtime of all episodes
        const totalRuntimeMinutes = episodes.reduce((total, episode) => {

            const runtime = episode.runtime;
            if (runtime) {
                //Extract the minutes as an integer in base 10
                const minutes = parseInt(runtime, 10);
                //Check is minutes returned a number
                if (!isNaN(minutes)) {
                    total += minutes
                }
            }
            return total;
        }, 0);
        return totalRuntimeMinutes;
    }

    const getTotalEpisodesInYear = (data) => {
        const episodes = data._embedded.episodes;

        const totalEpisodesInYear = episodes.filter((episode) => {
            return episode.airdate && episode.airdate.includes('2000');
        });
        return totalEpisodesInYear.length;
    }

    const getFemaleCastMembers = (data) => {//NOT WORKING
        const cast = data._embedded.episodes;

        //filter method to filter female cast members
        const femaleCastMembers = cast.filter((member) => member.person && member.person.gender === 'Female');

        //map method to extract and return the names of female cast members
        const femaleNames = femaleCastMembers.map((member) => member.person.name);

        return femaleNames;
    }

    const getEpisodeTitles = (data) => {
        const episodes = data._embedded.episodes;

        //Filter episodes to find when Ursula is in the episode
        const ursulaEpisodes = episodes.filter((episode) => {
            return episode.summary && episode.summary.includes('Ursula');
        });

        //map method to create an array of the titles of the filtered episodes
        const episodeTitles = ursulaEpisodes.map((episode) => episode.name);

        return episodeTitles;
    }

    const getCastMembersOver55 = (data) => {
        const cast = data._embedded.cast;

        // Get the current date to calculate ages.
        const currentDate = new Date();

        // Use the filter method to filter cast members who are older than 55.
        const castMembersOver55 = cast.filter((member) => {
            if (member.person.birthday) {
                //convert their birthday to a sting of dates
                const birthDate = new Date(member.person.birthday);

                // Calculate the age in years.
                const ageInMilliseconds = currentDate - birthDate;
                const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365); // Milliseconds to years

                return ageInYears > 55;
            }
            return false;
        });

        // Use the map method to extract and return the names of the filtered cast members
        const castMemberNames = castMembersOver55.map((member) => member.person.name);

        return castMemberNames;
    }

    const getTotalRuntimeMinutesExcludingSeasonSix = (data) => {
        const episodes = data._embedded.episodes;
        //Filter out season 6
        const totalRuntimeMinutesExcludingSeasonSix = episodes.filter((episode) => {
            return episode.season !== 6;
        });

        const totalRuntimeMinutes = totalRuntimeMinutesExcludingSeasonSix.reduce((total, episode) => {
            const runtime = episode.runtime;
            if (runtime) {
                //Extract the minutes as an integer in base 10
                const minutes = parseInt(runtime, 10);
                //Check is minutes returned a number
                if (!isNaN(minutes)) {
                    total += minutes
                }
            }
            return total;
        }, 0);
        return totalRuntimeMinutes;
    }

})();

