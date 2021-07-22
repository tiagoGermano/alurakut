import axios from "axios";

function createCommunity(community, success, fail) {
  axios.post('/api/communities', community)
  .then(function (response) {
    if(success){
      success(response.data);
    }
  })
  .catch(function (error) {
    console.error(error);
    if(fail){
      fail(error);
    }
  });  
}

async function getAllCommunities() {
  const reponse = await axios.get('/api/communities');  

  return reponse.data;
}

export const CommunityService = {
  getAllCommunities : getAllCommunities,
  createCommunity : createCommunity,
}
