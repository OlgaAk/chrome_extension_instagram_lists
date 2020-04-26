$(function () {


    chrome.storage.sync.get(['subscribers'], function (subscribers) {
        //TODO implement storage
    });

    $('#myButton').click(function (event) {
        console.log("checkSubscribers")
        getSubscribersList().then(subscriber => {
                subscriber.forEach((sub, index) => {
                    var node = document.createElement("LI"); // Create a <li> node
                    var textnode = document.createTextNode(index + 1 + '. ' + sub); // Create a text node
                    node.appendChild(textnode); // Append the text to <li>
                    $('#subscribersText').append(node);
                })
                chrome.storage.sync.set({
                    'subscribers': subscriber
                }) // TODO coplete storage implementation
            })
            .catch(err => console.log(err))


    })

    async function getSubscribersList() {
        return fetch('https://www.instagram.com/graphql/query/?query_hash=d04b0a864b4b54837c0d870b0e77e076&variables=%7B%22id%22%3A%2215980679573%22%2C%22include_reel%22%3Atrue%2C%22fetch_mutual%22%3Afalse%2C%22first%22%3A100%2C%22after%22%3A%22QVFEUGR4TVNjNzlNak1vSFlKX0pZWXFTbnhNbUtSWFJuSVFZbUEzam9uQm10OVptOXh6ekUyX2RQZEdUZ2FQSEVZRzlxMEQzeVRMVmN1clpkS0VhWFRLVg%3D%3D%22%7D').then(r => r.text()).then(result => {
            var list = JSON.parse(result).data.user.edge_follow.edges
            var listOfUsernames = list.map(element => {
                return element.node.username
            })
            return listOfUsernames
        });

    }



})


// https: //www.instagram.com/graphql/query/?query_hash=d04b0a864b4b54837c0d870b0e77e076&variables=%7B%22id%22%3A%2215980679573%22%2C%22include_reel%22%3Atrue%2C%22fetch_mutual%22%3Afalse%2C%22first%22%3A12%2C%22after%22%3A%22QVFBcGpzVHh2TW1vWXo2V3NoZ1lqYk9oQmJacHY2SmdDVVRyc0JPUTVDMjVXWUY3SjlZOTZoLXA3STVVcU9XU3pwZ29KMUU0dWh2YzJndEFtTXowWGpiNg%3D%3D%22%7D

// https://www.instagram.com/graphql/query/?query_hash=d04b0a864b4b54837c0d870b0e77e076&variables=%7B%22id%22%3A%2215980679573%22%2C%22include_reel%22%3Atrue%2C%22fetch_mutual%22%3Afalse%2C%22first%22%3A12%2C%22after%22%3A%22QVFBU0FucGI0VmItVWF3QkhaVWVGLWRtblVSc0VURVVDaUc5WXhMZXRLTDlWdVhwbmx5ZnlhOXNwUEJUUDdkaUN5TkFQeTRJVVBsOENvUTF6Z24xem1TNQ%3D%3D%22%7D