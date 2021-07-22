import { SiteClient} from 'datocms-client';

const TOKEN = 'f3988ddeb7d23f7de52d6220fcd495';
const client = new SiteClient(TOKEN);
const communityItemType = '977047';

async function createCommunity(community) {
  const created = await client.items.create({
    itemType: communityItemType,
    title: community.title,
    url: community.url,
    tumbler: community.tumbler,
  });

  return created;
}

async function getAllCommunities() {
  const communities = await client.items.all({
    type: "community",
  });

  return communities;
}

const CommunityApi = {
  get : getAllCommunities,
  post : createCommunity,
}

export default async function handler(request, response) {
  if (request.method === 'POST') {
    const community = await CommunityApi.post(request.body);
    response.status(201).json(community);

  } else if (request.method === 'GET') {
    const communities = await CommunityApi.get();
    response.status(200).json(communities);

  }

}